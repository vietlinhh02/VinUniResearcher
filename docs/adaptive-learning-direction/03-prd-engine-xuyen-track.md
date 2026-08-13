# PRD: phiên reciprocal AI apprentice sau lab

Phiên bản: 0.5
Trạng thái: draft theo feedback ngày 13/08/2026

## Mục tiêu

Sau khi hoàn thành lab, learner dạy lại một skill cho AI apprentice. Hệ thống
ghi nhận điều learner đã giải thích, phản hồi vào phần chưa rõ, nhận câu trả lời
mới và cập nhật knowledge state lần nữa.

Alpha cần trả lời được câu hỏi vận hành: hệ thống có dựng lại được một vòng
`learner → AI → learner` với provenance đầy đủ hay không?

## Phạm vi alpha

Alpha hỗ trợ một learning objective và text chat tiếng Việt. Course author viết
Conversation Spec dưới dạng file versioned. Domain reviewer duyệt teaching map,
issue taxonomy, reciprocal actions và transfer rubric.

Chưa có:

- AI chạy lại bài lab;
- runner chấm lời giải của AI;
- comparative policy study đã freeze;
- adaptive curriculum xuyên track;
- authoring UI đa lĩnh vực;
- voice, diagram hoặc role-play;
- kết luận mastery tự động.

## Actors

- Learner hoàn thành lab, dạy AI, xác nhận state, phản hồi AI và làm transfer.
- Course author viết objective, teaching map và lesson material.
- Domain reviewer duyệt content validity và annotation guide.
- Researcher quản lý version, fidelity và export giả danh.
- School lab gửi completion summary tối thiểu.

## Product flow

```text
lab_completed
→ create post-lab session
→ learner teaching turn
→ extract and confirm claims
→ detect unresolved issue
→ select reciprocal action
→ AI response
→ learner uptake
→ state revision and target transition
→ repeat within interaction budget
→ lock apprentice
→ independent transfer
```

Một lab tạo tối đa một Mentee session. Alpha chỉ dùng một objective để giữ
construct rõ.

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

reciprocal_policy:
  actions:
    - reflect_back
    - clarify
    - probe_reason
    - connect
    - check_conflict
    - request_example
  max_responses: 4

transfer:
  blueprint: rag-retrieval-transfer-v1
  apprentice_disabled: true
```

Spec validator từ chối component trùng ID, action không được hỗ trợ, transfer
không khóa apprentice hoặc evidence field giao với denylist.

## Functional requirements

### Integration

- Nhận event `lab_completed` theo cơ chế idempotent.
- Chỉ nhận evidence nằm trong allowlist của spec.
- Không tự đọc source code, secret, raw log hoặc PII.
- Ghi lab, objective và spec version cho mỗi session.

### Teaching và state update

- Giải thích rõ learner đang dạy, không làm quiz với AI tutor.
- Giữ nguyên raw learner turn cho audit.
- Hiện claim cùng source span để learner xác nhận, sửa hoặc xóa.
- Không dùng unconfirmed state để tạo reciprocal response.
- Tạo immutable revision sau mỗi confirmation.

### Issue detection

- Map unresolved issue về component và claims liên quan.
- Dùng issue taxonomy đã freeze trong spec.
- Tách learner claims khỏi private reference material.
- Giữ raw model output và expert override trong technical evaluation.

### Reciprocal response

- Chọn tối đa một target và một action mỗi response.
- Lưu target, action, supporting claims và policy version.
- Không hỏi ngoài objective hoặc ngầm đưa reference answer.
- Giữ vai học trò; không chấm điểm hoặc giảng bài.
- Cho phép `reflect_back` hoặc không phản hồi khi không có target hợp lệ.

### Learner uptake

- Liên kết learner turn tiếp theo với response gần nhất.
- Cho phép learner bỏ qua response.
- Cập nhật state từ uptake turn bằng cùng confirmation flow.
- Ghi before/after revision và target transition.
- Không tự gán `resolved` chỉ vì learner trả lời dài.

### Transfer

- Khóa apprentice và feedback trước khi learner submit.
- Dùng task chưa xuất hiện trong teaching session.
- Chấm theo rule hoặc rubric đã được reviewer duyệt trước pilot.
- Không dùng condition/transcript để người chấm suy ra participant.

## Data model tối thiểu

```text
conversation_specs   (id, version, status, content_hash)
sessions             (id, participant_id, spec_id, status)
turns                (id, session_id, sequence, role, text, created_at)
knowledge_states     (id, session_id, revision, parent_id, confirmed_at)
claims               (id, state_id, component_id, content, source_turn_id)
issues               (id, state_id, component_id, issue_type, claim_ids)
responses            (id, session_id, target_id, action, text, policy_version)
uptake_events         (id, response_id, turn_id, before_state_id, after_state_id)
target_transitions    (id, uptake_id, before_status, after_status, verdict)
transfer_attempts    (id, session_id, blueprint_version, score)
fidelity_events      (id, session_id, type, severity, evidence)
```

Danh tính thật và participant ID nằm ở hai nơi khác nhau. Research export chỉ dùng
pseudonym.

## API tối thiểu

```text
POST /api/v1/lab-completions
POST /api/v1/sessions
GET  /api/v1/sessions/{id}
POST /api/v1/sessions/{id}/turns
POST /api/v1/sessions/{id}/knowledge-state/extract
POST /api/v1/sessions/{id}/knowledge-state/confirm
POST /api/v1/sessions/{id}/issues/detect
POST /api/v1/sessions/{id}/responses/select
POST /api/v1/sessions/{id}/uptake
POST /api/v1/sessions/{id}/complete
POST /api/v1/transfers/{id}/submissions
GET  /api/v1/research/export
```

UI có thể gọi một orchestration endpoint. Event log vẫn tách các stage để audit.

## Acceptance criteria

Alpha hoàn thành khi:

- một session chạy từ `lab_completed` đến transfer;
- learner sửa được claim trước khi AI phản hồi;
- mọi AI response map về target/action đã lưu;
- uptake turn tạo state revision và target transition;
- learner có thể bỏ qua response mà session không lỗi;
- prompt injection không làm agent đưa đáp án hoặc đổi vai;
- event log dựng lại được toàn bộ reciprocal loop;
- research export không chứa direct identifier.

Technical và feasibility thresholds được protocol định trước. Không đặt số theo
cảm tính trong PRD.

## Milestones

1. Freeze objective, teaching map và annotation guide.
2. Xây turn storage, state revisions và confirmation.
3. Thêm issue detector và reciprocal response record.
4. Thêm uptake tracking và target transition.
5. Chạy fidelity suite và expert evaluation.
6. Chạy usability/feasibility pilot.
7. Chọn comparative research question từ pilot evidence.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Hoàn thiện nửa sau của product flow | Uptake và transition |
| Inflation | Bỏ comparative study khỏi alpha | Chọn RQ sau pilot |
| Vocabulary | Thay question endpoint | Reciprocal response endpoint |
| Hedging/Filler | Thêm acceptance criteria cụ thể | Event log dựng lại loop |
