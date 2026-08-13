# Instrumentation và assessment

Mentee cần ba loại bằng chứng khác nhau: pipeline có fidelity hay không, learner tương
tác ra sao và learner có làm được task mới hay không. Trộn ba nhóm này vào một
score sẽ che mất nguyên nhân khi kết quả xấu.

## Event schema

```json
{
  "schemaVersion": 2,
  "eventId": "evt-...",
  "eventType": "question_generated",
  "participantId": "P001",
  "sessionId": "S001",
  "spec": {"id": "rag-retrieval-reasoning", "version": 1},
  "objectiveId": "rag.retrieval.failure_analysis",
  "condition": "state-aware",
  "timestamp": "ISO-8601",
  "versions": {
    "model": "provider/model-snapshot",
    "prompt": "question-responder-v1",
    "policy": "state-aware-v1"
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
- `gap_candidates_created`;
- `question_target_selected`;
- `question_generated`;
- `fidelity_violation_detected`;
- `session_completed` hoặc `session_abandoned`;
- `transfer_started`, `transfer_submitted`, `transfer_scored`.

## Technical evaluation

Hai domain experts gán nhãn trên một development set không thuộc dữ liệu study.
Annotation gồm:

- claim và source span;
- knowledge component;
- gap issue type;
- target nên hỏi tiếp;
- strategy phù hợp;
- câu hỏi có grounded, relevant và answer-leaking hay không.

Team báo agreement giữa experts trước, sau đó mới báo model-versus-adjudicated label.
Adjudication tạo nhãn dùng để tính metric nhưng không thay thế reliability report.

Metrics kỹ thuật:

| Metric | Câu hỏi nó trả lời |
| --- | --- |
| Claim precision/recall | Updater có lấy đúng điều learner nói không? |
| Source-span validity | Claim có provenance thật không? |
| Gap agreement | Detector có tìm cùng issue với expert không? |
| Target agreement | Selector có chọn phần đáng hỏi không? |
| Grounded-question rate | Câu hỏi có bám target và available evidence không? |
| Leakage/drift rate | Agent có đưa đáp án hoặc đổi vai không? |

## Product metrics

- Session completion và abandonment point.
- Thời gian ở mỗi state.
- Tỷ lệ candidate claim bị learner sửa hoặc xóa.
- Số gap mới, gap được giải quyết và gap bị lặp.
- Question latency và cost.
- Tỷ lệ learner bỏ qua hoặc không hiểu câu hỏi.

Không dùng số turn hoặc số từ làm đại diện cho học tập.

## Transcript outcome

Primary process outcome của comparative pilot:

```text
knowledge_building_rate
= learner utterances coded KB-ELABORATION hoặc KB-SENSEMAKING
  / learner utterances có nội dung học thuật
```

Coder chấm transcript đã ẩn condition và, nếu cần, ẩn agent turn để giảm khả
năng đoán nhóm. Rubric chi tiết nằm trong `../research/instruments.md`.

Ngoài tỷ lệ tổng, team nên báo knowledge-building ngay sau question opportunity. Phân
tích này cho biết câu hỏi có khơi gợi reasoning hay chỉ làm hội thoại dài hơn.

## Independent transfer

Transfer item đo cùng objective nhưng dùng surface context và dữ liệu khác. AI, question
prompt và feedback đều bị khóa. Item cần scoring rule viết trước, domain review và
pilot ceiling/floor.

Tùy objective, output có thể là code, diagnosis, evaluation plan hoặc explanation. Rule/test
được ưu tiên khi construct cho phép. Với reasoning mở, hai rater chấm theo rubric; LLM
judge chỉ được dùng sau calibration và phải báo disagreement.

Transfer là learning outcome. Trong feasibility pilot nhỏ, nó vẫn có thể là exploratory
vì study chưa đủ power để ước lượng effect ổn định.

## Survey sau condition

Thang 1–7:

- Knowledge state phản ánh đúng điều tôi muốn dạy.
- Câu hỏi của AI bám vào phần tôi vừa giải thích.
- Câu hỏi khiến tôi phải giải thích thêm lý do hoặc mối liên hệ.
- AI đã vô tình gợi cho tôi đáp án.
- AI hỏi lặp hoặc làm gián đoạn cách tôi đang trình bày.
- Tôi muốn dùng hoạt động này sau một lab khác.

Mental effort dùng một item 1–9. Satisfaction được báo riêng, không gộp vào learning
score.

## Interview

- Câu hỏi nào khiến bạn nhận ra mình chưa giải thích rõ?
- Có câu hỏi nào bám sai ý bạn vừa nói không?
- Bạn có sửa knowledge state không? Vì sao?
- Lúc nào AI tỏ ra giống giáo viên hơn là học trò?
- Ba câu hỏi trong phiên là quá ít, vừa đủ hay quá nhiều?

## Privacy

Research export dùng pseudonym và không chứa tên, email hoặc mã sinh viên. Identity
mapping lưu riêng nếu thực sự cần. Consent phải nói rõ transcript, extracted state và
model outputs nào được lưu, ai được truy cập và ngày xóa dữ liệu.

Không tự ingest clipboard, API key, raw repository hoặc PII. Kết quả study không được
ảnh hưởng điểm học phần.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Tách fidelity, process và learning outcome | Ba nhóm metric riêng |
| Vocabulary | Bỏ runner metrics | Target agreement và grounded-question rate |
| Rhythm/Style | Viết survey tự nhiên hơn | “Câu hỏi bám vào lời tôi.” |
| Hedging/Filler | Nêu rõ giới hạn pilot | Transfer là exploratory khi chưa đủ power |
