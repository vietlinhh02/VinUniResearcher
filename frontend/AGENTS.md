# AGENTS.md — Mentee Frontend

File này dành cho mọi coding agent (Codex, OpenCode, Claude Code, Cursor...).
Đọc kỹ phần **Quy tắc bắt buộc** trước khi viết code; tra phần **Guides chi tiết**
khi chạm vào chủ đề tương ứng.

## Bối cảnh project

- **Mentee**: nền tảng Learning-by-Teaching — sinh viên dạy lại kiến thức cho một
  AI "học trò" (khóa AI thực chiến AI20K, VinUni).
- Stack: Next.js **16** (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 ·
  ESLint 9.
- **Package manager: pnpm** (repo có `pnpm-lock.yaml` — chỉ dùng pnpm).
- Commands: `pnpm dev` (dev server) · `pnpm build` · `pnpm lint` · `pnpm start`.
- Backend: Go API ở root repo (`github.com/vinuni/mentee`), chạy ở `:8080`,
  endpoint dạng `/api/v1/...`.
- Design tokens (màu, typography, spacing, components): **bắt buộc** theo
  [`DESIGN.md`](./DESIGN.md). Primary = Blue Slate `#3e5c76`, canvas = Eggshell
  `#f0ebd8`, ink = Ink Black `#0d1321`.

## Quy tắc bắt buộc

### TypeScript & tooling

- **TUYỆT ĐỐI không dùng `any`** — build sẽ fail (`no-explicit-any`). Dùng đúng
  type: `React.FormEvent<HTMLFormElement>`, `React.ChangeEvent<HTMLInputElement>`,
  page props `{ params }` / `{ searchParams }`.
- **Package manager**: kiểm tra lockfile trước khi cài gì
  (`pnpm-lock.yaml` → pnpm, `package-lock.json` → npm, `yarn.lock` → yarn).
  Không bao giờ chạy sai PM (tạo lockfile thứ hai là vỡ build).

### Server Components là mặc định

- Mọi component trong App Router là **Server Component mặc định** — không cần
  directive. Chỉ thêm `'use client'` khi thật sự cần hook, event handler, hoặc
  browser API.
- Server Components: fetch data, đọc cookie/header, giữ secrets. Client
  Components: tương tác ngưới dùng.
- `params` và `searchParams` trong Next 15+ là **Promise** — phải `await`:
  `const { id } = await params;`

### Data fetching & mutations

- **Next.js KHÔNG làm backend.** Mọi API / business logic / AI nằm ở Go backend
  (`:8080`, `/api/v1/...`). Không tạo Route Handlers (`route.ts`), không Server
  Actions, không gọi AI provider từ Next.js.
- **Không fetch data trong `useEffect`.** Fetch trong Server Component (async
  component) gọi thẳng Go API; mutation (form, submit) gọi Go API từ client
  component.
- Cookie/session do Go backend set qua header `Set-Cookie`; Server Component đọc
  cookie bằng `cookies()` từ `next/headers` khi cần forward kèm request.

### Routing & navigation

- Folder structure = route structure. Dynamic segment = folder có ngoặc vuông:
  `app/[id]/page.tsx`. Không bracket = static route.
- **Đừng over-nest route**: mặc định `app/[id]/page.tsx`; chỉ nest
  (`app/products/[id]`) khi URL structure được yêu cầu rõ.
- Server Component: điều hướng bằng `<Link>` và `redirect()` — **không** dùng
  `useRouter` (đó là API client).
- `useSearchParams` bắt buộc **cả hai**: `'use client'` **và** bọc trong
  `<Suspense>` boundary — đây là yêu cầu của Next.js, không phải tùy chọn.

### File conventions trong `app/`

- `layout.tsx` (shared UI, giữ state), `page.tsx` (route public), `loading.tsx`,
  `error.tsx`, `not-found.tsx`, `template.tsx`.
- Chỉ `page.tsx` tạo public route; file khác colocate tự do (components, utils,
  tests đều không routable). Không dùng `route.ts` — API đã có Go backend lo.

### Styling (Tailwind v4 + DESIGN.md)

- Mọi giá trị thiết kế lấy từ `DESIGN.md` → khai báo token trong `@theme` ở
  `app/globals.css`, rồi dùng qua utility class (`bg-primary`, `text-ink`...).
  **Không hardcode hex/spacing trong className.**
- Tailwind **v4**: một dòng `@import "tailwindcss"`, config bằng `@theme` trong
  CSS — không `tailwind.config.ts`, không `@tailwind` directives.
- Góc vuông (`rounded-none`) là mặc định; IBM Plex Sans qua `next/font`;
  display headings `font-light` (300); body giữ `letter-spacing: 0.16px`.

### Anti-patterns cần tránh

- `useEffect` + `useState` cho việc suy ra được lúc render (browser detection,
  derived state) — tính trực tiếp trong render.
- Thêm `'use client'` ở component cha chỉ để dùng Link/fetch — giữ server,
  đẩy `'use client'` xuống leaf component.
- UI bắt buộc phải nằm ở component mà caller thật sự render — helper phải được
  compose vào entry point, không để logic ở file mồ côi.

## Guides chi tiết (trong `docs/`)

Đọc file tương ứng **trước khi** implement chủ đề đó (các file `nextjs-*` nằm
trong `docs/nextjs/`):

| File | Đọc khi... |
|---|---|
| `tailwind-v4.md` | Styling: cú pháp Tailwind v4, map DESIGN.md → `@theme` |
| `nextjs-app-router-fundamentals.md` | Tạo layout/route/metadata, migrate Pages Router |
| `nextjs-server-client-components.md` | Phân tách server/client, cookies/headers, searchParams |
| `nextjs-anti-patterns.md` | Review code, tối ưu performance, thấy useEffect lạm dụng |
| `nextjs-advanced-routing.md` | Parallel/intercepting routes, error boundaries, streaming |
| `nextjs-dynamic-routes-params.md` | Route động `[id]`/`[slug]`, catch-all, `generateStaticParams` |
| `nextjs-pathname-id-fetch.md` | Trang chi tiết fetch data theo id/slug từ URL |
| `nextjs-server-navigation.md` | Link/redirect trong Server Component |
| `nextjs-use-search-params-suspense.md` | Đọc query params phía client (search, filter, pagination) |

Nguồn guides: `wsimmonds/claude-nextjs-skills` (MIT — xem
`docs/nextjs/LICENSE-claude-nextjs-skills`).
