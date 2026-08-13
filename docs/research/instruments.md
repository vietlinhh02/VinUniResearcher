# Instruments cho feasibility pilot

Đây là bộ khung. Domain reviewer thay ví dụ bằng objective thật, viết transfer item
và pilot ceiling/floor trước khi thu dữ liệu.

## Screening

- Learner đã hoàn thành prerequisite hoặc lab nào?
- Learner tự đánh giá mức hiểu objective từ 1–5?
- Learner có từng làm task tương đương trong sáu tháng gần đây không?
- Learner có consent cho transcript, extracted state và model output không?

Không lưu tên, email hoặc mã sinh viên trong cùng dataset với transcript.

## Pre-test và transfer blueprint

Không lặp nguyên item hoặc private rubric giữa pre-test, teaching session và
transfer.

| Construct | Dạng item | Điểm gợi ý |
| --- | --- | ---: |
| Problem framing | Xác định signal, constraint hoặc failure | 0–2 |
| Mechanism/justification | Giải thích vì sao một bước hoạt động | 0–2 |
| Evidence use | Nối observation với conclusion | 0–2 |
| Boundary/edge case | Dự đoán và giải thích trường hợp biên | 0–2 |
| Near transfer | Áp dụng reasoning vào context mới | 0–3 |

Chỉ giữ dimension liên quan objective. Không cộng điểm cho kiến thức ngoài phạm vi
chỉ vì câu trả lời dài.

## Knowledge-state annotation

Expert annotation unit là một learner turn. Mỗi claim gồm:

- source span;
- normalized content;
- teaching component;
- relation với claim trước nếu có;
- trạng thái `new`, `revision`, `confirmation` hoặc `retraction`.

Issue annotation gồm issue type, component, claim IDs, response target và action
được khuyến nghị. Experts không cần viết cùng một câu response; target/action mới
là đơn vị so sánh chính.

## Reciprocal-loop annotation

Mỗi response tạo một loop candidate. Rater gán:

- response có grounded vào target/evidence không;
- learner turn kế tiếp có phải uptake không;
- uptake có giải quyết đúng target không;
- confirmed state thay đổi ở claim nào;
- target transition là `resolved`, `partially_resolved`, `unchanged`, `reframed`
  hay `skipped`.

Rater không dùng độ dài câu trả lời để suy ra `resolved`. `Skipped` được giữ
trong denominator nhưng không được tính là closed loop.

## Transcript coding rubric

Một learner utterance có nội dung học thuật nhận một nhãn cao nhất.

| Nhãn | Định nghĩa | Ví dụ rút gọn |
| --- | --- | --- |
| `KT-COMPREHENSION` | Nhắc lại kiến thức | “Bước này lấy phần tử giữa.” |
| `KT-HINT` | Ra lệnh, không giải thích | “Giờ tăng biến low.” |
| `KB-ELABORATION` | Thêm lý do hoặc ví dụ | “Bên trái đã bị loại.” |
| `KB-SENSEMAKING` | Tự sửa hoặc suy ra | “Giữ mid có thể gây lặp.” |
| `OFF-TASK` | Không liên quan objective | “Hôm nay mình hơi mệt.” |

Nếu utterance vừa nhắc lại vừa có suy luận mới, chọn nhãn knowledge-building cao
nhất được evidence hỗ trợ. Manual phải có case khó và negative examples.

Rater procedure:

1. Hai rater chấm một training set ngoài dữ liệu chính.
2. Sửa manual trước khi freeze.
3. Chấm độc lập transcript đã ẩn participant.
4. Tính Krippendorff's alpha và giữ raw labels.
5. Adjudication tạo final label nhưng không thay reliability report.

## Reciprocal-response rubric

| Dimension | Pass khi |
| --- | --- |
| Grounded | Bám selected target và evidence hiện có |
| Target match | Nội dung xử lý đúng selected issue |
| Relevant | Target nằm trong objective và teaching map |
| Open enough | Để learner tự giải thích, không xác nhận đáp án gợi sẵn |
| No leakage | Không chứa reference answer hoặc expected value |
| Apprentice voice | Nghe như học trò cần hiểu, không phải grader |

Rater đánh dấu `repetitive` nếu response lặp ý đã được learner xử lý.

## Post-session survey

Thang 1 “hoàn toàn không đồng ý” đến 7 “hoàn toàn đồng ý”:

- Knowledge state phản ánh đúng điều tôi muốn nói.
- Phản hồi của AI bám vào lời giải thích của tôi.
- Tôi hiểu AI muốn mình làm rõ điều gì.
- Phản hồi khiến tôi sửa hoặc bổ sung lời giải thích.
- AI đã vô tình cho tôi biết đáp án.
- AI phản hồi lặp hoặc ngắt mạch trình bày của tôi.
- Tôi muốn dùng hoạt động này sau một lab khác.

Mental effort dùng thang 1 rất thấp đến 9 rất cao.

## Interview

- Phản hồi nào làm bạn nhận ra mình chưa giải thích rõ?
- Có response nào sai trọng tâm không?
- Bạn đã sửa knowledge state ở đâu và vì sao?
- Có lúc nào AI tỏ ra biết sẵn đáp án?
- Sau phản hồi của AI, bạn thay đổi lời giải thích như thế nào?
- Nếu được bỏ một bước khỏi flow, bạn sẽ bỏ bước nào?

## Transcript schema

```json
{
  "schemaVersion": 3,
  "participantId": "P001",
  "objectiveId": "objective-a",
  "messages": [],
  "knowledgeStateRevisions": [],
  "reciprocalResponses": [],
  "uptakeEvents": [],
  "targetTransitions": []
}
```

Không tự thêm direct identifier, clipboard hoặc raw artifact vào schema.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Thêm reciprocal-loop annotation | Response → uptake → transition |
| Vocabulary | Đánh giá response, không chỉ question | Sáu reciprocal actions |
| Rhythm/Style | Viết item theo trải nghiệm | “AI muốn mình làm rõ điều gì?” |
| Soul | Cho phép target bị gán sai | Nhãn `reframed` |
