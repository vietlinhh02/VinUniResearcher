# Protocol draft: feasibility của reciprocal interaction loop

Phiên bản: 0.3
Trạng thái: design draft, chưa preregister

Protocol này đánh giá một loop hai chiều trong phiên post-lab teach-back. Nó chưa
so sánh Fixed với State-aware và chưa phải efficacy study.

## Mục tiêu

Study kiểm tra liệu Mentee có thực hiện được một vòng tương tác có thể quan
sát:

```text
learner teaching turn
→ knowledge-state update
→ AI reciprocal response
→ learner uptake
→ knowledge-state revision
```

Feasibility không có nghĩa hệ thống đã cải thiện learning outcome. Nó chỉ xác
nhận loop chạy được, giữ đúng vai và tạo dữ liệu đủ sạch cho nghiên cứu tiếp
theo.

## Research questions

- RQ1: State updater phản ánh lời learner chính xác đến đâu so với expert annotation?
- RQ2: Issue detector và response policy chọn target/action phù hợp đến đâu?
- RQ3: AI response có grounded, relevant và không leak đáp án không?
- RQ4: Learner có uptake response không, và uptake làm target/state thay đổi ra sao?
- RQ5: Learner trải nghiệm loop thế nào về effort, interruption và usefulness?

Knowledge-building và independent transfer được thu để kiểm tra instrument và ước
lượng variance. Chúng chưa phải confirmatory outcomes của protocol này.

## Hai phần đánh giá

### Technical evaluation

Hai domain experts gán nhãn trên một transcript set tách khỏi user pilot:

- learner claims và source spans;
- knowledge components;
- unresolved issues;
- response target và reciprocal action phù hợp;
- groundedness, relevance, answer leakage và persona drift.

Team báo agreement giữa experts trước khi so model với adjudicated labels.

### Usability và feasibility pilot

Learner hoàn thành một phiên reciprocal teach-back. Tất cả participant dùng cùng
product condition. Không randomize policy ở giai đoạn này.

Sample size được chốt sau usability dry run và theo mục tiêu precision cho các tỷ
lệ feasibility. Không dùng một con số quen thuộc rồi diễn giải như power analysis.

## Người tham gia

Inclusion:

- từ 18 tuổi và có consent;
- đã hoàn thành lab hoặc prerequisite tương ứng;
- chưa đạt ceiling ở screening cho objective;
- có thể giải thích task bằng tiếng Việt.

Exclusion được viết trước khi mở transcript để phân tích:

- session thiếu trên 25% turns vì lỗi kỹ thuật;
- sai model/prompt/spec version;
- không có consent hợp lệ;
- không loại learner vì điểm thấp, lời dạy sai hoặc không thích AI.

Mọi failure do hệ thống vẫn được báo trong fidelity denominator phù hợp.

## Intervention

Mentee sử dụng external knowledge state và một reciprocal response policy đã
freeze cho pilot.

Sau mỗi learner turn có nội dung học thuật:

1. State updater tạo candidate claims và source spans.
2. Learner xác nhận, sửa hoặc xóa claims.
3. Issue detector tạo unresolved targets.
4. Response policy chọn một target và action.
5. AI phản hồi tối đa hai câu, không đưa đáp án.
6. Learner trả lời hoặc chọn bỏ qua.
7. Hệ thống cập nhật state và ghi target transition.

Reciprocal action gồm `reflect_back`, `clarify`, `probe_reason`, `connect`,
`check_conflict` và `request_example`. AI không cần hỏi ở mọi lượt. Nó có thể
phản ánh để xác nhận hoặc không tạo response khi không có target hợp lệ.

## Procedure

1. Consent, screening và participant ID giả danh: 5–8 phút.
2. Pre-test cho objective: 5–10 phút.
3. Đọc learning material hoặc hoàn thành entry activity: 8 phút.
4. Dạy AI trong timebox 12–15 phút.
5. Independent transfer và post-session survey: 8–10 phút.
6. Interview ngắn về các reciprocal responses: 5–10 phút.

Timing cuối cùng được chốt sau dry run. Learner có quyền dừng hoặc bỏ qua một
response mà không cần giải thích.

## Đơn vị của một closed loop

Một reciprocal response tạo ra một loop candidate. Candidate được tính là closed
khi có:

```text
selected target
+ AI response
+ learner turn xử lý target
+ new state revision
+ recorded non-skipped target transition
```

Target transition nhận một trong các giá trị:

- `resolved`: learner đã làm rõ theo rubric;
- `partially_resolved`: có thêm evidence nhưng issue vẫn còn;
- `unchanged`: uptake không xử lý target;
- `reframed`: response cho thấy target ban đầu bị gán sai;
- `skipped`: learner bỏ qua response.

Những nhãn này mô tả tiến trình hội thoại, không phải mastery. `Skipped` nằm
trong denominator nhưng không được tính là closed loop.

## Outcomes

### Technical fidelity

- claim/source-span precision và recall;
- issue, target và action agreement với experts;
- grounded-response rate;
- answer leakage;
- persona drift;
- state overreach;
- repetition.

### Loop feasibility

```text
uptake_rate
= reciprocal responses có learner turn xử lý target
  / reciprocal responses đã hiển thị

closed_loop_rate
= loop candidates có uptake, state revision và non-skipped transition
  / loop candidates
```

Team báo riêng tỷ lệ `resolved`, `partially_resolved`, `unchanged`, `reframed` và
`skipped`. Không gộp chúng thành một mastery score.

### Learner process và trải nghiệm

- knowledge-building rate trong learner turns;
- claim confirmation edit rate;
- response helpfulness và interruption;
- mental effort 1–9;
- completion, abandonment point, latency và cost.

### Exploratory assessment

- immediate independent-transfer score;
- explanation quality;
- quan hệ mô tả giữa loop transitions và transfer.

Pilot không đủ để kết luận loop gây ra learning gain vì không có causal comparator.

## Analysis plan

1. Báo count, denominator và interval estimate cho từng fidelity/feasibility rate.
2. Báo distribution số loop candidate và closed loop trên mỗi participant.
3. So sánh expert labels trước/sau adjudication và báo inter-rater reliability.
4. Mô tả target transition theo reciprocal action và knowledge component.
5. Phân tích interview để tìm response hữu ích, response gây gián đoạn và gap bị
   detector gán sai.
6. Chỉ phân tích transfer ở mức exploratory; không dùng `p > .05` để tuyên bố
   không có khác biệt.

Threshold go/no-go được viết sau development round và trước evaluation set. Không
chọn threshold sau khi xem test result.

## Gate trước recruitment

- Hai experts hoàn tất annotation guide và development set.
- Agreement đạt threshold định trước cho claim, issue và response target.
- State updater, response grounding và answer leakage đạt technical gate.
- 10/10 dry-run sessions export đủ event và không chứa direct identifier.
- Transfer item được ít nhất hai domain reviewers rà content validity.
- Có ethics/IRB approval hoặc xác nhận tương đương của đơn vị.

## Quyết định sau pilot

Sau feasibility pilot, team mới chọn comparative research question:

1. `One-way vs Reciprocal` nếu contribution cần kiểm tra giá trị của việc khép loop.
2. `Fixed vs State-aware` nếu loop đã ổn và contribution nằm ở adaptation policy.

Hai contrast không được gộp vào một study nếu team muốn diễn giải causal effect
của từng cơ chế.

## Data management

Consent nêu rõ transcript, extracted state, model output và survey nào được lưu.
Participant ID không chứa mã sinh viên. Identity mapping, nếu cần, nằm ở storage
riêng. Research export không chứa API key, clipboard, raw repository hoặc direct
identifier.

Model/provider/version, prompt, response policy, temperature và ngày chạy được
công bố cùng study. Kết quả không ảnh hưởng điểm học phần.

## Việc phải chốt trước preregistration

1. Objective và teaching map.
2. Interaction budget và stop rule.
3. Annotation guide cho target transition.
4. Fidelity/feasibility thresholds.
5. Sample size dựa trên precision hoặc sensitivity analysis.
6. Retention, deletion và access policy theo quy trình VinUni.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Đổi comparative study thành feasibility | Một product condition |
| Vocabulary | Đo cả loop thay vì chỉ question | Uptake và target transition |
| Inflation | Bỏ causal hypothesis sớm | Transfer là exploratory |
| Rhythm/Style | Dùng công thức đơn giản | `closed_loop_rate` |
