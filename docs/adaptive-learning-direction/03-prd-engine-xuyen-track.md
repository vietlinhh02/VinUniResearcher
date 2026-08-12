# PRD — Mentee engine đa lab AI thực chiến

Phiên bản: 0.3. Trạng thái: product-first draft.

## 1. Mục tiêu

Xây một engine Learning-by-Teaching có kiểm chứng, tích hợp được với nhiều lab
thông qua spec thay vì code riêng cho từng nội dung.

### Product outcomes

1. Course author có thể khai báo một checkpoint mới bằng spec versioned.
2. Learner dạy apprentice theo reasoning schema phù hợp với task.
3. Apprentice chỉ enact từ confirmed knowledge state.
4. Runner kiểm chứng action/result và trả feedback không leak.
5. Hệ thống lưu đủ evidence cho vận hành và research sau này.

### Non-goals của alpha/beta

- Không thay lesson, IDE, sandbox, autograder hoặc submission.
- Không tự sinh curriculum hoặc ground truth live.
- Không cá nhân hóa toàn bộ track.
- Không chẩn đoán mastery bằng LLM.
- Không hỗ trợ mọi dạng lab ngay trong bản đầu.

## 2. Actors

- Learner: hoàn thành lab, dạy apprentice, repair và làm transfer.
- Course author: viết objectives, schema, scenario và assertions.
- Domain reviewer: duyệt content validity và ground truth.
- Operator/researcher: quản lý version, fidelity và export giả danh.
- School lab: gửi evidence summary và nhận completion status.

## 3. Lab Teaching Spec

```yaml
id: rag-retrieval-analysis-v1
objective:
  id: rag.retrieval.failure_analysis
  description: Diagnose retrieval failures using evaluation evidence
evidence_input:
  allowed: [checkpoint_verdict, eval_summary, artifact_reference]
teaching_schema:
  family: rag_evaluation
  fields:
    - failure_slice
    - hypothesized_source
    - intervention
    - evaluation_plan
    - tradeoff
knowledge_mapping:
  require_learner_confirmation: true
enactment:
  scenario_bank: rag-retrieval-scenarios-v1
  output_schema: rag-action-v1
  max_repairs: 2
runner:
  assertions:
    - action_is_grounded
    - evaluation_matches_failure_slice
    - decision_uses_quality_and_latency
feedback:
  reveal: [failed_assertion_category, implicated_claim]
  hide: [expected_action, expected_value, transfer_answer]
transfer:
  blueprint: rag-transfer-v1
```

Spec validator phải fail fast khi field được chấm không có assertion, scenario
không có ground truth, hoặc feedback cho phép lộ expected answer.

## 4. Functional requirements

### Integration

- Nhận signed checkpoint event hoặc import thủ công.
- Allowlist evidence fields theo spec.
- Idempotent khi nhận lại cùng checkpoint event.
- Không lưu secret/raw PII.

### Authoring

- Validate schema, scenario, assertions và transfer separation.
- Preview learner flow và runner result.
- Spec có `draft`, `reviewed`, `frozen`, `retired`.
- Không sửa in-place spec đã dùng trong study/session; tạo version mới.

### Teaching

- Render field và guidance từ spec.
- Cho phép natural-language input, không ép câu template chung.
- Hiện extracted claims cạnh source text để learner xác nhận.
- Không enact khi state chưa được xác nhận.

### Apprentice

- Nhận objective, scenario public context và confirmed knowledge state.
- Trả JSON theo output schema.
- Mỗi action/kết luận trỏ tới claim nguồn.
- Trả `unknown` thay vì dùng kiến thức ngoài state.

### Runner

- Validate JSON schema trước semantic assertions.
- Ưu tiên deterministic checks.
- Tách public scenario context khỏi private ground truth.
- Trả verdict có mã lỗi ổn định và trace tối thiểu.
- Không thực thi code không tin cậy ngoài sandbox hiện có.

### Repair

- Feedback map về assertion và claim/schema field.
- Lưu diff knowledge state giữa các attempt.
- Không đưa expected action/value.
- Dừng đúng giới hạn attempt của spec.

### Transfer

- Khóa apprentice và feedback đến khi submit.
- Không tái sử dụng scenario hoặc private assertion của enactment.
- Hỗ trợ auto-score và blind rubric.

## 5. Data model tối thiểu

```text
lab_specs              (id, version, status, spec_json, content_hash)
objectives             (id, description, domain, schema_family)
scenario_sets          (id, version, status)
scenarios              (id, set_id, public_input, private_ground_truth)
participants           (id, pseudonym, cohort, condition)
checkpoint_events      (id, participant_id, spec_id, evidence_summary)
teaching_sessions      (id, participant_id, spec_id, scenario_id, status)
teaching_inputs        (id, session_id, schema_field, text, turn)
knowledge_claims       (id, session_id, field, content, source_turn, confirmed)
enactment_attempts     (id, session_id, round, output_json, model_snapshot)
runner_verdicts        (id, attempt_id, assertion_id, verdict, trace_code)
repairs                (id, session_id, round, before_hash, after_hash)
transfer_submissions   (id, participant_id, assessment_id, answer, score)
fidelity_events        (id, attempt_id, check_id, verdict, metadata)
```

Danh tính thật và pseudonym mapping nằm ngoài research export.

## 6. API tối thiểu

```text
POST /api/v1/checkpoints
GET  /api/v1/sessions/{id}
POST /api/v1/sessions/{id}/teaching-inputs
POST /api/v1/sessions/{id}/knowledge-state/extract
POST /api/v1/sessions/{id}/knowledge-state/confirm
POST /api/v1/sessions/{id}/enactments
POST /api/v1/sessions/{id}/repairs
POST /api/v1/transfers/{id}/submissions

POST /api/v1/authoring/specs/validate
POST /api/v1/authoring/specs
POST /api/v1/authoring/specs/{id}/freeze
POST /api/v1/authoring/scenarios/validate
GET  /api/v1/operations/fidelity
GET  /api/v1/research/export
```

## 7. Vertical slices

Không chốt domain theo tài liệu. Team chọn spec đầu dựa trên fixture, reviewer và
runner sẵn có. Beta phải có ít nhất ba họ task khác nhau:

| Slice | Điều cần chứng minh |
| --- | --- |
| Structured code/tool task | Runner chấm hành vi executable hoặc tool sequence |
| Evaluation/decision task | Runner chấm evidence, metric và trade-off |
| Diagnosis/safety/design task | Runner chấm reasoning chain có ground truth |

## 8. Acceptance criteria

### Alpha

- Một session chạy được từ checkpoint đến repair.
- 100% evaluated action có claim provenance hoặc bị đánh dấu unsupported.
- Runner result tái lập trên cùng input/spec version.
- Learner có thể sửa extraction trước enactment.
- Không có answer/ground-truth field trong apprentice context.

### Beta

- Ba spec khác họ task chạy trên cùng engine và UI primitives.
- Spec validator bắt được invalid mapping và transfer overlap.
- Fidelity suite bao phủ leakage, unsupported action, persona drift và injection.
- Export tái dựng được toàn bộ session từ versioned event.

## 9. Milestones

1. Foundation: spec schema, validator, storage và event model.
2. Session core: teaching UI/API, extraction và confirmation.
3. Verified enactment: structured output, runner và repair.
4. Generalization: thêm hai schema family và author preview.
5. Assessment: independent transfer và blind export.
6. Pilot: usability/fidelity, rồi mới comparison research.
