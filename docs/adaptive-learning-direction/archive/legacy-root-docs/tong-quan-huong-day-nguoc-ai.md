# Tổng quan hướng research: Adaptive Learning-by-Teaching

Cập nhật: 12/08/2026. Trạng thái: hướng làm việc để nhận phản biện, chưa phải
protocol hoặc hypothesis đã đóng băng.

## 1. Hướng hiện hành

Mentee nghiên cứu và xây dựng **Adaptive Learning-by-Teaching** xuyên suốt một
learning track. Học viên đóng vai người dạy; AI đóng vai apprentice bị giới hạn
bởi knowledge state do học viên cung cấp. Sau khi được dạy, AI thực hiện một
micro-task isomorphic; runner kiểm chứng kết quả; evidence này cập nhật learner
model và quyết định repair, review hoặc transfer tiếp theo.

```text
Học viên dạy rule
  -> AI enact từ knowledge state
  -> runner kiểm chứng
  -> learner model cập nhật theo skill
  -> adaptation policy chọn hoạt động tiếp theo
  -> transfer độc lập đo khả năng của người học
```

Đây không phải chatbot tutor tổng quát, cũng không phải tính năng độc lập cho
một lab. Một lab chỉ là nơi tạo evidence; engine dùng evidence xuyên nhiều lab,
module và toàn track.

## 2. Vấn đề và cơ chế

Public test hoặc completion của lab chỉ nói artifact hiện tại có chạy hay không.
Nó không chứng minh người học hiểu rule, có thể giải thích nó, hoặc áp dụng nó
trong task mới. Learning-by-Teaching tạo cơ hội để người học tổ chức và biểu đạt
knowledge; recursive feedback xuất hiện khi họ quan sát AI dùng điều mình vừa
dạy. Nếu AI fail ở task được kiểm chứng, người học có một tín hiệu cụ thể để sửa
lời dạy thay vì nhận feedback chung chung.

AI phải bị giới hạn thật sự: chỉ dùng claims trong knowledge state, để trống slot
chưa được dạy và không leak đáp án. Vì vậy failure trace có thể map về một skill,
rule hoặc misconception xác định trước.

## 3. Adaptive learner model

Learner model tồn tại ở cấp `participant × skill`, không phải một nhãn trình độ
chung cho cả người học. Nó lưu evidence provenance từ guided card, explanation,
public test, AI enactment, repair và transfer.

```text
unseen -> introduced -> practiced -> verified -> mastered
                      \-> fragile
                      \-> misconception
```

| Evidence | State / quyết định |
| --- | --- |
| Rule sai hoặc mâu thuẫn | `misconception` -> contrast card + giải thích lại. |
| Rule thiếu điều kiện/lý do | `fragile` -> hỏi một câu why/when bám rule còn thiếu. |
| AI enact fail | `fragile` -> failure trace + repair lời dạy. |
| AI pass nhưng reasoning nông | `fragile` -> micro-transfer khác bề mặt. |
| AI pass + reasoning đủ | `verified` -> review giãn cách hoặc mở skill phụ thuộc. |
| Transfer độc lập pass/fail | `mastered` hoặc quay về `fragile`/`misconception`. |

Policy phải minh bạch, versioned và có rationale hiển thị cho người học.

## 4. Cấu trúc toàn track

```text
Track
  -> Module
      -> Lab
          -> Skill / objective
              -> Evidence
                  -> Learner state
                      -> Repair, review, challenge hoặc unlock skill
```

Không phải mọi lab đều cần enactment. Enactment đặt ở objective then chốt hoặc
dễ tạo misconception. Lab khác vẫn tạo evidence qua explanation, code/test và
micro-transfer. Curriculum chính giữ chung theo cohort; adaptivity điều chỉnh
support/challenge, không để LLM tự tạo curriculum tự do cho từng người.

## 5. Câu hỏi research

### Feasibility/design

> Làm thế nào để một teachable agent bị giới hạn knowledge state sử dụng evidence
> từ verified enactment để chọn repair và review thích hợp trên nhiều lab trong
> một learning track?

### Efficacy sau khi hệ thống ổn định

> So với reflective teach-back có cùng nội dung, persona, task và thời lượng
> nhưng không có verified enactment, AI apprentice bị giới hạn
> knowledge state cùng vòng enactment–repair có cải thiện TransferScore độc lập
> cuối module/track không?

Primary outcome là `TransferScore` của người học trên task mới, dùng hidden tests
và rubric mù cho explanation. AI pass, số lượt chat, số từ và satisfaction chỉ
là process/UX data, không thay thế learning outcome.

## 6. Thiết kế nghiên cứu theo giai đoạn

| Giai đoạn | Phạm vi | Mục tiêu |
| --- | --- | --- |
| Feasibility | Một vài Lab Teaching Spec đại diện | Fidelity, runner, learner state, UX và authoring spec. |
| Pilot module | Một module gồm nhiều lab | Adaptation policy, skill trajectory, assessment và vận hành. |
| Study chính | Một track/giai đoạn hoàn chỉnh | So sánh adaptive với fixed-schedule flow. |

Không dùng feasibility/pilot nhỏ để kết luận learning gain. Chỉ thu dữ liệu người
học sau khi protocol được freeze và có ethics/IRB approval hoặc xác nhận tương đương.

## 7. Định vị với prior art

- AlgoBo/TeachYou cho thấy LLM tutee và follow-up question có thể hỗ trợ
  knowledge-building, nhưng condition thay đổi nhiều thành phần. Mentee cần cô
  lập verified enactment và adaptation policy. [Jin et al., 2024](https://doi.org/10.1145/3613904.3642349)
- Recursive feedback cho thấy quan sát học trò dùng kiến thức vừa được dạy có thể
  hỗ trợ transfer tốt hơn direct feedback; đây là nền của enactment được runner
  kiểm chứng. [Okita & Schwartz, 2013](https://doi.org/10.1080/10508406.2013.807263)
- HypoCompass củng cố relevance của việc để người học đánh giá/sửa AI trong
  programming, nhưng evidence hiện tại chưa đủ để kết luận nhân quả.
  [Ma et al., 2024](https://arxiv.org/abs/2310.05292)
- MatlabTutee đã triển khai LLM novice trong lớp CS; Mentee không claim đây là
  LLM teachable agent đầu tiên. Khác biệt là learner model và adaptation xuyên
  track có evidence từ verified enactment.
  [Rogers et al., 2025](https://doi.org/10.1145/3706598.3713644)
- AI authority có thể tác động agency và off-task talk. Adaptation cần scope rõ,
  policy kiểm tra được và rationale hiển thị cho người học.
  [Xing et al., 2026](https://doi.org/10.1111/bjet.70038)

## 8. Nguyên tắc không thay đổi

- Knowledge state lưu ngoài model, mỗi claim có provenance.
- AI không leak đáp án, không tự sửa lời dạy và giữ vai apprentice toàn phiên.
- Conditions nghiên cứu chỉ khác đúng biến cần kiểm tra: verified
  enactment–repair.
- Prompt, flow, instrument, skill graph và policy được version/freeze trước thu
  dữ liệu chính.
- Không thu PII/API key vào transcript; export mặc định giả danh.
- Không dùng proxy engagement thay cho transfer độc lập.

## 9. Tài liệu liên quan

- [PRD engine xuyên track](prd-buoc-day-nguoc-ai.md)
- [Note định hướng adaptive learning](dinh-huong-adaptive-learning-xuyen-suot-track.md)
- [Literature review](research/literature-review.md)
- [Protocol pilot cũ cần thay thế trước study mới](research/protocol.md)
- [Instruments và schema cần review content validity](research/instruments.md)
