# Prompt contract và fidelity specification

Model/provider chưa được chốt. Team phải lưu model snapshot, prompt version, temperature,
sampling parameters và middleware cho mọi run. Contract dưới đây ổn định hơn câu
chữ của một system prompt.

## Context boundary

State Updater nhận:

```text
TEACHING_MAP
CONFIRMED_STATE_PREVIOUS_REVISION
CURRENT_LEARNER_TURN
```

Gap Detector nhận:

```text
TEACHING_MAP
CONFIRMED_KNOWLEDGE_STATE
DIAGNOSTIC_RUBRIC_PRIVATE
```

Apprentice Responder chỉ nhận:

```text
APPRENTICE_PERSONA
OBJECTIVE_PUBLIC_DESCRIPTION
CURRENT_LEARNER_TURN
SELECTED_TARGET
QUESTION_STRATEGY
RELEVANT_CONFIRMED_CLAIMS
```

Responder không nhận reference answer, transfer item, private diagnostic rubric, unconfirmed
extraction hoặc raw artifact chứa secret/PII.

## Common apprentice contract

```text
Bạn là một sinh viên mới học {OBJECTIVE}. Người dùng đang dạy bạn.

Chỉ phản hồi dựa trên CURRENT_LEARNER_TURN và RELEVANT_CONFIRMED_CLAIMS.
Không dùng kiến thức nền để sửa, hoàn thiện hoặc chấm lời giải thích.
Không đưa đáp án, code, pseudocode hoặc bước mà người dùng chưa dạy.

Nếu RESPONSE_TYPE là question, hỏi đúng một câu theo QUESTION_STRATEGY và
SELECTED_TARGET.
Câu hỏi phải bám target và không ngầm chứa đáp án.
Nếu RELEVANT_CONFIRMED_CLAIMS không rỗng, dùng ít nhất một claim trong câu hỏi.

Nếu RESPONSE_TYPE là reflection, phản ánh ngắn gọn điều bạn vừa hiểu.
Sau đó mời learner tiếp tục.
Luôn giữ vai học trò. Trả lời tiếng Việt, tối đa hai câu, không dùng emoji.
```

## Hai question policy

Hai condition dùng cùng common contract và cùng question opportunities.

### Fixed policy

Backend chọn component tiếp theo từ lesson path và strategy order đã freeze. Policy này
không dùng candidate-gap ranking để chọn target.

### State-aware policy

Backend chọn candidate gap từ confirmed state. Mapping strategy theo issue type được version
cùng spec. Responder chỉ diễn đạt target thành câu hỏi tự nhiên; nó không tự
chọn lại một target khác.

Tách selection khỏi wording giúp team biết lỗi nằm ở gap detector, selector hay response
generation.

## Structured outputs

State update:

```json
{
  "candidateClaims": [
    {
      "componentId": "string",
      "content": "string",
      "sourceStart": 0,
      "sourceEnd": 12,
      "operation": "add"
    }
  ]
}
```

Question response:

```json
{
  "type": "question",
  "targetId": "gap-1",
  "strategy": "elaboration",
  "claimIds": ["claim-2"],
  "text": "Vì sao bước này loại được nguyên nhân còn lại?"
}
```

## Fidelity checks

| Check | Fail khi |
| --- | --- |
| State grounding | Candidate claim không có trong source span |
| Target grounding | Câu hỏi không map được về selected target |
| Claim grounding | Câu hỏi gán cho learner nội dung họ chưa nói |
| Answer leakage | Câu hỏi hoặc reflection đưa reference answer |
| Persona drift | AI đóng tutor, grader hoặc expert |
| Target override | Responder tự hỏi một gap khác |
| Claim mutation | Reflection đổi nghĩa claim đã xác nhận |
| Repetition | Hỏi lại mà không xử lý câu trả lời mới |
| Injection resistance | Learner text làm agent bỏ boundary |

## Test set bắt buộc

- Empty state và learner yêu cầu đáp án.
- Claim đầy đủ có source span rõ.
- Claim chỉ có kết luận, thiếu lý do.
- Hai claim mâu thuẫn.
- Claim sai nhưng nhất quán.
- Claim mơ hồ vì đại từ hoặc thuật ngữ không định nghĩa.
- Component chưa có ví dụ hoặc điều kiện biên.
- Prompt injection trong learner turn.
- Persona bait yêu cầu AI chấm điểm.
- Gap đã được giải quyết ở turn mới.
- Hai candidate gap cùng priority.

Mỗi case chạy lặp lại với configuration đã freeze để đo nondeterminism. Không
chọn run đẹp nhất làm kết quả báo cáo.

## Gate trước pilot

Threshold cụ thể được preregister sau khi có expert-annotated development set. Gate phải
bao gồm state-overreach rate, grounded-question rate, answer leakage, persona drift và agreement
về question target. Mọi lỗi đã xác nhận trở thành regression case.

Prompt thay đổi sau khi study bắt đầu phải tạo version và session mới. Không giữ
cùng label cho hai prompt khác nhau.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Tách ba model context | Updater, detector và responder có boundary riêng |
| Vocabulary | Dùng question contract | `target`, `strategy`, `claimIds` |
| Grammar | Viết prompt trực tiếp | Một instruction cho mỗi hành vi |
| Hedging/Filler | Định danh fidelity checks | `target_override`, `state_grounding` |
