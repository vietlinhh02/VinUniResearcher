# Hướng chốt của project Mentee

## 1. Mentee là gì?

Mentee là một hoạt động học tập diễn ra **sau khi người học hoàn thành toàn bộ một
bài lab AI thực chiến**.

Mentee không thay thế:

- lesson hoặc slide;
- IDE và môi trường chạy code;
- sandbox;
- test và autograder;
- hệ thống nộp bài của trường.

Người học vẫn học, làm lab, chạy test và nộp artifact trên hệ thống hiện tại. Chỉ
khi toàn bộ lab đã hoàn thành, hệ thống mới chuyển người học sang một phiên Mentee.

Mục tiêu của phiên này là kiểm tra và củng cố một điều mà việc pass test chưa chứng
minh được:

> Người học có thực sự hiểu cách giải quyết vấn đề và có thể áp dụng reasoning đó
> vào một tình huống mới hay không?

## 2. Vấn đề project giải quyết

Một người học có thể hoàn thành lab bằng cách làm theo hướng dẫn, dùng starter
code, hỏi AI, thử nhiều lần hoặc sửa theo error message. Artifact cuối cùng có thể
pass test nhưng người học vẫn chưa chắc hiểu:

- tại sao giải pháp hoạt động;
- giải pháp đúng trong điều kiện nào;
- evidence nào hỗ trợ quyết định;
- phương án khác và trade-off là gì;
- cách xử lý khi bối cảnh thay đổi;
- cách tự giải một task tương tự mà không có hướng dẫn hoặc AI hỗ trợ.

Mentee yêu cầu người học dạy lại reasoning cho một AI apprentice. Sau đó người học
quan sát AI áp dụng chính lời dạy đó vào một task biến thể được runner kiểm chứng.
Nếu AI thất bại vì lời dạy thiếu hoặc sai, người học phải sửa reasoning.

## 3. Flow sản phẩm đã chốt

```text
1. Người học hoàn thành toàn bộ lab
2. Người học chạy test và nộp artifact
3. Hệ thống phát sự kiện lab_completed
4. Mentee nhận learning objectives và Lab Completion Summary
5. Mentee chọn một hoặc một vài skill trọng tâm của lab
6. Người học dạy AI apprentice theo Teaching Schema phù hợp
7. Hệ thống tạo knowledge state và cho người học xác nhận
8. AI áp dụng lời dạy vào một task biến thể
9. Runner kiểm chứng hành động hoặc kết quả của AI
10. Hệ thống trả failure evidence nhưng không đưa đáp án
11. Người học sửa lời dạy và AI thử lại
12. Hệ thống lưu evidence của phiên Mentee
13. Cuối module hoặc track, người học tự làm transfer task không có AI
```

Một lab tương ứng với tối đa một phiên Mentee:

```text
1 completed lab
→ 1 post-lab Mentee session
```

Phiên đó có thể bao gồm một hoặc một vài skill liên quan, nhưng Mentee không tạo
các phiên riêng và không chen vào sau từng checkpoint.

## 4. Vai trò của checkpoint

Checkpoint vẫn hữu ích, nhưng chỉ là nguồn evidence bên trong lab.

```text
Các checkpoint trong lab
├── test result
├── validator result
├── lỗi người học từng gặp
├── evaluation result
└── artifact metadata
        ↓
Lab Completion Summary
        ↓
Một phiên Mentee sau toàn bộ lab
```

Checkpoint không kích hoạt Mentee. Trigger duy nhất của flow post-lab là:

```text
lab_status = completed
```

Không dùng:

```text
checkpoint_status = passed
```

## 5. Lab Completion Summary

Sau khi lab hoàn thành, hệ thống trường gửi cho Mentee một bản tóm tắt an toàn.
Ví dụ:

```json
{
  "labId": "rag-evaluation",
  "labVersion": 3,
  "status": "completed",
  "learningObjectives": [
    "diagnose_retrieval_failure",
    "evaluate_quality_latency_tradeoff"
  ],
  "evidenceSummary": {
    "testsPassed": true,
    "evaluationCompleted": true,
    "artifactReference": "submission-42"
  }
}
```

Summary có thể tổng hợp kết quả từ nhiều checkpoint, nhưng không tự động gửi:

- API key hoặc secret;
- clipboard;
- raw log chứa PII;
- toàn bộ source code nếu không cần thiết;
- dữ liệu ngoài phạm vi đã được consent.

## 6. Chọn skill để người học dạy lại

Một lab có thể có nhiều learning objective. Mentee không nên bắt người học dạy lại
toàn bộ nội dung của lab.

Mỗi phiên chỉ chọn một hoặc một vài skill:

- quan trọng đối với mục tiêu của bài;
- cần reasoning thay vì chỉ ghi nhớ cú pháp;
- có thể áp dụng vào một task biến thể;
- có ground truth hoặc rubric đủ rõ;
- có thể kiểm chứng bằng runner.

Ví dụ trong một lab RAG, các objective có thể là:

1. Xây retrieval pipeline.
2. Phân tích retrieval failure.
3. Đánh giá trade-off giữa quality, latency và cost.

Mentee có thể chọn objective 2 hoặc 3 vì chúng thể hiện khả năng reasoning và
transfer rõ hơn việc chỉ cấu hình pipeline cho chạy được.

Ở giai đoạn đầu, course author định nghĩa skill bắt buộc và skill tùy chọn. LLM
không được tự do quyết định curriculum.

## 7. Teaching Schema

Teaching Schema là cấu trúc giúp người học diễn đạt reasoning theo đúng loại công
việc. Mentee không dùng một form chung như `Khi–thì–vì` cho mọi lab.

### Debugging

```text
Lỗi quan sát được
→ các nguyên nhân có thể xảy ra
→ test giúp phân biệt các nguyên nhân
→ kết quả test
→ kết luận
→ cách sửa và regression test
```

### RAG

```text
Nhóm query bị lỗi
→ nguyên nhân giả định
→ thay đổi retrieval/generation
→ cách đánh giá
→ ảnh hưởng quality/latency/cost
→ quyết định
```

### Prompt engineering và evaluation

```text
Behavior mục tiêu
→ failure quan sát được
→ prompt change
→ ảnh hưởng dự kiến
→ evaluation evidence
→ regression risk
```

### Agent và tool calling

```text
Trạng thái hiện tại
→ tool hoặc action
→ observation dự kiến
→ guardrail
→ recovery hoặc termination condition
```

### Safety và PII

```text
Loại dữ liệu
→ nguy cơ
→ biện pháp kiểm soát
→ cách kiểm chứng
→ residual risk và escalation
```

### Observability và incident investigation

```text
Signal
→ các hypothesis
→ investigation action
→ evidence chain
→ kết luận
→ remediation và prevention
```

### AI system design

```text
Requirement hoặc constraint
→ design decision
→ phương án bị loại
→ trade-off
→ validation evidence
```

Teaching Schema không chứa đáp án của scenario. Nó chỉ cho người học biết những
phần reasoning nào cần được giải thích.

## 8. Người học dạy AI apprentice

Người học điền reasoning bằng ngôn ngữ của mình theo Teaching Schema.

Ví dụ sau một lab RAG:

```text
Nhóm query bị lỗi:
Query chứa product code có Recall@10 thấp.

Nguyên nhân giả định:
Dense retrieval có thể bỏ sót exact identifier.

Thay đổi đề xuất:
Kết hợp BM25 và dense retrieval, sau đó rerank top results.

Cách đánh giá:
Đánh giá riêng nhóm query có product code bằng Recall@10 và citation support.

Trade-off:
Hybrid retrieval có thể tăng recall nhưng tăng latency, nên phải đo p95 latency
trước khi quyết định triển khai.
```

Người học đang dạy cách reasoning, không chỉ đưa một đáp án cho một input cụ thể.

## 9. Knowledge state

Mentee chuyển lời dạy thành các claim có cấu trúc:

```json
{
  "claims": [
    {
      "id": "claim-1",
      "field": "failure_slice",
      "content": "Queries containing product codes have low retrieval recall",
      "sourceTurn": 1,
      "learnerConfirmed": true
    },
    {
      "id": "claim-2",
      "field": "hypothesized_cause",
      "content": "Dense retrieval may miss exact identifiers",
      "sourceTurn": 2,
      "learnerConfirmed": true
    }
  ]
}
```

Mentee phải hiển thị lại các claim để người học xác nhận, sửa hoặc xóa. Chỉ state
đã được xác nhận mới được đưa cho AI apprentice.

AI không được:

- tự thêm kiến thức chuẩn vào state;
- sửa claim của người học;
- dùng reference answer;
- dùng kiến thức ngoài state để hoàn thiện task;
- đọc private ground truth hoặc transfer answer.

## 10. AI áp dụng lời dạy

AI apprentice nhận một task biến thể có cùng learning objective với lab nhưng khác:

- dữ liệu;
- tên và identifier;
- bối cảnh bề mặt;
- distractor;
- expected answer cụ thể.

AI phải trả structured output để runner kiểm tra. Ví dụ:

```json
{
  "failureSlice": "queries containing policy identifiers",
  "hypothesizedCause": "dense retrieval misses exact identifiers",
  "proposedAction": "evaluate hybrid retrieval",
  "evaluationMetrics": [
    "recall_at_10",
    "citation_support",
    "p95_latency"
  ],
  "claimIds": ["claim-1", "claim-2"]
}
```

Mỗi action hoặc conclusion phải dẫn tới claim nguồn. Nếu knowledge state chưa đủ,
AI phải trả `unknown` thay vì tự dùng kiến thức nền.

## 11. Runner và failure evidence

Runner kiểm tra structured output dựa trên ground truth đã được course author và
domain reviewer duyệt.

Runner có thể dùng:

- JSON Schema;
- unit test;
- hidden assertion;
- rule check;
- fixture;
- tool simulator;
- rubric mù cho phần reasoning mở.

Runner ưu tiên deterministic verification. LLM judge chỉ được dùng khi không thể
chấm bằng rule/test và phải được calibrate với người chấm thật.

Khi AI sai, Mentee chỉ ra phần reasoning thiếu hoặc không vận hành được.

Feedback phù hợp:

> AI đã đề xuất thay đổi retrieval nhưng lời dạy hiện chưa cung cấp cách đánh giá
> ảnh hưởng tới latency. Hãy xem lại phần trade-off.

Feedback không phù hợp:

> Hãy thêm p95 latency và yêu cầu nó nhỏ hơn 500 ms.

Feedback thứ hai tiết lộ expected metric/value và làm mất cơ hội để người học tự
sửa reasoning.

## 12. Repair

Sau failure evidence, người học bổ sung hoặc sửa lời dạy. Mentee cập nhật knowledge
state, yêu cầu người học xác nhận rồi cho AI thử lại.

Hệ thống lưu:

- knowledge state trước repair;
- runner failure;
- feedback đã hiển thị;
- reasoning người học sửa;
- knowledge state sau repair;
- kết quả attempt tiếp theo;
- số lần thử và thời gian.

AI pass chỉ có nghĩa là lời dạy đủ để AI xử lý scenario đó. Nó không có nghĩa người
học đã mastery.

## 13. Transfer assessment

Cuối module, một nhóm lab liên quan hoặc toàn track, người học nhận task mới và AI
bị khóa hoàn toàn.

Transfer task phải:

- đo cùng learning objective;
- khác dữ liệu và bối cảnh bề mặt;
- không dùng lại enactment scenario;
- không dùng lại private assertion hoặc ground truth;
- có scoring rule được viết trước;
- được domain reviewer duyệt;
- được pilot để tránh quá dễ hoặc quá khó.

Kết quả transfer là learning outcome chính. Số lượt chat, số lần repair, mức hài
lòng và việc AI pass chỉ là process/UX metrics.

## 14. Lab Teaching Spec

Mỗi lab tích hợp với engine qua một `Lab Teaching Spec`. Đây là hợp đồng giữa nội
dung lab và Mentee.

Spec khai báo:

- trigger `lab_completed`;
- lab ID và version;
- learning objectives;
- evidence được phép nhận từ Lab Completion Summary;
- quy tắc chọn skill;
- Teaching Schema;
- cách chuyển lời dạy thành knowledge state;
- scenario bank;
- output schema của apprentice;
- runner assertions;
- feedback policy;
- transfer blueprint.

Ví dụ:

```yaml
id: rag-evaluation-lab-teaching
version: 1

trigger:
  event: lab_completed

lab:
  id: rag-evaluation
  version: 3

evidence_input:
  source: lab_completion_summary
  includes:
    - checkpoint_results
    - validator_results
    - evaluation_summary
    - artifact_reference

skill_selection:
  required:
    - diagnose_retrieval_failure
  optional:
    - evaluate_quality_latency_tradeoff
  max_skills: 2

session:
  max_sessions_per_lab: 1

enactment:
  scenario_bank: rag-scenarios-v1
  output_schema: rag-action-v1
  max_repairs: 2
```

Checkpoint results có thể nằm trong evidence đầu vào, nhưng không phải trigger.

## 15. Kiến trúc tổng quát cho nhiều lab

```text
School Lab
  -> lab_completed event
  -> Lab Completion Summary
  -> Lab Teaching Spec
  -> post-lab Teaching Session
      -> Teaching Schema
      -> confirmed Knowledge State
      -> constrained AI Apprentice
      -> structured Enactment
      -> Runner
      -> Failure Evidence
      -> Repair
  -> Independent Transfer Assessment
```

Engine không hard-code RAG, debugging, observability hoặc PII. Kiến thức riêng của
domain nằm trong `Lab Teaching Spec`, scenario bank và runner assertions.

## 16. Phạm vi build

### Giai đoạn 1: Foundation

Xây:

- format và validator cho `Lab Teaching Spec`;
- `lab_completed` integration contract;
- Lab Completion Summary;
- event model và storage;
- knowledge-state extraction và confirmation.

### Giai đoạn 2: Một vertical slice hoàn chỉnh

Chọn một lab có objective rõ, fixture tốt, runner deterministic và reviewer sẵn
có. Hoàn thành flow từ `lab_completed` đến repair.

Không mặc định chọn Observability. Có thể chọn debugging, RAG, agent/tool calling
hoặc lab khác nếu dễ kiểm chứng và tích hợp hơn.

### Giai đoạn 3: Kiểm tra khả năng tổng quát

Thêm ít nhất hai Lab Teaching Spec thuộc hai họ task khác. Ví dụ:

1. Một executable/tool task.
2. Một evaluation/decision task.
3. Một diagnosis/safety/design task.

Cả ba phải chạy trên cùng engine và UI primitives, không viết backend riêng cho
từng lab.

### Giai đoạn 4: Assessment và fidelity

Xây:

- transfer assessment;
- answer-leakage test;
- unsupported-action detection;
- persona-drift test;
- prompt-injection test;
- runner determinism test;
- pseudonymous research export.

### Giai đoạn 5: Product pilot

Đánh giá:

- người học có hiểu Teaching Schema không;
- extraction có phản ánh đúng lời dạy không;
- AI có tuân thủ knowledge state không;
- failure evidence có giúp repair mà không leak đáp án không;
- course author mất bao lâu để viết một spec;
- flow có quá dài hoặc gây gián đoạn không.

### Giai đoạn 6: Research comparison

Khi sản phẩm đã ổn định, so sánh:

- `reflective teach-back`: AI phản ánh reasoning nhưng không có verified enactment;
- `verified enactment–repair`: AI enact, runner kiểm chứng và learner repair.

Hai condition phải giữ nguyên objective, schema, scenario exposure, persona, model,
UI, thời lượng và transfer assessment.

Research question:

> Verified enactment–repair có giúp người học tự làm transfer task tốt hơn
> reflective teach-back hay không?

## 17. Adaptive learning xuyên track

Adaptive scheduler chưa phải phần đầu tiên cần build.

Ở giai đoạn đầu, hệ thống chỉ lưu evidence theo:

```text
participant
× lab
× learning objective
× post-lab Mentee session
```

Chỉ sau khi evidence cấp session đáng tin cậy mới xây:

- learner model xuyên nhiều lab;
- skill prerequisite graph;
- review scheduler;
- spaced review;
- lựa chọn skill cần repair;
- mở khóa skill phụ thuộc.

Không cá nhân hóa learning track dựa trên evidence chưa được validate.

## 18. Hướng chốt trong một đoạn

Mentee là một engine bổ sung sau các bài lab AI thực chiến. Sau khi người học hoàn
thành và nộp toàn bộ lab, Mentee nhận learning objectives cùng evidence summary của
lab. Người học dạy lại một hoặc vài kỹ năng trọng tâm cho AI apprentice theo
Teaching Schema phù hợp. Hệ thống chuyển lời dạy thành knowledge state và cho người
học xác nhận. AI chỉ dùng state đó để xử lý một task biến thể. Runner kiểm chứng kết
quả và cung cấp failure evidence để người học sửa reasoning mà không nhận đáp án.
Cuối module hoặc track, người học tự giải một task mới không có AI hỗ trợ. Sản phẩm
được xây thành engine chung thông qua `Lab Teaching Spec`; research chạy song song,
nhưng ưu tiên chính là build một hệ thống thực tế, mở rộng được và kiểm chứng được.
