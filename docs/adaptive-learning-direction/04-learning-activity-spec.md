# Thiết kế kỹ thuật cho Mentee reciprocal conversation engine

Phiên bản: 0.3
Trạng thái: proposal

## Bài toán kỹ thuật

LLM biết nhiều hơn vai học trò mà nó đang diễn. Chỉ prompt “hãy giả vờ chưa
biết” không tạo ra knowledge boundary đáng tin. Model vẫn có thể sửa lời
learner, đưa đáp án hoặc phản hồi một ý không có trong state.

Mentee tách state update, issue detection, response generation và uptake
tracking thành các bước có output lưu được. Mục đích là biết lỗi xảy ra ở đâu
và xác nhận vòng tương tác thực sự quay lại knowledge state.

## Components

```text
Session API
  ├── Turn Store
  ├── State Updater
  ├── Confirmation Service
  ├── Issue Detector
  ├── Response Policy
  ├── Apprentice Responder
  ├── Uptake Tracker
  ├── Fidelity Monitor
  └── Research Exporter
```

### State Updater

Input gồm confirmed state gần nhất và learner turn mới. Output là candidate claims
với source spans. Updater không xem transfer answer và không tự chấm learner đúng
hay sai.

```json
{
  "baseRevision": 3,
  "candidateClaims": [
    {
      "componentId": "candidate_cause",
      "content": "Dense retrieval có thể bỏ sót exact identifier",
      "sourceStart": 18,
      "sourceEnd": 69,
      "operation": "add"
    }
  ]
}
```

Backend kiểm tra source span nằm trong learner turn. UI hiện diff để learner xác
nhận. State revision chỉ được tạo sau confirmation.

### Issue Detector

Detector nhận teaching map, confirmed state và private diagnostic rubric. Nó trả
unresolved issues, không viết response hoàn chỉnh.

```json
{
  "stateRevision": 4,
  "issues": [
    {
      "targetId": "issue-4-1",
      "componentId": "discriminating_test",
      "issueType": "missing_relationship",
      "claimIds": ["claim-8", "claim-9"],
      "priority": 1
    }
  ]
}
```

Private rubric không được nối thẳng vào prompt của Apprentice Responder. Boundary
này giảm nguy cơ response vô tình chứa đáp án.

### Response Policy

Policy chọn một target và một reciprocal action. Alpha dùng một policy versioned,
không hard-code comparative conditions.

Mapping mặc định:

```text
confirmation_needed       → reflect_back
ambiguous_claim           → clarify
missing_justification     → probe_reason
missing_relationship      → connect
internal_contradiction    → check_conflict
missing_boundary_example  → request_example
```

Nếu không có target hợp lệ, policy không bịa issue. Nó có thể chọn
`reflect_back` để xác nhận state hoặc không tạo response.

### Apprentice Responder

Responder nhận persona, public objective, target, action, current learner turn và
confirmed claims liên quan. Nó không nhận private rubric hoặc reference answer.

```json
{
  "type": "reciprocal_response",
  "targetId": "issue-4-1",
  "action": "connect",
  "claimIds": ["claim-8", "claim-9"],
  "text": "Kết quả test đó giúp mình chọn giữa hai nguyên nhân như thế nào?"
}
```

Backend từ chối target lạ, claim ID không tồn tại hoặc output vượt response limit.
`claimIds` được phép rỗng với `missing_component`. Semantic fidelity vẫn cần human
rater hoặc model judge đã calibrate.

### Uptake Tracker

Tracker liên kết learner turn tiếp theo với response vừa hiển thị. Sau confirmation
của state mới, tracker ghi target transition:

```json
{
  "responseId": "response-8",
  "uptakeTurnId": "turn-9",
  "beforeStateRevision": 4,
  "afterStateRevision": 5,
  "targetTransition": "resolved",
  "evidenceClaimIds": ["claim-10"]
}
```

Tracker không tự coi mọi reply là uptake. Learner có thể bỏ qua, trả lời off-topic
hoặc cho thấy detector đã hiểu sai. Các trường hợp đó lần lượt là `skipped`,
`unchanged` hoặc `reframed`.

Một response có outcome `skipped` được giữ trong denominator nhưng không được
tính là closed loop.

## Conversation state machine

```text
created
  → teaching
  → awaiting_confirmation
  → diagnosing
  → responding
  → awaiting_uptake
  → awaiting_confirmation
  → teaching | ready_for_transfer
  → transfer_in_progress
  → completed
```

Từ mọi non-terminal state, session có thể chuyển sang `abandoned` hoặc `expired`.
Resume phải dùng đúng spec, model, prompt và policy version của session ban đầu.

## Conversation Spec contract

```json
{
  "specVersion": "0.3",
  "id": "rag-retrieval-reasoning",
  "version": 1,
  "status": "draft",
  "objective": {},
  "entry": {},
  "teachingMap": {},
  "knowledgeState": {},
  "issueTaxonomy": {},
  "reciprocalPolicy": {},
  "transfer": {},
  "privacy": {},
  "operations": {}
}
```

Required invariants:

- spec có đúng một primary objective;
- mọi component ID là duy nhất;
- mọi issue type map được tới ít nhất một reciprocal action;
- response budget không vượt interaction budget;
- transfer khóa apprentice và không dùng private diagnostic material;
- evidence allowlist không giao với denylist;
- spec đã dùng trong session không được sửa in-place.

## Interaction budget

Product có thể phản hồi sau mỗi confirmed state khi có target hợp lệ. Feasibility
pilot dùng budget và stop rule đã freeze để tránh phiên kéo dài vô hạn.

Budget giới hạn số reciprocal responses, không yêu cầu AI phải dùng hết. Việc
ép AI hỏi khi không có target sẽ tạo interaction giả và làm méo closed-loop
rate.

## Fidelity events

| Event | Khi nào ghi |
| --- | --- |
| `answer_leakage` | Response chứa phần reference chưa được dạy |
| `persona_drift` | AI chuyển thành tutor, grader hoặc expert |
| `ungrounded_response` | Response không map về target/evidence |
| `target_mismatch` | Nội dung response không xử lý target đã chọn |
| `claim_mutation` | AI đổi nghĩa claim khi phản ánh |
| `repetition` | AI lặp response mà không dùng uptake mới |
| `state_overreach` | Updater thêm kiến thức ngoài source turn |
| `uptake_link_error` | Turn bị nối sai response |
| `transition_overclaim` | Target bị gán resolved khi thiếu evidence |

Rule-based checks phát hiện schema và reference ID sai. Answer leakage hoặc
semantic mismatch cần rater trong evaluation set. LLM judge chưa calibrate không
phải ground truth.

## Event log

Mỗi event có `event_id`, `session_id`, pseudonymous `participant_id`, timestamp và
version references. Payload tối thiểu gồm:

- raw learner turn;
- candidate extraction và learner edits;
- confirmed state revision;
- unresolved issues;
- selected target/action và AI response;
- learner uptake;
- next state revision và target transition;
- fidelity flags;
- transfer submission và blinded score.

Research export không chứa tên, email, mã sinh viên, credential hoặc raw artifact
ngoài consent.

## Test strategy

### Structural tests

- invalid spec hoặc duplicate component;
- claim source span ngoài learner turn;
- response trỏ tới target/claim không tồn tại;
- quá interaction budget;
- uptake nối sai response;
- target transition thiếu before/after state;
- transfer được gọi khi apprentice chưa khóa.

### Fidelity fixtures

- empty state;
- lời dạy chỉ có kết luận;
- hai claims mâu thuẫn;
- lời dạy sai nhưng nhất quán;
- claim mơ hồ;
- edge case chưa được nói;
- prompt injection yêu cầu AI đưa đáp án;
- learner yêu cầu AI đổi sang vai giáo viên;
- uptake giải quyết target;
- uptake off-topic;
- target bị detector gán sai;
- learner bỏ qua response.

Mỗi regression đã xác nhận trở thành fixture versioned. Repeated runs dùng để đo
variance, không dùng để chọn thủ công output đẹp nhất.

## Build order

1. Conversation Spec và validator tối thiểu.
2. Turn store, state revisions và confirmation UI.
3. State updater với source-span enforcement.
4. Issue detector và expert annotation export.
5. Response policy và Apprentice Responder.
6. Uptake tracker và target transition.
7. Fidelity suite, transfer lock và research export.

Voice, diagram, multi-domain authoring và comparative policy runtime chưa thuộc
bản alpha này.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Thêm Uptake Tracker | Loop quay lại state updater |
| Vocabulary | Thay Question Selector | Response Policy |
| Grammar | Nêu rõ failure cases | Off-topic, skipped, reframed |
| Hedging/Filler | Tách schema khỏi semantic judgment | Human calibration |
