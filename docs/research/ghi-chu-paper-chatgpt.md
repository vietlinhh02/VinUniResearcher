# Ghi chú đọc paper ChatGPT teachable agent

Paper: [Learning by Teaching with ChatGPT: The Effect of Teachable ChatGPT Agent on Programming Education](https://doi.org/10.1111/bjet.70001)  
Mã trong evidence matrix: E06  
Ngày đối chiếu paper gốc: 25/07/2026

Các số liệu dưới đây được đối chiếu từ bản tác giả trên arXiv và metadata của
bản xuất bản trên *British Journal of Educational Technology*. Nhận định áp dụng
vào đề tài hiện tại được gắn `suy luận`.

## 1. Thông tin chung

- Tác giả: Angxuan Chen, Yuang Wei, Huixiao Le và Yan Zhang.
- Bản xuất bản: *British Journal of Educational Technology*, 2026, 57(1), 163–184.
- Mục tiêu: kiểm tra liệu dạy một ChatGPT được prompt làm học trò có ảnh hưởng đến
  kiến thức, kỹ năng lập trình và self-regulated learning (SRL) trong bài toán Eight Queens.

## 2. Người tham gia, nội dung và procedure

- Có 41 sinh viên đại học từ hai trường, 18–27 tuổi, tự báo có nền tảng C++:
  experimental group (EG) `n = 20`, control group (CG) `n = 21`.
- Mọi người làm pre-test kiến thức và SRL, xem ba video trong 30 phút về backtracking
  và Eight Queens, sau đó có tối đa một giờ cho nhiệm vụ code, rồi làm post-test.
- EG dạy GPT-4 bằng ngôn ngữ tự nhiên để tạo code qua online judge. CG dùng cùng video
  nhưng tự viết code trong local editor. Paper chỉ ghi "assigned" vào nhóm, không xác nhận
  cách randomization.

## 3. Intervention và comparator

- ChatGPT được prompt làm người học đang seek help, theo năm giai đoạn help-seeking của Gall.
  Tác giả dùng GPT-4 và không bổ sung cơ chế kiểm soát hallucination.
- Vì code do ChatGPT sinh phải vượt online judge thì mới hoàn tất, intervention là tổ hợp
  Learning by Teaching, đối thoại tự nhiên và hỗ trợ sinh code; không phải thao tác tách riêng
  active questioning.
- Comparator là học video rồi tự code, không phải passive AI tutee.

## 4. Outcome và cách đo

- Knowledge: 15 câu trắc nghiệm về backtracking/Eight Queens.
- Programming: pseudocode chấm mù theo clearness, correctness và readability (mỗi chiều 0–5);
  hai người chấm, tương quan Spearman lần lượt `0.833`, `0.935`, `0.911`.
- SRL: 20 item Likert 5 mức, rút gọn từ MSLQ (test anxiety, self-efficacy, cognitive strategies).
- Post-test được phân tích ANCOVA với pre-test làm covariate.

## 5. Kết quả chính

- Knowledge adjusted mean: EG `11.86`, CG `10.53`; `F = 35.54`, `p < .05`,
  `eta² = .74`.
- EG cao hơn ở code clearness (`F = 7.39`, `p < .01`, `eta² = .37`) và readability
  (`F = 4.32`, `p < .01`, `eta² = .26`), nhưng correctness không khác biệt có ý nghĩa
  (`F = 2.98`, `p > .05`, `eta² = .19`).
- EG cao hơn ở self-efficacy (`F = 37.26`, `p < .001`, `eta² = .75`) và cognitive
  strategies (`F = 18.97`, `p < .001`, `eta² = .61`); test anxiety không khác biệt.

## 6. Hạn chế và diễn giải đúng

- Cỡ mẫu nhỏ, một bài toán và một phiên online; không có follow-up dài hạn.
- Không có evidence để quy kết kết quả cho riêng câu hỏi của AI, vì condition thay đổi cả việc
  dạy ChatGPT, hội thoại và việc ChatGPT hỗ trợ tạo code.
- Khả năng ChatGPT sinh code đúng có thể làm giảm cơ hội luyện debug; điều này phù hợp với
  việc correctness không khác biệt đáng kể.
- Không có dữ liệu về tiếng Việt, thuật toán Binary Search, hay comparison Active/Passive.

## 7. Liên quan đến nghiên cứu hiện tại

Paper hỗ trợ đo learning outcome tách khỏi chất lượng lời giải thích và code correctness.
`Suy luận`: pilot hiện tại nên giữ code generation, interface và feedback cố định giữa hai
condition để không lặp lại confound của nghiên cứu này. Paper không đủ để dự đoán hiệu ứng
của active questioning.

## 8. Tóm tắt evidence matrix

- Population: 41 sinh viên đại học có nền tảng C++.
- Design: between-group pretest–posttest; randomization `chưa xác minh`.
- Main evidence: knowledge, clearness và readability cao hơn; correctness không khác biệt.
- Limitation: intervention đa thành phần, mẫu nhỏ, một task.

## 9. Tự kiểm tra

- [x] Không diễn giải khác biệt clearness/readability thành code correctness.
- [x] Không gọi đây là thử nghiệm Active/Passive AI tutee.
- [x] Không gán tác động nhân quả riêng cho question policy.

