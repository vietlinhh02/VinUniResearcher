# Product và research cùng dùng một vòng hội thoại

Mentee trước hết cần chạy được một phiên teach-back đáng tin. Research được
cài vào phiên đó bằng versioning, event log và hai question policy. Team không cần xây
một platform đa lĩnh vực trước khi kiểm tra cơ chế chính.

## Kiến trúc tối thiểu

```text
School lab
  → Lab Completion Adapter
  → Conversation Spec
  → Teaching Session
      → learner turn
      → state update và learner confirmation
      → gap detection
      → question selection
      → apprentice response
  → Independent Transfer
  → Research Export
```

### Lab Completion Adapter

Adapter nhận `lab_id`, `objective_id`, trạng thái hoàn thành và những evidence đã
được allowlist. Nó không mặc định đọc toàn bộ repository, raw log, clipboard hoặc
credential của learner.

### Conversation Spec

Mỗi activity cần một spec ngắn, do course author và domain reviewer duyệt. Spec chứa:

- objective hẹp của phiên;
- teaching map gồm các knowledge component cần thảo luận;
- loại gap có thể phát hiện;
- question strategy được phép dùng;
- giới hạn số câu hỏi và thời gian;
- transfer blueprint và scoring rubric.

Spec không chứa một kịch bản hội thoại cứng. Learner vẫn giải thích bằng lời
của mình.

### Teaching Session

Sau mỗi lượt có nội dung học thuật, state updater trích xuất claim cùng source span.
Learner có thể xác nhận, sửa hoặc xóa claim. Gap detector làm việc trên state đã
xác nhận; question selector không được lén thêm kiến thức chuẩn vào state.

### Independent Transfer

Transfer đo learner, không đo AI. Apprentice, câu hỏi và feedback bị khóa khi learner làm
task mới. Transfer score là learning outcome; các chỉ số trong hội thoại được dùng
để kiểm tra cơ chế và giải thích kết quả.

## Hai lớp đánh giá

Trước user study, team cần một technical evaluation trên transcript được chuyên gia
gán nhãn:

- claim extraction có giữ đúng ý learner không;
- gap detection có tìm đúng target không;
- câu hỏi có grounded, relevant và không leak đáp án không;
- persona có giữ ổn định không.

Sau khi đạt fidelity gate mới chạy pilot với learner. Primary outcome của pilot là
knowledge-building rate. Transfer, mental effort và trải nghiệm là secondary hoặc
exploratory tùy power analysis.

## Lộ trình

### Alpha: một objective, một phiên hoàn chỉnh

Chọn một lab có reviewer và learning objective rõ. Xây state updater, confirmation UI, gap
detector, hai question policy và event log. Chưa cần nhiều domain.

### Technical evaluation

Tạo bộ transcript bao gồm lời dạy đúng, thiếu, mơ hồ, mâu thuẫn và prompt
injection. Hai chuyên gia gán claim, gap và question target. Kết quả này quyết định
model/prompt nào đủ điều kiện vào pilot.

### Usability pilot

Kiểm tra learner có hiểu vai dạy, có sửa được knowledge state và có thấy câu
hỏi quá dày hoặc lặp hay không. Pilot này không dùng để claim learning gain.

### Comparative pilot

So sánh fixed policy với state-aware policy trong cùng question budget. Protocol, model
snapshot, prompt, lesson material, rubric và analysis plan phải freeze trước khi thu dữ
liệu chính.

### Mở rộng

Chỉ thêm lab thứ hai khi activity đầu tiên chạy ổn và question taxonomy không còn
thay đổi liên tục. Learner model xuyên track hoặc enactment là nghiên cứu sau.

## Metrics

Product cần theo dõi completion, thời gian mỗi bước, tỷ lệ learner sửa extracted
claim, latency và chi phí. Research cần thêm agreement với expert annotation,
grounded-question rate, answer leakage, knowledge-building rate và independent transfer.

Satisfaction vẫn đáng đo vì nó ảnh hưởng khả năng sử dụng. Nhưng satisfaction
không thay cho learning outcome.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Thu gọn roadmap | Một objective trước nhiều domain |
| Inflation | Bỏ tham vọng platform sớm | Không claim “engine tổng quát” |
| Grammar | Dùng câu chủ động | “Team cần…” thay cho mô tả bị động dài |
| Rhythm/Style | Giảm danh sách lặp | Giải thích từng lớp đánh giá |
