# Tailwind CSS v4 — luật dùng trong Mentee

Đọc file này trước khi viết bất kỳ styling nào. Project dùng **Tailwind v4**
(`tailwindcss@^4` + `@tailwindcss/postcss`) — cú pháp khác v3 ở nhiều điểm hay
gây lỗi. Giá trị thiết kế (màu, font, spacing...) lấy từ
[`../DESIGN.md`](../DESIGN.md) — đó là source of truth, file này chỉ dạy cách
map sang code.

## 1. v4 khác v3 — những điểm hay viết sai

| ❌ Kiểu v3 (sai ở project này) | ✅ Kiểu v4 (đúng) |
|---|---|
| `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss";` (một dòng duy nhất) |
| Config trong `tailwind.config.ts` | Config trong CSS bằng `@theme { ... }` |
| Khai báo `content: ['./app/**/*...']` | Không cần — v4 tự detect file |
| `shadow-sm`, `rounded-sm`, `blur-sm` | `shadow-xs`, `rounded-xs`, `blur-xs` (đổi tên scale) |
| `bg-black/50` kiểu `bg-opacity-50` | Chỉ dùng slash: `bg-black/50` (utility `bg-opacity-*` đã bỏ) |
| `outline-none` | `outline-hidden` |
| `ring` (mặc định 3px) | `ring` = 1px; muốn 3px dùng `ring-3` |
| `flex-shrink-0`, `flex-grow` | `shrink-0`, `grow` |
| `bg-[var(--color-x)]` | `bg-(--color-x)` (cú pháp biến CSS mới) |
| Plugin `@tailwindcss/container-queries` | Container queries built-in: `@container`, `@md:...` |

PostCSS config đã có sẵn (`postcss.config.mjs` với `@tailwindcss/postcss`) —
không động vào.

## 2. Map DESIGN.md → `@theme` (bắt buộc theo mẫu này)

Mọi token trong DESIGN.md được khai báo **một lần** trong
`app/globals.css` bên trong `@theme`, rồi dùng qua utility class. Ví dụ khung
đúng cho project (thay thế nội dung mặc định của create-next-app):

```css
@import "tailwindcss";

@theme {
  /* Màu — mirror từ DESIGN.md colors: */
  --color-primary: #3e5c76;
  --color-primary-hover: #547da0;
  --color-primary-pressed: #31495e;
  --color-on-primary: #f0ebd8;
  --color-ink: #0d1321;
  --color-ink-muted: #3e5c76;
  --color-ink-subtle: #748cab;
  --color-canvas: #f0ebd8;
  --color-surface-1: #f2eedf;
  --color-surface-2: #f6f2e7;
  --color-inverse-canvas: #0d1321;
  --color-inverse-surface-1: #1d2d44;
  --color-inverse-ink: #f0ebd8;
  --color-inverse-ink-muted: #8fa2bc;
  --color-hairline: #c7d1dd;
  /* Full scales khi cần: --color-blue-slate-500, --color-eggshell-500, ... */

  /* Font — nạp qua next/font rồi trỏ biến vào đây */
  --font-sans: var(--font-plex-sans), "Helvetica Neue", Arial, sans-serif;

  /* Radius — DESIGN.md mặc định 0px (flat-square) */
  --radius-none: 0px;
}

body {
  background: var(--color-canvas);
  color: var(--color-ink);
  letter-spacing: 0.16px; /* Carbon precision detail — DESIGN.md, không bỏ */
}
```

Sau khi khai báo, dùng class sinh ra từ token: `bg-canvas`, `text-ink`,
`bg-primary`, `text-on-primary`, `border-hairline`, `bg-inverse-canvas`...

## 3. Luật styling của project

- **KHÔNG hardcode màu/spacing trong className** (`bg-[#3e5c76]`, `text-[13px]`
  khi đã có token). Thiếu token → thêm vào `@theme` trong `globals.css`, không
  vá tại chỗ.
- **DESIGN.md là source of truth**: đổi giá trị thiết kế → sửa DESIGN.md trước,
  rồi sync `@theme` theo. Không sửa màu trực tiếp trong CSS mà bỏ DESIGN.md.
- **Góc vuông là mặc định** (`rounded-none`) — không bo góc button/card/input
  trừ khi DESIGN.md cho phép (xs 2px, sm 4px cho badge/dropdown).
- **Typography**: IBM Plex Sans nạp bằng `next/font/google` trong root layout,
  gán biến `--font-plex-sans`; display headings dùng `font-light` (weight 300 —
  chữ ký thương hiệu, không bold); body giữ `letter-spacing: 0.16px`.
- Component chuẩn (button, card, input, nav...) implement theo mục
  `components:` trong DESIGN.md — tra token ở đó trước khi tự nghĩ style.
- Lint design: `npx @google/design.md lint DESIGN.md` sau khi sửa DESIGN.md.

## 4. Tham chiếu thêm

- Docs chính thức v4: https://tailwindcss.com/docs (agent có thể WebFetch khi
  cần chi tiết utility cụ thể).
- Upgrade guide v3→v4: https://tailwindcss.com/docs/upgrade-guide
