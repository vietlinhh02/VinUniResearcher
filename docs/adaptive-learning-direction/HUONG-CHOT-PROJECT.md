# Hướng chốt của project Mentee

Mentee vẫn là một AI apprentice theo tinh thần AlgoBo/TeachYou. Thay đổi quan
trọng sau buổi review là research không còn được mô tả như bài toán “AI chọn
câu hỏi nào”. Bài toán đầy đủ là khép kín vòng tương tác giữa learner và AI
bằng một knowledge state có thể kiểm tra.

## Mentee là gì?

Mentee là một hoạt động Learning-by-Teaching sau khi learner hoàn thành toàn bộ
một bài lab. Learner đóng vai người dạy. AI đóng vai một học viên mới, lắng
nghe, ghi nhận điều đã được dạy và phản hồi khi còn điểm chưa rõ.

Mentee không thay lesson, IDE, sandbox, test, autograder hoặc hệ thống nộp bài.
Những công cụ đó xác nhận artifact chạy được. Mentee kiểm tra một vấn đề khác:
learner có giải thích được reasoning đằng sau artifact hay không?

Một người có thể pass lab bằng hướng dẫn từng bước, thử nhiều lần hoặc code do
AI sinh. Product cuối cùng không đủ để suy ra người đó hiểu:

- tại sao giải pháp hoạt động;
- evidence nào hỗ trợ quyết định;
- điều kiện và giới hạn của một quy tắc;
- cách nối observation với bước xử lý tiếp theo;
- cách áp dụng reasoning vào một task mới.

## Bài toán nghiên cứu

AI Thực Chiến là testbed. Bài toán nghiên cứu rộng hơn một course cụ thể:

> Làm thế nào một AI apprentice sử dụng knowledge state đang thay đổi để tạo ra
> tương tác ngược có căn cứ, giúp learner làm rõ reasoning gap trong một phiên
> post-lab teach-back?

Contribution nằm ở cả vòng lặp, không chỉ ở câu hỏi cuối cùng:

```text
learner turn
→ state update
→ unresolved issue
→ reciprocal response
→ learner uptake
→ new state revision
```

Mỗi bước cần provenance để team biết lỗi nằm ở extraction, diagnosis, response
selection hay learner uptake.

## Quan hệ với AlgoBo/TeachYou

Mentee kế thừa:

1. Reflect–Respond: knowledge state nằm ngoài LLM và giới hạn điều AI thể hiện là
   đã học.
2. Apprentice persona: AI không chuyển sang vai tutor giải bài.
3. Mode-shifting: AI không chỉ tiếp nhận mà còn chủ động yêu cầu learner giải
   thích sâu hơn.

AlgoBo dùng chu kỳ heuristic để chuyển sang questioner mode. Mentee quan tâm
rộng hơn: sau khi state thay đổi, AI nên có hành động đối thoại nào để trả quyền
giải thích về cho learner?

Teaching Helper chưa nằm trong phiên đầu tiên. Nếu vừa thay reciprocal policy vừa
thêm feedback về cách dạy, team sẽ không biết thành phần nào gây ra thay đổi.

## Flow sản phẩm

```text
1. Learner hoàn thành và nộp toàn bộ lab
2. School lab phát sự kiện lab_completed
3. Mentee nhận objective và completion summary đã lọc
4. Learner dạy lại một skill hẹp cho AI apprentice
5. State updater trích xuất claim và source span
6. Learner xác nhận, sửa hoặc xóa claim
7. Issue detector tìm phần thiếu, mơ hồ hoặc mâu thuẫn
8. Response policy chọn target và reciprocal action
9. AI phản hồi learner mà không đưa đáp án
10. Learner làm rõ, sửa hoặc bổ sung
11. Hệ thống tạo state revision mới và đánh giá target đã thay đổi chưa
12. Loop tiếp tục trong interaction budget và timebox
13. Apprentice bị khóa; learner làm independent transfer
```

Hai chiều của loop phải nhìn thấy được trong event log:

```text
Learner → AI: teaching turn
AI → Learner: reciprocal response
Learner → AI: uptake turn
```

Một AI response không có learner uptake chưa khép kín loop.

## Lab completion summary

Lab chỉ gửi dữ liệu cần cho phiên:

```json
{
  "labId": "rag-evaluation",
  "labVersion": 3,
  "status": "completed",
  "objectiveIds": ["diagnose_retrieval_failure"],
  "evidenceSummary": {
    "testsPassed": true,
    "evaluationCompleted": true,
    "artifactReference": "submission-42"
  }
}
```

`artifactReference` không cho phép Mentee tự tải toàn bộ artifact. Spec phải
allowlist field cần đọc. API key, secret, clipboard, raw log có PII và source code
không liên quan đều nằm ngoài payload mặc định.

Checkpoint trong lab chỉ là evidence. Trigger của phiên post-lab là
`lab_status = completed`.

## Chọn skill cho phiên

Skill phù hợp cần reasoning, có thể mô tả bằng teaching map và có transfer task
độc lập. Không chọn objective chỉ vì nó dễ chấm bằng test.

Ví dụ trong lab RAG, “cấu hình pipeline chạy được” có thể đã được autograder
kiểm tra. “Phân tích retrieval failure từ evaluation evidence” phù hợp hơn vì
learner phải giải thích giả thuyết, test phân biệt và trade-off.

Course author chọn skill trước. LLM không tự quyết định curriculum trong alpha.

## Teaching map và knowledge state

Teaching map chia objective thành các knowledge component. Nó giúp learner biết
phạm vi cần dạy và giúp researcher gán claim hoặc issue nhất quán.

Ví dụ với debugging:

```text
Observed failure
→ candidate causes
→ discriminating test
→ observed evidence
→ conclusion
→ fix and regression check
```

Knowledge state chỉ chứa claim có nguồn từ learner:

```json
{
  "revision": 4,
  "claims": [
    {
      "id": "claim-7",
      "componentId": "candidate_cause",
      "content": "Dense retrieval có thể bỏ sót exact identifier",
      "sourceTurn": 3,
      "sourceText": "...",
      "learnerConfirmed": true
    }
  ]
}
```

Learner nhìn thấy cách hệ thống hiểu lời mình trước khi state được dùng. Mọi
edit tạo revision mới. LLM không được thêm kiến thức chỉ vì nó biết câu trả lời.

Các status như `unaddressed`, `partial`, `articulated`, `ambiguous` và
`contradictory` chỉ mô tả state hội thoại. Không status nào đồng nghĩa với mastery.

## Unresolved issue

Issue detector so confirmed state với teaching map và diagnostic rubric:

```json
{
  "targetId": "issue-4-1",
  "componentId": "evaluation_design",
  "issueType": "missing_justification",
  "claimIds": ["claim-9"],
  "priorityReason": "required_component_incomplete"
}
```

Taxonomy ban đầu gồm missing component, missing justification, missing
relationship, ambiguity, internal contradiction và missing boundary/example.
Taxonomy chỉ được mở rộng khi transcript thật cho thấy cần thêm nhãn.

Private rubric có thể giúp detector nhận ra issue, nhưng reference answer không
được đưa sang response generator. Boundary này hạn chế answer leakage.

## Tương tác ngược của AI

Response policy chọn một target và một reciprocal action:

| Action | Khi dùng | AI làm gì? |
| --- | --- | --- |
| `reflect_back` | Cần xác nhận cách AI hiểu | Nhắc lại và xin xác nhận |
| `clarify` | Claim mơ hồ | Hỏi learner định nghĩa hoặc chỉ rõ tham chiếu |
| `probe_reason` | Có kết luận nhưng thiếu lý do | Hỏi `why/how` |
| `connect` | Hai phần reasoning chưa nối | Yêu cầu learner giải thích quan hệ |
| `check_conflict` | Hai claim mâu thuẫn | Nêu mâu thuẫn, không tự chọn câu đúng |
| `request_example` | Quy tắc thiếu boundary | Yêu cầu ví dụ hoặc edge case |

Ví dụ:

```text
Learner:
“Mình sẽ chạy hybrid retrieval để kiểm tra.”

Knowledge-state issue:
Chưa nói kết quả nào sẽ phân biệt giả thuyết retrieval failure.

AI → Learner:
“Kết quả nào sẽ giúp mình biết nguyên nhân nằm ở retrieval?”

Learner uptake:
“Mình sẽ so Recall@10 theo nhóm query trước và sau thay đổi.”
```

Câu hỏi không phù hợp:

```text
“Bạn nên đo Recall@10 trên nhóm product code đúng không?”
```

Câu thứ hai đưa sẵn phần learner cần tìm. AI đã quay lại vai tutor.

## Khi nào một loop được xem là khép kín?

Một vòng có đủ bốn bằng chứng:

1. AI response trỏ tới target trong state.
2. Learner có một uptake turn sau response đó.
3. State updater tạo revision từ uptake turn.
4. Target chuyển trạng thái hoặc được giữ nguyên kèm evidence.

`Target resolved` chỉ có nghĩa learner đã làm rõ theo rubric của phiên. Nó không có
nghĩa learner hiểu 100%.

Phiên dừng khi hết interaction budget, hết timebox, learner kết thúc hoặc không còn
unresolved target theo rubric. Independent transfer mới đo khả năng tự áp dụng.

## Kế hoạch đánh giá

### Technical evaluation

Hai chuyên gia gán claim, issue, response target và action trên một bộ transcript.
Team đánh giá:

- state extraction và source grounding;
- issue agreement;
- target/action agreement;
- groundedness, relevance, answer leakage và persona drift.

### Usability và feasibility pilot

Learner trải nghiệm một reciprocal loop hoàn chỉnh. Pilot kiểm tra:

- learner có hiểu vai dạy và cách xác nhận state không;
- AI response có dẫn tới learner uptake không;
- uptake có tạo state revision và thay đổi target không;
- loop có gây lặp, gián đoạn hoặc cognitive load quá cao không;
- event log có dựng lại được toàn bộ vòng tương tác không.

Pilot này chưa trả lời policy nào tốt hơn hoặc Mentee có tạo learning gain không.

### Comparative study sau pilot

Comparator chưa được chốt. Có hai câu hỏi hợp lệ nhưng khác nhau:

| So sánh | Câu hỏi được kiểm tra |
| --- | --- |
| One-way vs Reciprocal | Tương tác ngược và uptake tạo khác biệt gì? |
| Fixed vs State-aware | Cách chọn response có thích nghi tạo khác biệt gì? |

Team chọn một contrast sau khi xem failure data của feasibility pilot và xác định
contribution muốn bảo vệ. Không gộp hai manipulation vào cùng study.

## Tại sao không cho AI chạy lại lab ở study đầu tiên?

Nếu AI nhận knowledge state rồi giải một task mới, output phụ thuộc vào lời
learner dạy và capability của model. Khi output sai, team không dễ tách hai
nguyên nhân. Runner chỉ xác nhận output sai; nó không tự giải quyết confound đó.

Enactment vẫn có cơ sở từ recursive feedback, nhưng nó trả lời một research
question khác. Team có thể nghiên cứu sau khi kiểm soát được model capability.

## Phạm vi build

### Giai đoạn 1

Freeze một objective, teaching map, issue taxonomy và annotation guide. Tạo expert
development set trước khi tối ưu prompt.

### Giai đoạn 2

Xây text session end-to-end: turn storage, state updater, confirmation, issue
detector, response policy, learner uptake và state revision.

### Giai đoạn 3

Chạy fidelity suite, technical evaluation và usability pilot. Sửa prompt/spec trước
khi freeze feasibility protocol.

### Giai đoạn 4

Đo loop completion, uptake, target change và UX. Sau đó mới chọn comparative RQ,
power analysis và preregister study tiếp theo.

## Không làm ở alpha

- Không làm multi-domain authoring studio.
- Không thêm voice/diagram trước text vertical slice.
- Không dùng LLM judge chưa calibrate làm ground truth.
- Không cá nhân hóa curriculum từ evidence chưa validate.
- Không gọi knowledge-building là learning gain.
- Không claim Mentee là teachable agent đầu tiên.

## Hướng chốt trong một đoạn

Mentee là một AI apprentice dùng sau khi learner hoàn thành lab. Learner dạy lại
một skill hẹp; hệ thống lưu lời dạy thành external knowledge state có provenance.
AI dùng state để phản hồi learner, learner làm rõ hoặc sửa lời dạy, rồi state
được cập nhật lần nữa. Đây là reciprocal interaction loop mà team cần xây và
kiểm tra.
Follow-up question là một response action bên trong loop. AI Thực Chiến là testbed;
study đầu tiên đánh giá fidelity và feasibility của loop, chưa chốt comparator.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Xoay tài liệu quanh loop hai chiều | Response → uptake → state revision |
| Vocabulary | Mở rộng response taxonomy | Reflect, clarify, probe, connect |
| Inflation | Tách feasibility khỏi efficacy | Chưa chốt comparator |
| Grammar | Dùng ví dụ hội thoại đầy đủ | Learner → AI → Learner |
| Soul | Nêu rõ thứ tự ưu tiên | Xây loop trước, so sánh sau |
