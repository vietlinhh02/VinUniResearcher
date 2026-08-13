# Instruments cho pilot state-aware questioning

Đây là bộ khung. Domain reviewer phải thay ví dụ bằng objective thật, viết hai form
tương đương và pilot ceiling/floor trước khi thu dữ liệu chính.

## Screening

- Learner đã hoàn thành prerequisite hoặc lab nào?
- Learner tự đánh giá mức hiểu từng objective từ 1–5?
- Learner có từng làm task tương đương trong sáu tháng gần đây không?
- Learner có consent cho transcript, extracted state và model output không?

Không lưu tên, email hoặc mã sinh viên trong cùng dataset với transcript.

## Pre-test và transfer blueprint

Mỗi objective có hai form tương đương. Không lặp nguyên item hoặc private rubric
giữa pre-test, teaching session và transfer.

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

Gap annotation gồm issue type, component, claim IDs và question target được khuyến nghị.
Experts không cần viết đúng một câu hỏi giống nhau; target và strategy mới là
đơn vị so sánh chính.

## Transcript coding rubric

Một learner utterance có nội dung học thuật nhận một nhãn cao nhất.

| Nhãn | Định nghĩa | Ví dụ rút gọn |
| --- | --- | --- |
| `KT-COMPREHENSION` | Nhắc lại kiến thức | “Bước này lấy phần tử giữa.” |
| `KT-HINT` | Ra lệnh, không giải thích | “Giờ tăng biến low.” |
| `KB-ELABORATION` | Thêm lý do hoặc ví dụ | “Bên trái đã bị loại.” |
| `KB-SENSEMAKING` | Tự sửa hoặc suy ra | “Giữ mid có thể gây lặp.” |
| `OFF-TASK` | Không liên quan objective | “Hôm nay mình hơi mệt.” |

Nếu một utterance vừa nhắc lại vừa có suy luận mới, chọn nhãn knowledge-building
cao nhất được evidence hỗ trợ. Annotation manual phải có ví dụ khó và negative
examples, không chỉ có case đẹp.

Rater procedure:

1. Hai rater cùng chấm một training set ngoài dữ liệu chính.
2. Sửa manual trước khi freeze.
3. Chấm độc lập transcript đã ẩn condition và participant.
4. Tính Krippendorff's alpha và giữ raw labels.
5. Adjudication tạo final label nhưng không thay reliability report.

## Question-quality rubric

Mỗi AI question được chấm riêng:

| Dimension | Pass khi |
| --- | --- |
| Grounded | Bám selected target và evidence hiện có |
| Target match | Nội dung hỏi đúng selected gap |
| Relevant | Gap nằm trong objective và teaching map |
| Open enough | Learner cần giải thích, không chỉ xác nhận đáp án gợi sẵn |
| No leakage | Không chứa reference answer hoặc expected value |
| Apprentice voice | Nghe như học trò cần hiểu, không phải grader |

Rater có thể đánh dấu `repetitive` nếu câu hỏi lặp ý đã được learner trả
lời.

## Post-condition survey

Thang 1 “hoàn toàn không đồng ý” đến 7 “hoàn toàn đồng ý”:

- Knowledge state phản ánh đúng điều tôi muốn nói.
- Câu hỏi của AI bám vào lời giải thích của tôi.
- Câu hỏi khiến tôi phải giải thích thêm lý do hoặc mối liên hệ.
- AI đã vô tình cho tôi biết đáp án.
- AI hỏi lặp hoặc ngắt mạch trình bày của tôi.
- Tôi muốn dùng hoạt động này sau một lab khác.

Mental effort dùng thang 1 rất thấp đến 9 rất cao.

## Interview

- Câu hỏi nào làm bạn nhận ra mình chưa giải thích rõ?
- Có câu nào hỏi sai trọng tâm không?
- Bạn đã sửa knowledge state ở chỗ nào và vì sao?
- Có lúc nào AI tỏ ra biết sẵn đáp án?
- Nếu được bỏ một bước khỏi flow, bạn sẽ bỏ bước nào?

## Transcript schema

```json
{
  "schemaVersion": 2,
  "participantId": "P001",
  "sequence": "S1",
  "condition": "state-aware",
  "objectiveId": "objective-a",
  "messages": [
    {
      "turn": 1,
      "role": "learner_tutor",
      "text": "...",
      "timestamp": "ISO-8601"
    }
  ],
  "knowledgeStateRevisions": [],
  "questionEvents": []
}
```

Không tự thêm direct identifier, clipboard hoặc raw artifact vào schema.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Thêm annotation cho pipeline | Claim, gap và question-quality rubric |
| Vocabulary | Bỏ hai thuật toán cố định | Reviewer chọn objective |
| Rhythm/Style | Viết item như người chấm sẽ dùng | Pass criteria ngắn, cụ thể |
| Soul | Thêm negative examples | “Nếu được bỏ một bước…” |
