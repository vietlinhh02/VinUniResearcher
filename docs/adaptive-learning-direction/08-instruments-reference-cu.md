# Instrumentation, usability và transfer assessment

## 1. Mục tiêu đo

Product telemetry trả lời hệ thống có dùng được và đáng tin không. Research
assessment trả lời learner có tự áp dụng skill trong task mới không. Hai loại dữ
liệu phải tách trong dashboard và claim.

## 2. Event schema

```json
{
  "schemaVersion": 1,
  "eventId": "evt-...",
  "eventType": "knowledge_state_confirmed",
  "participantId": "P001",
  "sessionId": "S001",
  "spec": {"id": "rag-retrieval-analysis", "version": 1},
  "objectiveId": "rag.retrieval.failure_analysis",
  "condition": "product",
  "timestamp": "ISO-8601",
  "payload": {}
}
```

Event bắt buộc:

- `checkpoint_received`
- `teaching_started`
- `teaching_input_submitted`
- `knowledge_state_extracted`
- `knowledge_state_confirmed`
- `enactment_started/completed`
- `runner_verdict_created`
- `feedback_shown`
- `repair_submitted`
- `session_completed/abandoned`
- `transfer_started/submitted/scored`
- `fidelity_violation_detected`

## 3. Product metrics

| Metric | Mục đích |
| --- | --- |
| Session completion | Flow có hoàn thành được không |
| Time per stage | Chỗ nào gây friction |
| Claim confirmation edit rate | Extraction có đúng không |
| Unsupported action rate | Knowledge boundary có hoạt động không |
| Failure attribution rate | Runner feedback có map được về lời dạy không |
| Spec authoring time | Engine có mở rộng thực tế không |
| Runner determinism | Cùng input/version có cùng verdict không |
| Cost/latency | Khả năng vận hành |

## 4. Transfer assessment blueprint

Mỗi objective cần item mới nhưng tương đương:

- cùng construct/learning objective;
- khác surface context, identifier, data và distractor;
- không dùng lại enactment ground truth/assertion;
- AI và prior feedback bị khóa;
- có scoring rule trước khi thu dữ liệu;
- được domain reviewer duyệt và pilot ceiling/floor.

Output tùy task:

- executable code/config chấm bằng hidden tests;
- tool/action sequence chấm bằng simulator assertions;
- diagnosis/evaluation/design chấm bằng rule checks và blind rubric;
- explanation mở chỉ dùng LLM judge sau khi calibrate với rater người.

## 5. Rubric khung

Không dùng một rubric nội dung chung cho mọi lab. Mỗi rubric có thể map vào năm
dimension khung:

| Dimension | Câu hỏi |
| --- | --- |
| Problem framing | Learner xác định đúng failure/constraint không? |
| Hypothesis/decision quality | Có lựa chọn hợp lý và loại trừ distractor không? |
| Evidence use | Evidence có liên quan và được nối đúng không? |
| Execution correctness | Action/code/config có chạy đúng không? |
| Trade-off/validation | Có kiểm tra giới hạn và hệ quả không? |

Chỉ giữ dimension liên quan objective; không cộng điểm cho nội dung ngoài phạm vi.

## 6. Feasibility instruments

### Sau session

Thang Likert và câu mở:

- Schema giúp tôi diễn đạt cách giải quyết task.
- Knowledge state phản ánh đúng điều tôi đã dạy.
- Tôi hiểu vì sao enactment thất bại.
- Feedback giúp tôi sửa reasoning mà không đưa đáp án.
- Apprentice đã dùng kiến thức mà tôi không dạy.
- Phần nào của flow gây mất thời gian hoặc khó hiểu?

### Interview

- Bạn sửa lời dạy dựa trên evidence nào?
- Schema thiếu hoặc thừa bước nào so với cách làm thực tế?
- AI có hành động nào không thể truy về lời bạn dạy?
- Feedback nào vô tình tiết lộ đáp án?
- Bạn có thể dùng flow này cho loại lab nào khác?

## 7. Research outcomes

- Primary: independent transfer score, điều chỉnh baseline nếu thiết kế cho phép.
- Secondary: delayed transfer, explanation score, mental effort.
- Process: repair count/type, claim changes, grounded-action rate.
- UX: usability và perceived fidelity.

Satisfaction, number of turns, word count và agent pass không thay learning outcome.

## 8. Rater procedure

Nếu có rubric mở:

1. Domain experts viết manual và anchor examples ngoài dataset chính.
2. Rater luyện trên sample riêng; sửa manual trước freeze.
3. Chấm độc lập, ẩn condition và participant identity.
4. Báo inter-rater reliability cùng raw labels.
5. Adjudication tạo final score nhưng không thay thế reliability report.

## 9. Privacy và research export

- Export dùng pseudonym.
- Identity mapping lưu tách biệt.
- Không tự ingest clipboard, API key, raw repository hoặc PII.
- Text/artifact chỉ thu đúng phần protocol và consent cho phép.
- Retention, deletion và access policy phải được định nghĩa trước pilot.
