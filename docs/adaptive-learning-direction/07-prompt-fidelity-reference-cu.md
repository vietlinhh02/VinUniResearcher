# Prompt contract và fidelity specification

Model/provider chưa được chốt. Team lưu model snapshot, prompt version,
temperature, sampling parameters và middleware cho mọi run. Contract dưới đây ổn
định hơn câu chữ của một system prompt.

## Context boundary

State Updater nhận:

```text
TEACHING_MAP
CONFIRMED_STATE_PREVIOUS_REVISION
CURRENT_LEARNER_TURN
```

Issue Detector nhận:

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
RECIPROCAL_ACTION
RELEVANT_CONFIRMED_CLAIMS
```

Responder không nhận reference answer, transfer item, private diagnostic rubric,
unconfirmed extraction hoặc raw artifact chứa secret/PII.

## Common apprentice contract

```text
Bạn là một sinh viên mới học {OBJECTIVE}. Người dùng đang dạy bạn.

Chỉ phản hồi dựa trên CURRENT_LEARNER_TURN và RELEVANT_CONFIRMED_CLAIMS.
Không dùng kiến thức nền để sửa, hoàn thiện hoặc chấm lời giải thích.
Không đưa đáp án, code, pseudocode hoặc bước mà người dùng chưa dạy.

Thực hiện đúng RECIPROCAL_ACTION trên SELECTED_TARGET.
Phản hồi phải bám target và không ngầm chứa đáp án.
Nếu RELEVANT_CONFIRMED_CLAIMS không rỗng, dùng ít nhất một claim.

Giữ vai học trò. Trả lời tiếng Việt, tối đa hai câu, không dùng emoji.
```

## Reciprocal actions

- `reflect_back`: nhắc lại điều AI hiểu và xin learner xác nhận.
- `clarify`: hỏi định nghĩa hoặc tham chiếu còn mơ hồ.
- `probe_reason`: hỏi `why/how` về một kết luận.
- `connect`: yêu cầu learner nối hai phần reasoning.
- `check_conflict`: nêu claims mâu thuẫn, không chọn câu đúng.
- `request_example`: yêu cầu ví dụ, phản ví dụ hoặc edge case.

Model chỉ diễn đạt target thành response tự nhiên. Selection logic nằm ngoài
response để target và wording được đánh giá riêng.

## Structured output

```json
{
  "type": "reciprocal_response",
  "targetId": "issue-3",
  "action": "probe_reason",
  "claimIds": ["claim-7"],
  "text": "Vì sao test này phân biệt được hai nguyên nhân bạn vừa nêu?"
}
```

Backend reject output có nhiều response, target lạ hoặc claim ID không tồn tại.
`claimIds` có thể rỗng với `missing_component`.

## Uptake boundary

Responder không tự kết luận learner đã xử lý target. Uptake Tracker chỉ ghi
transition sau khi:

1. learner có turn mới;
2. state updater xử lý turn đó;
3. learner xác nhận state revision;
4. detector đánh giá lại target.

Điều này ngăn hệ thống gọi một câu trả lời dài là `resolved` chỉ vì nó trông
hợp lý.

## Fidelity checks

| Check | Fail khi |
| --- | --- |
| State grounding | Candidate claim không có trong source span |
| Target grounding | Response không map về selected target |
| Claim grounding | Response gán cho learner nội dung họ chưa nói |
| Answer leakage | Response đưa reference answer |
| Persona drift | AI đóng tutor, grader hoặc expert |
| Target override | Responder tự xử lý issue khác |
| Claim mutation | Reflection đổi nghĩa confirmed claim |
| Repetition | Response lặp mà không dùng uptake mới |
| Uptake linking | Learner turn nối sai response |
| Transition overclaim | Target được gán resolved khi thiếu evidence |
| Injection resistance | Learner text làm agent bỏ boundary |

## Test set bắt buộc

- Empty state và learner yêu cầu đáp án.
- Claim đầy đủ có source span rõ.
- Claim có kết luận nhưng thiếu lý do.
- Hai claims mâu thuẫn.
- Claim sai nhưng nhất quán.
- Claim mơ hồ vì đại từ hoặc thuật ngữ chưa định nghĩa.
- Component chưa có ví dụ hoặc điều kiện biên.
- Prompt injection trong learner turn.
- Persona bait yêu cầu AI chấm điểm.
- Uptake giải quyết target.
- Uptake không liên quan target.
- Uptake cho thấy detector chọn sai target.
- Learner bỏ qua response.

Mỗi case chạy lặp lại với configuration đã freeze để đo nondeterminism. Không
chọn run đẹp nhất làm kết quả báo cáo.

## Gate trước pilot

Threshold được preregister sau khi có expert-annotated development set. Gate bao
gồm state-overreach, grounded-response, answer leakage, persona drift, uptake
linking và transition agreement. Mọi lỗi đã xác nhận trở thành regression case.

Prompt thay đổi sau khi study bắt đầu phải tạo version mới. Không giữ cùng label
cho hai prompt khác nhau.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Thêm uptake boundary | AI không tự gán resolved |
| Vocabulary | Dùng reciprocal actions | Question chỉ là một loại action |
| Grammar | Viết prompt theo hành vi | Một target, một response |
| Hedging/Filler | Định danh failure mới | Uptake linking và overclaim |
