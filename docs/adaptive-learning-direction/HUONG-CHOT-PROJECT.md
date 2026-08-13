# Hướng chốt của project Mentee

Phiên bản này thay thế hướng `AI enact + runner` trong study đầu tiên. Mentee vẫn là
một AI apprentice theo tinh thần AlgoBo/TeachYou, nhưng research tập trung vào knowledge
state và cách AI chọn câu hỏi tiếp theo.

## Mentee là gì?

Mentee là một hoạt động Learning-by-Teaching sau khi learner hoàn thành toàn bộ một
bài lab. Learner đóng vai người dạy. AI đóng vai một học viên mới, lắng nghe, ghi
nhận điều đã được dạy và hỏi lại khi có phần chưa rõ.

Mentee không thay lesson, IDE, sandbox, test, autograder hoặc hệ thống nộp bài. Những
công cụ đó xác nhận artifact chạy được. Mentee kiểm tra một vấn đề khác:
learner có giải thích được reasoning đằng sau artifact hay không?

Một người có thể pass lab bằng cách làm theo hướng dẫn, thử nhiều lần hoặc
dùng code do AI sinh. Vì vậy product cuối cùng không đủ để suy ra người đó
hiểu:

- tại sao giải pháp hoạt động;
- evidence nào hỗ trợ quyết định;
- điều kiện và giới hạn của một quy tắc;
- cách nối kết quả quan sát với bước xử lý tiếp theo;
- cách áp dụng reasoning vào một task mới.

## Research problem

Use case của team là các lab AI Thực Chiến. Bài toán nghiên cứu rộng hơn use case:

> Làm thế nào AI apprentice cập nhật knowledge state từ lời learner và chọn
> follow-up question phù hợp để làm rõ reasoning gap?

AI Thực Chiến cung cấp learner, objective, artifact context và môi trường pilot.
Contribution không phải một chatbot riêng cho course đó. Contribution nằm ở pipeline có
thể kiểm tra: learner claim, gap, question target và phản hồi tiếp theo được nối
với nhau bằng provenance.

## Quan hệ với AlgoBo/TeachYou

Mentee kế thừa ba cơ chế:

1. Reflect–Respond: knowledge state nằm ngoài LLM và giới hạn điều AI thể hiện là
   đã học.
2. Apprentice persona: AI không chuyển sang vai tutor giải bài.
3. Active questioning: AI hỏi `why/how`, yêu cầu làm rõ, tạo kết nối hoặc kiểm tra
   edge case.

Mentee thay đổi phần question policy. AlgoBo chuyển sang questioner mode theo chu kỳ
heuristic. Mentee dùng knowledge state để quyết định phần nào đáng hỏi và nên
hỏi theo strategy nào.

Teaching Helper chưa nằm trong comparative study. Thay cả question policy lẫn feedback về
cách dạy trong cùng condition sẽ tạo confound giống hạn chế mà team đã nhận ra
khi đọc paper.

## Flow sản phẩm

```text
1. Learner hoàn thành và nộp toàn bộ lab
2. School lab phát sự kiện lab_completed
3. Mentee nhận objective và completion summary đã lọc
4. Learner dạy lại một skill hẹp cho AI apprentice
5. State updater trích xuất claim và source span
6. Learner xác nhận, sửa hoặc xóa claim
7. Gap detector tìm phần thiếu, mơ hồ hoặc mâu thuẫn
8. Question selector chọn một target và một strategy
9. AI hỏi đúng một follow-up question
10. Learner làm rõ; hệ thống tạo knowledge-state revision mới
11. Vòng lặp tiếp tục trong question budget và timebox
12. Apprentice bị khóa; learner làm independent transfer
```

Một lab tạo tối đa một Mentee session. Alpha tập trung vào đúng một objective trong
phiên đó.

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

`artifactReference` không có nghĩa Mentee được tự tải toàn bộ artifact. Spec phải
allowlist field cần đọc. API key, secret, clipboard, raw log có PII và source code không
liên quan đều nằm ngoài payload mặc định.

Checkpoint bên trong lab chỉ là evidence. Trigger duy nhất của phiên post-lab là
`lab_status = completed`.

## Chọn skill cho phiên

Skill phù hợp cần reasoning, có thể mô tả bằng teaching map và có transfer task
độc lập. Không chọn objective chỉ vì nó dễ chấm bằng test.

Ví dụ trong lab RAG, “cấu hình pipeline chạy được” có thể đã được
autograder kiểm tra. “Phân tích retrieval failure từ evaluation evidence” phù hợp hơn
với Mentee vì learner phải giải thích giả thuyết, test phân biệt và trade-off.

Course author chọn skill trước. LLM không tự quyết định curriculum trong alpha.

## Teaching map

Teaching map chia objective thành các knowledge component. Nó giúp learner biết phạm vi
cần dạy và giúp researcher gán claim/gap nhất quán.

Debugging:

```text
Observed failure
→ candidate causes
→ discriminating test
→ observed evidence
→ conclusion
→ fix and regression check
```

RAG evaluation:

```text
Failure slice
→ hypothesized source
→ intervention
→ evaluation design
→ quality/latency/cost trade-off
→ decision
```

Agent workflow:

```text
Current state
→ tool or action
→ expected observation
→ guardrail
→ recovery or termination condition
```

Teaching map là scaffold, không phải đáp án mẫu. Label không được tiết lộ quyết
định đúng của transfer task.

## Knowledge state

Knowledge state chỉ chứa claim có nguồn từ learner:

```json
{
  "revision": 4,
  "claims": [
    {
      "id": "claim-7",
      "componentId": "hypothesized_source",
      "content": "Dense retrieval có thể bỏ sót exact identifier",
      "sourceTurn": 3,
      "sourceText": "...",
      "learnerConfirmed": true
    }
  ]
}
```

Learner nhìn thấy cách hệ thống hiểu lời mình trước khi state được dùng. Mọi
edit tạo revision mới. LLM không được tự thêm kiến thức đúng chỉ vì nó biết
câu trả lời.

Các status như `unaddressed`, `partial`, `articulated`, `ambiguous` và `contradictory` chỉ mô
tả state của cuộc hội thoại. Không status nào đồng nghĩa với mastery.

## Gap detection

Gap detector so confirmed state với teaching map và diagnostic rubric. Nó tạo một danh sách
candidate target:

```json
{
  "targetId": "gap-4-1",
  "componentId": "evaluation_design",
  "issueType": "missing_justification",
  "claimIds": ["claim-9"],
  "priorityReason": "required_component_incomplete"
}
```

Taxonomy ban đầu chỉ gồm missing component, missing justification, missing relationship,
ambiguity, internal contradiction và missing boundary/example. Taxonomy sẽ được sửa từ
annotation thực tế, không mở rộng vì muốn spec trông đầy đủ.

Private rubric có thể giúp detector nhận ra gap, nhưng reference answer không được đưa
sang response generator. Đây là boundary chống answer leakage.

## Question selection

Question selector chọn đúng một candidate target và một trong bốn strategy:

- clarification cho claim mơ hồ hoặc mâu thuẫn;
- elaboration khi learner có kết luận nhưng chưa giải thích vì sao;
- connection khi hai phần reasoning chưa được nối;
- edge case khi quy tắc chưa có điều kiện hoặc ví dụ biên.

Câu hỏi phải map về target và learner claim nếu claim đã tồn tại. Với
`missing_component`, target có thể chỉ map về teaching component. Ví dụ:

```text
Learner claim:
“Mình sẽ chạy hybrid retrieval để kiểm tra.”

Gap:
Chưa nói kết quả nào sẽ phân biệt giả thuyết retrieval failure.

Follow-up question:
“Kết quả nào sẽ giúp bạn biết nguyên nhân nằm ở retrieval?”
```

Câu hỏi không phù hợp:

```text
“Bạn nên đo Recall@10 trên nhóm product code đúng không?”
```

Câu thứ hai gợi metric và slice cần tìm. AI đã quay lại vai tutor.

## Điều kiện dừng

Phiên dừng khi hết question budget, hết timebox, learner kết thúc hoặc gap detector
không còn target theo rubric. Giao diện chỉ báo phiên đã hoàn tất. Nó không nói
“knowledge state clear 100%”.

Independent transfer mới cung cấp bằng chứng về việc learner tự áp dụng skill. Ngay
cả transfer score cũng phải được diễn giải trong phạm vi objective và rubric đã
đo.

## Study đầu tiên

### Technical evaluation

Trước khi có learner, hai chuyên gia gán claim, gap, question target và strategy trên một
bộ transcript. Team đánh giá từng stage, không chỉ nhìn câu trả lời cuối:

- state extraction và source grounding;
- gap agreement;
- target/strategy agreement;
- groundedness, relevance, answer leakage và persona drift.

### Comparative pilot

Hai condition giữ nguyên model, prompt chung, persona, UI, lesson material, knowledge-state
format, thời lượng và question opportunities.

| Condition | Policy |
| --- | --- |
| Fixed | Đi theo lesson path và strategy order viết trước |
| State-aware | Chọn target và strategy từ confirmed knowledge state |

Việc giữ cùng question budget rất quan trọng. Nếu state-aware condition hỏi nhiều
hơn, team không biết kết quả đến từ adaptivity hay chỉ từ thêm tương tác.

Primary process outcome là knowledge-building rate. Technical fidelity, mental effort và UX
được báo riêng. Independent transfer là learning outcome, nhưng ở feasibility pilot nhỏ
nên được ghi là exploratory.

Research question chính:

> State-aware follow-up questioning có khơi gợi nhiều knowledge-building hơn fixed
> questioning trong một phiên post-lab Learning-by-Teaching hay không?

## Tại sao không cho AI chạy lại lab ở study này?

Nếu AI nhận knowledge state rồi giải một task mới, output phụ thuộc vào ít nhất
hai thứ: chất lượng lời learner dạy và capability của model. Khi output sai, team
không dễ tách hai nguyên nhân. Bước runner phía sau chỉ xác nhận output sai; nó
không tự giải quyết confound đó.

Enactment vẫn là một cơ chế Learning-by-Teaching có cơ sở từ recursive feedback.
Nhưng nó trả lời một research question khác. Team có thể nghiên cứu nó sau bằng
một intervention riêng, khi đã thiết kế được cách kiểm soát model capability.

## Phạm vi build

### Giai đoạn 1

Freeze một objective, teaching map, gap taxonomy và annotation guide. Tạo expert development
set trước khi tối ưu prompt.

### Giai đoạn 2

Xây text session end-to-end: turn storage, state updater, confirmation, gap detector và question
selector. Thêm fixed/state-aware policy trên cùng schedule.

### Giai đoạn 3

Chạy fidelity suite, expert evaluation và usability pilot. Sửa prompt/spec trước khi freeze
comparative study.

### Giai đoạn 4

Preregister protocol, chạy pilot, báo effect estimate cùng uncertainty. Không diễn giải `p
> .05` thành hai policy tương đương.

### Sau pilot

Quyết định có mở rộng sang lab thứ hai, delayed transfer hoặc enactment hay không
dựa trên failure data. Chưa xây learner model xuyên track.

## Không làm ở alpha

- Không làm multi-domain authoring studio.
- Không thêm voice/diagram trước text vertical slice.
- Không dùng LLM judge chưa calibrate làm ground truth.
- Không cá nhân hóa curriculum từ evidence chưa validate.
- Không gọi knowledge-building là learning gain.
- Không claim Mentee là teachable agent đầu tiên.

## Hướng chốt trong một đoạn

Mentee là một AI apprentice dùng sau khi learner hoàn thành lab. Learner dạy lại một
skill hẹp; hệ thống lưu lời dạy thành external knowledge state có provenance. Từ
state đó, Mentee phát hiện reasoning gap và chọn một follow-up question để learner làm
rõ. AI Thực Chiến là testbed, còn bài toán nghiên cứu là state-aware question
selection. Study đầu tiên so sánh policy này với một fixed policy trong cùng số câu
hỏi và đo knowledge-building; independent transfer được đo riêng. AI enactment và runner
không còn nằm trong core loop đầu tiên.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Chốt flow theo feedback | Knowledge state → gap → question |
| Inflation | Bỏ claim platform và mastery | Một objective, một pilot trước |
| Vocabulary | Giữ thuật ngữ có nguồn | Reflect–Respond, active questioning |
| Grammar | Dùng ví dụ hội thoại | Câu hỏi grounded và câu hỏi leak |
| Soul | Nêu lựa chọn của team | Enactment trả lời câu hỏi khác |
