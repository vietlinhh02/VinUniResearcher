
# Next.js Advanced Routing

## Overview

Provide comprehensive guidance for advanced Next.js App Router features including Parallel Routes, Intercepting Routes, error handling, and streaming with Suspense.

## TypeScript: NEVER Use `any` Type

**CRITICAL RULE:** This codebase has `@typescript-eslint/no-explicit-any` enabled. Using `any` will cause build failures.

**❌ WRONG:**
```typescript
function handleSubmit(e: any) { ... }
const data: any[] = [];
```

**✅ CORRECT:**
```typescript
function handleSubmit(e: React.FormEvent<HTMLFormElement>) { ... }
const data: string[] = [];
```

### Common Next.js Type Patterns

```typescript
// Page props
function Page({ params }: { params: { slug: string } }) { ... }
function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) { ... }

// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { ... }
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }

// Form events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }
```

## When to Use This Skill

Use this skill when:
- Implementing parallel or intercepting routes
- Creating error boundaries
- Setting up streaming and Suspense boundaries
- Building complex routing patterns (modals, drawers)

## Step 0: Determine Parallel Route Scope

Before implementing parallel routes, identify WHERE they should live in your route structure.

### Analyzing Route Context

**Key Question:** Is this feature for a specific page/section, or for the entire application?

- **Specific page/section** → Create under that route directory
- **Entire application** → Create at root level

### Route Scope Decision Process

**When the requirement mentions a specific feature or page:**
```
"Create a [feature-name] with parallel routes for X and Y"
→ Structure: app/[feature-name]/@x/ and app/[feature-name]/@y/
```

**When the requirement covers app-wide layout:**
```
"Create an app with parallel routes for X and Y"
→ Structure: app/@x/ and app/@y/
```

### Common Scope Mistake

❌ **WRONG - Parallel routes at incorrect scope:**
```
Request: "Create a [specific-feature] with sections for X and Y"

app/
├── @x/              # ❌ Created at root - affects entire app!
├── @y/              # ❌ Wrong scope
└── layout.tsx       # ❌ Root layout modified unnecessarily
```

This makes the parallel routes global when they should be feature-specific.

✅ **CORRECT - Parallel routes properly scoped:**
```
Request: "Create a [specific-feature] with sections for X and Y"

app/
├── [specific-feature]/
│   ├── @x/          # ✅ Scoped to this feature
│   ├── @y/          # ✅ Only affects this route
│   └── layout.tsx   # ✅ Feature-specific layout
└── layout.tsx       # Root layout unchanged
```

### Decision Criteria

1. **Analyze the requirements** - Look for specific feature/page names
   - Mentions a specific noun/feature? → Create under `app/[that-feature]/`
   - General app-level description? → Determine if root or new route

2. **Consider URL structure** - What URL should this live at?
   - `/feature` path → Use `app/feature/@slots/`
   - Root `/` path → Use `app/@slots/`
   - Nested `/parent/feature` → Use `app/parent/feature/@slots/`

3. **Think about scope impact** - How much of the app is affected?
   - One feature/page only? → Scope to feature directory
   - Multiple related pages? → Scope to parent directory
   - Entire application? → Use root level

### Practical Examples

**Example 1: Feature-specific parallel routes**
```
Scenario: a user profile page needs tabs for posts and activity

Analysis:
- "user profile page" = specific feature
- Should be at /profile URL
- Only affects profile page

Structure:
app/
├── profile/
│   ├── @posts/
│   │   └── page.tsx
│   ├── @activity/
│   │   └── page.tsx
│   └── layout.tsx        # Accepts posts, activity slots
```

**Example 2: App-wide parallel routes**
```
Scenario: the overall application layout must expose sidebar and main content slots

Analysis:
- "application layout" = root level
- Affects entire app
- Should be at root

Structure:
app/
├── @sidebar/
│   └── page.tsx
├── @main/
│   └── page.tsx
└── layout.tsx            # Root layout with slots
```

**Example 3: Nested section parallel routes**
```
Scenario: the admin area adds an analytics view with charts and tables

Analysis:
- "admin panel" = existing section
- "analytics view" = subsection
- Should be at /admin/analytics URL

Structure:
app/
├── admin/
│   ├── analytics/
│   │   ├── @charts/
│   │   │   └── page.tsx
│   │   ├── @tables/
│   │   │   └── page.tsx
│   │   └── layout.tsx    # Analytics-specific layout
│   └── layout.tsx        # Admin layout (unchanged)
```

### Quick Reference

| Requirement Pattern | Route Scope | Example Structure |
|---------------|-------------|-------------------|
| Feature-specific requirement | `app/[feature]/` | `app/profile/@tab/` |
| Section inside a parent area | `app/[parent]/[section]/` | `app/admin/analytics/@view/` |
| App-wide layout requirement | `app/` | `app/@sidebar/` |
| Page with multiple panels | `app/[page]/` | `app/settings/@panel/` |

**CRITICAL RULE:** Always analyze the requirement for scope indicators before defaulting to root-level parallel routes.

## Parallel Routes

Parallel Routes allow rendering multiple pages in the same layout simultaneously.

### ⚠️ IMPORTANT: Understand Route Scope First

Before creating parallel routes, **review "Step 0: Determine Parallel Route Scope" above** to identify the correct directory level.

Don't default to creating parallel routes at root level - scope them appropriately to the feature/page mentioned in the requirements.

### Creating Parallel Routes (Feature-Scoped)

For feature-specific parallel routes (most common):

```
app/
├── [feature-name]/
│   ├── @slot1/
│   │   └── page.tsx
│   ├── @slot2/
│   │   └── page.tsx
│   ├── layout.tsx       # Feature layout accepting slot props
│   └── page.tsx         # Feature main page
```

### Creating Parallel Routes (Root-Level)

For app-wide parallel routes (less common):

```
app/
├── @slot1/
│   └── page.tsx
├── @slot2/
│   └── page.tsx
├── layout.tsx           # Root layout with slots
└── page.tsx
```

### Layout with Parallel Routes (Feature-Scoped Example)

For a feature with parallel routes:

```typescript
// app/[feature]/layout.tsx
export default function FeatureLayout({
  children,
  slot1,
  slot2,
}: {
  children: React.ReactNode;
  slot1: React.ReactNode;
  slot2: React.ReactNode;
}) {
  return (
    <div>
      <h1>Feature Page</h1>
      <div className="main">{children}</div>
      <div className="slots">
        <div className="slot1">{slot1}</div>
        <div className="slot2">{slot2}</div>
      </div>
    </div>
  );
}
```

### Layout with Parallel Routes (Root-Level Example)

For app-wide parallel routes:

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
  sidebar,
  main,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  main: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <aside>{sidebar}</aside>
          <main>{main}</main>
          {children}
        </div>
      </body>
    </html>
  );
}
```

### Default Parallel Route

Create a `default.tsx` to handle unmatched routes or provide fallback UI:

```typescript
// Feature-scoped: app/[feature]/@slot1/default.tsx
export default function Default() {
  return null; // Or a default UI
}

// Root-level: app/@sidebar/default.tsx
export default function Default() {
  return <div>Default sidebar content</div>;
}
```

### Conditional Parallel Routes

Parallel routes can be conditionally rendered based on runtime conditions:

```typescript
// app/[feature]/layout.tsx (or any layout with parallel routes)
export default function Layout({
  children,
  analytics,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
}) {
  const showAnalytics = true; // Could be based on user permissions, feature flags, etc.

  return (
    <div>
      <main>{children}</main>
      {showAnalytics && <aside>{analytics}</aside>}
    </div>
  );
}
```

**Note:** This pattern works at any layout level (root or feature-scoped).

## Intercepting Routes

Intercepting Routes allow you to load a route within the current layout while keeping the context of the current page.

### Intercepting Route Conventions

- `(.)` - Match segments on the same level
- `(..)` - Match segments one level above
- `(..)(..)` - Match segments two levels above
- `(...)` - Match segments from the root

### Modal Pattern with Intercepting Routes

```
app/
├── photos/
│   ├── [id]/
│   │   └── page.tsx        # Full photo page
│   └── page.tsx            # Photo gallery
├── @modal/
│   └── (.)photos/
│       └── [id]/
│           └── page.tsx    # Modal photo view
└── layout.tsx
```

### Layout for Modal Pattern

```typescript
// app/layout.tsx
export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
```

### Modal Component

```typescript
// app/@modal/(.)photos/[id]/page.tsx
import Modal from '@/components/Modal';
import PhotoView from '@/components/PhotoView';

export default async function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  const photo = await getPhoto(params.id);

  return (
    <Modal>
      <PhotoView photo={photo} />
    </Modal>
  );
}

// app/@modal/default.tsx
export default function Default() {
  return null;
}
```

### Client-Side Modal Component

```typescript
// components/Modal.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleClose = () => {
    router.back();
  };

  return (
    <dialog ref={dialogRef} onClose={handleClose}>
      <button onClick={handleClose}>Close</button>
      {children}
    </dialog>
  );
}
```

## Error Boundaries

### Basic Error Boundary

```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Nested Error Boundaries

```typescript
// app/dashboard/error.tsx
'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="dashboard-error">
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
```

### Global Error Boundary

```typescript
// app/global-error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Application Error</h2>
        <p>{error.message}</p>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
```

### Not Found Boundary

```typescript
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}

// Trigger programmatically
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return <div>{post.title}</div>;
}
```

## Streaming and Suspense

### Basic Streaming with Suspense

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>

      <Suspense fallback={<RecentActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}

async function Stats() {
  const stats = await fetchStats(); // Slow query
  return <div className="stats">{JSON.stringify(stats)}</div>;
}

async function RecentActivity() {
  const activity = await fetchRecentActivity();
  return (
    <ul>
      {activity.map((item) => (
        <li key={item.id}>{item.description}</li>
      ))}
    </ul>
  );
}
```

### Nested Suspense Boundaries

```typescript
// app/page.tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Header />

      <Suspense fallback={<PageSkeleton />}>
        <MainContent />
      </Suspense>
    </div>
  );
}

async function MainContent() {
  const data = await fetchMainData();

  return (
    <div>
      <h2>{data.title}</h2>

      <Suspense fallback={<CommentsSkeleton />}>
        <Comments postId={data.id} />
      </Suspense>
    </div>
  );
}

async function Comments({ postId }: { postId: string }) {
  const comments = await fetchComments(postId);
  return (
    <ul>
      {comments.map((c) => <li key={c.id}>{c.text}</li>)}
    </ul>
  );
}
```

### Loading States with loading.tsx

```typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-body" />
    </div>
  );
}
```

### Streaming with Loading UI

```typescript
// app/posts/loading.tsx
export default function PostsLoading() {
  return (
    <div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="post-skeleton">
          <div className="skeleton-title" />
          <div className="skeleton-excerpt" />
        </div>
      ))}
    </div>
  );
}
```

## Summary

- **Parallel Routes** - Multiple pages rendered simultaneously using `@folder` syntax
- **Intercepting Routes** - Load routes in context using `(.)` syntax for modals
- **Error Boundaries** - Handle errors with `error.tsx` and `global-error.tsx`
- **Streaming** - Progressive rendering with Suspense boundaries
