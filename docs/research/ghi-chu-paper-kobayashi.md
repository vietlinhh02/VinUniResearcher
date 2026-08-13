# Ghi chú đọc paper Kobayashi

Paper: [Learning by Preparing-to-Teach and Teaching: A Meta-Analysis](https://doi.org/10.1111/jpr.12221)  
Mã trong evidence matrix: E03  
Ngày đối chiếu paper gốc: 25/07/2026

## 1. Thông tin chung

- Tác giả: Keiichi Kobayashi.
- *Japanese Psychological Research*, 61, 192–203 (2019); first published 2018.
- Mục tiêu: tổng hợp hiệu quả của preparing-to-teach và teaching sau khi chuẩn bị,
  so với chỉ học mà không có teaching expectancy, trên domain knowledge.

## 2. Corpus và cách phân tích

- 28 studies đạt tiêu chí; 24 dùng người từ 18 tuổi trở lên, bốn dùng học sinh tiểu học/trung học.
- Preparing-to-teach vs control: 28 group comparisons, 1,283 người hoàn thành test.
  Teaching-with-preparing vs control: 16 comparisons, 751 người.
- Meta-analysis dùng random-effects; effect size là Hedges' `g`, weighted theo sample size.
  Multiple outcomes cùng study được average trước khi tổng hợp.
- Heterogeneity dùng `Q` và `I²`; moderator dùng between-group `Q_B`; robustness dùng
  fail-safe N. Vì đây là meta-analysis về LbT nói chung, không có LLM hoặc AI tutee.

## 3. Contrast chính xác

- **Preparing-to-teach:** học với kỳ vọng sau đó sẽ dạy, nhưng outcome được đo trước khi dạy,
  so với học không có teaching expectancy.
- **Teaching with preparing-to-teach:** chuẩn bị rồi thực sự dạy, so với học không có teaching
  expectancy.
- Hai `g` tổng hợp không phải một contrast trực tiếp giữa preparing-only và preparing-plus-teaching;
  không được lấy `0.56 - 0.35` làm effect của riêng teaching.

## 4. Kết quả chính

- Preparing-to-teach: `g = 0.35`, 95% CI `[0.27, 0.44]`, `Q = 112.31`, `p < .001`, `I² = 76%`.
- Teaching with preparing-to-teach: `g = 0.56`, 95% CI `[0.52, 0.61]`, `Q = 206.35`,
  `p < .001`, `I² = 93%`.
- Cả hai contrast có lợi cho deep và surface learning, và xuất hiện cả ở delayed test.
- Interactivity là moderator: preparing với interactive teaching expectancy `g = 0.50`
  (95% CI `[0.36, 0.64]`) cao hơn non-interactive `g = 0.27` (`[0.17, 0.37]`).
  Với teaching sau chuẩn bị, interactive `g = 0.84` (`[0.75, 0.93]`) cao hơn non-interactive.

## 5. Diễn giải và giới hạn

- Heterogeneity cao; hiệu quả không đồng nhất giữa population, implementation và outcome.
- Đây là bằng chứng hiệu quả của hoạt động chuẩn bị/dạy tổng thể, không cô lập việc hỏi đáp,
  persona, feedback hay một design AI cụ thể.
- Không có bối cảnh tiếng Việt, algorithm teaching, LLM hay state-aware questioning.

## 6. Liên quan đến nghiên cứu hiện tại

Paper hỗ trợ việc yêu cầu participant **thực sự dạy** thay vì chỉ đọc và chuẩn bị. Kết quả
moderator hỗ trợ giữ AI ở vai đối thoại có thể tương tác. Nó không đủ để kết luận state-aware
questioning làm tăng learning gain. `Suy luận`: H1 nên giữ knowledge-building là process outcome;
learning gain vẫn là secondary/exploratory outcome đo riêng.

## 7. Tóm tắt evidence matrix

- Population: 28 studies, phần lớn adult; không phải một sample đơn lẻ.
- Design: random-effects meta-analysis.
- Main evidence: `g = 0.35` cho preparing; `g = 0.56` cho preparing plus teaching.
- Limitation: heterogeneity lớn và không đặc thù LLM/AI.

## 8. Tự kiểm tra

- [x] Gán đúng mỗi effect size cho contrast của nó.
- [x] Không coi hai effect size là contrast trực tiếp.
- [x] Không dùng E03 làm evidence trực tiếp cho active questioning hoặc tiếng Việt.
