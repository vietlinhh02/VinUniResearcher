# Ghi chú đọc paper Beyond Prior Knowledge

Paper: [Beyond Prior Knowledge: The Predictive Role of Knowledge-Building in Tutor Learning](https://doi.org/10.1007/s41237-026-00294-9)  
Mã trong evidence matrix: E19  
Ngày đối chiếu paper gốc: 25/07/2026

## 1. Thông tin chung

- Tác giả: Tasmia Shahriar, Mia Ameen, Aditi Mallavarapu, Shiyan Jiang và Noboru Matsuda.
- *Behaviormetrika* (2026). Bản xuất bản được đối chiếu; arXiv precursor là `2508.18545`.
- Paper kiểm tra quan hệ giữa tỷ lệ knowledge-building responses (%KBR), prior knowledge và
  điểm post-test conceptual/procedural trong learning-by-teaching.

## 2. Người tham gia và intervention

- 23 học sinh middle school (lớp 6–8) ở Mỹ; tham gia tự nguyện, có parental consent.
- Pretest–intervention–posttest: tối đa một giờ/ngày trong năm ngày. Ngày 1 pretest 30 phút;
  ngày 2–4 dạy SimStudent; ngày 5 post-test isomorphic 30 phút hoặc dừng sớm khi agent qua
  bốn quiz levels.
- APLUS dùng SimStudent để giải linear equations. Sau câu hỏi focal tĩnh, ExpectAdapt có ba LLM
  GPT-3.5-turbo: Expected Response Generator, Alignment Detector và Follow-up Generator.
  Follow-up chỉ được tạo cho response aligned, tối đa ba câu mỗi focal question.

## 3. Outcome và phân tích

- Pre/post đo Procedural Skill Test (PST) và Conceptual Knowledge Test (CKT); procedural
  flexibility có quá ít item để đứng riêng nên được gộp vào PST ở bản xuất bản.
- %KBR = số tutor responses được classifier gắn KBR / toàn bộ responses đối với adaptive follow-up.
  Classifier few-shot GPT-3.5 đạt accuracy `73%` trên gold standard; human-coder kappa `0.82`.
- Paper dùng path analysis và median-split exploratory analyses. Đây là association trong một
  intervention chung, không phải causal estimate của adaptive question.

## 4. Kết quả chính

- CKT pre -> post: `beta = .301`, `p = .001`; %KBR -> CKT post: `beta = .138`, `p < .05`.
- CKT pre -> %KBR (`beta = .440`, `p = .10`) và PST pre -> %KBR (`beta = .206`, `p = .16`)
  không có ý nghĩa trong path model.
- Trong low-prior group, high-%KBR có post-test cao hơn low-%KBR (`t(8) = 4.4`, `p < .01`),
  nhưng đây là phân tích median split exploratory.
- Paper báo điểm post-test conceptual/procedural cao hơn sau intervention, nhưng không có
  comparator để quy kết change cho ExpectAdapt.

## 5. Hạn chế

- Mẫu 23, một domain algebra, một condition và không randomized control. Path analysis không
  chứng minh nhân quả; tác giả cũng nêu cần randomized controlled trial.
- KBR được classifier tự động gắn, accuracy chỉ `73%`; classifier là measurement boundary,
  không phải ground truth.
- Người học là middle school Mỹ; không trực tiếp suy ra cho sinh viên Việt Nam dạy thuật toán.

## 6. Liên quan đến nghiên cứu hiện tại

E19 là bằng chứng mạnh cho việc dùng knowledge-building như **process outcome** và vẫn đo
pre/post tách riêng. Nó không chứng minh follow-up questions gây learning gain. `Suy luận`:
pilot hiện tại có thể dùng %KBR/knowledge-building rate cùng uptake rate và closed-loop rate để
kiểm tra tính khả thi. Vì chưa có comparator, kết quả không được diễn giải như một causal test.
Nếu nghiên cứu sau này so sánh hai policy, transcript cần được chấm mù condition.

## 7. Tóm tắt evidence matrix

- Population: 23 middle-school students; algebraic equation solving.
- Design: one-condition pretest–intervention–posttest + observational path analysis.
- Main evidence: %KBR liên hệ dương với conceptual/procedural post-test khi đưa prior test vào model.
- Limitation: không có controlled comparator; relationship correlational.

## 8. Tự kiểm tra

- [x] Phân biệt KBR process measure với learning outcome.
- [x] Không trình bày path coefficient là causal effect của follow-up question.
- [x] Ghi rõ classifier accuracy và cỡ mẫu.
