# Mentee — tài liệu chuẩn bị meeting Adaptive Learning

Ngày: 12/08/2026. Thời lượng trình bày: 10 phút.

## 1. Nội dung để reply email

| Nhóm | Thành viên | Hướng nghiên cứu | Brief kết quả | Link tài liệu |
| --- | --- | --- | --- | --- |
| Mentee | _Điền tên thành viên_ | Adaptive Learning-by-Teaching trong flow lab: người học dạy AI apprentice áp dụng skill vào task biến thể; evidence từ enactment–repair xác định skill cần củng cố và đo transfer độc lập xuyên module/track. | Đã rà literature về Learning-by-Teaching và LLM teachable agents; tổng hợp evidence matrix 20 nguồn; xác định learner model theo skill, flow theo checkpoint và nguyên tắc đo bằng transfer thay vì chat engagement. Hiện có research/technical foundation; engine chưa được triển khai. | [Tổng quan hướng research](tong-quan-huong-day-nguoc-ai.md) · [PRD](prd-buoc-day-nguoc-ai.md) |

Đoạn reply gợi ý:

> Em xác nhận nhóm Mentee tham gia meeting tối nay. Nhóm sẽ trình bày hướng
> Adaptive Learning-by-Teaching trong flow lab, cùng đề xuất flow
> evidence → learner model → adaptive review → independent transfer assessment.
> Nhóm mong nhận góp ý về skill graph, scenario bank có ground truth và cách
> thẩm định transfer assessment ở cấp module/track.

## 2. Thông điệp cần chốt trong 30 giây đầu

> Mentee không thay thế web lab của trường và không phải chatbot dạy kiến thức
> chung chung. Nó dùng evidence từ artifact, public test và vòng người học dạy
> AI apprentice áp dụng task biến thể để biết skill nào còn yếu; sau đó tạo review
> phù hợp. Kết quả cuối cùng cần đo là người học có tự áp dụng được vào task mới
> hay không, không phải họ chat bao nhiêu.

## 3. Flow end-to-end của sản phẩm

```text
Web học / web lab của trường
  -> học viên làm lab, chạy test, nộp artifact
  -> tại checkpoint phù hợp, học viên mở Mentee
  -> Mentee nhận summary an toàn của evidence
  -> map evidence vào skill graph
  -> learner dạy AI apprentice rule cần áp dụng
  -> AI enact task isomorphic từ knowledge state
  -> runner kiểm chứng + learner repair lời dạy/reasoning nếu AI fail
  -> learner model cập nhật theo skill
  -> scheduler chọn repair, review giãn cách hoặc challenge cho lab sau
  -> cuối module/track: independent transfer assessment, không AI hỗ trợ
```

Mentee không cần nhận source code, secret hoặc raw log nhạy cảm. Giai đoạn đầu,
người học hoặc web lab chỉ gửi summary đã được lọc: checkpoint hoàn thành,
validator/test result, commit SHA, artifact metadata, trace ID hoặc evidence
summary. Tích hợp tự động từ web lab là bước sau, không phải điều kiện để thử
flow.

## 4. Lõi adaptive: hệ thống thích ứng ở đâu?

Learner model lưu trạng thái theo `participant × skill`, có provenance tới
evidence; không gắn một nhãn chung kiểu "giỏi" hoặc "yếu" cho người học.

```text
unseen -> introduced -> practiced -> verified -> mastered
                      \-> fragile
                      \-> misconception
```

| Evidence | State | Hoạt động Mentee chọn tiếp |
| --- | --- | --- |
| Public test/artifact đạt | `practiced` | Không kết luận mastery; chờ evidence khác bề mặt. |
| Rule sai hoặc mâu thuẫn | `misconception` | Contrast card: phân biệt evidence đúng/sai và giải thích lại. |
| Rule thiếu điều kiện hoặc lý do | `fragile` | Một câu hỏi why/when bám đúng phần thiếu. |
| AI enact fail | `fragile` | Failure trace ngắn, learner sửa rule rồi AI thử lại. |
| AI pass nhưng explanation nông | `fragile` | Micro-transfer khác bề mặt. |
| Transfer độc lập pass | `mastered` | Review giãn cách; không ép lặp lại ngay. |
| Transfer độc lập fail | `fragile`/`misconception` | Repair trước khi học skill phụ thuộc. |

Adaptivity có nghĩa là **chọn activity kế tiếp từ evidence cá nhân**. Nó không
có nghĩa để LLM tự do chẩn đoán người học hoặc tự sinh curriculum.

## 5. Case trình bày: Day 13 Observability

Day 13 yêu cầu người học xây logging/PII redaction, traces và prompt version,
dashboard/SLO/alert, rồi điều tra incident theo chuỗi **Metrics → Traces → Logs
→ Root cause**. Lab đã có validator, rubric, challenge, traces, logs và evidence
folder; đây là nguồn tốt để tạo skill graph và scenario bank, không cần Mentee
tự bịa nội dung từ đầu.

### Skill graph tối thiểu từ lab

| Skill | Evidence có sẵn từ lab |
| --- | --- |
| Structured logging và correlation ID | `validate_logs.py`, log schema, log artifact. |
| PII redaction | validator, log evidence, report. |
| Prompt version và trace metadata | trace ID, prompt label/version, rollback evidence. |
| Dashboard/SLO/alert | dashboard validator, dashboard config, threshold. |
| Incident investigation | challenge, report và chuỗi Metrics → Traces → Logs. |

### Bài Mentee tại checkpoint observability

> Dashboard cho thấy p95 latency vượt SLO và error rate tăng sau một prompt
> release. Hãy chỉ ra cách điều tra để phân biệt lỗi ở request path, prompt
> version, downstream call hoặc logging thiếu context; kết luận phải có evidence.

Người học dạy cách điều tra qua form `Khi – thì – vì`. AI apprentice chỉ nhận
rule đó và một incident mới có dashboard snapshot, trace metadata và log snippet
đã giả danh. AI phải chọn investigation path; runner đối chiếu lựa chọn với
ground truth của scenario. Nếu AI thiếu một bước/evidence, Mentee chỉ ra failure
trace để người học bổ sung reasoning.

### Scenario bank được tạo từ đâu?

1. **Learning objectives và rubric của lab:** xác định skill cần đánh giá.
2. **Fixture do course author tạo và duyệt:** logs/traces/metrics incident đã
   giả danh, có root cause và evidence chain chuẩn.
3. **Biến thể có kiểm soát:** đổi timestamp, service, prompt label, correlation
   ID, symptom và distractor nhưng giữ cùng learning objective.
4. **Artifact summary của người học:** chỉ dùng để chọn skill cần review, không
   dùng raw secrets/PII để sinh đề.

LLM có thể hỗ trợ diễn vai apprentice hoặc gợi ý bản nháp scenario cho author,
nhưng không được tự tạo ground truth hay rubric dùng trực tiếp trong study.

## 6. Sau ba tuần, đo gì?

Outcome đề xuất là **Independent Transfer Score**: điểm của một task mới mà người
học tự làm, không AI hỗ trợ. Đây là tên mô tả outcome của dự án, không phải một
thang đo chuẩn đã công bố.

Với module observability, transfer task là incident mới; người học phải điều tra
và đưa evidence. Rubric được xây từ learning objectives/rubric lab, sau đó cần
subject-matter reviewers thẩm định và pilot trước khi dùng nghiên cứu.

| Thành phần rubric transfer | Điểm gợi ý | Đo gì |
| --- | ---: | --- |
| Nhận diện symptom và SLO bị vi phạm | 0–2 | Đọc đúng tín hiệu vận hành. |
| Chọn metric, trace và span cần điều tra | 0–2 | Lập investigation path. |
| Nối trace với log bằng correlation ID/metadata | 0–2 | Liên kết evidence. |
| Kết luận root cause, loại trừ giả thuyết sai | 0–2 | Reasoning dựa trên bằng chứng. |
| Đề xuất fix và prevention phù hợp | 0–2 | Chuyển diagnosis thành hành động. |

Tổng điểm có thể chuẩn hóa về 0–100. `AI enact pass`, số lượt chat, số từ và
satisfaction là process/UX metrics; chúng không thay thế Independent Transfer
Score.

Nếu chạy comparison study:

```text
Enactment–repair: AI enact task từ rule learner dạy, runner trả evidence để repair
Reflective teach-back: cùng rule/task/persona nhưng không có runner evidence
Outcome: Independent Transfer Score cuối module/3 tuần, điều chỉnh bằng baseline
```

## 7. Nền tảng research đã có và giới hạn phải nói đúng

Đã có:

- Rapid literature review và evidence matrix gồm 20 nguồn về Learning by
  Teaching, teachable agents và LLM trong programming education.
- Bằng chứng để justify: Learning-by-Teaching, knowledge-building, recursive
  feedback, knowledge-state boundary và cảnh báo không dùng engagement làm proxy.
- Draft instrument, fidelity metrics, prompt guardrails, ethics/no-PII principles.
- PRD cho skill graph, Lab Teaching Spec, learner model, verified enactment,
  review scheduler và transfer assessment.

Chưa có:

- Engine Mentee cho learner model, AI apprentice, runner hoặc adaptive scheduler.
- Skill graph/scenario bank được course author và subject-matter reviewer duyệt.
- Transfer assessment đã được content-validity review hoặc pilot.
- LLM provider/model/prompt configuration đã freeze.
- Ethics/IRB approval để thu efficacy data.

Vì vậy, nhóm chỉ nên nói đang có **research foundation và proposed direction**,
không nói đã chứng minh adaptive learning hiệu quả.

## 8. Kịch bản 10 phút

| Thời gian | Nội dung | Ý cần nói |
| --- | --- | --- |
| 0:00–1:00 | Vấn đề | Pass lab không đồng nghĩa tự làm được task mới; Mentee bổ sung adaptive practice trong flow lab. |
| 1:00–2:30 | Hướng | Evidence-grounded Adaptive Learning-by-Teaching xuyên track, không phải chatbot tổng quát. |
| 2:30–4:30 | Flow | Artifact/test/reflection → skill graph → learner model → review/challenge kế tiếp. |
| 4:30–6:30 | Case Day 13 | Metrics → Traces → Logs, scenario bank và incident review tại checkpoint. |
| 6:30–7:45 | Đo lường | Independent Transfer Score cuối module/3 tuần, không AI hỗ trợ. |
| 7:45–8:45 | Cái đã có | Review 20 nguồn, evidence matrix, draft guardrails/instruments, PRD. |
| 8:45–10:00 | Xin feedback | Bốn câu hỏi bên dưới. |

## 9. Bốn feedback cụ thể cần xin

1. Với các lab hiện có, team nên author skill graph ở mức nào để vừa dùng được
   xuyên track vừa không quá vụn?
2. Ai có thể review learning objectives, scenario bank và ground truth/rubric
   trước pilot?
3. Independent transfer task ở cuối module nên bám artifact nào và cần điều kiện
   nào để nó đủ khác bài lab nhưng vẫn công bằng?
4. Có thể tích hợp evidence summary từ web lab ở mức nào; phase đầu dùng import
   thủ công/commit summary có chấp nhận được không?

## 10. Tài liệu backup khi bị hỏi sâu

- [Tổng quan hướng research](tong-quan-huong-day-nguoc-ai.md)
- [Định hướng adaptive learning xuyên track](dinh-huong-adaptive-learning-xuyen-suot-track.md)
- [PRD engine xuyên track](prd-buoc-day-nguoc-ai.md)
- [Literature review](research/literature-review.md)
- [Evidence matrix](research/evidence-matrix.csv)
- [Protocol cũ — không còn khớp hoàn toàn, dùng để tham khảo ethics/fidelity](research/protocol.md)
- [Instruments cũ — cần viết lại/review trước khi dùng](research/instruments.md)

## 11. Nguồn case Day 13

- [Repository Day 13 Observability](https://github.com/VinUni-AI20k/Day13-K3-Observability)
- [Checkpoint](https://github.com/VinUni-AI20k/Day13-K3-Observability/blob/main/CHECKPOINTS.md)
- [Rubric](https://github.com/VinUni-AI20k/Day13-K3-Observability/blob/main/RUBRIC.md)
