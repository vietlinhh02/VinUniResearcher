# Tổng quan hướng nghiên cứu: dạy ngược AI trong các lab AI thực chiến

Trạng thái: bản thảo để thảo luận với mentor/chị Ba — 25/07/2026; cập nhật 26/07/2026 sau khi
rà prior art và chốt khung buổi chiều Day 01.  
Mục đích: ghi lại hướng đang được cân nhắc; **không** phải protocol đã chốt hay claim đã được
xác nhận bằng thực nghiệm.

Thay đổi ở bản 26/07:

- §3–§4: thay giả định về prior art bằng công trình cụ thể (TeachYou/AlgoBo, HypoCompass,
  MatlabTutee, Betty's Brain, SimStudent) và ranh giới novelty còn lại.
- §5: thay luồng mô tả chung bằng **khung buổi chiều 150 phút** có framing, pre-test,
  4 block scaffold giảm dần, 2 điểm neo enactment, transfer ngay và transfer sau 7 ngày.
- §8–§9: siết cỡ mẫu, phân tích và cấu trúc transfer card 7 điểm.
- §12.7: câu hỏi về *Playing Dumb to Get Smart* đã được giải quyết.
- §16: danh sách claim không được viết + effect size để hiệu chỉnh kỳ vọng.
- §17: **bộ quyết định làm việc** — phương án được chọn cho từng quyết định mở, dùng làm mặc định
  khi build; mentor có quyền lật bất kỳ dòng nào.

## 1. Hướng sản phẩm đang muốn làm

Người học có slide vào buổi sáng và làm một lab thực hành vào buổi chiều. Ví dụ đầu tiên là lab
API Day 01: gọi LLM API, so sánh model, system prompt, token/cost, streaming, retry và ghép thành
CLI assistant.

Mục tiêu của AI Thực Chiến không phải thay lesson hoặc viết lại lab. Nó bổ sung một hoạt động sau
khi người học đã làm artifact:

```text
Học slide
  -> làm lab có sẵn
  -> nhận evidence từ test/scenario
  -> dạy một AI apprentice về artifact và các quyết định đã làm
  -> quan sát AI apprentice áp dụng điều vừa học vào case mới
  -> phát hiện, sửa cách dạy hoặc sửa artifact
  -> tự giải một task biến thể, không có AI (cuối buổi, và lặp lại sau 7 ngày)
```

AI ở đây là **AI apprentice / AI học trò**, không chỉ là chatbot trợ giảng hay code reviewer.
Người học phải chịu trách nhiệm giải thích và giúp AI áp dụng được kiến thức.

## 2. Không xây lại những gì lab đã có

Lab Day 01 hiện đã có `template.py`, unit/mock tests, checkpoint, `grade.py`, exercise và luồng
nộp bài. Những thành phần đó làm nhiệm vụ kiểm tra artifact có đáp ứng spec hay không.

Không nên lấy việc xây sandbox hoặc auto-grader mới làm contribution research ở giai đoạn này:

| Thành phần đã có hoặc có thể tái sử dụng | Vai trò trong đề tài |
|---|---|
| Repo lab, starter code và test công khai | Môi trường làm bài giống nhau cho mọi participant |
| `pytest` / `grade.py` | Xác nhận baseline artifact đúng/sai |
| Hidden test hoặc scenario mới | Đo khả năng transfer độc lập |
| AI apprentice | Can thiệp nghiên cứu: người học dạy, AI áp dụng lại và hỏi phần thiếu |

Giai đoạn đầu không cần sandbox. Người học có thể dùng local IDE, GitHub Codespaces hoặc môi
trường lab gốc; hệ thống chỉ cần nhận checkpoint, output test và artifact/đường dẫn repo phù hợp.
Sandbox chỉ là hạ tầng sản phẩm về sau nếu setup là rào cản hoặc cần chạy/chấm trong trình duyệt.

Nguồn lab ví dụ: [K4 Day 01 — LLM API Exploration](https://github.com/VinUni-AI20k/K4-Day01-LLM-API-Exploration).

## 3. Vấn đề với hướng “dạy AI” thuần túy

Chỉ yêu cầu người học “hãy dạy AI về Binary Search/API” không đủ mới. Rà cứu 26/07 xác nhận
những thành phần sau **đã có công trình công bố**:

| Thành phần | Đã có ở đâu |
|---|---|
| LLM làm teachable agent trong lập trình | AlgoBo (CHI 2024), HypoCompass (AIED 2024), Chen et al. (BJET 2024/25) |
| LLM đóng novice trong lớp CS đại học thật | MatlabTutee/*Playing Dumb to Get Smart* (CHI 2025), 119 SV, 2 đợt deploy 1 tháng |
| Knowledge state ngoài model để chặn agent “biết tuốt” | AlgoBo, pipeline Reflect-Respond (state JSON `facts` + `code_implementation`) |
| Agent viết code sau khi được dạy | AlgoBo — learner còn bấm được “run test cases” trên code của agent |
| Teachable agent + code + test tự động | HypoCompass — nhưng **đảo chiều**: agent viết code lỗi, người học đóng TA đi debug |
| Agent enact rồi bị chấm, learner sửa lại lời dạy | Betty's Brain — Betty làm quiz, mentor agent Mr. Davis chấm, học sinh sửa concept map |
| Protégé effect / learning-by-teaching có hiệu quả | Chase et al. (2009); meta-analysis Kobayashi (2019, 2024) |
| Guided coding kiểu chọn phương án + giải thích | Parsons problems (Ericson et al.), self-explanation, faded worked examples |

Nghĩa là gần như mọi mảnh ghép riêng lẻ đều đã có chủ. Thứ chưa có chủ là **tổ hợp cụ thể**:
learner dạy → apprentice enact trên một **isomorphic** micro-task → **hidden** test runner trả
pass/fail/trace → learner quan sát fail và sửa lời dạy → primary outcome là transfer card độc lập
người học tự làm, không có AI. Chi tiết ranh giới ở §4 và §16.

Do đó có ba cách định vị, không được trộn lẫn:

| Định vị | Có thể tuyên bố |
|---|---|
| Replication theo bối cảnh | Kiểm tra teachable agent trong lab AI thực chiến, tiếng Việt hoặc nhóm người học mới. Có giá trị, nhưng không tuyên bố cơ chế mới. |
| Extension theo artifact | Gắn dạy AI vào code/workflow/test thật. Đây là khác biệt thiết kế, chưa tự động là novelty khoa học. |
| Nghiên cứu cơ chế mới | Kiểm tra liệu vòng “dạy -> AI áp dụng lại vào case biến thể -> người học quan sát và sửa” có cải thiện transfer hơn AI học trò hội thoại thông thường hay không. |

Hướng khuyến nghị là mức ba, với tên làm việc:

> **Artifact-grounded recursive teachable agent for applied AI labs.**

Từ `recursive` nghĩa là người học không chỉ nhận feedback trực tiếp. Họ phải nhìn AI học trò thử
dùng kiến thức vừa được dạy, rồi dùng thất bại/lỗ hổng đó để dạy lại.

## 4. Khác biệt với prior art

### 4.1. Bốn công trình phải so trực diện

**TeachYou / AlgoBo** — Jin, Lee, Shin, Kim, CHI 2024, Article 652, DOI `10.1145/3613904.3642349`
(arXiv 2309.14534). Learner dạy AlgoBo (persona học sinh cấp 3, backbone GPT-4) học binary search.
Pipeline *Reflect-Respond* cập nhật knowledge state JSON từ 3 message gần nhất và chỉ sinh câu trả
lời từ knowledge đã có. *Mode-shifting* đẩy agent hỏi why/how. Between-subject n=40:
mode-shifting tăng mật độ knowledge-building message có ý nghĩa (`p = 0.03`, Cohen's `d = 0.71`);
Teaching Helper không cải thiện metacognition.

Đây là **baseline `reflective` của study này**. Bốn ranh giới còn lại:

1. Test của AlgoBo chạy trên *chính bài đang dạy*, không phải isomorphic transfer task.
2. Test *hiện* và do learner chủ động bấm chạy, không phải hidden runner độc lập.
3. Không nghiên cứu vòng lặp “sửa lời dạy dựa trên test fail”.
4. Outcome là MCQ + mật độ knowledge-building; tác giả **không đo learning outcome trực tiếp**.

**HypoCompass** — Ma, Shen, Koedinger, Wu, AIED 2024 Best Paper, DOI `10.1007/978-3-031-64302-6_19`
(arXiv 2310.05292). Đây là mối đe dọa novelty gần nhất trong không gian “teachable agent + code +
test”, nhưng **đảo chiều**: LLM agent viết code lỗi, người học đóng TA đi xây test suite và chọn/
giải thích nguyên nhân lỗi. Cải thiện debugging 12% pre→post (n=19), tạo liệu nhanh ~4× TA người.
Không có vòng “người dạy → agent enact trên isomorphic task → hidden test → người sửa lời dạy”.
Bản thảo **phải nêu HypoCompass rõ ràng và giải thích khác biệt chiều**.

**MatlabTutee / *Playing Dumb to Get Smart*** — Rogers, Davis, Maharana, Etheredge, Chernova,
CHI 2025, pp. 126:1–126:22, DOI `10.1145/3706598.3713644`. Câu hỏi treo ở §12.7 đã được giải
quyết: tiêu đề gây hiểu nhầm — “playing dumb” nghĩa là LLM *đóng vai novice*, không phải agent
giả ngu để test learner. 4 thí nghiệm, 119 sinh viên, 2 đợt deploy in-the-wild 1 tháng trong lớp
CS nhập môn. **Không có verification loop bằng test chạy được**; learning đo bằng MCQ isomorphic
14 câu. Kết quả: LLM đóng novice đạt lợi ích LBT tương đương human đóng novice.
Hệ quả: cơ chế enactment-có-test chưa bị chiếm, nhưng không được tuyên bố mình là người đầu tiên
dùng LLM teachable agent trong lớp CS đại học.

**Betty's Brain** — Leelawong & Biswas, IJAIED 18(3):181–208 (2008); protégé effect ở Chase, Chin,
Oppezzo, Schwartz (2009), JSET 18(4):334–352. Betty làm quiz do mentor agent chấm, học sinh xem
Betty sai để sửa concept map. **Đây đã là một dạng “enactment có verification”** và là tiền thân
trực tiếp của ý tưởng recursive. Khác biệt của bản thảo: artifact là code chạy được chứ không phải
suy luận qualitative; verification là hidden test runner có failure trace chứ không phải quiz;
task là isomorphic variant chứ không phải quiz trên chính nội dung vừa dạy.

### 4.2. Bảng định vị

| Trục | Betty's Brain | SimStudent/APLUS | TeachYou/AlgoBo | HypoCompass | **Đề xuất** |
|---|---|---|---|---|---|
| Đơn vị nội dung | Concept map nhân–quả | Luật giải phương trình | Thuật toán nhập môn | Bug trong code | **Artifact lab AI thực chiến + quyết định thiết kế** |
| Evidence agent tạo | Quiz answer | Bước giải | Code khi được dạy | Code lỗi có sẵn | **Template slot-filling trên isomorphic task** |
| Verification | Mentor agent chấm quiz | Learner báo đúng/sai | Learner chạy test (hiện) | Auto-test khâu tạo liệu | **Hidden runner: pass/fail + trace tối thiểu** |
| Agent làm gì sau khi được dạy | Làm quiz | Giải bài | Viết code + hỏi why/how | (đảo chiều) | **Enact knowledge trên transfer variant** |
| Learner làm gì tiếp | Sửa concept map | Sửa cách dạy | Tiếp tục hội thoại | Debug tiếp | **Sửa lời dạy rồi làm transfer card độc lập không AI** |
| Outcome ưu tiên | Map score, SRL | Post-test đại số | MCQ + KB density | Debugging post-test | **TransferScore (hidden code test + blind rubric)** |

### 4.3. Contribution statement an toàn

> We contribute a learning-by-teaching design in which a knowledge-state-grounded LLM apprentice
> *enacts* the learner's instruction on a held-out isomorphic coding task whose correctness is
> checked by a hidden test runner, and we study whether observing verified enactment failures —
> and repairing one's teaching — improves independent transfer relative to a
> reflective-dialogue-only agent (TeachYou/AlgoBo-style). We further contribute instruments for
> agent fidelity (answer-leakage, persona-drift, groundedness) in this setting.

Nếu study chỉ so sánh AI hỏi nhiều với AI hỏi ít, nó vẫn rất gần protocol TeachYou. Nếu study
so sánh AI apprentice có enactment được kiểm chứng với AI apprentice hội thoại thông thường, nó
trả lời một câu hỏi hẹp và rõ hơn.

## 5. Khung buổi chiều Day 01 (~150 phút)

### 5.1. Khung tổng

```text
0. Framing (2')      — báo trước: "chiều nay bạn sẽ dạy một AI apprentice,
                        và nó sẽ bị test trên bài khác"
1. Pre-test (10')    — 6-8 item bám learning objective + prior experience
2. Lab 4 block (75') — guided cards, xen enactment ở 2 điểm neo
3. Immediate transfer (25') — PRIMARY, không AI
4. Exit survey (8')  — credibility, mental effort, boredom
--- +7 ngày ---
5. Delayed transfer (20') — SECONDARY
```

Bước 0 là thứ rẻ nhất và đáng giá nhất. Một câu nói trước khi bắt đầu, áp cho **cả hai condition**
— nó không phải biến can thiệp, nó là thứ nâng sàn hiệu ứng để `enactment` có chỗ mà vượt
`reflective`.

Bước 0 có cơ sở thực nghiệm chứ không phải trực giác: Kobayashi (2024, Educational Psychology
Review, DOI `10.1007/s10648-024-09871-4`) cho thấy dạy **có** teaching expectancy đạt `g = 0.48`
(95% CI `[0.34, 0.63]`), còn **không có** expectancy thì `g = −0.02` (95% CI `[−0.14, 0.11]`),
không khác 0. Bỏ bước framing là tự nguyện chạy study ở nhánh không có hiệu ứng.

Ba mốc đo (pre-test → immediate → delayed) khớp thông lệ: AlgoBo và MatlabTutee đều dùng
isomorphic pre/post; điểm khác là ở đây post là code chạy được, không phải MCQ.

### 5.2. Phân bổ 4 block — scaffold giảm dần, enactment chỉ ở 2 điểm

| Block | Dạng card | Enactment? |
|---|---|---|
| 1. Basic API call | Menu 3 lựa chọn (làm quen format) | Không |
| 2. System vs user message | Menu 3 lựa chọn | **Neo #1** |
| 3. Token/cost | **Free-form**: tự phát biểu rule, không menu | Không |
| 4. Streaming/retry | Menu 3 lựa chọn | **Neo #2** |

Block 3 cố tình gỡ menu. Nó trả lời câu hỏi “người học có rule của riêng mình để dạy không, hay
chỉ đọc lại option label” — và cho một biến so sánh nội bộ: chất lượng lời dạy ở block có menu so
với block không menu. Đây cũng là chỗ trả lời trước phản biện “guided coding chỉ là recognition,
không phải recall”.

Hai điểm neo thay vì bốn: đủ để đo, không đủ để chán. Đây là quyết định đánh đổi trực tiếp với
rủi ro boredom/credibility ở §6 — literature chưa có instrument chuẩn cho việc learner nhận ra
agent “diễn”, nên giảm số lần lặp là biện pháp phòng ngừa rẻ nhất.

### 5.3. Vòng enactment tại điểm neo

```text
Người học phát biểu rule cho apprentice (free text)
  -> knowledge state ghi rule + trỏ về card/test làm evidence
  -> apprentice nhận TEMPLATE có 2-3 slot khuyết, cùng objective,
     persona + user request + mock error khác
  -> apprentice CHỈ điền slot từ knowledge state; slot nào state
     không phủ được thì để trống và khai báo "chưa được dạy"
  -> runner assert ĐÚNG các slot thuộc objective, bỏ qua phần còn lại
  -> pass/fail + trace tối thiểu (tên assertion, expected vs actual)
  -> người học sửa/bổ sung rule -> thử lại, tối đa 2 vòng
```

Chỗ then chốt là **template slot-filling thay vì để LLM sinh code tự do**. Nó giải dilemma ở §6:
agent không diễn kịch (nó thực sự bị chặn bởi knowledge state), nhưng cũng không fail vì lý do
rác. Mọi failure đều truy được về một slot, mà mỗi slot ánh xạ 1-1 với một rule người học đã hoặc
chưa dạy. **Misconception được mã hóa bằng *cấu trúc slot*, không phải bằng kịch bản lỗi.**

Điều này khớp trực tiếp với yêu cầu *Epistemic Consistency across isomorphic items* mà literature
về student simulation nêu ra (arXiv 2601.05473 — taxonomy Epistemic State Specification E0→E4).
Thiết kế slot-filling đặt agent ở mức **E3 (misconception-structured)**: lỗi quy được nhân quả về
điều learner dạy/không dạy và ổn định qua các item isomorphic. HypoCompass và GPTeach được xếp E1;
AlgoBo khoảng E1–E2/E3. Đây là một trục phân biệt có thể viết vào paper.

Nhánh `reflective` tại **cùng** điểm neo: apprentice nhận **cùng** template đó, đọc và nói thành
lời nó sẽ điền gì và vì sao, nhưng không có runner, không pass/fail. Cùng nội dung, cùng số lượt,
khác đúng một thứ: **có verification hay không**.

### 5.4. Transfer card (bước 3) — cấu trúc lai

```text
Phần A (2 item, có scaffold):  chọn + giải thích        — 2 điểm
Phần B (2 item, free-form):    điền function body       — 2 điểm
Phần C (1 item, debug):        code sai, tìm và sửa     — 1 điểm
Phần D (giải thích mở):        trade-off, rubric mù     — 0-2 điểm
                                                  tổng    7 điểm
```

Phần B và C là thứ cứu khỏi ceiling. Phần A giữ lại để bắc cầu và để có item dễ cho học viên yếu
(tránh floor).

Hidden test của transfer card **không được assert cùng hành vi** với test ở hai điểm neo — khác
input là chưa đủ, phải khác điểm assert, nếu không trace mà người học đọc lúc chiều chính là
preview đề thi.

Phần D có cơ sở riêng để giữ: “Practice Less, Explain More” (arXiv 2604.00142) thấy hiệu ứng
transfer chỉ xuất hiện ở phần explanation cho NEI transfer item (`β = +7.3%`, `p = .057`,
`d = 0.38`), không ở MCQ — explanation rubric nhạy hơn với transfer so với item chọn đáp án.

### 5.5. Hai quyết định phải chốt trước khi chạy — đã chọn phương án làm việc

**Time-on-task → chốt: cố định *thời lượng*.** 75 phút phần lab, như nhau cho hai nhóm; số lượt
hội thoại trôi tự do, vì đó là điều kiện sinh thái thật. Bù lại, số lượt trung bình của cả hai
nhóm **bắt buộc** vào bảng descriptive và limitations. Phương án ngược — cố định số lượt — bị
loại vì `reflective` sẽ cần filler task lấp thời gian trống, mà filler là một *hoạt động học*
không kiểm soát được nội dung: confound tệ hơn chênh lệch số lượt.

**Ngôn ngữ → chốt: ép khuôn phát biểu rule, song ngữ từ đầu.** Người học sẽ dạy bằng tiếng Việt
lẫn thuật ngữ Anh, và knowledge-state extraction từ free text hỗn hợp là chỗ dễ vỡ nhất về mặt kỹ
thuật. Quyết định làm việc: **không để free text hoàn toàn** — UI ép người học phát biểu rule
theo khuôn ba ô:

```text
Khi [điều kiện] ___ thì [hành động] ___ vì [lý do] ___
```

Đánh đổi: mất một chút tính sinh thái, đổi lấy (1) extraction gần như không thể vỡ, (2)
slot-mapping 1-1 trở nên tầm thường về kỹ thuật, (3) bản thân khuôn là một scaffold
self-explanation có tiền lệ. Rủi ro kỹ thuật #1 của đề tài được xóa bằng một quyết định UI.

Pilot 5–8 người vẫn giữ, nhưng mục tiêu đổi: không còn đo "extraction có trích đúng không" mà đo
**người học có điền được khuôn một cách tự nhiên không** — khuôn có quá gò bó với block free-form
(block 3) không, và tỉ lệ ô "vì ___" bị bỏ trống hoặc điền lấy lệ là bao nhiêu.

Ghi chú giữ nguyên: Fan et al. (2025) chạy trên SV không phải bản ngữ tiếng Anh và thấy guardrail
dễ bị vượt ở nhóm này — knowledge-state/persona song ngữ ngay từ đầu, không phải patch về sau.

### 5.6. Bước tiếp theo

Nếu khung này được chốt, việc tiếp theo là viết **Lab Teaching Spec đầy đủ cho Day 01** theo
schema YAML ở §13.3 — cụ thể đến từng slot, từng assertion, từng distractor. Đó mới là chỗ thiết
kế thật sự sống hay chết.

## 6. AI không được quá thông minh hoặc giả ngu

Đây là rủi ro cốt lõi của teachable agent.

| Lỗi thiết kế | Hệ quả |
|---|---|
| AI tự biết lời giải và sửa người học | Người học tiêu thụ đáp án, không còn vai người dạy |
| AI cố tình hỏi những câu quá cơ bản/lặp lại | Người học thấy đang diễn kịch và chán |
| AI trả lời chung chung, không thể hiện đã học | Người học không thấy tác dụng của việc dạy |

Mục tiêu là **bounded, inspectable competence**:

- AI thông minh ở việc lắng nghe, lưu claim, chỉ ra mâu thuẫn và chọn một lỗ hổng đáng hỏi.
- AI bị giới hạn ở kiến thức domain: không tự hoàn thiện phần chưa được dạy, không đưa đáp án,
  code hoặc step chưa có trong knowledge state.
- AI thể hiện tiến bộ: sau khi được dạy một rule, nó dùng được rule đó và chỉ ra source/claim
  làm bằng chứng.
- AI không hỏi lại điều đã có trong state; nếu thiếu, nó nói rõ đang thiếu điều gì.

Knowledge state phải được lưu ngoài model, có nguồn theo turn/artifact, thay vì tin rằng model
tự nhớ toàn bộ chat. Cần có fidelity tests trước khi thu dữ liệu: answer leakage, persona drift,
câu hỏi không bám evidence, câu hỏi lặp và AI tự giải task trước khi được dạy.

### 6.1. Rủi ro này đã được literature ghi nhận

Đây không phải lo xa. Chen, Wei, Le, Zhang (BJET 2024/25, arXiv 2412.15226, n=41, bài eight
queens C++) thấy dạy ChatGPT cải thiện knowledge gain và code readability, **nhưng gần như không
cải thiện kỹ năng sửa lỗi — vì ChatGPT hay sinh code đúng, làm mất luôn cơ hội debug**. Đây đúng
là thất bại mà knowledge-state grounding + template slot-filling ở §5.3 phải tránh.

Ở chiều ngược lại, “Towards Valid Student Simulation” (arXiv 2601.05473) nêu **competence
paradox**: LLM giỏi không thể “unknow” một schema, nên khi bị ép đóng novice nó dễ tạo ra lỗi phi
thực tế. Ba yêu cầu tối thiểu: (1) Fidelity of Error, (2) Epistemic Consistency qua isomorphic
item và qua multi-turn, (3) Boundary of Competence. Template slot-filling thỏa cả ba bằng cấu
trúc chứ không bằng prompt engineering.

### 6.2. Mượn instrument có sẵn, đừng tự chế

| Cần đo | Instrument đã có | Ghi chú |
|---|---|---|
| Answer leakage | Rule-based filter + LLM judge, arXiv 2604.18660 | Đã kiểm Cohen's kappa 0.88 (student) / 0.81 (tutor) với annotator người |
| Groundedness / faithfulness | RAGAS, G-Eval | Tách response thành claim rồi verify từng claim so với knowledge state |
| Error fidelity | BEAGLE (arXiv 2602.13280), “error recurrence rate” | Tham chiếu: vanilla LLM 7.8% (sửa lỗi quá nhanh), BEAGLE 86.2%, SimStudent 92% |
| LLM-as-judge nói chung | Zheng et al. (2023) | Strong LLM đạt agreement >80% với người, ngang mức đồng thuận giữa chuyên gia |

Dùng metric đã có kappa công bố dễ được reviewer chấp nhận hơn nhiều so với thang tự chế.

**Ngưỡng đổi hướng:** nếu agent leak đáp án > ~5% số turn dù đã guardrail, ưu tiên đóng góp
methodological về leakage-control **trước** khi claim learning effect.

## 7. Câu hỏi nghiên cứu khả thi

Không dùng câu hỏi quá rộng "dạy AI có hiệu quả không?". Một câu hỏi hẹp hơn là:

> Trong các lab AI thực hành, việc để AI apprentice áp dụng lại kiến thức người học vừa dạy vào
> một case biến thể có cải thiện khả năng transfer của người học, so với AI học trò hội thoại
> thông thường hoặc self-explanation cùng thời lượng, hay không?

Các câu hỏi phụ:

1. Người học có tạo nhiều knowledge-building utterances hơn không?
2. AI apprentice có giữ knowledge boundary và thể hiện tiến bộ đáng tin không?
3. Người học có thấy trách nhiệm dạy AI, agent credibility và mức phiền/chán thay đổi thế nào?
4. Cơ chế này có khả thi với no-code artifact không?

## 8. Thiết kế thí nghiệm gợi ý

### Điều kiện — chốt phương án làm việc: 2 condition

| Điều kiện | Sau khi làm lab | Trạng thái |
|---|---|---|
| TeachYou-like / `reflective` | Dạy AI học trò; AI nhận cùng template nhưng chỉ nói thành lời, không runner | **Chọn** |
| Proposed / `enactment` | Dạy AI apprentice; AI điền slot, hidden runner chấm; người học quan sát và sửa | **Chọn** |
| Self-explanation control | Viết/giải thích quyết định theo prompt cố định | **Bỏ** ở study đầu |

Lý do bỏ nhánh self-explanation:

1. Câu hỏi nó trả lời (“dạy AI có hơn tự giải thích không?”) đã có người trả lời một phần
   (MatlabTutee, Chen et al.); câu hỏi *của study này* là verification có thêm giá trị không, và
   câu đó chỉ cần 2 nhánh.
2. Mỗi condition thêm là ~55–60 người thêm; dồn mẫu vào một contrast cho power cao nhất.
3. Thiết kế “cùng template, khác đúng một bit verification” là contrast sạch nhất đang có; nhánh
   thứ ba làm loãng chính điểm mạnh này.

Self-explanation có thể quay lại ở study tiếp theo nếu mentor muốn câu hỏi nền tảng hơn.

Contrast duy nhất: `enactment` so với `reflective` — nó tách việc có **verified enactment** khỏi
hiệu ứng chung của việc dạy AI.

Nếu cỡ mẫu nhỏ, trước hết chỉ làm usability/fidelity pilot 5–8 người. Không dùng pilot đó để tuyên
bố hiệu quả giáo dục. Study hiệu quả cần design counterbalanced hoặc randomized phù hợp và power
analysis trước khi tuyển mẫu.

### Between hay within, và bao nhiêu người

**Between-subject.** Can thiệp này có carryover rõ: học được *cách dạy* ở condition thứ nhất sẽ
ảnh hưởng condition thứ hai. AlgoBo (n=40) và MatlabTutee đều between. Within tiết kiệm mẫu nhưng
nhiễu learning-to-teach khó gỡ.

**Cỡ mẫu.** Ortloff et al., *“Small, Medium, Large? A Meta-Study of Effect Sizes at CHI”*
(CHI '25, DOI `10.1145/3706598.3713671`), rút thống kê từ N = 1692 bài CHI định lượng 2019–2023:
**median sample size = 50 (between-groups), 28.5 (within-groups)**, và cảnh báo effect size ở CHI
thường nhỏ. G*Power cho medium effect (`d ≈ 0.5`, power `.8`, `α = .05`) cần ~42–64/nhóm.

**Chốt phương án làm việc: 60/condition, tổng ~120.** 60/nhóm phát hiện được `d ≈ 0.45` ở power
`.8`; nếu hiệu ứng thật chỉ ~0.35 thì hơi thiếu, nhưng chấp nhận được cho study đầu về một cơ chế
mới — ANCOVA với pre-test covariate (predictor mạnh, `β ≈ 0.5`) kéo lại một phần power. Vẫn phải
chạy a-priori power analysis chính thức với effect size giả định thận trọng (`d ≈ 0.35–0.4`)
trước khi tuyển mẫu, vì hiệu ứng thật của `enactment` vs `reflective` có thể nhỏ hơn hiệu ứng LBT
nói chung.

**Phân tích.** ANCOVA với pre-test làm covariate (pre-test là predictor mạnh — `β ≈ 0.509` trong
arXiv 2604.00142) cộng prior programming experience; hoặc linear mixed model nếu có đo lặp/đa cấp
(learner lồng trong cohort). Báo cáo effect size kèm CI, không chỉ p-value.

**Nếu không đạt power** (n thực tế thấp): chuyển sang within-subject có counterbalance, hoặc
mixed-method + rich process analysis kiểu LAK. Không im lặng chạy under-powered rồi báo p > .05
như bằng chứng không có hiệu ứng.

### Không trộn track trong một efficacy study

Day 01 API là track code/API. No-code dùng cùng learning loop nhưng artifact và golden test khác:

| Track | Artifact | Golden test |
|---|---|---|
| API/code | Repo/code, test output | Hidden unit/integration tests và rubric explanation |
| No-code | Prompt, policy, workflow cấu hình | Unseen input scenarios, acceptance rubric và failure cases |

Nên đánh giá từng track như một replication riêng, không gộp người học code và non-tech vào cùng
phân tích hiệu quả đầu tiên.

## 9. Metrics và golden test

### 9.1. Outcome chính: transfer của người học

`TransferScore` là điểm của một task mới mà người học tự làm, chấm độc lập với AI.

Ở track Day 01, task vẫn đo **AI coding**: code gọi API, message structure, token/cost,
streaming và retry. Khác biệt là giao diện challenge dùng lựa chọn có scaffold + giải thích,
không bắt người học bắt đầu từ một editor trống. Các lựa chọn được ánh xạ vào starter code/config
rồi hidden tests chạy trên code kết quả.

```text
TransferScore = tổng điểm hidden tests và blind-rubric đạt được
                / tổng điểm có thể đạt
                x 100
```

Transfer card Day 01 dùng cấu trúc lai 7 điểm ở §5.4:

| Phần | Dạng | Ví dụ case hidden | Điểm |
|---|---|---|---:|
| A | Chọn + giải thích, có scaffold | Giữ system prompt khi cắt conversation history; chọn model theo giới hạn cost | 2 |
| B | Free-form, điền function body | Retry lỗi tạm thời đúng số lần và báo lỗi cuối rõ ràng; streaming xử lý chunk không có content | 2 |
| C | Debug: cho code sai, tìm và sửa | Message role đặt sai làm persona rơi vào `user` | 1 |
| D | Giải thích mở, rubric chấm mù | Trade-off model, cost và history | 0–2 |

Phần A chống floor cho học viên yếu; B và C chống ceiling. Nếu chỉ dùng item scaffold, study có
nguy cơ đo recognition thay vì recall và mất luôn khả năng phân biệt hai condition.

Hidden tests không được trùng public tests hoặc được cho người học xem trước, **và không được
assert cùng hành vi với test ở hai điểm neo enactment** — nếu không, failure trace mà người học
đọc lúc chiều chính là preview đề thi. Khác input là chưa đủ; phải khác điểm assert.

Phần code chấm bằng test; phần giải thích do ít nhất hai người chấm mù condition theo rubric đã
đóng băng, báo cáo Cohen's kappa (ngưỡng chấp nhận `≥ 0.7`). Nếu dùng LLM-as-judge để hỗ trợ, phải
kiểm kappa của judge với người trên một mẫu con, theo cách arXiv 2604.18660 làm.

**Cân nhắc thêm một PFL-style item làm secondary.** Bransford & Schwartz (1999, RRE 24:61–100)
phê phán *sequestered problem solving* — TransferScore hiện tại đúng là SPS. Schwartz & Martin
(2004) cho thấy SPS bỏ sót lợi ích mà Preparation-for-Future-Learning bắt được: ví dụ đưa người
học một đoạn tài liệu API chưa từng thấy và đo họ học được gì *trong lúc* làm bài. Một item như
vậy rẻ và có thể cứu study nếu SPS ra null.

### 9.2. Baseline và phân tích

Trước lesson, dùng pre-test ngắn về các learning objective. Với thiết kế between-subject,
estimate chính có thể là:

```text
TransferScore = beta_0
              + beta_1 * Condition
              + beta_2 * PretestScore
              + beta_3 * prior_experience
              + error
```

`beta_1` là khác biệt transfer đã điều chỉnh cho trình độ đầu vào. Với within-subject
counterbalanced design, dùng mixed model hoặc participant-level paired difference, đồng thời
đưa topic và order vào model.

Không có một "công thức vàng" thay thế cho task tốt, comparator công bằng, chấm mù và outcome
hold-out. Công thức chỉ tóm tắt một measurement đã được thiết kế đúng.

### 9.3. Process và fidelity metrics

Không dùng các metric này để thay cho learning outcome:

| Metric | Công thức/cách đo | Ý nghĩa |
|---|---|---|
| Knowledge-building rate (%KBR) | `KB-ELABORATION + KB-SENSEMAKING` / lượt người học có nội dung học thuật | Người học có đang dạy bằng lý do, kết nối và tự sửa không |
| Agent boundary fidelity | tỷ lệ golden interaction cases agent giữ đúng knowledge state | AI có thực sự là học trò có giới hạn không |
| Answer leakage | agent turns đưa đáp án chưa được dạy / tổng agent turns | Kiểm tra confound AI dạy ngược người học |
| Redundant-question rate | câu hỏi hỏi lại claim đã có hoặc không gắn evidence / tổng câu hỏi AI | Phát hiện AI giả ngu/lặp lại |
| Agent credibility và boredom | Likert + phỏng vấn ngắn | AI có đủ cần người học dạy nhưng không gây phiền không |

%KBR có tiền lệ trong literature nhưng là **process measure**, không phải proof người học đã giỏi
hơn. Transcript cần được chấm mù condition và báo cáo reliability giữa rater.

Ba kết quả cụ thể giải thích vì sao không được nâng process metric thành outcome:

- Fan et al. (2025, BJET, *“Beware of Metacognitive Laziness”*, arXiv 2412.09315, n=117): nhóm
  dùng ChatGPT cải thiện điểm essay nhưng **knowledge gain và transfer không khác** các nhóm còn
  lại. Output tốt hơn ≠ học nhiều hơn.
- AlgoBo: mode-shifting tăng density knowledge-building có ý nghĩa (`d = 0.71`) nhưng tác giả
  **không đo learning outcome**, nên không có bằng chứng density kéo theo học tốt hơn.
- Walker et al. (ITS 2012): lượng support nhận được **không** tương quan learning; chỉ việc
  *noticing* support liên quan mới tương quan.

Hệ quả trực tiếp: `AgentPassRate` và `RepairCount` là process metric. Nếu TransferScore ra null
mà AgentPassRate cao, đó là kết quả null, không phải kết quả dương diễn giải khéo.

Riêng %KBR ở study này có một đặc điểm cần lưu ý khi diễn giải: Roscoe & Chi (2007, RER
77(4):534–574) mô tả *knowledge-telling bias* — tutor có xu hướng chỉ truyền đạt, và
knowledge-building mạnh hơn khi tutee bộc lộ hiểu sai. Cơ chế `enactment` chính là cách ép bộc lộ
hiểu sai bằng bằng chứng kiểm chứng được, thay vì bằng câu hỏi của tutee như Shahriar & Matsuda
(AIED 2021, 2023) đã làm. Đây là giả thuyết cơ chế của study, nên %KBR là biến trung gian đáng đo
— nhưng vẫn là trung gian.

## 10. Những gì cần chốt với mentor trước

1. Thesis chấp nhận contextual replication/extension hay yêu cầu novelty cơ chế mới?
2. Có thể dùng Day 01 API làm feasibility prototype trước, rồi chọn một track riêng cho main study không?
3. Main comparator là self-explanation, TeachYou-like, hay cần cả ba điều kiện?
4. Outcome chính có được chốt là hidden transfer (cuối buổi = primary, +7 ngày = secondary) thay
   vì số lượt chat/%KBR không?
5. Ai có thể rà soát content validity cho pre-test, golden test và blind rubric?
6. Có quyền dùng lab, log test và artifact của người học cho nghiên cứu không; dữ liệu nào phải ẩn danh?
7. ~~Cần kiểm tra full text của *Playing Dumb to Get Smart*?~~ **Đã giải quyết 26/07** — xem §4.1
   và §12.7. Paper là MatlabTutee (CHI 2025), không đe dọa cơ chế enactment-có-test.
8. Có tuyển được ~50–64 người/condition không? Nếu không, chốt fallback là within-subject
   counterbalanced hay mixed-method kiểu LAK? (xem §8)
9. Time-on-task cố định theo *thời lượng* hay theo *số lượt hội thoại*? (xem §5.5)
10. Có nguồn lực chạy pilot riêng cho knowledge-state extraction từ free text Việt–Anh hỗn hợp
    (5–8 người) **trước** khi build phần còn lại không? (xem §5.5)
11. Venue nhắm tới là L@S, CHI, AIED hay SIGCSE/ITiCSE? Lựa chọn này đổi cả framing lẫn mức
    rigor cần có (xem §16.3).

## 11. Tài liệu hiện tại cần cập nhật nếu chốt hướng này

- `docs/dinh-huong-ai-thuc-chien-de-hoi-mentor.md` hiện ưu tiên AI practice partner/reviewer và
  policy câu hỏi bám artifact; phần này mâu thuẫn với hướng AI apprentice là trung tâm.
- `docs/research/protocol.md` hiện đặt knowledge-building rate là outcome primary cho active versus
  passive tutee. Hướng mới nên đặt hidden `TransferScore` là primary; %KBR chuyển thành mechanism.
- `docs/research/prompt-spec.md` đã có ràng buộc knowledge state, không tự đưa đáp án và fidelity
  test. Cần mở rộng state machine để AI thể hiện đã học và điền slot trong template isomorphic;
  đồng thời thay thang fidelity tự chế bằng instrument có kappa công bố (§6.2).

Không nên sửa các tài liệu trên cho đến khi mentor xác nhận định vị nghiên cứu và comparator.

Việc cần làm ngay, không phụ thuộc mentor:

1. **Pilot khuôn phát biểu rule “Khi–thì–vì”** với 5–8 người: người học có điền tự nhiên không,
   ô “vì” có bị bỏ trống/điền lấy lệ không (§5.5). Đây là chỗ mọi thứ khác dựa lên.
2. **Đào log lỗi K4 cũ** để viết distractor và slot misconception từ lỗi thật (§17.2) — làm
   **trước** khi viết spec.
3. **Viết Lab Teaching Spec đầy đủ cho Day 01** theo schema §13.3 — từng slot, từng assertion,
   từng distractor.
4. **Đọc theo thứ tự ở §16.4**, bắt đầu từ AlgoBo và HypoCompass.

## 12. Giải thích các quyết định cần hỏi mentor

Các câu dưới đây không phải là câu hỏi hành chính. Chúng quyết định đề tài là replication,
extension hay một nghiên cứu cơ chế; vì vậy phải chốt trước khi xây prototype lớn hoặc tuyển
participant.

### 12.1. Thesis chấp nhận contextual replication/extension hay yêu cầu novelty cơ chế mới?

**Contextual replication/extension** nghĩa là dùng cơ chế teachable agent đã có trong literature,
nhưng kiểm tra nó ở một bối cảnh khác: lab AI thực chiến hằng ngày, tiếng Việt, API/no-code hoặc
artifact có test. Đóng góp chính là external validity, feasibility và các điều chỉnh thiết kế theo
bối cảnh mới. Đây là hướng hợp lệ nếu thesis không bắt buộc phát hiện một cơ chế hoàn toàn mới.

**Novelty cơ chế** nghĩa là phải nêu một biến can thiệp chưa được kiểm tra rõ, rồi cô lập nó bằng
comparator. Ví dụ candidate mechanism của đề tài này là: sau khi được người học dạy bằng evidence
từ artifact, AI apprentice phải áp dụng lại kiến thức đó vào một case biến thể để người học quan
sát và sửa cách dạy. Không đủ để gọi đây là novelty chỉ vì đổi Binary Search sang OpenAI API.

Khuyến nghị: định vị ban đầu là **extension có một cơ chế hẹp để kiểm tra**, không tuyên bố hệ
thống teachable agent đầu tiên. Mentor cần xác nhận mức novelty mà thesis yêu cầu.

Sau khi rà prior art (26/07), cơ chế hẹp đó được phát biểu chính xác là:

> **Verified enactment on an isomorphic transfer task + repair-your-teaching loop.**

Không phải “LLM teachable agent cho lập trình” (AlgoBo, HypoCompass, Chen et al. đã làm), không
phải “agent viết code sau khi được dạy” (AlgoBo đã làm), không phải “protégé effect với AI”
(Chase 2009, MatlabTutee đã làm). Danh sách đầy đủ các claim phải tránh ở §16.1.

Ba khoảng trống có thể chiếm giữ chính đáng, xếp theo độ chắc:

1. **Verified enactment loop** — quan sát *thất bại có kiểm chứng bằng hidden test* của tutee (so
   với chỉ hội thoại reflective kiểu AlgoBo) có cải thiện *independent transfer* không. Chưa ai
   làm.
2. **Repair-your-teaching as a driver of knowledge-building** — định lượng quan hệ giữa
   RepairCount/chất lượng repair và TransferScore, nối thẳng vào Roscoe & Chi (2007). AlgoBo bỏ
   ngỏ vì không đo learning outcome.
3. **Executable-test construct validity cho teachable-agent transfer** — lập trình là ngoại lệ
   hiếm cho phép verify khách quan bằng binary correctness; đây là đóng góp phương pháp cho cái
   mà literature gọi là “non-verifiability crisis” của student simulation (arXiv 2601.05473).

Hai khoảng trống phụ, hợp lệ nhưng **không được làm đóng góp chính**: bộ instrument agent fidelity
cho teachable agent viết code, và bối cảnh applied-AI bootcamp + non-native English ở Việt Nam/SEA.

### 12.2. Có thể dùng Day 01 API làm feasibility prototype trước, rồi chọn track khác cho main study không?

**Feasibility prototype** không nhằm chứng minh người học học tốt hơn. Nó trả lời các câu hỏi kỹ
thuật và UX trước:

- Có đọc được checkpoint, test output và artifact từ lab không?
- AI có giữ knowledge boundary, không tự leak lời giải không?
- Người học có hiểu việc phải dạy AI và quan sát AI áp dụng lại không?
- Có export được transcript/evidence không chứa secret hoặc PII không?

Vì vậy, có thể dùng Day 01 API làm prototype. Dữ liệu của giai đoạn này chỉ là usability/fidelity,
không dùng để tuyên bố learning effect trừ khi đã có consent và protocol phù hợp.

Main study sau đó có thể chọn một track khác, nhưng phải cố định một nhóm người học và một loại
artifact trong cùng analysis. Không gộp người non-tech làm workflow no-code với người viết API
trong cùng efficacy comparison đầu tiên.

### 12.3. Main comparator là self-explanation, TeachYou-like, hay cần cả ba điều kiện?

Ba condition trả lời ba câu hỏi khác nhau:

| Condition | Nó kiểm tra điều gì? |
|---|---|
| Self-explanation | Dạy AI có lợi hơn tự giải thích một mình không? |
| TeachYou-like | Vòng dạy AI nói chung có lợi thế nào? AI học trò chỉ phản hồi/hỏi, không enact artifact/case mới. |
| Proposed artifact-grounded recursive agent | Việc AI áp dụng lại kiến thức vừa được dạy vào case mới có thêm giá trị hơn TeachYou-like không? |

Nếu có đủ sample và nguồn lực, ba condition là đầy đủ nhất. Tuy nhiên sample cần tăng và study
khó vận hành hơn.

Nếu scope nhỏ, ưu tiên contrast:

```text
Proposed artifact-grounded recursive agent
  so với
TeachYou-like agent
```

Vì cả hai đều có activity “dạy AI”, khác biệt còn lại gần hơn với mechanism cần kiểm tra:
artifact grounding và agent enactment. Self-explanation có thể được thêm ở study tiếp theo hoặc
làm comparator nếu mentor muốn câu hỏi nền tảng hơn.

**Phương án làm việc (26/07): chốt 2 condition, bỏ self-explanation** — lý do đầy đủ ở §8 và
quyết định #2 ở §17.1. Câu hỏi cho mentor thu hẹp thành: thầy/cô có yêu cầu nhánh
self-explanation quay lại không, biết rằng nó tốn thêm ~60 người?

### 12.4. Outcome chính có được chốt là hidden transfer thay vì số lượt chat/%KBR không?

Nên chốt **hidden transfer** làm primary outcome nếu claim mong muốn là “giúp người học làm được
task mới”. Người học phải tự sửa/tạo artifact cho một requirement biến thể, không nhận feedback AI
trước khi nộp outcome này.

Bản 26/07 chốt thêm **thời điểm**: primary là transfer card **ngay cuối buổi**, không phải ngày
hôm sau. Lý do ở §15.1 — attrition ở lần đo trễ đủ để phá power đã tính. Lần đo +7 ngày vẫn thu,
làm secondary.

| Metric | Nó cho biết gì? | Vai trò nên có |
|---|---|---|
| Hidden `TransferScore` cuối buổi | Có tự áp dụng được kiến thức vào task mới không | **Primary outcome** |
| Hidden `TransferScore` +7 ngày | Kiến thức có giữ được không | Secondary (retention) |
| Pre/post concept test | Có thay đổi hiểu biết khái niệm không | Secondary outcome/covariate |
| PFL-style item | Có được chuẩn bị để học cái mới không | Secondary (§9.1) |
| %KBR | Người học có tạo giải thích có lý do, kết nối và tự sửa không | Process/mechanism |
| AgentPassRate, RepairCount | AI có nhận được rule không, mất mấy vòng | Process/mechanism |
| Số lượt chat, số từ | Mức sử dụng hệ thống | Descriptive only |

Không dùng số lượt chat làm proxy cho learning. Một cuộc hội thoại dài có thể chỉ phản ánh AI hỏi
ngây ngô hoặc người học mắc kẹt. Fan et al. (2025, n=117) là ví dụ cảnh báo trực tiếp: nhóm dùng
ChatGPT có điểm essay tốt hơn mà knowledge gain và transfer không khác.

### 12.5. Ai có thể rà soát content validity cho pre-test, golden test và blind rubric?

Content validity là việc kiểm tra test có thực sự đo learning objectives cần đo hay không. Người
phù hợp theo từng vai trò:

| Việc cần làm | Người nên tham gia |
|---|---|
| Map learning objective Day 01 sang item/test | Giảng viên hoặc tác giả lab, TA hiểu course, kỹ sư có kinh nghiệm LLM API |
| Rà relevance, độ rõ, độ khó và coverage | Ít nhất hai subject-matter reviewers độc lập với người thiết kế condition |
| Chấm phần explanation mở | Ít nhất hai rater biết domain, chấm mù condition |
| Rà design, confound và analysis | Mentor research/methodology reviewer |

Quy trình tối thiểu: tạo blueprint từ learning objectives -> reviewers góp ý -> sửa rubric -> pilot
để phát hiện ceiling/floor effect -> đóng băng test/rubric trước thu dữ liệu chính -> báo cáo
inter-rater reliability cho phần chấm mở.

### 12.6. Có quyền dùng lab, log test và artifact của người học cho nghiên cứu không; dữ liệu nào phải ẩn danh?

Repo public không tự động cho phép thu và phân tích dữ liệu hành vi của người học. Cần kiểm tra
ba lớp quyền:

1. **Nội dung lab:** license của repo và/hoặc xác nhận của người sở hữu course rằng lab được dùng
   trong prototype/research.
2. **Người tham gia:** informed consent trước khi thu transcript, test log hoặc artifact.
3. **Đơn vị nghiên cứu:** ethics/IRB hoặc xác nhận quy trình review theo quy định VinUni/course.

Không thu hoặc phải loại bỏ trước khi lưu:

- API key, file `.env`, token, request header, URL có credential;
- tên, email, mã sinh viên, GitHub username, git author/commit metadata;
- raw clipboard, file cá nhân không liên quan và log hệ thống không cần thiết.

Nên dùng participant ID giả danh. Dữ liệu có thể giữ nếu đã consent và được lọc: checkpoint,
thời điểm, test summary, diff/artifact liên quan task, teaching transcript và response ở transfer
test. Bảng nối danh tính với participant ID, nếu thật sự cần, phải lưu riêng dataset nghiên cứu.

### 12.7. *Playing Dumb to Get Smart* — đã giải quyết

**Trạng thái: đóng (26/07/2026).** Trước đây chỉ xác nhận được metadata vì PDF ACM trả `403`. Nay
đã tra được nội dung. Trả lời năm câu hỏi đã đặt:

| Câu hỏi | Trả lời |
|---|---|
| Người học và course/topic | 119 sinh viên, lớp CS nhập môn cho kỹ sư, MATLAB |
| AI bị giới hạn knowledge state? | Đóng persona novice; không có knowledge-state runner độc lập |
| Có artifact/lab/test thật? | Không — tương tác text thuần |
| AI có enact ở task mới? | **Không** — không có verification loop bằng test chạy được |
| Comparator / outcome | LBT do người thật đóng novice; MCQ isomorphic 14 câu MATLAB |

Đầy đủ: Rogers, Davis, Maharana, Etheredge, Chernova, CHI 2025, pp. 126:1–126:22,
DOI `10.1145/3706598.3713644`. 4 thí nghiệm gồm một controlled formative study (8 SV, LLM-novice
vs human-expert-đóng-novice), một vòng tinh chỉnh hệ thống, và 2 đợt deploy in-the-wild kéo dài
1 tháng.

Tiêu đề gây hiểu nhầm: “playing dumb” nghĩa là LLM *đóng vai novice*, **không** phải agent giả ngu
để leak đáp án hay để test learner — tức nó không phải là công trình về rủi ro ở §6.

**Hệ quả cho novelty.** Cơ chế enactment-có-test chưa bị công trình này chiếm. Nhưng nó thiết lập
một baseline mạnh cho hai thứ: “LLM đóng novice là tin cậy” và “đo bằng isomorphic assessment”.
Nên trích dẫn để định vị; **không** được viết mình là người đầu tiên dùng LLM teachable agent
trong lớp CS đại học.

Wording an toàn vẫn giữ: “đề tài mở rộng/kiểm tra teachable agent trong bối cảnh lab AI thực
hành”, không dùng “the first” hoặc “chưa từng có”. Xem thêm §16.1.

### 12.8. Cách hỏi mentor trong một phút

> Em muốn dùng Day 01 API làm feasibility prototype để kiểm tra flow artifact, knowledge state,
> test output và agent fidelity. Sau đó em làm controlled study trên một track cố định. Em cần thầy/cô
> giúp chốt: thesis chấp nhận contextual extension của TeachYou hay phải cô lập mechanism mới? Nếu
> cần mechanism mới, cơ chế em định cô lập là *verified enactment trên isomorphic task + vòng sửa
> lời dạy* — cả hai nhóm cùng nhận một template, chỉ khác việc có hidden runner chấm hay không.
> Outcome chính là hidden transfer card cuối buổi (7 điểm, có phần free-form và debug), không phải
> số lượt chat. Em đã rà prior art: gần nhất là AlgoBo (CHI 2024) và HypoCompass (AIED 2024, đảo
> chiều), nên em sẽ không claim "đầu tiên dùng LLM teachable agent cho lập trình". Em cần ~50–64
> người/condition; nếu không đủ thì em xin ý kiến về phương án fallback. Em cũng cần xác nhận quyền
> dùng lab/log và người có thể review golden test/rubric.

## 13. Guided coding và Lab Teaching Spec

### 13.1. Đúng scope của Day 01

AI Thực Chiến ở track này là **học cách áp dụng AI trong code**, không phải đưa người học ngay vào
một business case lớn như vận hành trợ lý chăm sóc khách hàng. Bài Day 01 chỉ cần có các coding
decision nhỏ, đúng theo lab gốc:

| Block lab | Decision card | Bằng chứng | Enactment |
|---|---|---|---|
| 1. Basic API | Menu 3: chọn lời gọi/model và input structure | Mock test của function pass/fail | Không |
| 2. System prompt | Menu 3: chọn role đặt instruction/persona và giải thích | Request/message assertion pass/fail | **Neo #1** |
| 3. Token/cost | **Free-form**: tự phát biểu rule đếm/ước tính theo input-output | Test cost/token pass/fail | Không |
| 4. Streaming/retry | Menu 3: chọn hành vi khi chunk rỗng hoặc lỗi tạm thời | Scenario test pass/fail | **Neo #2** |

Card dạng menu có format cố định:

```text
1. Hiện một đoạn starter code, function contract hoặc lỗi test.
2. Đưa 2–3 lựa chọn thực tế có distractor hợp lý.
3. Bắt buộc người học giải thích lựa chọn và loại trừ ít nhất một phương án khác.
4. Ánh xạ lựa chọn vào starter code/configuration.
5. Chạy test và hiện evidence ngắn gọn.
```

Đây không phải quiz nhiều lựa chọn đơn thuần: lựa chọn phải tạo ra code chạy được, lời giải thích
là evidence về reasoning, và test là evidence về behaviour. Format này có tiền lệ — nó gần
**Parsons problems** và **self-explanation/faded worked examples**, đều đã được chứng minh: Parsons
cho learning gain tương đương write-code nhưng tốn ít thời gian hơn và giảm cognitive load, mạnh
nhất ở novice và người self-efficacy thấp (Ericson et al. 2018; systematic review ITiCSE-WGR 2022;
Koli Calling 2023). Hệ quả: **không được claim phát minh guided coding hay self-explanation** —
trích dẫn để justify design choice. Đóng góp là *tổ hợp* guided coding + verified enactment.

Block 3 gỡ menu (§5.2) chính là để tránh phản biện “đây chỉ là recognition”: nó buộc người học
recall và tự phát biểu rule, đồng thời tạo biến so sánh nội bộ giữa block có menu và không menu.

### 13.2. Vòng dạy AI ở cấp micro-lab

Vòng này chỉ chạy ở **hai điểm neo** (block 2 và block 4), không phải sau mỗi card — xem §5.2 và
§5.3 cho khung đầy đủ. AI apprentice nhận một micro-task isomorphic, không phải một project
business mới. Ví dụ người học vừa dạy về vai trò của system prompt; AI nhận cùng objective với
persona, user request và mock error khác.

Điểm quan trọng nhất: apprentice **điền slot trong template**, không sinh code tự do.

```text
Người học phát biểu rule (free text)
  -> knowledge state lưu rule và nguồn evidence (card/test)
  -> AI điền slot khuyết trong template isomorphic, chỉ từ knowledge state
  -> slot nào state không phủ được: để trống và khai báo "chưa được dạy"
  -> runner assert đúng các slot thuộc objective, bỏ qua phần còn lại
  -> pass/fail + failure trace tối thiểu (tên assertion, expected vs actual)
  -> người học giải thích/sửa rule cho AI
  -> AI thử lại, tối đa 2 vòng
```

Lỗi của AI phải map vào misconception hoặc knowledge gap đã định trước, không được random hoặc
giả ngu. Ràng buộc này được thực thi bằng **cấu trúc slot**, không bằng kịch bản lỗi: mỗi slot ánh
xạ 1-1 với một rule người học đã hoặc chưa dạy, nên mọi failure đều truy được về một rule cụ thể.

AI pass micro-lab cho thấy người học đã truyền rule; nó **không** thay thế hidden transfer test
của người học.

### 13.3. Ai thiết kế các card, rubric và agent task?

Trong prototype research, **nhóm nghiên cứu/course author thiết kế thủ công** một Lab Teaching
Spec cho Day 01. Không để LLM tự sinh live rồi dùng ngay cho participant, vì option sai, rubric
thiếu hoặc test không tương đương sẽ trở thành confound.

Lab Teaching Spec rộng hơn rubric chấm điểm:

```yaml
lab_id: k4-day01-llm-api
learning_objectives:
  - call_chat_completions
  - distinguish_system_and_user_messages
  - reason_about_model_cost_and_tokens
  - handle_streaming_and_retry

teaching_input:
  format: when_then_because       # khuôn "Khi ___ thì ___ vì ___" (§5.5, quyết định #6 §17.1)
  languages: [vi, en_terms]       # tiếng Việt + thuật ngữ Anh

blocks:
  - id: 1_basic_api
    objective: call_chat_completions
    card_type: menu_3           # làm quen format
    anchor: false
  - id: 2_system_vs_user
    objective: distinguish_system_and_user_messages
    card_type: menu_3
    anchor: true                # Neo #1
  - id: 3_token_cost
    objective: reason_about_model_cost_and_tokens
    card_type: free_form        # cố tình gỡ menu
    anchor: false
  - id: 4_streaming_retry
    objective: handle_streaming_and_retry
    card_type: menu_3
    anchor: true                # Neo #2

decision_cards:
  - block: 2_system_vs_user
    code_context: call_with_missing_message_role
    options: [option_a, option_b, option_c]
    expected_reasoning: [persona_is_stable_instruction, user_is_runtime_request]
    misconceptions: [persona_in_user_message]
    public_test: test_system_message

# Enactment chỉ tồn tại ở block có anchor: true.
# Apprentice KHÔNG sinh code tự do — nó điền slot.
enactment_template:
  - block: 2_system_vs_user
    changed_surface: [different_persona, different_user_request, different_mock_error]
    slots:
      - id: role_of_persona
        maps_to_rule: persona_is_stable_instruction
        assert: test_slot_persona_in_system_role
      - id: role_of_runtime_request
        maps_to_rule: user_is_runtime_request
        assert: test_slot_request_in_user_role
    unteachable_slots_policy: leave_blank_and_declare   # "chưa được dạy"
    runner_scope: assert_only_slots_in_objective        # bỏ qua phần còn lại
    max_repair_rounds: 2
    reflective_variant: same_template_verbalize_only    # không runner, không pass/fail

transfer_card:
  total_points: 7
  must_not_share_assertions_with: [enactment_template]  # khác điểm assert, không chỉ khác input
  parts:
    - id: A
      type: choice_plus_explanation
      items: 2
      points: 2
      hidden_tests: [transfer_message_role, transfer_model_cost_choice]
    - id: B
      type: free_form_function_body
      items: 2
      points: 2
      hidden_tests: [transfer_retry_backoff, transfer_stream_empty_chunk]
    - id: C
      type: debug_broken_code
      items: 1
      points: 1
      hidden_tests: [transfer_debug_role_misplacement]
    - id: D
      type: open_explanation
      points: [0, 2]
      rubric: blind_tradeoff_rubric
```

Schema chỉ minh hoạ; field và đáp án thật phải được giảng viên/TA rà soát trước khi dùng.

Hai field đáng chú ý nhất là `unteachable_slots_policy` và `runner_scope`. Chúng là thứ giữ cho
agent không phải diễn kịch mà cũng không fail vì lý do rác: agent bị chặn thật sự bởi knowledge
state, còn runner thì chỉ assert đúng phần thuộc objective. `must_not_share_assertions_with` là
ràng buộc chống rò đề — không được nới thành “chỉ cần khác input”.

### 13.4. Tự động sinh Lab Teaching Spec là research khác

Về lâu dài, AI có thể đọc `LAB_GUIDE.md`, `template.py` và test để tạo **bản nháp** decision card,
misconception, agent variant và rubric. Course author duyệt/sửa rồi mới publish.

Nhưng câu hỏi “LLM có tự chuyển một lab bất kỳ thành guided teachable lab tốt không?” là một
research/system problem riêng: phải đánh giá độ đúng của spec, thời gian authoring và ảnh hưởng
đến chất lượng learning design. Không gộp nó vào study đầu tiên về hiệu quả của dạy AI.

## 14. Một flow và một prototype chung cho toàn khóa

Không xây hai sản phẩm: một bản TeachYou-like và một bản proposed. Có **một course engine, một UI
flow và một data model**. `TeachYou-like` chỉ là mode đối chứng ở backend khi chạy research; flow
mặc định của sản phẩm là AI apprentice thực hành và được test.

```text
Course map
  -> Day lab
  -> guided coding cards
  -> giải thích/dạy AI
  -> AI practice check
  -> daily evidence và skill progress
  -> module review khi các skill có liên quan
```

### 14.1. Flow người học nhìn thấy

```text
0. Framing: "chiều nay bạn sẽ dạy một AI apprentice, và nó sẽ bị test trên bài khác".
1. Chọn Day N trong course map; làm pre-test ngắn.
2. Mở slide/lesson và repo lab gốc của ngày đó.
3. Làm từng guided coding card:
     code context/test failure
       -> chọn phương án (hoặc tự phát biểu rule ở block free-form)
       -> giải thích lý do
       -> starter code cập nhật
       -> public test
4. Tại ĐIỂM NEO (không phải mọi card), chuyển sang "Dạy AI apprentice":
     người học phát biểu rule; AI nhắc lại điều được dạy và phần còn chưa hiểu.
5. Mở "AI practice check":
     AI nhận template isomorphic cùng objective, có 2-3 slot khuyết.
     AI điền slot chỉ từ knowledge state; slot chưa được dạy thì để trống và khai báo.
     Runner assert các slot thuộc objective, trả pass/fail + trace tối thiểu.
6. Nếu AI fail:
     người học giải thích hoặc sửa rule cho AI;
     knowledge state cập nhật;
     AI thử lại, tối đa 2 vòng.
7. Kết thúc day:
     transfer card ngay trong buổi (không AI);
     exit survey: credibility, mental effort, boredom;
     lưu choices, explanations, code/test evidence, knowledge state và AI progress.
8. Sau 7 ngày (hoặc khi đến module review):
     người học làm delayed transfer card độc lập, không có AI trợ giúp.
```

Người học không phải code từ trang trắng. Các lựa chọn dẫn dắt code ở đầu lab; khi tiến bộ hơn,
course có thể mở dần quyền sửa trực tiếp snippet hoặc repo. Dù bằng lựa chọn hay code trực tiếp,
người học luôn phải giải thích reasoning và code cuối cùng luôn phải qua test.

### 14.2. Một UI, hai research modes

Trong research, participant được server gán condition; không có hai app khác nhau.

| Bước UI chung tại điểm neo | `reflective` / TeachYou-like | `enactment` / proposed product |
|---|---|---|
| Knowledge state | AI nhắc lại điều được dạy và hỏi follow-up bám state | Giống `reflective` |
| Template isomorphic | **Nhận cùng một template**, cùng slot | **Nhận cùng một template**, cùng slot |
| Hoạt động sau khi dạy | AI đọc template và **nói thành lời** nó sẽ điền gì, vì sao | AI **điền slot** từ knowledge state, slot không phủ được thì để trống và khai báo |
| Evidence trả về | Không có runner, không pass/fail | Hidden runner trả pass/fail + trace tối thiểu (tên assertion, expected vs actual) |
| Việc người học làm | Giải thích tiếp cho AI | Sửa/bổ sung rule sau khi thấy fail, thử lại tối đa 2 vòng |

Hai mode giữ cố định: slide, lab, guided cards, starter code, public tests, persona, model setting,
knowledge-state format, **template isomorphic**, số điểm neo và thời lượng. Khác **đúng một thứ:
có verification hay không**. Vì đây là một feature flag, prototype không bị nhân đôi và log schema
giống nhau.

Việc `reflective` nhận cùng template là quyết định thiết kế quan trọng, không phải chi tiết vặt.
Nếu `reflective` chỉ hội thoại tự do còn `enactment` được xem một task cụ thể, thì khác biệt giữa
hai nhóm bao gồm cả “có được nhìn thấy một isomorphic item hay không” — confound này đủ để giết
kết luận. Cho cả hai cùng template thì phần còn lại đúng bằng verification.

### 14.3. Thành phần tối thiểu của prototype

| Thành phần | Trách nhiệm |
|---|---|
| Course map | Hiện ngày/module, skill dependency và progress |
| Lab Teaching Spec | Quy định block, card, options, expected reasoning, misconception, enactment template + slot, tests và transfer card cho từng lab |
| Guided coding UI | Hiện code context, choice (hoặc ô free-form), explanation và test result |
| Knowledge-state service | Lưu claim người học đã dạy, evidence source và phần AI chưa biết; nhận rule qua khuôn “Khi–thì–vì” song ngữ Việt–Anh (§5.5) |
| Agent service | Giữ vai apprentice, hỏi bám state, điền slot theo mode; slot chưa được dạy thì để trống và khai báo |
| Isolated runner | Chạy slot đã điền qua assertion thuộc objective (`runner_scope`); không giữ API key của người học |
| Fidelity harness | Chạy answer-leakage filter + LLM judge, groundedness check, persona-drift check trước mỗi đợt thu dữ liệu (§6.2) |
| Evidence log | Lưu lựa chọn, explanation, test summary, AI attempt, correction, số lượt và completion dưới participant ID giả danh |
| Transfer-card service | Giao task độc lập cuối buổi và +7 ngày, khóa AI feedback đến khi submit, đảm bảo không trùng assertion với enactment template |

Day 01 là Lab Teaching Spec đầu tiên. Toàn khóa dùng lại engine này bằng cách thêm spec cho từng
lab; không cần build sandbox/UX mới cho mỗi ngày.

### 14.4. Phân biệt product flow và research measurement

| Lớp | Product cần làm | Research cần đo |
|---|---|---|
| Trong mỗi lab | Guided coding, dạy AI, AI practice check, public tests | Agent fidelity, explanation quality, completion |
| Qua module/course | Skill map, review card và transfer challenge khi phù hợp | Hidden TransferScore, retention và course-level progression |

Không bắt Day N+1 phải liên quan Day N. Mỗi day có micro-task AI riêng; transfer card được gửi
sau khoảng thời gian cố định hoặc ở cuối module có các skill liên quan. Course map chỉ dùng để
chọn đúng skill cần review, không áp đặt curriculum giả tạo.

## 15. Flow này đo gì trong paper?

Paper đo **người học học được gì từ flow**, không dùng việc AI pass làm kết luận rằng người học
đã học tốt. Dữ liệu được thu theo chuỗi hoạt động:

```text
Chọn + giải thích
  -> code/test
  -> dạy AI
  -> AI attempt pass/fail
  -> người học sửa cách AI hiểu
  -> transfer challenge độc lập
```

| Phần flow | Dữ liệu thu được | Nó đo gì trong paper? |
|---|---|---|
| Guided coding choice | lựa chọn, thời gian, lần đổi lựa chọn | Hiểu quyết định coding ở mức card |
| Explanation bắt buộc | text/voice được chấm rubric | Chất lượng reasoning |
| Public test của lab | pass/fail và failure category | Hoàn thành artifact trong ngày; không phải learning outcome chính |
| AI practice check | rule đã dùng, attempt, pass/fail, số vòng sửa | Người học có truyền đạt rule đủ để AI áp dụng không |
| User correction sau AI fail | lời giải thích sửa lỗi và evidence được trỏ tới | Knowledge-building và repair behaviour |
| Transfer card không có AI | hidden coding tests và blind explanation rubric | Khả năng tự áp dụng kiến thức sang task mới |

### 15.1. Primary outcome: learner TransferScore

Primary outcome là `TransferScore` của **người học** trong một transfer card độc lập. Card dùng
learning objectives của day/module nhưng có code context, input hoặc failure condition chưa từng
thấy. Trước khi submit, AI apprentice không được phản hồi, gợi ý hoặc sửa code cho người học.

```text
TransferScore = (điểm hidden coding tests + điểm blind explanation rubric)
                / tổng điểm có thể đạt
                x 100
```

Ví dụ sau module về API calling, system prompt và retry: transfer card đưa một function mới có
message structure và mock error khác. Người học tự chọn/cấu hình/giải thích; backend ánh xạ hoặc
chạy code kết quả qua hidden tests. Nếu nhóm `enactment` có `TransferScore` cao hơn nhóm
`reflective`, đây là evidence cho hiệu quả của verified recursive enactment.

**Chốt primary là immediate transfer, không phải delayed.** Ở khung Day 01 (§5.1) có hai lần đo:

| Lần đo | Thời điểm | Vai trò |
|---|---|---|
| Immediate transfer card, 25', 7 điểm | Cuối buổi chiều | **Primary** |
| Delayed transfer card, 20' | +7 ngày | **Secondary** (retention) |

Đặt immediate làm primary vì attrition ở lần đo +7 ngày là rủi ro thật, và một primary outcome mà
mất 30% mẫu thì power tính ở §8 trở nên vô nghĩa. Delayed vẫn phải thu — retention là thứ phân
biệt học thật với hiệu ứng buổi chiều — nhưng nó không được là thứ cả study đặt cược lên.

Cân nhắc thêm một **PFL-style item** làm secondary (§9.1): `TransferScore` hiện là sequestered
problem solving, mà Schwartz & Martin (2004) cho thấy SPS bỏ sót lợi ích mà PFL bắt được.

### 15.2. Secondary và process metrics

| Metric | Cách tính/chấm | Diễn giải đúng |
|---|---|---|
| ExplanationScore | `0`: chọn không có lý do; `1`: nêu đúng rule; `2`: nêu rule, nguyên nhân/hệ quả và loại trừ phương án sai | Độ sâu reasoning, không thay thế transfer |
| Knowledge-building rate | lượt giải thích có elaboration/sense-making / lượt có nội dung học thuật | Mechanism/process, không phải proof learning |
| AgentPassRate | tỷ lệ AI pass micro-task sau khi được dạy | Evidence knowledge state đã được truyền đạt, không phải learner outcome |
| RepairCount | số vòng người học phải dạy/sửa AI trước khi pass | Chỉ descriptive; ít vòng chưa chắc học tốt hơn |
| Menu vs free-form teaching quality | chất lượng lời dạy ở block 2/4 (có menu) so với block 3 (không menu) | Biến so sánh nội bộ: người học có rule riêng hay chỉ đọc lại option label |
| Số lượt hội thoại | trung bình mỗi condition | **Descriptive bắt buộc báo cáo** — vì time-on-task cố định theo thời lượng, không theo lượt (§5.5) |
| Public-test completion | card/lab public tests đạt được | Artifact completion cùng ngày |
| Agent fidelity | answer leakage, persona drift, ungrounded/redundant question | Can thiệp có được thực thi đúng không |
| UX | mental effort, agent credibility, boredom/frustration | Khả thi và trade-off trải nghiệm |

Không dùng số lượt chat hay số từ làm proxy cho learning. Hội thoại dài có thể chỉ phản ánh AI lặp
lại, người học mắc kẹt hoặc agent hỏi quá nhiều.

### 15.3. Research questions và contrast

```text
RQ1. Enactment có làm tăng learner TransferScore so với reflective/TeachYou-like không?
RQ2. Enactment có làm thay đổi ExplanationScore, knowledge-building và repair behaviour không?
RQ3. Agent có giữ knowledge boundary, không leak đáp án và không gây chán không?
```

Hai condition có chung slide, lab, guided coding cards, starter code, public tests, persona, model
setting, knowledge-state format, template isomorphic và time window. Chỉ thay đổi bước tại hai
điểm neo:

```text
reflective: AI nhận template, nói thành lời sẽ điền gì và vì sao — không runner, không pass/fail
enactment:  AI nhận CÙNG template, điền slot từ knowledge state — hidden runner trả pass/fail + trace
```

Vì vậy primary contrast là tác động của **AI enactment được test**, không phải tác động chung của
việc dùng AI hoặc việc làm guided coding lab.

### 15.4. Chấm và phân tích đáng tin

- Hidden coding tests phải cố định, không trùng public tests và không dùng LLM làm người chấm chính.
- Explanation mở được hai rater biết domain chấm mù condition theo rubric đã đóng băng; báo cáo
  reliability giữa rater.
- Pre-test ngắn và prior coding experience được thu trước intervention để kiểm soát chênh lệch đầu vào.
- Với between-subject study, estimate chính có thể là effect của `Condition` lên `TransferScore`,
  điều chỉnh cho pre-test và kinh nghiệm. Với within-subject design, dùng paired/mixed analysis và
  kiểm soát topic/order.
- Agent pass, transcript và log sửa AI giúp giải thích cơ chế kết quả; chúng không được nâng thành
  learning gain nếu transfer outcome không ủng hộ.

## 16. Ranh giới claim, kỳ vọng hiệu ứng và venue

### 16.1. Claim không được viết

| ❌ Claim | Vì sao sai |
|---|---|
| “Đầu tiên dùng LLM làm teachable agent cho lập trình” | AlgoBo, HypoCompass, Chen et al. đã làm |
| “Đầu tiên cho agent viết code sau khi được dạy” | AlgoBo đã làm, learner còn chạy được test lên code đó |
| “Đầu tiên chứng minh learning-by-teaching/protégé effect với AI” | Chase et al. (2009), MatlabTutee (2025) |
| “Đầu tiên dùng LLM teachable agent trong lớp CS đại học” | MatlabTutee deploy in-the-wild 1 tháng, 119 SV |
| “Agent quan sát-thực-thi là cơ chế hoàn toàn mới” | Quá mạnh — quiz của Betty's Brain và SimStudent là tiền thân |
| “LBT đã được chứng minh hiệu quả nên thiết kế này sẽ hiệu quả” | Suy diễn không hợp lệ; xem §16.2 |

⚠️ Từ **`recursive`** phải định nghĩa hẹp và chính xác: *learner sửa lời dạy dựa trên failure trace
có kiểm chứng*. Tránh mọi wording gợi ý đệ quy vô hạn hay agent tự cải thiện.

Claim đóng góp bối cảnh Việt Nam giữ ở mức phụ, kèm kiểm soát ngôn ngữ. Gap là có thật — hầu hết
teachable-agent study chạy ở Mỹ/Hàn, rất ít ở SEA — nhưng nó không đủ sức làm đóng góp chính.

### 16.2. Effect size để hiệu chỉnh kỳ vọng

| Nguồn | Con số |
|---|---|
| Kobayashi (2019), JPR 61(3):192–203, 28 study | preparing-to-teach `g = 0.35`; teaching-with-preparation `g = 0.56` (95% CI `[0.52, 0.61]`) |
| Cùng nguồn, heterogeneity | `Q = 206.35`, `p < .001`, `I² = 93%` |
| Kobayashi (2019b, Frontiers in Psychology) | direct teaching expectancy `g = 0.50` vs indirect `g = 0.27` |
| Kobayashi (2024), Educ Psychol Rev | có expectancy `g = 0.48` `[0.34, 0.63]`; không expectancy `g = −0.02` `[−0.14, 0.11]` |
| Ribosa & Duran (2022) | tạo tài liệu dạy cho người khác `g ≈ 0.17` |

Đọc đúng ba con số này: LBT có hiệu quả nhưng **khiêm tốn và phụ thuộc điều kiện**, heterogeneity
rất lớn, nhiều study null hoặc âm. Và quan trọng nhất — các con số trên là cho **LBT nói chung**,
không phải cho cơ chế `enactment` cụ thể. Không được dùng chúng để hứa hẹn kết quả; chỉ dùng để
đặt kỳ vọng effect size thận trọng khi tính power (§8).

Cùng lý do, hai kết quả sau nên được nhắc trong related work vì chúng là động lực chính đáng của
thiết kế, chứ không phải chỉ là nguy cơ: over-reliance/metacognitive laziness làm giảm reflection
và self-evaluation (Fan et al. 2025; Zhai et al. 2024 systematic review), và “epistemic debt”
(arXiv 2602.20206) đề xuất *Explanation Gate* để tái tạo cognitive friction — cùng tinh thần với
việc buộc người học giải thích ở mỗi card. Framing đề tài quanh việc **tái nạp productive friction
vào lab AI** mạnh hơn framing quanh “dạy AI thì học tốt hơn”.

### 16.3. Venue và điều reviewer sẽ vặn

| Venue | Hợp khi nào | Reviewer sẽ vặn gì |
|---|---|---|
| **L@S** | Nhấn cơ chế scalable + đánh giá học tập; chấp nhận n vừa | Liên hệ learning sciences và tính scale |
| **CHI** | Nhấn interaction design + agent fidelity + UX | Rất khắt khe về rigor và baseline; TeachYou và MatlabTutee đều ở CHI → reviewer thuộc prior art, phải phân biệt sắc |
| **AIED / IJAIED** | Nhấn knowledge modeling + đánh giá học tập | HypoCompass ở AIED → reviewer quen chủ đề, sẽ hỏi ngay về khác biệt chiều |
| **SIGCSE / ITiCSE / ICER** | Framing CS education, guided coding, transfer | ICER đòi grounding lý thuyết chặt; ITiCSE/SIGCSE dễ hơn cho system + experience report |
| **LAK** | Nhấn process metrics và analytics | Sẽ vặn mạnh về việc dùng proxy như AgentPassRate |
| **CSCW** | Ít hợp trừ khi có yếu tố collaborative | — |

### 16.4. Thứ tự đọc trước khi viết related work

1. **Jin et al., TeachYou/AlgoBo (CHI 2024)** — đối thủ trực tiếp và là baseline `reflective`. Đọc
   kỹ measures, cơ chế run-test-cases, limitations.
2. **Ma et al., HypoCompass (AIED 2024)** — mối đe dọa “code + test” gần nhất; phải phân biệt chiều.
3. **Rogers et al., MatlabTutee (CHI 2025)** — baseline “LLM đóng novice trong lớp CS”.
4. **Chase et al. (2009)** + **Leelawong & Biswas (2008)** — protégé effect và tiền thân
   “enactment có verification”; **Roscoe & Chi (2007)** cho cơ chế knowledge-building.
5. **Kobayashi (2019, 2024)** — số liệu effect size.
6. **“Towards Valid Student Simulation” (arXiv 2601.05473)** — taxonomy ESS để định vị epistemic
   fidelity (thiết kế này nhắm E3).
7. **Bransford & Schwartz (1999)** + **Schwartz & Martin (2004)** — khung transfer/PFL.
8. **Fan et al. (2025)** + **Walker et al. (ITS 2012)** — chống dùng proxy làm outcome.
9. **Ericson et al. (Parsons systematic review, ITiCSE-WGR 2022)** + self-explanation (SIGCSE
   2015), Atkinson/Renkl/Merrill (2003), Margulieux & Catrambone — justify guided coding flow.
10. **arXiv 2604.18660** (answer leakage) + **BEAGLE, arXiv 2602.13280** — instrument fidelity.

### 16.5. Caveat về chính phần rà cứu này

- **“Chưa ai làm” là kết luận dựa trên vắng mặt bằng chứng**, qua tra cứu có mục tiêu ở
  CHI/L@S/AIED/LAK/EDM/SIGCSE/ITiCSE/ICER/arXiv. Vẫn có thể có workshop paper 2026 rất mới chưa
  xuất hiện. **Phải chạy một systematic search cuối trước khi nộp.**
- Một số nguồn là **preprint chưa peer-review**: arXiv 2601.05473, 2602.13280, 2604.18660,
  2602.20206, 2412.15226, 2604.00142. Taxonomy ESS là *đề xuất*, chưa validate thực nghiệm — dùng
  làm khung định vị, không làm bằng chứng.
- Con số power (~50–64/condition) là ước lượng từ G*Power và meta-study CHI 2025, không phải
  power analysis của study này.
- Số liệu bối cảnh Việt Nam cần trích rõ định nghĩa nếu dùng: ~50.000 SV ngành IT tốt nghiệp/năm
  là báo cáo ngành (Saigon Technology), còn ~100.390 kỹ sư/năm (WEF qua Statista/VietNamNet) là
  con số rộng hơn IT. Hai con số này không thay thế nhau được.

### 16.6. Ngưỡng đổi hướng

| Nếu | Thì |
|---|---|
| Pilot cho thấy `reflective` kiểu AlgoBo đã chạm trần transfer (không còn room cho `enactment`) | Chuyển đóng góp sang *instrument fidelity* hoặc *artifact-grounding trong applied AI* |
| Agent leak đáp án > ~5% turn dù đã guardrail | Ưu tiên đóng góp methodological về leakage-control trước khi claim learning |
| Không đạt power (n thực tế thấp) | Within-subject có counterbalance, hoặc mixed-method + rich process analysis kiểu LAK |
| Pilot cho thấy khuôn “Khi–thì–vì” quá gò bó (ô “vì” bỏ trống/điền lấy lệ nhiều) | Nới khuôn thành gợi ý thay vì bắt buộc, và quay lại pilot extraction free-text |

## 17. Bộ quyết định làm việc (26/07/2026)

Các quyết định mở trong tài liệu được chốt **phương án làm việc** dưới đây — dùng làm mặc định khi
build prototype và viết spec. Đây không phải quyết định cuối: mentor có quyền lật bất kỳ dòng nào,
nhưng cho đến lúc đó, mọi thứ được thiết kế theo bảng này để không bị tê liệt chờ xác nhận.

### 17.1. Bảng quyết định

| # | Quyết định | Chọn | Lý do một dòng | Chi tiết |
|---|---|---|---|---|
| 1 | Novelty | Extension + cơ chế hẹp: *verified enactment on isomorphic task + repair-your-teaching* | Claim hẹp mà sạch không có điểm yếu để reviewer tấn công; reviewer CHI/AIED thuộc prior art | §12.1, §16.1 |
| 2 | Condition | 2: `enactment` vs `reflective`; bỏ self-explanation | Câu hỏi của study chỉ cần 2 nhánh; dồn mẫu vào một contrast | §8 |
| 3 | Design | Between-subject, 60/condition (~120 tổng), ANCOVA + pre-test covariate | Carryover “học được cách dạy” là thật; 60/nhóm bắt được `d ≈ 0.45` | §8 |
| 4 | Primary outcome | Immediate transfer card (7đ, cuối buổi); delayed +7 ngày = secondary | Attrition ở lần đo trễ không cứu được bằng thống kê | §15.1 |
| 5 | Time-on-task | Cố định thời lượng (75'), thả số lượt; báo cáo số lượt descriptive | Filler task cho `reflective` là confound tệ hơn chênh lệch lượt | §5.5 |
| 6 | Rule input | Khuôn “Khi ___ thì ___ vì ___”, song ngữ Việt–Anh | Xóa rủi ro kỹ thuật #1 (extraction) bằng một quyết định UI, chi phí gần 0 | §5.5 |
| 7 | Publication | Tách 2 bài: (1) system + pilot + fidelity → L@S/ITiCSE; (2) efficacy → CHI, fallback LAK/AIED | Không có nhánh tương lai nào khiến trắng tay | §16.3 |
| 8 | Pre-registration | Đăng ký hypothesis + analysis plan trên OSF trước khi thu dữ liệu chính | Với kỳ vọng `d ≈ 0.4`, xác suất null là thật; pre-reg làm null vẫn công bố được | — |

Quyết định quan trọng nhất nếu chỉ giữ một: **#6**. Nó vừa xóa rủi ro kỹ thuật lớn nhất, vừa
không tốn thêm gì, vừa làm mọi thứ hạ nguồn (extraction, slot-mapping, fidelity, chấm điểm) dễ
hơn cùng lúc.

### 17.2. Tận dụng quyền truy cập data

Xếp theo giá trị trên mỗi giờ bỏ ra:

1. **Đào log lỗi K4 cũ để viết distractor.** Distractor và slot misconception viết từ lỗi *thật*
   của học viên khóa trước (persona đặt vào `user` message, retry không backoff, đếm token chỉ
   tính input…). Câu “misconceptions were derived from error logs of N prior students” là content
   validity mà không reviewer nào bắt bẻ được. Việc này làm **trước** khi viết Lab Teaching Spec.
2. **Thu keystroke/timestamp đầy đủ ở transfer card.** Không chỉ điểm: thời gian đến submit đầu,
   số lần sửa, thứ tự làm A→B→C. Nếu TransferScore null, “hai nhóm cùng điểm nhưng `enactment`
   đến đáp án nhanh hơn/ít vòng sửa hơn” vẫn là finding.
3. **Fidelity harness chạy như CI, không phải checklist.** Leakage-check + groundedness-check tự
   động trên *mọi* agent turn trong pilot, log lại. Một bảng “leakage rate 0.8% qua 2.400 turn”
   đáng giá hơn mọi mô tả prompt engineering — và là số liệu chính của bài 1.
4. **Pre-register trên OSF** (quyết định #8): chi phí một buổi chiều, bảo hiểm rẻ nhất cho
   kịch bản null result.

### 17.3. Kế hoạch hai bài

| | Bài 1 | Bài 2 |
|---|---|---|
| Nội dung | System + pilot 5–8 người + fidelity instrument | Efficacy study `enactment` vs `reflective` |
| Đóng góp | Thiết kế slot-filling đạt E3 (ESS); bộ đo leakage/groundedness cho teachable agent viết code | Verified enactment có cải thiện independent transfer không |
| Venue | **L@S** hoặc ITiCSE | **CHI**; nếu null → LAK/AIED với framing process-analysis |
| Phụ thuộc | Không cần efficacy result — không thể “fail” | Cần cohort K4 tiếp theo, ethics, spec đóng băng |
| Vai trò trong thesis | Chứng minh feasibility + method | Trả lời RQ chính |

Bài 1 không cần kết quả học tập nên tiến độ của nó chỉ phụ thuộc vào việc build; bài 2 đặt cược
vào cohort và effect size. Cấu trúc này đảm bảo thesis có sản phẩm công bố được ở mọi kịch bản.

### 17.4. Việc tuần này

1. Build khuôn “Khi–thì–vì” + extraction, pilot 5–8 người (mục tiêu mới ở §5.5).
2. Xin quyền đọc log lỗi K4 cũ; bắt đầu lọc misconception cho distractor.
3. Gửi tài liệu này cho mentor kèm 4 câu nhóm định vị (§10, câu 1–4); đặt lịch gặp.
4. Hỏi luôn quy trình ethics/IRB và thời gian duyệt — có thể là bottleneck lịch lớn nhất.
