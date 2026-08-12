# Chiến lược product và research song song

Trạng thái: định hướng build hiện hành; chưa phải protocol nghiên cứu đã freeze.

## 1. Ưu tiên

Mentee dành phần lớn nguồn lực cho sản phẩm. Research đóng vai trò tạo guardrail
và kiểm tra cơ chế, không biến prototype thành một survey tool.

Phân bổ định hướng:

- Khoảng 70–80%: engine, authoring spec, runner, UX repair và tích hợp lab.
- Khoảng 20–30%: fidelity harness, assessment, event schema và pilot protocol.

Tỷ lệ là nguyên tắc quản trị, không phải cam kết lịch cứng.

## 2. Kiến trúc sản phẩm

```text
School lab
  -> Evidence Adapter
  -> Lab Teaching Spec
  -> Teaching Session
      -> learner input
      -> confirmed Knowledge State
      -> constrained Apprentice
      -> Enactment Runner
      -> Repair Loop
  -> Transfer Assessment
  -> Event/Fidelity Store
```

### Evidence Adapter

Nhận dữ liệu tối thiểu: lab/checkpoint ID, objective ID, validator verdict và
artifact reference hoặc summary đã lọc. Adapter không mặc định tải toàn bộ repo,
clipboard, raw logs hoặc credentials.

### Lab Teaching Spec

Là plugin contract của nội dung, gồm:

- objective và prerequisite;
- Teaching Schema;
- misconception/distractor;
- knowledge-state mapping;
- scenario variants;
- enactment output schema;
- runner assertions;
- feedback policy;
- transfer blueprint.

### Teaching Session

Learner giải thích bằng ngôn ngữ tự nhiên theo cấu trúc công việc. Backend trích
claim có provenance và yêu cầu learner xác nhận. AI chỉ nhận state đã xác nhận.

### Enactment Runner

Runner ưu tiên kiểm tra deterministic: JSON schema, rule checks, tests, fixture và
ground truth. LLM judge chỉ dùng cho phần không thể chấm deterministic, phải có
rubric và validation với rater người.

## 3. Nguyên tắc tổng quát hóa

Engine không biết `trace`, `retrieval`, `prompt` hay `PII` là gì. Các khái niệm
domain nằm trong spec. Engine chỉ biết các primitive:

```text
objective
schema field
claim
source/provenance
scenario input
action slot
assertion
verdict
feedback hint
repair
transfer item
```

Một lab mới không được yêu cầu viết flow/backend riêng. Nếu cần primitive mới,
team phải chứng minh primitive đó dùng cho ít nhất ba trường hợp hoặc thực sự là
yêu cầu nền tảng không thể biểu diễn bằng contract hiện có.

## 4. Research được cài vào sản phẩm như thế nào

Ngay từ bản đầu, hệ thống lưu:

- phiên bản spec, prompt, model và runner;
- knowledge state trước/sau learner confirmation;
- agent action và claim nguồn;
- assertion verdict và feedback đã hiện;
- repair diff, thời gian và attempt;
- fidelity event;
- condition nếu session thuộc study.

Nhờ vậy có thể chạy feasibility và efficacy sau này mà không viết lại engine.

## 5. Các giai đoạn

### Build alpha

- Một vertical slice hoạt động end-to-end.
- Author spec bằng file versioned.
- Structured enactment và deterministic runner.
- Knowledge-state confirmation và repair.
- Không cần learner model xuyên track.

### Generalization beta

- Ít nhất ba spec thuộc các họ task khác nhau.
- Không fork UI/backend theo từng lab.
- Fidelity regression suite chạy được cho mọi spec.
- Có author preview và scenario validation.

### Product pilot

- Tích hợp với một module thực tế.
- Usability, latency, authoring cost và failure attribution đạt gate.
- Transfer task được expert review và pilot độ khó.

### Efficacy study

- So sánh `verified enactment–repair` với `reflective teach-back`.
- Freeze protocol, model, prompt, spec, scenario bank và rubric.
- Có ethics/IRB approval hoặc quyết định tương đương.

### Adaptive track

Chỉ sau khi evidence ở cấp session đáng tin cậy mới thêm learner model, review
scheduler và prerequisite policy xuyên nhiều lab.

## 6. Success metrics

### Product

- Tỷ lệ learner hoàn thành flow.
- Thời gian author một spec mới.
- Tỷ lệ scenario/runner pass validation.
- Tỷ lệ failure map được về claim hoặc schema field.
- Latency và cost mỗi enactment.
- Tỷ lệ learner xác nhận extraction đúng.

### Learning/research

- Primary: independent transfer score.
- Secondary: delayed transfer, explanation quality, mental effort.
- Process: repair count, grounded action rate, knowledge-state change.
- Fidelity: leakage, persona drift, unsupported action, feedback leakage.

Không dùng số lượt chat, độ dài câu trả lời, satisfaction hoặc AI pass làm learning
outcome.
