# Knowledge state và reciprocal interaction policy

## Knowledge state dùng để làm gì?

Knowledge state ghi lại điều learner đã nói, không phải kiến thức mà LLM vốn
biết.
Nó giúp hệ thống trả lời bốn câu hỏi:

1. Learner đã giải thích điều gì?
2. Phần nào còn thiếu hoặc chưa rõ?
3. AI nên phản hồi learner như thế nào?
4. Sau phản hồi đó, lời learner và state thay đổi ra sao?

State không gắn nhãn `mastered`. Một lời giải thích đầy đủ trong hội thoại cũng
không chứng minh learner làm được transfer task.

## Teaching map

Course author chia objective thành các knowledge component đủ nhỏ để thảo luận.
Mỗi component mô tả năng lực reasoning, không phải từ khóa cần nhắc lại.

Ví dụ với debugging:

```text
observed_failure
→ candidate_cause
→ discriminating_test
→ evidence
→ conclusion
→ fix_and_regression
```

Teaching map là scaffold và khung annotation. Nó không chứa đáp án cụ thể của
transfer task.

## Contract của một claim

```json
{
  "id": "claim-7",
  "componentId": "discriminating_test",
  "content": "Thay từng input để phân biệt lỗi parser và lỗi retrieval",
  "sourceTurn": 4,
  "sourceText": "...",
  "learnerConfirmed": true
}
```

State updater chỉ thêm nội dung truy được về lời learner. Một bước hợp lý nhưng
learner chưa nói không thuộc knowledge state.

## Trạng thái của knowledge component

| Status | Ý nghĩa |
| --- | --- |
| `unaddressed` | Learner chưa nói đến component |
| `partial` | Claim thiếu quan hệ, lý do hoặc điều kiện cần thiết |
| `articulated` | Learner đã trình bày đủ theo rubric của phiên |
| `ambiguous` | Claim có hơn một cách hiểu đáng kể |
| `contradictory` | Hai claim không thể cùng đúng trong cùng điều kiện |

`articulated` mô tả lời trình bày, không xác nhận độ đúng. Độ đúng theo rubric
là annotation riêng và cần expert validation.

## Unresolved issue

Issue detector nhận teaching map và confirmed state:

```json
{
  "targetId": "issue-3",
  "componentId": "discriminating_test",
  "issueType": "missing_justification",
  "claimIds": ["claim-7"],
  "priorityReason": "required_component_incomplete"
}
```

Các `issueType` ban đầu:

- `missing_component`;
- `missing_justification`;
- `missing_relationship`;
- `ambiguous_claim`;
- `internal_contradiction`;
- `missing_boundary_or_example`.

Không thêm taxonomy nếu chưa có transcript thật và quy tắc để hai rater phân biệt
nhãn mới.

## Reciprocal action

Response policy chọn đúng một target và một action:

| Action | Dùng khi | Kết quả mong đợi từ learner |
| --- | --- | --- |
| `reflect_back` | Cần xác nhận cách AI hiểu | Xác nhận hoặc sửa claim |
| `clarify` | Claim mơ hồ | Định nghĩa hoặc chỉ rõ tham chiếu |
| `probe_reason` | Thiếu lý do | Giải thích `why/how` |
| `connect` | Hai ý chưa nối | Nêu quan hệ hoặc chuỗi suy luận |
| `check_conflict` | Claims mâu thuẫn | Sửa, giới hạn hoặc phân biệt điều kiện |
| `request_example` | Thiếu boundary | Cho ví dụ, phản ví dụ hoặc edge case |

Response record cần đủ thông tin để audit. `claimIds` có thể rỗng khi target là
component learner chưa nhắc tới:

```json
{
  "targetId": "issue-3",
  "action": "probe_reason",
  "claimIds": ["claim-7"],
  "response": "Vì sao test này phân biệt được hai nguyên nhân?",
  "policyVersion": "reciprocal-v1"
}
```

AI chỉ diễn đạt response tự nhiên. Nó không được tự đổi target hoặc dùng
private rubric để đưa đáp án.

## Learner uptake

Turn ngay sau reciprocal response được liên kết bằng `responseId`. State updater
xử lý uptake như mọi learner turn khác, nhưng lưu thêm target transition:

```json
{
  "responseId": "response-8",
  "uptakeTurnId": "turn-9",
  "beforeStateRevision": 4,
  "afterStateRevision": 5,
  "targetTransition": "partially_resolved",
  "newClaimIds": ["claim-10"]
}
```

Các transition là `resolved`, `partially_resolved`, `unchanged`, `reframed` và
`skipped`. `Skipped` kết thúc response mà không khép kín loop. Nếu learner trả
lời nhưng detector đã chọn sai target, dùng `reframed` thay vì ép câu trả lời
vào rubric cũ.

## Confirmation và reciprocal loop

```text
Learner teaching turn
→ extract claims và source spans
→ learner xác nhận, sửa hoặc xóa
→ create state revision
→ detect unresolved issue
→ select reciprocal action
→ AI responds
→ learner uptake
→ create next state revision and target transition
```

Không sửa in-place state đã dùng để sinh response. Mỗi revision giữ parent ID và
diff để researcher dựng lại phiên.

## Điều kiện dừng

Phiên dừng khi hết timebox, hết interaction budget, learner chủ động kết thúc hoặc
không còn unresolved target theo rubric. Hệ thống không nói “bạn đã hiểu hoàn
toàn”. Nó chỉ báo phiên hiện tại đã hoàn tất.

## Policy comparison là bước sau

Product alpha chỉ cần một reciprocal policy đủ ổn định để chạy feasibility pilot.
Sau pilot, team mới quyết định so sánh:

- one-way interaction với reciprocal interaction; hoặc
- fixed response selection với state-aware response selection.

Phần này không được hard-code vào learner model. State, target, response và uptake
contracts phải dùng được cho cả hai thiết kế.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Thêm nửa sau của loop | Response → uptake → revision |
| Vocabulary | Dùng response action | Question là một action |
| Grammar | Gắn output với evidence | `targetTransition` và claim IDs |
| Soul | Cho phép detector sai | `reframed` thay vì ép rubric |
