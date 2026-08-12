# Định hướng chốt: build engine đa lab trước, research chạy song song

## Bài toán

Pass test và nộp artifact chỉ chứng minh sản phẩm hiện tại đáp ứng một số assertion.
Nó chưa chứng minh người học hiểu quyết định kỹ thuật, biết dùng evidence để bảo vệ
quyết định, hoặc có thể áp dụng kỹ năng đó trong tình huống mới.

Mentee thêm một vòng Learning-by-Teaching sau checkpoint của lab. Người học dạy
một AI apprentice cách reasoning; AI chỉ dùng phần đã được dạy để xử lý một task
biến thể; runner cho thấy lời dạy có vận hành được hay không; người học sửa lời dạy
trước khi tự làm transfer task.

## Product thesis

> Một engine chung có thể biến learning objective, artifact và evidence của nhiều
> lab AI thực chiến thành hoạt động dạy ngược có kiểm chứng, miễn là mỗi lab cung
> cấp một spec rõ về reasoning schema, task biến thể và ground-truth assertions.

Mentee không phải chatbot tutor, IDE, sandbox hay autograder mới. Nó là lớp nằm
sau hoặc giữa các checkpoint của hệ thống lab hiện có.

## Flow chuẩn

```text
1. Learner hoàn thành checkpoint và tạo artifact
2. Lab gửi objective + evidence summary an toàn sang Mentee
3. Mentee chọn một skill đủ hẹp để luyện
4. UI render Teaching Schema từ Lab Teaching Spec
5. Learner diễn đạt reasoning bằng ngôn ngữ của mình
6. Hệ thống trích xuất knowledge state; learner xác nhận hoặc sửa
7. AI apprentice enact trên scenario isomorphic/near-transfer
8. Deterministic runner kiểm tra structured action/result
9. UI trả failure evidence tối thiểu, không leak đáp án
10. Learner repair knowledge state; AI thử lại trong giới hạn
11. Hệ thống lưu provenance và process evidence
12. Cuối module/track, learner tự làm task mới khi AI bị khóa
13. Transfer score là learning outcome chính
```

## Nhiều loại skill, nhiều Teaching Schema

Engine không ép mọi kỹ năng vào `Khi–thì–vì`.

| Họ task | Reasoning schema điển hình |
| --- | --- |
| Code debugging | Failure → hypotheses → discriminating test → result → fix |
| RAG | Failure slice → cause → intervention → eval → latency/cost → decision |
| Prompt/evaluation | Objective → change → expected behavior → eval evidence → decision |
| Agent workflow | State → tool/action → observation → guardrail → recovery |
| Safety/PII | Data class → risk → control → verification → residual risk |
| Incident investigation | Signal → hypotheses → action → evidence → conclusion → prevention |
| System design | Requirement → decision → alternative → trade-off → validation |

Đây là schema family, không phải form cứng. Course author chọn hoặc mở rộng schema
theo learning objective; mọi field được chấm phải map tới runner assertion.

## Phạm vi build đầu tiên

Build một vertical slice hoàn chỉnh và chứng minh engine tổng quát bằng ít nhất ba
spec thuộc ba họ task khác nhau, ví dụ:

1. Code debugging hoặc tool-calling agent.
2. RAG/prompt evaluation.
3. Observability, safety hoặc system design.

Chọn lab cụ thể theo dữ liệu và reviewer sẵn có; không mặc định Observability.

## Research question song song

> So với reflective teach-back có cùng objective, schema, scenario, persona và
> thời lượng, verified enactment–repair có cải thiện independent transfer của
> người học trong lab AI thực chiến không?

Study không được chặn build. Kiến trúc chỉ cần bảo đảm có condition flag, version,
event log, fidelity checks và assessment isolation ngay từ đầu.

## Không làm ở giai đoạn đầu

- Không xây adaptive curriculum tự do do LLM điều khiển.
- Không suy ra `mastered` từ AI pass hoặc số lượt chat.
- Không cho LLM tự tạo ground truth dùng live.
- Không ingest source, log, secret, API key hoặc PII nếu evidence summary là đủ.
- Không xây learner-state scheduler xuyên track trước khi vertical slice ổn định.
- Không claim efficacy trước pilot, assessment review và ethics approval.
