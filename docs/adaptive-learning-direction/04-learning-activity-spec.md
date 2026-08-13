# Thiết kế kỹ thuật cho Mentee conversation engine

Phiên bản: 0.2 Trạng thái: proposal

## Bài toán kỹ thuật

LLM biết nhiều hơn vai học trò mà nó đang diễn. Chỉ prompt “hãy giả vờ chưa
biết” không tạo ra một knowledge boundary đáng tin. Model vẫn có thể sửa lời
learner, đưa đáp án hoặc hỏi một câu nghe hợp lý nhưng không liên quan đến
phần vừa được dạy.

Mentee tách state update, gap detection và response generation thành các bước có output lưu
được. Mục đích không phải biến mọi suy luận thành deterministic. Mục đích là
biết lỗi xảy ra ở đâu và có dữ liệu để so sánh với expert annotation.

## Components

```text
Session API
  ├── Turn Store
  ├── State Updater
  ├── Confirmation Service
  ├── Gap Detector
  ├── Question Selector
  ├── Apprentice Responder
  ├── Fidelity Monitor
  └── Research Exporter
```

### State Updater

Input gồm confirmed state gần nhất và learner turn mới. Output là candidate claims với
source span. Updater không được xem transfer answer và không được tự chấm learner
đúng hay sai.

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

Backend kiểm tra source span nằm trong learner turn. UI hiện diff cho learner xác nhận.
State revision chỉ được tạo sau confirmation.

### Gap Detector

Detector nhận teaching map, confirmed state và private diagnostic rubric. Nó trả candidate
gap, không trả câu hỏi hoàn chỉnh.

```json
{
  "stateRevision": 4,
  "candidates": [
    {
      "targetId": "gap-4-1",
      "componentId": "discriminating_test",
      "issueType": "missing_relationship",
      "claimIds": ["claim-8", "claim-9"],
      "priority": 1
    }
  ]
}
```

Private rubric có thể mô tả quan hệ cần tìm, nhưng không được nối thẳng vào
prompt của Apprentice Responder. Boundary này giảm nguy cơ câu hỏi vô tình chứa đáp
án.

### Question Selector

Selector nhận candidate gap và policy configuration. Với `fixed-v1`, nó lấy component tiếp
theo trong lesson path và strategy đã định trước. Với `state-aware-v1`, nó lấy
candidate có priority cao nhất rồi chọn strategy phù hợp issue type.

Mapping mặc định:

```text
ambiguous_claim          → clarification
missing_justification    → elaboration
missing_relationship     → connection
missing_boundary_example → edge_case
internal_contradiction   → clarification
```

Nếu không có candidate hợp lệ, state-aware policy phản ánh ngắn gọn và không bịa
một gap. Trong comparative study, question opportunity vẫn được ghi để phân tích
fidelity và dosage.

### Apprentice Responder

Responder nhận persona, target, strategy, learner claims liên quan và current turn. Nó không
nhận private rubric hoặc reference answer.

Output:

```json
{
  "type": "question",
  "targetId": "gap-4-1",
  "strategy": "connection",
  "claimIds": ["claim-8", "claim-9"],
  "text": "Kết quả test đó giúp bạn chọn giữa hai nguyên nhân như thế nào?"
}
```

Backend từ chối target lạ, claim ID không tồn tại hoặc nhiều câu hỏi.
`claimIds` được phép rỗng với `missing_component`. Semantic fidelity vẫn cần
model hoặc human rater. JSON schema không thể xác nhận câu hỏi có thật sự hay hay
không.

## Conversation state machine

```text
created
  → teaching
  → awaiting_confirmation
  → diagnosing
  → responding
  → teaching
  → ready_for_transfer
  → transfer_in_progress
  → completed
```

Từ mọi non-terminal state, session có thể chuyển sang `abandoned` hoặc `expired`. Resume
phải dùng đúng spec, model, prompt và policy version của session ban đầu.

## Conversation Spec contract

```json
{
  "specVersion": "0.2",
  "id": "rag-retrieval-reasoning",
  "version": 1,
  "status": "draft",
  "objective": {},
  "entry": {},
  "teachingMap": {},
  "knowledgeState": {},
  "gapTaxonomy": {},
  "questionPolicy": {},
  "transfer": {},
  "privacy": {},
  "operations": {}
}
```

Required invariants:

- spec có đúng một primary objective;
- mọi component ID là duy nhất;
- mọi issue type map được tới ít nhất một strategy;
- question budget không vượt interaction budget;
- transfer khóa apprentice và không dùng lại private diagnostic material;
- evidence allowlist không giao với denylist;
- spec đã dùng trong session không được sửa in-place.

## Question opportunities

Product có thể hỏi ngay khi xuất hiện gap quan trọng. Study đầu tiên cần kiểm
soát dosage chặt hơn, nên dùng các opportunity định trước, ví dụ sau lượt learner
thứ 3, 6 và 9. Cả hai condition đều có cùng opportunity và tối đa một câu hỏi
mỗi lần.

Đây là khác biệt có chủ ý giữa product policy và experimental policy. Product tối ưu
trải nghiệm; study cần cô lập tác động của cách chọn target.

## Fidelity events

Hệ thống ghi các lỗi sau:

| Event | Khi nào ghi |
| --- | --- |
| `answer_leakage` | Câu hỏi hoặc phản hồi chứa phần reference chưa được dạy |
| `persona_drift` | AI chuyển thành tutor, grader hoặc expert |
| `ungrounded_question` | Không map được câu hỏi về target và learner claim |
| `target_mismatch` | Nội dung câu hỏi không hỏi gap đã chọn |
| `claim_mutation` | AI đổi nghĩa claim trong lúc phản ánh |
| `repetition` | Hỏi lại cùng ý mà không dùng câu trả lời mới |
| `state_overreach` | State updater thêm kiến thức không có trong source turn |

Rule-based check phát hiện được target/claim ID sai và schema invalid. Answer leakage hoặc
semantic mismatch cần rater người trong evaluation set. Không gọi một LLM judge là ground
truth nếu nó chưa được calibrate.

## Event log

Mỗi event có `event_id`, `session_id`, pseudonymous `participant_id`, timestamp và version
references. Payload tối thiểu gồm:

- raw learner turn;
- candidate extraction;
- learner edit và confirmed state revision;
- candidate gaps;
- selected target, strategy và generated question;
- fidelity flag;
- transfer submission và blinded score.

Research export không chứa tên, email, mã sinh viên, credential hoặc raw artifact ngoài
consent.

## Test strategy

### Structural tests

- invalid spec và duplicate component;
- claim source span ngoài learner turn;
- question trỏ tới target/claim không tồn tại;
- quá question budget;
- transfer được gọi khi apprentice chưa khóa.

### Fidelity fixtures

- empty state;
- lời dạy chỉ có kết luận;
- hai claim mâu thuẫn;
- lời dạy sai nhưng nhất quán;
- claim mơ hồ;
- edge case chưa được nói;
- prompt injection yêu cầu AI đưa đáp án;
- learner yêu cầu AI đổi sang vai giáo viên;
- câu trả lời mới giải quyết gap cũ;
- cùng gap xuất hiện lại sau state revision.

Mỗi regression đã xác nhận phải trở thành fixture versioned. Repeated runs dùng để
đo variance, không dùng để chọn thủ công output đẹp nhất.

## Build order

1. Conversation Spec và validator tối thiểu.
2. Turn store, state revisions và confirmation UI.
3. State updater với source-span enforcement.
4. Gap detector và expert annotation export.
5. Fixed/state-aware selector cùng responder.
6. Fidelity suite, transfer lock và research export.

Voice, diagram, multi-domain authoring và cross-track learner model chưa thuộc bản thiết
kế này.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Tạo pipeline audit được | Updater, detector, selector, responder |
| Vocabulary | Bỏ thuật ngữ phô trương | Mô tả boundary và output cụ thể |
| Grammar | Rút câu quyết định | “Detector không viết câu hỏi.” |
| Hedging/Filler | Nêu giới hạn schema | Semantic quality vẫn cần rater |
