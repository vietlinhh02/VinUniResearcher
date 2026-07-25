# Ghi chú đọc paper Engagement Patterns

Paper: [Engagement Patterns of Middle School Students with AI Teachable Agents in Mathematics Learning](https://doi.org/10.1038/s41598-025-24841-8)  
Mã trong evidence matrix: E18  
Ngày đối chiếu paper gốc: 25/07/2026

## 1. Thông tin chung

- Tác giả: Zifeng Liu, Wanli Xing, Bach Ngo, Xinyue Jiao, Shangkun Jiang và Chenglu Li.
- *Scientific Reports* 15, 40971 (2025).
- Câu hỏi: học sinh dùng AI teachable agent trong toán thể hiện interaction mode và engagement
  (behavioral, emotional, cognitive) thế nào, đặc biệt với nhóm có điểm sau thấp hơn trước.

## 2. Bối cảnh, dữ liệu và thiết kế

- Math Nation cho học sinh chọn bài toán (ba mức khó, chín theme) và dạy virtual peer qua text.
  Agent có thể hỏi follow-up; giao diện có điểm/ranking và peer personalities.
- Pre/post là cùng một bài trắc nghiệm toán 15 câu theo Florida B.E.S.T. Nhóm Improved có
  `post - pre > 0`, nhóm Declined có `post - pre < 0`.
- Phân tích 1,397 sessions từ 206 học sinh Declined và 1,332 sessions từ 327 học sinh Improved.
  Đây là so sánh retrospective theo outcome, không phải allocation điều kiện.

## 3. Measures

- Student utterances được mã theo ICAP: passive, active, constructive, interactive; đồng thời mã
  emotion và ba mức cognitive engagement (CK: knowledge/content, CC: competency, CA: application).
- Hai coder làm calibration; sau đối chiếu, Cohen's kappa đạt `0.84` (interaction mode), `0.90`
  (emotion), `0.81` (cognitive engagement). Các session còn lại được chia để mã.
- Behavioral measures gồm số session, session length, completion rate và proactive interactions.

## 4. Kết quả chính

- Declined group: passive là mode phổ biến nhất (`36.0%`; chat off-task `5.5%`); Improved group:
  constructive là mode phổ biến nhất (`62.78%`).
- Completion rate: Declined `0.35`, Improved `0.58`. Declined có nhiều session dài hơn nhưng
  không đạt kết quả tốt hơn; điều này bác bỏ việc dùng số lượt/số từ như proxy learning.
- Ở Declined group, high behavioral-engagement cluster có performance thấp hơn (`t = 6.23`,
  `p = .01`); emotion pattern cũng khác (`F = 3.76`, `p = .03`). Cognitive pattern không có
  khác biệt performance có ý nghĩa.
- Cả hai nhóm ít CC/CA; paper không tìm association có ý nghĩa giữa behavioral/emotional cluster
  và gain trong Improved group.

## 5. Hạn chế

- Nhóm được tạo sau khi nhìn pre/post change, nên không cho phép kết luận passive interaction
  gây giảm điểm hay constructive interaction gây tăng điểm.
- Tương tác ngắn hạn; state nội tại không được đo trực tiếp; classroom, peer và teacher factors
  không được kiểm soát. Data gốc không public vì privacy.
- Bối cảnh middle-school mathematics, khác sinh viên Việt Nam học thuật toán.

## 6. Liên quan đến nghiên cứu hiện tại

Paper hỗ trợ hai quyết định: mã chất lượng interaction thay vì đếm chat, và đo engagement chỉ là
secondary/descriptive. Nó không hỗ trợ claim causal cho active question policy. `Suy luận`: rubric
pilot nên báo off-task và completion/fidelity riêng, không gộp chúng thành learning gain.

## 7. Tóm tắt evidence matrix

- Population: 533 middle-school students, 2,729 dialogue sessions trong hai nhóm outcome.
- Design: mixed-method log analysis theo pre/post outcome group.
- Main evidence: Improved group constructive `62.78%`; Declined group passive `36.0%`.
- Limitation: observational and post-hoc grouping.

