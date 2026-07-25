# Kế hoạch chuẩn hóa tên tài liệu

> **For agentic workers:** Thực hiện trực tiếp trong thư mục làm việc hiện tại; không dùng
> subagent, worktree hoặc nhánh riêng.

**Mục tiêu:** Đổi tên các tài liệu chưa đúng quy ước, cập nhật liên kết và thêm mẫu ghi chú AlgoBo.

**Cách làm:** Đổi tên đúng ba file Markdown đang dùng chữ hoa và dấu gạch dưới. Sau đó cập nhật
mọi tham chiếu nội bộ và tạo một mẫu ghi chú riêng trong `docs/research/`.

**Công nghệ:** Markdown và công cụ kiểm tra liên kết nội bộ bằng shell.

## Ràng buộc chung

- Tên file dùng chữ thường và dấu gạch nối.
- Giữ nguyên `README.md`.
- Tiêu đề trong mẫu ghi chú dùng kiểu câu và có số thứ tự.
- Không điền sẵn câu trả lời thay người đọc.

---

### Task 1: đổi tên tài liệu

**Files:**

- Rename: `docs/HUONG_DAN_BAT_DAU_RESEARCH.md`
- Rename: `docs/BUOC_1_RESEARCH_FOUNDATION_TEAM_3_NGUOI.md`
- Rename: `docs/TongQuan_AI_Tutor_ToanDien.md`

- [ ] Đổi ba tên file theo bảng ánh xạ trong thiết kế.
- [ ] Xác nhận ba file mới tồn tại và ba tên cũ không còn.

### Task 2: cập nhật tham chiếu

**Files:**

- Modify: `docs/README.md`
- Modify: `docs/buoc-1-research-foundation-team-3-nguoi.md`
- Modify: `docs/huong-dan-bat-dau-research.md`
- Modify: `docs/research/literature-review.md`
- Modify: `docs/research/search-log.md`

- [ ] Thay mọi tên cũ bằng tên mới.
- [ ] Tìm lại toàn repo và xác nhận không còn tên cũ.

### Task 3: tạo mẫu ghi chú AlgoBo

**Files:**

- Create: `docs/research/ghi-chu-paper-algobo.md`

- [ ] Tạo mẫu gồm các mục được đánh số và chỗ trống để tự điền.
- [ ] Thêm liên kết từ hướng dẫn bắt đầu research đến mẫu ghi chú.

### Task 4: xác minh

- [ ] Kiểm tra mọi liên kết Markdown nội bộ đều trỏ đến file tồn tại.
- [ ] Kiểm tra tên file trong `docs/` tuân thủ quy ước, ngoại trừ `README.md`.
