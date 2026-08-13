# Protocol draft: state-aware follow-up questions trong post-lab teach-back

Phiên bản: 0.2 Trạng thái: design draft, chưa được preregister

Protocol chỉ được freeze sau khi team chọn một cặp objective tương đương, có
domain reviewer, lesson material và transfer item đã pilot. Không thu dữ liệu chính từ
bản draft này.

## Mục tiêu

Study ước lượng tác động của cách chọn follow-up question trong một phiên learner
dạy AI apprentice bằng tiếng Việt. Cả hai condition đều dùng external knowledge state
và đều hỏi cùng số lần. Một condition đi theo policy cố định; condition còn
lại chọn câu hỏi từ reasoning gap trong state hiện tại.

Đây là feasibility pilot. Mẫu 20–40 người không đủ để tuyên bố hiệu quả
giáo dục tổng quát.

## Research questions

- RQ1: State updater và gap detector khớp với expert annotation đến đâu?
- RQ2: State-aware policy tạo câu hỏi grounded và relevant hơn fixed policy không?
- RQ3: State-aware policy có làm tăng knowledge-building rate không?
- RQ4: Hai policy ảnh hưởng thế nào đến mental effort, frustration và trải nghiệm?
- RQ5: Independent transfer có khác nhau không? RQ này là exploratory trong pilot.

Giả thuyết chính của user study:

> Knowledge-building rate trong state-aware condition cao hơn fixed condition.

RQ1–RQ2 thuộc technical evaluation và phải hoàn thành trước recruitment.

## Thiết kế

Within-subject, hai phiên, counterbalanced theo objective, condition và order. Hai objective
phải cùng độ khó dự kiến nhưng không dùng chung đáp án hoặc surface context.

| Sequence | Phiên 1 | Phiên 2 |
| --- | --- | --- |
| S1 | Objective A, State-aware | Objective B, Fixed |
| S2 | Objective A, Fixed | Objective B, State-aware |
| S3 | Objective B, State-aware | Objective A, Fixed |
| S4 | Objective B, Fixed | Objective A, State-aware |

Team phân sequence theo vòng lặp S1–S4 sau khi xáo trộn participant ID. Mỗi sequence
lệch không quá một người. Transcript rater không biết condition.

Nếu course chỉ cung cấp một objective đủ tốt, team phải chuyển sang thiết kế
between-subject và làm power analysis lại. Không dùng hai biến thể quá giống nhau trong
within-subject vì learner có thể mang lời giải từ phiên đầu sang phiên sau.

## Người tham gia

Inclusion:

- từ 18 tuổi và có consent;
- đã hoàn thành lab hoặc prerequisite tương ứng;
- chưa đạt ceiling ở screening cho cả hai objective;
- có thể giải thích task bằng tiếng Việt.

Exclusion được viết trước khi mở condition label:

- không hoàn thành cả hai phiên không vào paired primary analysis;
- transcript mất trên 25% learner turns không vào transcript analysis;
- lỗi pipeline làm sai condition hoặc question budget được báo là fidelity failure;
- không loại người chỉ vì điểm thấp, giải thích sai hoặc không thích AI.

## Intervention

Cả hai condition dùng cùng:

- model snapshot và sampling configuration;
- apprentice persona và response length;
- lesson material, teaching map và knowledge-state format;
- UI, timebox và ba question opportunities;
- claim confirmation flow;
- transfer assessment và survey.

### Fixed policy

Ở mỗi question opportunity, backend chọn component tiếp theo trong lesson path và strategy
order đã freeze. Câu hỏi vẫn phải bám vào learner turn hoặc claim liên quan, nhưng
policy không dùng candidate-gap ranking để chọn target.

### State-aware policy

Ở cùng question opportunity, gap detector tạo candidate target từ confirmed state. Selector
chọn target theo priority và map issue type sang clarification, elaboration, connection hoặc
edge case. Apprentice Responder diễn đạt đúng một câu hỏi, không được tự chọn
lại target.

Nếu state-aware condition không có target hợp lệ, AI phản ánh ngắn gọn thay vì bịa
một gap. Sự kiện đó vẫn được ghi và đưa vào fidelity analysis. Primary analysis
cần báo cả intention-to-treat theo assigned condition và số opportunity thực sự tạo
câu hỏi.

## Procedure

1. Consent, screening và participant ID giả danh: 5–8 phút.
2. Pre-test cho hai objective: 10–15 phút.
3. Đọc learning material của phiên 1: 8 phút.
4. Dạy AI trong 12 phút, với question opportunities viết trước.
5. Immediate transfer và post-condition survey: 8–10 phút.
6. Nghỉ 3 phút.
7. Lặp lại bước 3–5 cho objective và condition còn lại.
8. Survey so sánh và interview ngắn: 5–10 phút.

Tổng thời gian dự kiến 60–75 phút. Timing cuối cùng được chốt sau usability
pilot.

## Outcomes

Primary:

```text
knowledge_building_rate
= số learner utterances KB-ELABORATION hoặc KB-SENSEMAKING
  / tổng learner utterances có nội dung học thuật
```

Rater chấm transcript độc lập sau khi ẩn condition và participant identity. Báo
Krippendorff's alpha cùng raw disagreement; không chỉ báo phần trăm đồng thuận.

Secondary và exploratory:

- knowledge-building ở lượt ngay sau question opportunity;
- immediate independent-transfer score;
- explanation quality;
- mental effort 1–9;
- perceived grounding, frustration và willingness to reuse;
- claim edit rate và question response rate.

Fidelity:

- state overreach;
- ungrounded question;
- target mismatch;
- answer leakage;
- persona drift;
- repetition;
- condition hoặc question-budget violation.

Số lượt chat, word count và AI satisfaction không phải learning outcome.

## Analysis plan

1. Tính participant-level difference `State-aware - Fixed` cho primary outcome.
2. Báo median, IQR, mean, SD, paired effect size và bootstrap 95% CI.
3. Dùng exact paired permutation test làm kiểm định chính nếu mẫu nhỏ.
4. Phân tích immediate post-question knowledge-building theo preregistered window.
5. Phân tích transfer tương tự nhưng ghi rõ exploratory.
6. Báo riêng theo objective và order để kiểm tra carryover hoặc imbalance.
7. Không đổi outcome, exclusion hoặc hướng kiểm định sau khi xem condition result.
8. Không diễn giải `p > .05` thành hai condition tương đương.

Pilot cung cấp variance, within-person correlation, attrition và fidelity để power analysis
cho confirmatory study. Effect size quan sát từ mẫu nhỏ không được dùng như một
ước lượng chắc chắn.

## Technical gate trước recruitment

- Hai experts hoàn tất annotation guide và development set.
- Agreement đạt threshold đã viết trước cho claim, gap và question target.
- State updater không thêm claim ngoài source span quá threshold.
- Grounded-question rate và answer-leakage rate đạt gate preregistered.
- 10/10 dry-run sessions export đủ event và không chứa direct identifier.
- Pre/transfer items được ít nhất hai domain reviewers rà content validity.
- Có ethics/IRB approval hoặc xác nhận tương đương của đơn vị.

Các threshold số học được chọn sau annotation round thử và trước evaluation set;
không chọn sau khi nhìn model result trên test set.

## Data management

Consent nêu rõ transcript, extracted state, model output và survey nào được lưu.
Participant ID không chứa mã sinh viên. Identity mapping, nếu cần, nằm ở storage
riêng. Không thu API key, clipboard, raw repository hoặc direct identifier trong research
export.

Model/provider/version, prompt, policy, temperature và ngày chạy được công bố cùng
study. Kết quả không ảnh hưởng điểm học phần.

## Việc phải chốt trước preregistration

1. Objective A/B và bằng chứng chúng có độ khó phù hợp.
2. Question opportunities cụ thể theo số learner turns hay thời gian.
3. Annotation window cho immediate post-question outcome.
4. Fidelity thresholds và quy tắc xử lý failed session.
5. Sample size từ power/sensitivity analysis.
6. Retention, deletion và access policy theo quy trình VinUni.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Đặt technical evaluation trước user study | RQ1–RQ2 là gate |
| Vocabulary | Thay active/passive bằng policy contrast rõ | Fixed vs state-aware |
| Inflation | Giới hạn claim của pilot | Transfer ghi là exploratory |
| Rhythm/Style | Cắt các câu thủ tục dài | Một quyết định cho mỗi đoạn |
