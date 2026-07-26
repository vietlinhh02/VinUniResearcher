# Mentee

Nghiên cứu và prototype **Learning-by-Teaching (LbT)** bằng tiếng Việt: sinh viên
đóng vai giáo viên, còn AI đóng vai học trò.
Mô hình này khuyến khích giải thích và phát hiện lỗ hổng kiến thức.
Nhờ đó, người học có cơ hội học sâu hơn.

Repository kết hợp ba phần đang được xây dựng song song:

- **Nghiên cứu:** literature review, evidence matrix, protocol và công cụ đo cho pilot.
- **Backend:** Go API với PostgreSQL, migration và các endpoint nền tảng.
- **Frontend:** Next.js 16 cho trải nghiệm web của Mentee.

> Trạng thái: research foundation và technical foundation. Đây chưa phải ứng dụng
> sẵn sàng triển khai production.
> Frontend hiện chưa được nối vào luồng nghiệp vụ.

## Bắt đầu nhanh

### Yêu cầu

- Go tương thích với phiên bản khai báo trong [`go.mod`](go.mod) (hiện là `1.26.5`).
- Docker Engine có Docker Compose.
- [pnpm](https://pnpm.io/) để chạy frontend.

### Chạy backend và PostgreSQL

```bash
make setup
make db-up
make migrate-up
make run
```

Hoặc dùng một lệnh:

```bash
make dev
```

API lắng nghe ở `http://localhost:8080`. Kiểm tra kết nối database:

```bash
curl http://localhost:8080/healthz
```

Kết quả trả về có `status` và trạng thái kết nối `database`.
Các lệnh migration dùng Docker host network.
Vì vậy, quy trình này dành cho môi trường Linux.

### Chạy frontend

```bash
cd frontend
pnpm install --frozen-lockfile
pnpm dev
```

Mở `http://localhost:3000`. Xem thêm hướng dẫn dành cho frontend tại
[`frontend/README.md`](frontend/README.md).

## API hiện có

| Method | Path | Mục đích |
| --- | --- | --- |
| `GET` | `/healthz` | Kiểm tra trạng thái service và PostgreSQL. |
| `POST` | `/api/v1/users` | Tạo người dùng với `email` và `name`. |
| `GET` | `/api/v1/users/{id}` | Lấy người dùng theo ID. |
| `POST` | `/api/v1/auth/register` | Đăng ký với `email`, `name`, `password` (≥ 8 ký tự); set cookie phiên. |
| `POST` | `/api/v1/auth/login` | Đăng nhập với `email`, `password`; set cookie phiên. |
| `POST` | `/api/v1/auth/logout` | Đăng xuất, xóa phiên hiện tại. |
| `GET` | `/api/v1/auth/me` | Lấy người dùng hiện tại từ cookie phiên. |

Phiên đăng nhập dùng cookie `mentee_session` (HttpOnly, SameSite=Lax, hạn 7
ngày); server chỉ lưu SHA-256 hash của token trong bảng `sessions`. Frontend ở
origin khác được phép gọi kèm cookie qua CORS — cấu hình bằng biến `CORS_ORIGIN`
(mặc định `http://localhost:3000`).

Ví dụ đăng ký:

```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"student@example.com","name":"Nguyen Van A","password":"secret123"}'
```

## Cấu trúc repository

```text
cmd/api/        Entry point của Go API
internal/       HTTP server, database platform và các module nghiệp vụ
migrations/     PostgreSQL schema migrations
frontend/       Next.js 16 application
docs/           Nghiên cứu, protocol và tài liệu vận hành
```

## Nghiên cứu

Điểm bắt đầu của corpus nghiên cứu là [`docs/README.md`](docs/README.md). Các tài
liệu chính gồm:

- [`docs/research/literature-review.md`](docs/research/literature-review.md): tổng
  quan tài liệu và phạm vi bằng chứng.
- [`docs/research/evidence-matrix.csv`](docs/research/evidence-matrix.csv): ma trận
  bằng chứng để tiếp tục mở rộng.
- [`docs/research/protocol.md`](docs/research/protocol.md): thiết kế pilot.
- [`docs/research/instruments.md`](docs/research/instruments.md): rubric, câu hỏi
  kiểm tra và biểu mẫu thu thập dữ liệu.
- [`docs/research/prompt-spec.md`](docs/research/prompt-spec.md): điều kiện can
  thiệp active/passive và fidelity test set.

Chỉ thu thập dữ liệu sau khi hoàn tất phê duyệt đạo đức nghiên cứu.
Hoàn tất usability pilot trước khi thu thập dữ liệu.
Các khẳng định từ literature review cần được đối chiếu với paper gốc.

## Lệnh hữu ích

```bash
make help        # Liệt kê lệnh backend, database và migration
make test        # Chạy Go tests
make vet         # Chạy go vet
make db-down     # Dừng PostgreSQL
make db-reset    # Xóa PostgreSQL volume cục bộ
```

`make db-reset` xóa dữ liệu database cục bộ.
Không chạy lệnh này khi cần giữ dữ liệu pilot.

## Quy ước

- Copy [`.env.example`](.env.example) thành `.env` để thay đổi cấu hình cục bộ.
- Không commit `.env`, database volume hoặc binary trong `bin/`.
- Frontend dùng `pnpm`; không tạo lockfile thứ hai.
- Tham khảo [`frontend/DESIGN.md`](frontend/DESIGN.md) trước khi thay đổi UI.

## License

Chưa có license công bố.
Không tái sử dụng mã nguồn hoặc tài liệu ngoài phạm vi được chủ sở hữu
cho phép.
