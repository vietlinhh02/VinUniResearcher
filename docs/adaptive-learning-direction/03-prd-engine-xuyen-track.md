# PRD: phiên AI apprentice sau lab

Phiên bản: 0.4 Trạng thái: draft theo feedback ngày 13/08/2026

## Mục tiêu

Sau khi hoàn thành một lab, learner dạy lại một skill cho AI apprentice. Hệ thống theo
dõi điều learner đã giải thích và đặt câu hỏi tiếp theo vào đúng phần còn
thiếu. Phiên kết thúc bằng một task độc lập để đo learner, không đo AI.

Alpha cần trả lời được một câu đơn giản: với cùng một lời dạy, hệ
thống có lưu đúng knowledge state và hỏi một câu grounded hay không?

## Phạm vi alpha

Alpha hỗ trợ một learning objective, text chat tiếng Việt và hai question policy. Course
author viết spec dưới dạng file versioned. Domain reviewer duyệt teaching map, question
boundaries và transfer rubric.

Chưa có:

- AI chạy lại bài lab;
- runner chấm lời giải của AI;
- adaptive curriculum xuyên track;
- authoring UI đa lĩnh vực;
- voice, diagram hoặc role-play;
- kết luận mastery tự động.

## Actors

- Learner hoàn thành lab, dạy AI, xác nhận knowledge state và làm transfer.
- Course author viết objective, teaching map và lesson material.
- Domain reviewer duyệt content validity và annotation guide.
- Researcher quản lý condition, version, fidelity và export giả danh.
- School lab gửi completion summary tối thiểu.

## Product flow

```text
lab_completed
→ create post-lab session
→ show objective and apprentice role
→ learner teaching turn
→ extract and confirm claims
→ detect candidate gaps
→ select and ask one follow-up question
→ update state from learner response
→ repeat within budget
→ lock apprentice
→ independent transfer
```

Một lab tạo tối đa một phiên Mentee. Phiên có thể tập trung vào một hoặc hai
skill, nhưng alpha chỉ dùng một skill để giữ construct rõ.

## Conversation Spec

```yaml
id: rag-retrieval-reasoning-v1
version: 1
status: draft

objective:
  id: rag.retrieval.failure_analysis
  description: Explain how evidence distinguishes retrieval failure causes

entry:
  event: lab_completed
  allowed_evidence:
    - completion_status
    - evaluation_summary
    - artifact_reference

teaching_map:
  components:
    - observed_failure
    - candidate_cause
    - discriminating_test
    - evidence
    - conclusion

knowledge_state:
  learner_confirmation: required
  preserve_source_span: true

question_policy:
  strategies:
    - clarification
    - elaboration
    - connection
    - edge_case
  opportunities: 3
  max_questions: 3

transfer:
  blueprint: rag-retrieval-transfer-v1
  apprentice_disabled: true
```

Spec validator phải từ chối component trùng ID, question strategy không được hỗ trợ,
transfer không khóa apprentice hoặc evidence field giao với denylist.

## Functional requirements

### Integration

- Nhận event `lab_completed` theo cơ chế idempotent.
- Chỉ nhận evidence nằm trong allowlist của spec.
- Không tự đọc source code, secret, raw log hoặc PII.
- Ghi rõ lab, objective và spec version cho mỗi session.

### Teaching

- Giải thích rõ learner đang dạy, không làm quiz với AI tutor.
- Nhận text tiếng Việt và giữ nguyên raw turn cho audit.
- Hiện claim cùng source span để learner xác nhận, sửa hoặc xóa.
- Không dùng unconfirmed state để chọn câu hỏi.

### State update

- Trích xuất claim mà không thêm kiến thức learner chưa nói.
- Tạo revision mới sau mỗi confirmation.
- Giữ provenance từ claim về turn nguồn.
- Ghi model, prompt và sampling configuration.

### Gap detection

- Map candidate gap về component và claim liên quan.
- Dùng taxonomy issue type đã freeze trong spec.
- Tách learner claim khỏi private reference material.
- Cho phép expert override trong technical evaluation; override không âm thầm sửa
  model output.

### Question selection

- Chọn tối đa một câu ở mỗi opportunity.
- Lưu target, strategy, supporting claim và policy version.
- Không hỏi ngoài objective hoặc ngầm đưa reference answer.
- Không lặp lại cùng target nếu learner đã trả lời và gap detector chưa xử lý
  lượt mới.
- Giữ vai học trò; không chấm điểm hoặc giảng bài.

### Transfer

- Khóa apprentice, câu hỏi và feedback trước khi learner submit.
- Dùng task chưa xuất hiện trong teaching session.
- Chấm theo rule hoặc rubric đã được reviewer duyệt trước pilot.
- Không dùng transcript condition để người chấm suy ra nhóm.

## Data model tối thiểu

```text
conversation_specs   (id, version, status, content_hash)
sessions             (id, participant_id, spec_id, condition, status)
turns                (id, session_id, sequence, role, text, created_at)
knowledge_states     (id, session_id, revision, parent_id, confirmed_at)
claims               (id, state_id, component_id, content, source_turn_id)
gap_candidates       (id, state_id, component_id, issue_type, claim_ids)
question_events      (id, session_id, opportunity, policy, target_id, strategy)
transfer_attempts    (id, session_id, blueprint_version, score)
fidelity_events      (id, session_id, type, severity, evidence)
```

Danh tính thật và participant ID phải nằm ở hai nơi khác nhau. Research export chỉ
dùng pseudonym.

## API tối thiểu

```text
POST /api/v1/lab-completions
POST /api/v1/sessions
GET  /api/v1/sessions/{id}
POST /api/v1/sessions/{id}/turns
POST /api/v1/sessions/{id}/knowledge-state/extract
POST /api/v1/sessions/{id}/knowledge-state/confirm
POST /api/v1/sessions/{id}/gaps/detect
POST /api/v1/sessions/{id}/questions/select
POST /api/v1/sessions/{id}/complete
POST /api/v1/transfers/{id}/submissions
GET  /api/v1/research/export
```

Internal orchestration có thể gộp extract, detect và select trong một request từ UI. Các
event vẫn phải tách để audit được pipeline.

## Acceptance criteria

Alpha hoàn thành khi:

- một session chạy từ `lab_completed` đến transfer;
- learner sửa được extracted claim trước khi hệ thống hỏi tiếp;
- mọi câu hỏi map được về một gap và ít nhất một component;
- prompt-injection test không làm agent đưa đáp án hoặc đổi vai;
- cùng một session có thể dựng lại từ event log và version references;
- research export không chứa direct identifier.

Technical evaluation phải đạt threshold được protocol định trước. Không đặt con
số threshold theo cảm tính trong PRD; team sẽ freeze nó sau vòng expert annotation đầu
tiên.

## Milestones

1. Freeze objective, teaching map và annotation guide.
2. Xây session, turn storage và knowledge-state confirmation.
3. Thêm gap detector và question-selection record.
4. Implement fixed và state-aware policy trên cùng question schedule.
5. Chạy adversarial/fidelity suite và expert evaluation.
6. Chạy usability pilot, sửa flow rồi freeze comparative protocol.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Thu gọn PRD | Một phiên post-lab rồi transfer |
| Inflation | Bỏ scope đa domain ở alpha | Text, một objective, hai policy |
| Vocabulary | Thay runner bằng question pipeline | Gap detection và question selection |
| Hedging/Filler | Gắn quyết định với gate | Freeze sau expert annotation |
