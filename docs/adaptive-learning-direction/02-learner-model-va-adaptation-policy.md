# Knowledge state và cách chọn câu hỏi tiếp theo

## Knowledge state dùng để làm gì?

Knowledge state ghi lại điều learner đã nói, không phải kiến thức mà LLM vốn
biết. Nó giúp hệ thống trả lời ba câu hỏi thực dụng:

1. Learner đã giải thích điều gì?
2. Phần nào còn thiếu hoặc chưa rõ theo teaching map?
3. Câu hỏi nào nên được đặt ở cơ hội tiếp theo?

State không gắn nhãn `mastered`. Một lời giải thích đầy đủ trong hội thoại
cũng không chứng minh learner làm được transfer task.

## Teaching map

Course author chia objective thành một số knowledge component đủ nhỏ để thảo luận.
Mỗi component mô tả năng lực reasoning, không phải một từ khóa cần nhắc lại.

Ví dụ với debugging:

```text
observed_failure
→ candidate_cause
→ discriminating_test
→ evidence
→ conclusion
→ fix_and_regression
```

Ví dụ với RAG evaluation:

```text
failure_slice
→ hypothesized_source
→ intervention
→ evaluation_design
→ quality_latency_cost_tradeoff
→ decision
```

Teaching map là scaffold và khung annotation. Nó không được chứa đáp án cụ thể
của transfer task.

## Contract của một claim

```json
{
  "id": "claim-7",
  "componentId": "discriminating_test",
  "content": "Thay từng input một để phân biệt lỗi parser và lỗi retrieval",
  "sourceTurn": 4,
  "sourceText": "...",
  "learnerConfirmed": true
}
```

State updater chỉ được thêm nội dung truy được về lời learner. Nếu model suy
diễn thêm một bước hợp lý nhưng learner chưa nói, bước đó không thuộc
knowledge state.

## Trạng thái của knowledge component

Một component có thể mang một trong các trạng thái mô tả sau:

| Status | Ý nghĩa |
| --- | --- |
| `unaddressed` | Learner chưa nói đến component |
| `partial` | Đã có claim nhưng thiếu quan hệ, lý do hoặc điều kiện cần thiết |
| `articulated` | Learner đã trình bày đủ theo rubric của phiên |
| `ambiguous` | Claim có hơn một cách hiểu đáng kể |
| `contradictory` | Có hai claim không thể cùng đúng trong cùng điều kiện |

`articulated` mô tả lời trình bày, không xác nhận độ đúng.
Độ đúng theo
rubric là annotation riêng và cần expert validation. Cách tách này tránh biến
confidence của LLM thành learner mastery.

## Gap detector

Gap detector nhận teaching map và confirmed state, rồi tạo candidate target:

```json
{
  "targetId": "gap-3",
  "componentId": "discriminating_test",
  "issueType": "missing_justification",
  "claimIds": ["claim-7"],
  "priorityReason": "required_component_incomplete"
}
```

Các `issueType` đầu tiên gồm:

- `missing_component`;
- `missing_justification`;
- `missing_relationship`;
- `ambiguous_claim`;
- `internal_contradiction`;
- `missing_boundary_or_example`.

Không thêm taxonomy mới nếu chưa có ví dụ thật trong transcript và quy tắc để hai
rater phân biệt nó.

## Question strategy

Question selector chọn đúng một target và một strategy:

| Strategy | Dùng khi | Ví dụ dạng câu hỏi |
| --- | --- | --- |
| `clarification` | Claim mơ hồ | “Ý đó là bước nào?” |
| `elaboration` | Thiếu cơ chế | “Vì sao test này phân biệt được?” |
| `connection` | Thiếu liên kết | “Kết quả này dẫn đến bước sau thế nào?” |
| `edge_case` | Thiếu điều kiện biên | “Input rỗng thì sao?” |

Question record cần đủ thông tin để audit. `claimIds` có thể rỗng khi target là
component learner chưa nhắc tới:

```json
{
  "opportunity": 2,
  "targetId": "gap-3",
  "strategy": "elaboration",
  "claimIds": ["claim-7"],
  "question": "Vì sao thay từng input giúp phân biệt hai nguyên nhân này?",
  "policyVersion": "state-aware-v1"
}
```

`priorityReason` được lưu cho researcher nhưng không hiện cho learner. Learner chỉ thấy
câu hỏi tự nhiên của AI apprentice.

## Quy tắc ưu tiên

Trong product, selector ưu tiên contradiction, component bắt buộc chưa được nói, claim
thiếu lý do, rồi mới đến connection hoặc edge case. Course author có thể đổi thứ
tự trong spec, nhưng phải version policy.

Trong comparative study, hai condition có cùng thời điểm và số câu hỏi. Fixed policy
lấy target tiếp theo từ lesson path. State-aware policy dùng candidate gap. Nhờ vậy
biến can thiệp là cách chọn câu hỏi, không phải liều lượng tương tác.

## Confirmation loop

```text
Learner turn
→ extract claims và source spans
→ learner xác nhận, sửa hoặc xóa
→ tạo state revision
→ detect gaps
→ chọn câu hỏi nếu đến question opportunity
```

Không sửa in-place state đã dùng để sinh câu hỏi. Mỗi revision giữ parent ID và
diff để researcher dựng lại phiên.

## Điều kiện dừng

Phiên dừng khi hết timebox, hết question budget, learner chủ động kết thúc hoặc
không còn candidate target theo rubric. Hệ thống không nói “bạn đã hiểu hoàn
toàn”. Nó chỉ báo rằng phiên hiện tại đã hoàn tất.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Tạo contract kiểm tra được | Claim → gap → question |
| Vocabulary | Dùng nhãn mô tả thay cho mastery | `articulated`, không phải `mastered` |
| Grammar | Cắt câu trừu tượng | Mỗi component trả lời một câu hỏi vận hành |
| Soul | Nêu rõ giới hạn | Chỉ thêm taxonomy từ transcript thật |
