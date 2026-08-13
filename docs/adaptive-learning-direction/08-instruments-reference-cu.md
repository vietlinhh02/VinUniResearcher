# Instrumentation và assessment

Mentee cần bốn loại bằng chứng: pipeline có fidelity hay không, reciprocal loop có
khép kín không, learner trải nghiệm ra sao và learner có làm được task mới hay
không. Trộn các nhóm này vào một score sẽ che mất nguyên nhân khi kết quả xấu.

## Event schema

```json
{
  "schemaVersion": 3,
  "eventId": "evt-...",
  "eventType": "learner_uptake_recorded",
  "participantId": "P001",
  "sessionId": "S001",
  "spec": {"id": "rag-retrieval-reasoning", "version": 1},
  "objectiveId": "rag.retrieval.failure_analysis",
  "timestamp": "ISO-8601",
  "versions": {
    "model": "provider/model-snapshot",
    "prompt": "reciprocal-response-v1",
    "policy": "reciprocal-v1"
  },
  "payload": {}
}
```

Event bắt buộc:

- `lab_completion_received`;
- `session_started`;
- `learner_turn_submitted`;
- `knowledge_state_extracted`;
- `knowledge_state_confirmed`;
- `unresolved_issues_created`;
- `response_target_selected`;
- `reciprocal_response_generated`;
- `learner_uptake_recorded`;
- `target_transition_recorded`;
- `fidelity_violation_detected`;
- `session_completed` hoặc `session_abandoned`;
- `transfer_started`, `transfer_submitted`, `transfer_scored`.

## Technical evaluation

Hai domain experts gán nhãn trên development set không thuộc dữ liệu pilot:

- claim và source span;
- knowledge component;
- issue type;
- response target và reciprocal action;
- groundedness, relevance và answer leakage;
- target transition sau learner uptake.

Team báo agreement giữa experts trước, sau đó mới báo model-versus-adjudicated
label.

Metrics kỹ thuật:

| Metric | Câu hỏi nó trả lời |
| --- | --- |
| Claim precision/recall | Updater có lấy đúng điều learner nói không? |
| Source-span validity | Claim có provenance thật không? |
| Issue agreement | Detector có tìm cùng issue với expert không? |
| Target/action agreement | Policy có chọn response phù hợp không? |
| Grounded-response rate | Response có bám target và evidence không? |
| Transition agreement | Hệ thống đọc uptake giống expert không? |
| Leakage/drift rate | Agent có đưa đáp án hoặc đổi vai không? |

## Loop feasibility

```text
uptake_rate
= responses có learner turn xử lý target
  / responses đã hiển thị

closed_loop_rate
= loop candidates có uptake, state revision và non-skipped transition
  / loop candidates
```

Mỗi target transition được báo riêng: `resolved`, `partially_resolved`,
`unchanged`, `reframed` hoặc `skipped`. Không cộng chúng thành mastery score.
`Skipped` nằm trong denominator nhưng không nằm trong numerator của
`closed_loop_rate`.

## Product metrics

- Session completion và abandonment point.
- Thời gian ở mỗi state.
- Tỷ lệ candidate claim bị learner sửa hoặc xóa.
- Số issue mới, issue thay đổi và issue bị lặp.
- Response latency và cost.
- Tỷ lệ learner bỏ qua hoặc không hiểu response.
- Số closed loops trên mỗi session.

Số turns hoặc số từ không đại diện cho learning.

## Learner process

Knowledge-building rate vẫn được thu:

```text
knowledge_building_rate
= learner utterances coded KB-ELABORATION hoặc KB-SENSEMAKING
  / learner utterances có nội dung học thuật
```

Team báo riêng learner uptake ngay sau reciprocal response. Phân tích này cho biết
response có khơi gợi reasoning hay chỉ làm hội thoại dài hơn. Trong feasibility
pilot, đây là process metric, không phải causal outcome.

## Independent transfer

Transfer item đo cùng objective nhưng dùng context và dữ liệu khác. AI, response
prompt và feedback đều bị khóa. Item cần scoring rule viết trước, domain review và
pilot ceiling/floor.

Transfer là learning outcome. Nhưng single-condition feasibility pilot không thể
chứng minh reciprocal loop gây ra learning gain. Score được dùng để kiểm tra
instrument và ước lượng variance cho study sau.

## Survey sau session

Thang 1–7:

- Knowledge state phản ánh đúng điều tôi muốn dạy.
- Phản hồi của AI bám vào lời giải thích của tôi.
- Tôi hiểu AI đang cần mình làm rõ điều gì.
- Phản hồi của AI khiến tôi sửa hoặc bổ sung lời giải thích.
- AI đã vô tình gợi cho tôi đáp án.
- AI phản hồi lặp hoặc làm gián đoạn cách tôi trình bày.
- Tôi muốn dùng hoạt động này sau một lab khác.

Mental effort dùng một item 1–9. Satisfaction không được gộp vào learning score.

## Interview

- Phản hồi nào khiến bạn nhận ra mình chưa giải thích rõ?
- Có lúc nào AI phản hồi sai trọng tâm không?
- Bạn sửa knowledge state ở đâu và vì sao?
- Có lúc nào AI giống giáo viên hơn là học trò?
- Sau phản hồi của AI, bạn thay đổi lời giải thích như thế nào?
- Nếu được bỏ một bước khỏi flow, bạn sẽ bỏ bước nào?

## Privacy

Research export dùng pseudonym và không chứa tên, email hoặc mã sinh viên. Identity
mapping lưu riêng nếu thực sự cần. Consent nói rõ transcript, extracted state,
uptake links và model outputs nào được lưu, ai được truy cập và ngày xóa dữ
liệu.

Không tự ingest clipboard, API key, raw repository hoặc PII. Kết quả study không
ảnh hưởng điểm học phần.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Tách loop feasibility | `uptake_rate`, `closed_loop_rate` |
| Vocabulary | Đo reciprocal response | Không chỉ đo question quality |
| Inflation | Giới hạn transfer claim | Instrument check, không causal claim |
| Rhythm/Style | Viết survey theo trải nghiệm | “AI cần mình làm rõ điều gì?” |
