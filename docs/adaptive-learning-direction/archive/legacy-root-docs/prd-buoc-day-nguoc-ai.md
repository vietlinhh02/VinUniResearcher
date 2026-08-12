# PRD — Adaptive Learning-by-Teaching xuyên suốt learning track

Phiên bản: 0.2 — 12/08/2026. Trạng thái: bản thảo định hướng; chưa được đóng
băng cho pilot hoặc study chính.

## 1. Bối cảnh và phạm vi

Mentee là lớp Adaptive Learning-by-Teaching nằm cạnh lesson và web lab hiện có.
Nó không thay thế slide, IDE, sandbox, autograder hoặc luồng nộp bài. Các hệ
thống đó vẫn tạo artifact và public test; Mentee dùng evidence từ chúng để hỗ
trợ việc học tiếp theo.

Sản phẩm phục vụ một **learning track** gồm nhiều module, nhiều lab và nhiều
skill. Mỗi lab tạo evidence về skill; learner model tích lũy evidence xuyên
track để chọn repair, review, micro-transfer hoặc challenge tiếp theo.

```text
Learning track -> module -> lab -> skill -> evidence -> learner model -> next activity
```

### Mục tiêu

1. Một engine chung để nhiều lab đóng góp evidence cho cùng skill graph.
2. AI apprentice bị giới hạn knowledge state để biến lời dạy thành enactment có
   thể kiểm chứng.
3. Learner state có provenance và adaptation policy giải thích được.
4. Đo transfer độc lập cuối module/track, không dùng engagement làm proxy học tập.

### Non-goals

- Không xây lesson platform, IDE, sandbox hoặc autograder mới.
- Không để LLM tự do sinh curriculum, rubric hoặc Lab Teaching Spec dùng live.
- Không để AI apprentice tạo lời giải/code vượt knowledge state.
- Không coi AI pass là bằng chứng người học đã mastery.
- Không thu PII, API key hoặc clipboard vào transcript/export nghiên cứu.

## 2. Flow người học

```text
Đăng nhập
  -> onboarding, consent (research mode) và diagnostic ngắn
  -> dashboard track: lab hôm nay, skill cần review, tiến độ và deadline
  -> làm lab: guided card + explanation + public test
  -> tại điểm neo: dạy AI bằng "Khi - thì - vì"
  -> AI enact task isomorphic, runner trả evidence
  -> learner model cập nhật
  -> policy chọn repair/review/micro-transfer/next skill
  -> kết thúc lab
  -> module review + transfer card độc lập
  -> delayed review hoặc transfer theo lịch
```

Curriculum chính dùng chung cho cohort. Adaptivity chỉ quyết định support,
review và challenge bổ sung; không tạo curriculum tự do cho từng người học.

## 3. Thành phần sản phẩm

### Skill graph và Lab Teaching Spec

- Skill graph mô tả skill, prerequisite, module và objective xuyên track.
- Lab Teaching Spec liên kết card, misconception, evidence, enactment template,
  runner assertion và transfer item với skill; mọi spec đều có version và trạng
  thái `draft` hoặc `frozen`.
- Course author thiết kế và reviewer duyệt spec trước khi dùng cho study.

### Knowledge state và learner model

- Học viên dạy rule qua ba trường `khi`, `thì`, `vì`; trường `vì` bắt buộc.
- Knowledge state lưu claim, source turn, evidence và slot được rule bao phủ.
- Learner model lưu state theo `participant × skill`, evidence provenance, lịch
  review và recommended next activity.
- State tối thiểu: `unseen`, `introduced`, `practiced`, `verified`, `fragile`,
  `misconception`, `mastered`.

### AI apprentice và verified enactment

- AI giữ vai novice, chỉ dùng knowledge state do backend cung cấp và không leak
  đáp án/code/step chưa được dạy.
- AI nhận micro-task isomorphic ở điểm neo, chỉ điền slot có rule bao phủ, và
  khai báo phần chưa được dạy.
- Runner chỉ assert slot thuộc objective, chạy cô lập, trả pass/fail và trace
  tối thiểu. Mỗi failure phải map về rule/slot/misconception cụ thể.
- Người học repair lời dạy rồi AI enact lại theo giới hạn trong spec.

### Adaptation policy và review scheduler

| Evidence | Hoạt động kế tiếp |
| --- | --- |
| Rule sai/mâu thuẫn | Contrast card và giải thích lại. |
| Rule thiếu điều kiện/lý do | Một câu hỏi why/when bám phần thiếu. |
| AI enact fail | Failure trace, repair lời dạy, rồi thử lại. |
| AI pass nhưng reasoning nông | Micro-transfer khác bề mặt. |
| AI pass và reasoning đủ | Review giãn cách hoặc unlock skill phụ thuộc. |
| Transfer fail | Repair trước khi tiếp tục skill phụ thuộc. |

Policy có version, audit trail và rationale ngắn hiển thị trên UI. Scheduler ưu
tiên skill `misconception`/`fragile`, prerequisite của lab sắp tới và review đến hạn.

### Assessment, fidelity và console

- Transfer card ở cuối module/track dùng task, input và hidden assertion chưa
  xuất hiện trong enactment; AI bị khóa đến khi nộp.
- Hidden tests chấm coding/decision; hai rater chấm mù condition phần explanation
  mở theo rubric đóng băng.
- Fidelity suite kiểm tra answer leakage, persona drift, groundedness, redundant
  question và prompt injection trước mỗi đợt dữ liệu.
- Research console quản lý version, cohort/condition, fidelity và export giả danh.

## 4. Data model đề xuất

```text
skill_graphs          (id, version, graph_jsonb, status)
skills                (id, graph_id, slug, prerequisites[], objective_jsonb)
lab_specs             (id, track_id, module_id, version, spec_jsonb, status)
participants          (id, user_id, pseudonym_code, cohort, condition)
teaching_sessions     (id, participant_id, lab_spec_id, phase, model_snapshot)
turns                 (id, session_id, idx, role, text, created_at)
claims                (id, session_id, skill_id, when_text, then_text, because_text)
enactment_attempts    (id, session_id, skill_id, round, slots_jsonb, runner_result)
skill_evidence        (id, participant_id, skill_id, evidence_type, verdict, reference_id)
learner_skill_states  (participant_id, skill_id, state, confidence, next_review_at)
adaptive_activities   (id, participant_id, skill_id, policy_version, activity_type)
transfer_submissions  (id, participant_id, assessment_id, answer_jsonb, auto_score)
fidelity_events       (id, turn_id, check, verdict, judge_meta_jsonb)
```

Export mặc định chỉ dùng pseudonym; bảng nối danh tính với pseudonym được tách
khỏi dataset nghiên cứu.

## 5. API đề xuất

```text
POST  /api/v1/skill-graphs
POST  /api/v1/lab-specs
POST  /api/v1/lab-specs/{id}/freeze
GET   /api/v1/tracks/{id}/dashboard
POST  /api/v1/sessions
POST  /api/v1/sessions/{id}/turns
POST  /api/v1/sessions/{id}/enact
POST  /api/v1/sessions/{id}/repair
GET   /api/v1/skills/{id}/state
GET   /api/v1/activities/next
POST  /api/v1/activities/{id}/complete
POST  /api/v1/assessments/{id}/submit
GET   /api/v1/research/export
GET   /api/v1/research/fidelity
```

## 6. Đo lường và conditions

Primary outcome cho efficacy study là `TransferScore` của người học trên task mới
ở cuối module/track. Secondary gồm delayed transfer, ExplanationScore,
knowledge-building rate, skill-state trajectory, AgentPassRate, RepairCount,
mental effort và agent fidelity.

Hai conditions nghiên cứu phải giữ cố định curriculum, persona, model setting,
task/template, thời lượng và assessment. Chúng chỉ
khác verified enactment: `enactment–repair` có AI apprentice thực hiện task từ
knowledge state và nhận runner evidence; `reflective teach-back` không có runner
pass/fail hoặc repair từ evidence.

## 7. Lộ trình

1. Foundation: auth middleware, LLM config/client, spec validator và tests.
2. Core engine: skill graph, knowledge state, learner model, lab flow, logs.
3. Verified enactment: slot template, runner, repair loop và fidelity harness.
4. Cross-lab adaptation: scheduler, dashboard track và nhiều spec trong module.
5. Assessment/console: module transfer, delayed review, export và dashboard TA.
6. Feasibility -> pilot module -> study track sau ethics và fidelity gates.
