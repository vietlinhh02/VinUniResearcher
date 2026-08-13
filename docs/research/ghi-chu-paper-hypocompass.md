# Ghi chú đọc paper HypoCompass

Paper: [How to Teach Programming in the AI Era? Using LLMs as a Teachable Agent for Debugging](https://doi.org/10.1007/978-3-031-64302-6_19)  
Mã trong evidence matrix: E16  
Ngày đối chiếu paper gốc: 25/07/2026

## 1. Thông tin chung

- Tác giả: Qianou Ma, Hua Shen, Kenneth Koedinger và Sherry Tongshuang Wu.
- Xuất bản tại AIED 2024.
- Mục tiêu: cho novice đóng vai teaching assistant để giúp LLM agent debug; trọng tâm là
  hypothesis construction, không phải dạy thuật toán bằng hội thoại tự do.

## 2. Hệ thống và can thiệp

- HypoCompass đưa một chương trình Python lỗi; người học chọn/tạo test case và chọn lời giải
  thích lỗi từ các phương án. Nếu đúng, agent áp dụng local fix; nếu sai, agent nêu discrepancy
  để người học suy nghĩ lại.
- LLM tạo hints, bug, explanation và fix. `gpt-3.5-turbo` được dùng cho hầu hết generation,
  còn GPT-4 tạo bug explanation; output được lọc/kiểm chứng trước khi dùng.
- Do đó intervention gồm role-play teachable agent, deliberate practice, item generation, hints
  và immediate feedback; paper không cô lập thành phần nào.

## 3. Thiết kế user study

- 19 undergraduate/graduate từ bốn trường Mỹ sau screening; 12 nữ, 6 nam, 1 non-binary,
  tuổi trung bình 20.7. Người có kinh nghiệm lập trình quá cao hoặc giải screening quá nhanh
  bị loại.
- Within-person pretest–interaction–posttest, không có nhóm đối chứng. Study khoảng một giờ:
  pre-survey, pre-test tối đa 20 phút, hai bài tương tác (mỗi bài ba buggy programs), post-test
  20 phút và survey.
- Hai test counterbalanced; mỗi test có bảy câu: ba cho completeness của hypothesis và bốn
  cho accuracy. Thời gian hoàn thành là proxy proficiency.

## 4. Kết quả chính

- Điểm pre-to-post tăng `11.7%`, paired t-test `p = .033`; thời gian giảm `13.6%`, `p = .003`.
- Learning objective 1: điểm tăng `6.1%`, thời gian giảm `23.6%`. Objective 2: điểm tăng
  `15.8%`, thời gian giảm `9.0%`.
- Self-rated confidence debugging tăng `15%`, `p = .007`; các rating về engagement và fun là
  `6.0/7`, frustration `2.5/7`.
- Phần generation: một bộ vật liệu được tạo và kiểm tra trong 15 phút, nhanh hơn hai TA người
  khoảng `4.67` lần. Đây là kết quả vận hành tạo vật liệu, không phải learning effect.

## 5. Hạn chế

- Pre/post single group nên practice effect, độ khó test và novelty có thể giải thích một phần
  kết quả; tác giả dự định classroom deployment có controlled comparison.
- Mẫu nhỏ, môi trường lab, hai bài Python và không có follow-up.
- Không được dùng `11.7%` như hiệu ứng nhân quả của teachable agent hay active questioning.

## 6. Liên quan đến nghiên cứu hiện tại

Paper chứng minh tính khả thi của việc dùng LLM học trò để tập trung người học vào debugging
hypothesis. Nó hỗ trợ tách code-completion khỏi skill muốn đo, nhưng không so sánh Fixed với
State-aware và không có bằng chứng tiếng Việt. `Suy luận`: nếu pilot dùng task lập trình, mọi
scaffold ngoài cách chọn question target phải được giữ nguyên.

## 7. Tóm tắt evidence matrix

- Population: 19 sinh viên đại học/sau đại học đã sàng lọc.
- Design: single-group pre/post, không phải controlled efficacy study.
- Outcome: điểm và thời gian debug/hypothesis construction.
- Main evidence: tăng `11.7%` điểm, giảm `13.6%` thời gian.

## 8. Tự kiểm tra

- [x] Phân biệt material-generation efficiency với learning outcome.
- [x] Không biến kết quả pre/post thành kết luận nhân quả.
- [x] Không gọi HypoCompass là comparison Active/Passive.
