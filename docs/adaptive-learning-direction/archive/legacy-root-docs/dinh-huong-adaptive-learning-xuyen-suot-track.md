# Định hướng research: Adaptive Learning-by-Teaching xuyên suốt track

Ngày cập nhật: 12/08/2026. Trạng thái: đề xuất định hướng để trình bày và nhận
phản biện; chưa phải protocol đã đóng băng.

## 1. Kết luận đề xuất

Mentee không nên được định vị là chatbot dạy học, hay một tính năng "dạy AI" cho
một lab riêng lẻ. Hướng phù hợp hơn là:

> **Evidence-grounded Adaptive Learning-by-Teaching**: một hệ thống theo dõi
> trạng thái hiểu biết theo từng skill trong toàn bộ learning track. Học viên dạy
> AI apprentice; AI chỉ áp dụng điều đã được dạy vào task tương đương; kết quả
> được kiểm chứng tạo evidence để hệ thống chọn hoạt động repair, review hoặc
> transfer tiếp theo.

Điểm thích ứng không nằm ở việc LLM tự do đoán trình độ rồi sinh nội dung bất kỳ.
Nó nằm ở policy minh bạch: evidence nào dẫn tới quyết định học tập nào.

## 2. Vì sao không giới hạn ở một lab

Adaptive Learning chỉ có ý nghĩa khi hệ thống tích lũy evidence qua thời gian,
giữa nhiều skill và nhiều lab. Một ngày/lab là đơn vị tạo evidence, không phải
toàn bộ phạm vi sản phẩm hoặc research.

```text
Learning track
  -> module
      -> ngày / lab
          -> skill / learning objective
              -> evidence: giải thích, code/test, AI enactment, repair, transfer
```

Ví dụ, học viên có thể làm đúng card về `system` và `user` message ở ngày đầu,
nhưng thất bại ở một task khác bề mặt vào ngày sau. Hệ thống cần giữ trạng thái
"fragile" cho skill này và lên lịch micro-transfer/review thay vì coi nó đã
mastery chỉ vì một public test đã pass.

Một vài Lab Teaching Spec đại diện có giá trị để kiểm tra engine trước. Khi engine
đã hoạt động, các lab tiếp theo được thêm bằng spec và skill graph, không phải
bằng một ứng dụng hoặc flow mới.

## 3. Cơ chế học tập đề xuất

Mỗi điểm neo trong lab có một vòng nhỏ:

```text
Học viên phát biểu rule "Khi - thì - vì"
  -> knowledge state lưu rule và nguồn evidence
  -> AI apprentice nhận micro-task isomorphic
  -> AI chỉ điền các slot được knowledge state bao phủ
  -> runner kiểm chứng các slot thuộc objective
  -> pass/fail + trace tối thiểu
  -> learner model cập nhật
  -> adaptation policy chọn repair, review, micro-transfer hoặc unlock skill mới
```

AI không được sinh lời giải/code tự do và không được biết vượt quá knowledge
state. Nếu AI chưa được dạy một rule, nó để slot trống và nói rõ phần chưa được
dạy. Điều này biến lỗi của AI thành evidence về chất lượng/cấu trúc lời dạy,
thay vì một lỗi ngẫu nhiên của model.

Việc quan sát học trò áp dụng điều vừa được dạy là **recursive feedback**. Đây
là cơ chế khác với chatbot chỉ hỏi ngược hoặc trực tiếp đưa feedback cho học
viên.

## 4. Learner model và policy thích ứng

State được lưu ở cấp `participant × skill`, có provenance tới các lượt dạy,
card, test và transfer liên quan. Một state machine tối thiểu:

```text
unseen -> introduced -> practiced -> verified -> mastered
                      \-> fragile
                      \-> misconception
```

`mastered` không phải nhãn vĩnh viễn: transfer/review sau đó có thể hạ skill về
`fragile` hoặc `misconception`.

| Evidence quan sát | Learner state | Adaptation kế tiếp |
| --- | --- | --- |
| Rule sai hoặc mâu thuẫn với evidence | `misconception` | Contrast card: so sánh phương án đúng/sai, yêu cầu giải thích lại. |
| Rule thiếu điều kiện hoặc ô "vì" chưa đủ | `incomplete` / `fragile` | Một câu hỏi why/when bám đúng rule còn thiếu. |
| AI không điền được slot thuộc objective | `cannot_operationalize` / `fragile` | Hiện failure trace ngắn; học viên bổ sung/sửa rule rồi AI thử lại. |
| AI pass nhưng explanation nông | `fragile` | Micro-transfer với bối cảnh khác bề mặt. |
| AI pass và giải thích đủ | `verified` | Giãn cách review hoặc mở skill phụ thuộc tiếp theo. |
| Transfer độc lập pass | `mastered` | Không ép lặp lại; chỉ đưa review giãn cách. |
| Transfer độc lập fail | `fragile` hoặc `misconception` | Repair theo lỗi cụ thể trước khi tiếp tục skill phụ thuộc. |

Các ngưỡng, rubric và thứ tự ưu tiên phải được đóng băng/version hóa trước khi
thu dữ liệu chính. Policy không được dùng hidden transfer answer để hỗ trợ người
học trước lúc nộp.

## 5. Cấu trúc sản phẩm cho toàn track

### Thành phần chung

1. **Skill graph:** skill, prerequisite và learning objective xuyên module.
2. **Lab Teaching Spec:** mô tả card, distractor, evidence, template enactment,
   runner assertion và transfer item cho từng lab.
3. **Knowledge-state service:** claim do học viên dạy, source turn/evidence,
   slot được rule bao phủ và phần AI chưa được dạy.
4. **Learner model:** state, lịch sử evidence và recommended next activity theo
   từng `participant × skill`.
5. **Agent service:** AI apprentice giữ role novice, chỉ dùng knowledge state.
6. **Isolated runner:** kiểm tra task enactment mà không chạy API key của học
   viên hay đưa stack trace/lời giải.
7. **Review scheduler:** ưu tiên skill fragile/misconception và skill prerequisite
   cho lab sắp tới; thực hiện micro-transfer hoặc repair ở ngày/module tiếp theo.
8. **Assessment service:** transfer độc lập cuối module/track và delayed transfer.

### Một flow chung, nhiều ngày

```text
Lab ngày N
  -> guided card + explanation + public test
  -> dạy AI tại các điểm neo
  -> AI enactment được kiểm chứng
  -> learner model cập nhật

Lab ngày N+1 / module review
  -> hệ thống chọn skill cần repair hoặc review
  -> micro-transfer/reteach ngắn bám evidence cũ
  -> evidence mới cập nhật lại skill state

Cuối module / track
  -> transfer card độc lập, không AI hỗ trợ
  -> đánh giá khả năng áp dụng ngoài bối cảnh đã tập
```

Không phải mọi day đều phải có enactment. Enactment nên đặt ở các objective
then chốt hoặc dễ tạo misconception; các objective khác có thể chỉ tạo evidence
từ guided card, code/test hoặc review.

## 6. Câu hỏi research

### Câu hỏi thiết kế/feasibility

> Làm thế nào để một teachable agent bị giới hạn knowledge state sử dụng evidence
> từ verified enactment để chọn repair/review activity thích hợp trên nhiều lab
> trong một learning track?

### Câu hỏi efficacy sau khi feasibility ổn định

> So với một Learning-by-Teaching flow có nội dung, persona, template và thời
> lượng tương đương nhưng lịch hoạt động cố định, evidence-based adaptive
> Learning-by-Teaching có cải thiện khả năng transfer độc lập cuối module/track
> không?

Primary outcome nên là `TransferScore` của **người học** trên task chưa từng
thấy, chấm bằng hidden tests và rubric mù cho phần giải thích. AI pass chỉ là
evidence quá trình, không phải bằng chứng người học đã học.

Secondary/process metrics gồm ExplanationScore, knowledge-building rate,
AgentPassRate, RepairCount, trajectory của skill state, mental effort, fidelity
và delayed transfer. Không dùng số lượt chat, số từ hoặc satisfaction làm proxy
cho learning.

## 7. Lộ trình nghiên cứu và triển khai

| Giai đoạn | Phạm vi | Mục tiêu | Không được claim |
| --- | --- | --- | --- |
| Feasibility | 1–2 Lab Teaching Spec đầu tiên | Kiểm tra fidelity, state transition, runner, UX và khả năng viết spec. | Learning gain hoặc hiệu quả nhân quả. |
| Pilot module | Một module hoàn chỉnh, khoảng 4–6 lab/ngày | Kiểm tra trajectory, adaptation policy, assessment và vận hành dữ liệu. | Hiệu quả toàn khóa nếu mẫu nhỏ/chưa đối chứng. |
| Study chính | Một track/giai đoạn hoàn chỉnh | So sánh adaptive flow với non-adaptive/fixed-schedule flow. | Nhân quả nếu conditions khác nhiều hơn adaptation policy. |

Trong mọi giai đoạn, chỉ thu dữ liệu người học theo protocol đã đóng băng và sau
khi có ethics/IRB approval hoặc xác nhận chính thức rằng không cần review.

## 8. Định vị với prior research

- **AlgoBo / TeachYou:** chỉ ra LLM tutee và follow-up question có thể tăng
  knowledge-building trong giáo dục thuật toán, nhưng condition thay đổi đồng
  thời nhiều thành phần. Hướng Mentee cần tách rõ evidence-driven enactment và
  adaptation policy. [Jin et al., 2024](https://doi.org/10.1145/3613904.3642349)
- **Recursive feedback:** người dạy quan sát học trò dùng điều được dạy có thể
  hỗ trợ transfer tốt hơn direct feedback. Đây là cơ sở cho AI enactment được
  runner kiểm chứng. [Okita & Schwartz, 2013](https://doi.org/10.1080/10508406.2013.807263)
- **HypoCompass:** LLM teachable agent có thể tạo deliberate practice về debugging,
  nhưng kết quả pre/post nhỏ không đủ để kết luận nhân quả. Nó củng cố relevance
  của việc để learner đánh giá và sửa AI, thay vì để AI luôn làm đúng.
  [Ma et al., 2024](https://arxiv.org/abs/2310.05292)
- **MatlabTutee:** LLM novice đã được triển khai trong lớp CS đại học, nên không
  claim "đầu tiên dùng LLM teachable agent trong CS". Khác biệt đề xuất ở đây là
  verified enactment, learner model và adaptation xuyên track.
  [Rogers et al., 2025](https://doi.org/10.1145/3706598.3713644)
- **AI authority và agency:** agent quá authoritative có thể thay đổi agency và
  tăng off-task talk; adaptivity phải có scope rõ, có thể giải thích và không để
  model tự do kiểm soát lộ trình. [Xing et al., 2026](https://doi.org/10.1111/bjet.70038)

## 9. Cách trình bày ngắn trong meeting

> Nhóm đang xây một engine Adaptive Learning-by-Teaching xuyên suốt track, không
> phải một chatbot cho một Day riêng lẻ. Mỗi lab tạo evidence theo từng skill qua
> lời giải thích, code/test và AI enactment. Engine dùng evidence đó để quyết định
> repair, review hoặc transfer ở những lab sau. Chúng em sẽ validate engine bằng
> một vài Lab Teaching Spec đầu tiên, sau đó pilot ở cấp module trước khi đánh giá
> hiệu quả trên cả track.

Feedback cần xin là phản biện về: (1) skill graph/learning objectives, (2) policy
chuyển state và hoạt động repair/review, (3) transfer assessment cuối module/track,
và (4) feasibility tích hợp vào flow lab hiện có.
