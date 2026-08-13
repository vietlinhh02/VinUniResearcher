# Product và research cùng dùng một reciprocal loop

Mentee trước hết cần chạy được một phiên teach-back hai chiều đáng tin. Research
được cài vào phiên đó bằng versioning, event log và target transitions. Team chưa
cần xây platform đa lĩnh vực hoặc comparative experiment trước khi loop cơ bản có
fidelity.

## Kiến trúc tối thiểu

```text
School lab
  → Lab Completion Adapter
  → Conversation Spec
  → Teaching Session
      → learner teaching turn
      → state update và learner confirmation
      → issue detection
      → reciprocal response
      → learner uptake
      → state revision và target transition
  → Independent Transfer
  → Research Export
```

### Lab Completion Adapter

Adapter nhận `lab_id`, `objective_id`, trạng thái hoàn thành và evidence đã được
allowlist. Nó không mặc định đọc toàn bộ repository, raw log, clipboard hoặc
credential của learner.

### Conversation Spec

Mỗi activity cần một spec ngắn, do course author và domain reviewer duyệt:

- objective hẹp của phiên;
- teaching map gồm các knowledge component;
- loại issue có thể phát hiện;
- reciprocal action được phép dùng;
- interaction budget và stop rule;
- transfer blueprint và scoring rubric.

Spec không chứa kịch bản hội thoại cứng. Learner vẫn giải thích bằng lời của
mình.

### Teaching Session

Sau mỗi learner turn có nội dung học thuật, state updater trích xuất claim cùng
source span. Learner xác nhận, sửa hoặc xóa claim. Issue detector làm việc trên
state đã xác nhận. AI response phải trỏ về target trong state và để learner tiếp
tục giải thích.

Câu trả lời mới của learner được gọi là `uptake turn`. Nếu hệ thống không cập
nhật state từ uptake turn, loop vẫn chưa hoàn tất.

### Independent Transfer

Transfer đo learner, không đo AI. Apprentice và feedback bị khóa khi learner làm
task mới. Transfer score là learning outcome; dữ liệu trong hội thoại dùng để kiểm
tra cơ chế và giải thích kết quả.

## Ba lớp đánh giá

Technical evaluation kiểm tra extraction, issue detection và response fidelity
trên transcript được chuyên gia gán nhãn.

Feasibility pilot kiểm tra vòng `response → uptake → state revision → target
transition` có thực sự xảy ra với learner hay không. Đây là ưu tiên hiện tại.

Comparative study chỉ được thiết kế sau khi loop ổn định. Khi đó team chọn một
câu hỏi: tác dụng của reciprocal loop, hoặc tác dụng của adaptive response
policy.

## Lộ trình

### Alpha: một objective, một loop hoàn chỉnh

Chọn một lab có reviewer và learning objective rõ. Xây state updater, confirmation
UI, issue detector, response policy, uptake tracking và event log. Chưa cần nhiều
domain.

### Technical evaluation

Tạo transcript gồm lời dạy đúng, thiếu, mơ hồ, mâu thuẫn và prompt injection. Hai
chuyên gia gán claim, issue, response target và action. Kết quả quyết định
model/prompt nào đủ điều kiện vào pilot.

### Usability và feasibility pilot

Kiểm tra learner có hiểu vai dạy, sửa được state, phản hồi AI và hoàn thành loop
hay không. Pilot này không dùng để claim learning gain.

### Comparative study

Chỉ freeze sau feasibility pilot. `One-way vs Reciprocal` và `Fixed vs State-aware`
là hai lựa chọn nghiên cứu khác nhau, không phải hai milestone bắt buộc.

### Mở rộng

Chỉ thêm lab thứ hai khi activity đầu tiên chạy ổn và response taxonomy không còn
thay đổi liên tục. Learner model xuyên track hoặc enactment là nghiên cứu sau.

## Metrics

Product theo dõi completion, thời gian mỗi bước, tỷ lệ learner sửa claim, latency
và cost. Research cần thêm agreement với experts, grounded-response rate,
answer leakage, uptake rate, closed-loop rate, target transitions và independent
transfer.

Satisfaction vẫn đáng đo vì nó ảnh hưởng khả năng sử dụng. Nhưng satisfaction
không thay learning outcome.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Thêm uptake vào kiến trúc | AI response → learner uptake |
| Inflation | Hoãn comparative study | Feasibility trước efficacy |
| Vocabulary | Đo target transition | Resolved, unchanged, reframed |
| Rhythm/Style | Cắt roadmap thừa | Một objective trước nhiều domain |
