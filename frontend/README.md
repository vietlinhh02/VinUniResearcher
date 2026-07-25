# Mentee frontend

Web frontend cho Mentee, nền tảng Learning-by-Teaching nơi sinh viên dạy lại kiến
thức cho một AI học trò. Ứng dụng dùng Next.js 16, React 19, TypeScript và Tailwind
CSS 4.

Frontend hiện là technical foundation; trang chủ chưa được kết nối tới API.
Backend Go nằm ở thư mục gốc repository.

## Chạy cục bộ

Từ thư mục này:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Mở `http://localhost:3000`.

## Lệnh

```bash
pnpm dev      # Development server
pnpm lint     # ESLint
pnpm build    # Production build
pnpm start    # Chạy production build
```

## Quy ước phát triển

- Dùng `pnpm` duy nhất; repository đã có `pnpm-lock.yaml`.
- Đọc [`AGENTS.md`](AGENTS.md) trước khi sửa code.
- Tuân thủ token, typography và component trong [`DESIGN.md`](DESIGN.md).
- API và business logic thuộc Go backend ở repository root; không tạo Next.js Route
  Handler hoặc Server Action cho các nhiệm vụ đó.
- Server Components là mặc định. Chỉ dùng `'use client'` ở component thực sự cần
  browser API, event handler hoặc hook.

Các hướng dẫn Next.js chuyên sâu nằm trong [`docs/nextjs`](docs/nextjs).
