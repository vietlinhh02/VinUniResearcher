# Tổng quan hướng nghiên cứu: dạy ngược AI trong các lab AI thực chiến

Trạng thái: bản thảo để thảo luận với mentor/chị Ba — 25/07/2026.  
Mục đích: ghi lại hướng đang được cân nhắc; **không** phải protocol đã chốt hay claim đã được
xác nhận bằng thực nghiệm.

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
  -> tự giải một task biến thể vào ngày sau
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

Chỉ yêu cầu người học “hãy dạy AI về Binary Search/API” không đủ mới. TeachYou/AlgoBo đã dùng
LLM như AI học trò, knowledge state và câu hỏi chủ động; các công trình LLM teachable agent khác
cũng đã xuất hiện trong bối cảnh lập trình.

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

## 4. Khác biệt dự kiến với TeachYou

Khác biệt dưới đây là **giả thuyết thiết kế**; cần đọc/đối chiếu đầy đủ các paper liên quan trước
khi claim novelty. Đặc biệt, ghi chú hiện tại chưa trích xuất được full text của *Playing Dumb to
Get Smart*, nên không được khẳng định công trình đó chưa làm một thành phần nào tương tự.

| Khía cạnh | TeachYou/AlgoBo đã ghi nhận | Hướng đề xuất |
|---|---|---|
| Bài học | Một topic thuật toán trong phiên dạy AI | Lesson-lab hằng ngày, khởi đầu bằng Day 01 API |
| Evidence | Knowledge state và lời hội thoại | Knowledge state + artifact + test/scenario + requirement hiện tại |
| Việc AI làm sau khi được dạy | Phản hồi/hỏi theo policy | Phải áp dụng kiến thức được dạy vào một micro-case biến thể |
| Việc người học làm tiếp | Tiếp tục dạy/trả lời | Quan sát AI áp dụng, tìm lỗ hổng, sửa lời dạy hoặc artifact |
| Outcome cần ưu tiên | Knowledge-building trong transcript | Transfer ở task mới; knowledge-building là mechanism/process |

Nếu study chỉ so sánh AI hỏi nhiều với AI hỏi ít, nó vẫn rất gần protocol TeachYou. Nếu study
so sánh AI apprentice có áp dụng artifact/case mới với AI apprentice hội thoại thông thường, nó
trả lời một câu hỏi hẹp và rõ hơn.

## 5. Luồng trải nghiệm đề xuất cho Day 01 API

### 5.1. Phần chung cho mọi điều kiện

1. Học slide buổi sáng.
2. Làm lab Day 01 buổi chiều.
3. Chạy test công khai để xác nhận artifact baseline.
4. Không để AI tự viết trọn lời giải hoặc thay người học qua checkpoint.

### 5.2. Phiên dạy AI

Day 01 là lab **áp dụng AI vào coding**, không phải bài toán vận hành một doanh nghiệp hay xây
product assistant hoàn chỉnh. Mỗi micro-step chỉ bám một objective của lab: gọi API, chọn model,
phân biệt `system`/`user` message, token/cost, streaming hoặc retry.

Người học không bị thả vào file trống để code thuần. Họ đi qua một guided coding flow:

```text
Đọc một code card hoặc test failure
  -> chọn một cách điền/cấu hình trong 2–3 phương án
  -> giải thích vì sao chọn và vì sao không chọn phương án còn lại
  -> starter code được cập nhật theo lựa chọn
  -> chạy public test
```

Ví dụ ở block system prompt: UI hiện một đoạn call API có một chỗ khuyết; người học chọn message
role phù hợp, rồi phải giải thích vì sao persona/instruction thuộc role đó. Sau đó hệ thống chạy
test để xác nhận lựa chọn được ánh xạ thành code đúng.

AI apprentice nhận một function contract tương tự nhưng test input, prompt hoặc failure condition
khác. Nó phải:

1. nói rõ điều nào đã được dạy;
2. chỉ áp dụng rule đã có trong knowledge state;
3. nêu phần nào chưa được dạy thay vì tự bịa lời giải;
4. đưa ra code attempt/patch hoặc quyết định cấu hình để runner chạy;
5. để người học nhìn test failure và giải thích/sửa lại nếu AI hiểu sai.

AI không tự viết solution hoàn chỉnh trước; code được tạo từ lựa chọn của AI chỉ để runner kiểm tra
việc AI đã áp dụng rule người học dạy hay chưa.

### 5.3. Task transfer

Trong cùng phiên, AI có thể thử Lab A-prime: cùng objective nhưng input/test condition chưa thấy.
Người học dạy/sửa AI tối đa số vòng đã định (ví dụ 2–3); AI pass toàn bộ scenario hoặc hết lượt
thử thì dừng. AI pass chỉ là evidence rằng knowledge state đã được truyền đạt đủ.

Sau một khoảng cách đã định, người học làm một transfer challenge độc lập. Challenge này không
cần là lab chính của ngày hôm sau; nó là card ngắn bám learning objective của Day 01. Không để AI
cho feedback trước khi người học nộp outcome này.

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

### Điều kiện

Nếu đủ cỡ mẫu, ba điều kiện cùng lesson, lab, thời gian, persona và rubric:

| Điều kiện | Sau khi làm lab |
|---|---|
| Self-explanation control | Viết/giải thích quyết định theo prompt cố định |
| TeachYou-like | Dạy AI học trò hội thoại, nhưng AI không áp dụng vào artifact/case biến thể |
| Proposed | Dạy AI apprentice bám artifact; AI áp dụng vào case mới; người học quan sát và sửa |

Contrast quan trọng nhất là `Proposed` so với `TeachYou-like`: nó tách việc có **agent enactment
trên artifact** khỏi hiệu ứng chung của việc dạy AI.

Nếu cỡ mẫu nhỏ, trước hết chỉ làm usability/fidelity pilot 5–8 người. Không dùng pilot đó để tuyên
bố hiệu quả giáo dục. Study hiệu quả cần design counterbalanced hoặc randomized phù hợp và power
analysis trước khi tuyển mẫu.

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

Ví dụ golden test Day 01, tổng 6 điểm:

| Case hidden | Điểm |
|---|---:|
| Giữ system prompt khi cắt conversation history | 1 |
| Chọn model phù hợp với task/giới hạn cost | 1 |
| Retry lỗi tạm thời đúng số lần và báo lỗi cuối rõ ràng | 1 |
| Streaming xử lý chunk không có content | 1 |
| Giải thích trade-off model, cost và history bằng rubric chấm mù | 0–2 |

Hidden tests không được trùng public tests hoặc được cho người học xem trước. Phần code chấm bằng
test; phần giải thích do ít nhất hai người chấm mù condition theo rubric đã đóng băng.

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

## 10. Những gì cần chốt với mentor trước

1. Thesis chấp nhận contextual replication/extension hay yêu cầu novelty cơ chế mới?
2. Có thể dùng Day 01 API làm feasibility prototype trước, rồi chọn một track riêng cho main study không?
3. Main comparator là self-explanation, TeachYou-like, hay cần cả ba điều kiện?
4. Outcome chính có được chốt là next-day hidden transfer thay vì số lượt chat/%KBR không?
5. Ai có thể rà soát content validity cho pre-test, golden test và blind rubric?
6. Có quyền dùng lab, log test và artifact của người học cho nghiên cứu không; dữ liệu nào phải ẩn danh?
7. Cần kiểm tra full text của *Playing Dumb to Get Smart* bằng quyền truy cập thư viện trước khi
   viết novelty claim nào?

## 11. Tài liệu hiện tại cần cập nhật nếu chốt hướng này

- `docs/dinh-huong-ai-thuc-chien-de-hoi-mentor.md` hiện ưu tiên AI practice partner/reviewer và
  policy câu hỏi bám artifact; phần này mâu thuẫn với hướng AI apprentice là trung tâm.
- `docs/research/protocol.md` hiện đặt knowledge-building rate là outcome primary cho active versus
  passive tutee. Hướng mới nên đặt hidden `TransferScore` là primary; %KBR chuyển thành mechanism.
- `docs/research/prompt-spec.md` đã có ràng buộc knowledge state, không tự đưa đáp án và fidelity
  test. Cần mở rộng state machine để AI thể hiện đã học và áp dụng vào case biến thể.

Không nên sửa các tài liệu trên cho đến khi mentor xác nhận định vị nghiên cứu và comparator.

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

### 12.4. Outcome chính có được chốt là next-day hidden transfer thay vì số lượt chat/%KBR không?

Nên chốt **next-day hidden transfer** làm primary outcome nếu claim mong muốn là “giúp người học
làm được task mới”. Người học phải tự sửa/tạo artifact cho một requirement biến thể, không nhận
feedback AI trước khi nộp outcome này.

| Metric | Nó cho biết gì? | Vai trò nên có |
|---|---|---|
| Hidden `TransferScore` ngày sau | Có tự áp dụng được kiến thức vào task mới không | Primary outcome |
| Pre/post concept test | Có thay đổi hiểu biết khái niệm không | Secondary outcome/covariate |
| %KBR | Người học có tạo giải thích có lý do, kết nối và tự sửa không | Process/mechanism |
| Số lượt chat, số từ | Mức sử dụng hệ thống | Descriptive only |

Không dùng số lượt chat làm proxy cho learning. Một cuộc hội thoại dài có thể chỉ phản ánh AI hỏi
ngây ngô hoặc người học mắc kẹt.

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

### 12.7. Có cần kiểm tra full text của *Playing Dumb to Get Smart* trước khi viết novelty claim?

Cần. Đây là paper rất gần về tiêu đề và context: LLM-based teachable agent trong lớp computer
science đại học. Ghi chú hiện tại chỉ xác nhận metadata vì PDF ACM trả về `403`; chưa xác nhận
population, intervention, comparator, measures hay outcomes từ paper gốc.

Trước khi claim “chưa có ai làm”, cần lấy bản full text qua thư viện/VPN VinUni, interlibrary loan
hoặc liên hệ tác giả. Khi có paper, trích tối thiểu:

1. Người học và course/topic là gì?
2. AI bị giới hạn knowledge state hay tự trả lời theo LLM knowledge?
3. Có artifact/lab/test thật hay không?
4. AI có enact kiến thức ở task mới hay chỉ hội thoại?
5. Comparator, outcome, follow-up transfer và limitation là gì?

Trong lúc chưa kiểm tra được, wording an toàn là “đề tài mở rộng/kiểm tra teachable agent trong
bối cảnh lab AI thực hành”, không gọi là “the first” hoặc “chưa từng có”.

### 12.8. Cách hỏi mentor trong một phút

> Em muốn dùng Day 01 API làm feasibility prototype để kiểm tra flow artifact, knowledge state,
> test output và agent fidelity. Sau đó em làm controlled study trên một track cố định. Em cần thầy/cô
> giúp chốt: thesis chấp nhận contextual extension của TeachYou hay phải cô lập mechanism mới? Nếu
> cần mechanism mới, em định so sánh AI apprentice bám artifact và phải áp dụng lại vào case mới với
> một TeachYou-like agent cùng thời lượng; outcome chính là hidden transfer task ngày sau, không phải
> số lượt chat. Em cũng cần xác nhận quyền dùng lab/log và người có thể review golden test/rubric.

## 13. Guided coding và Lab Teaching Spec

### 13.1. Đúng scope của Day 01

AI Thực Chiến ở track này là **học cách áp dụng AI trong code**, không phải đưa người học ngay vào
một business case lớn như vận hành trợ lý chăm sóc khách hàng. Bài Day 01 chỉ cần có các coding
decision nhỏ, đúng theo lab gốc:

| Block lab | Decision card có thể có | Bằng chứng sau lựa chọn |
|---|---|---|
| Basic API | Chọn lời gọi/model và input structure cho function | Mock test của function pass/fail |
| System prompt | Chọn role đặt instruction/persona và giải thích | Request/message assertion pass/fail |
| Token/cost | Chọn cách đếm/ước tính đúng theo input-output | Test cost/token pass/fail |
| Streaming/retry | Chọn hành vi khi chunk rỗng hoặc lỗi tạm thời | Scenario test pass/fail |

Mỗi card có format cố định:

```text
1. Hiện một đoạn starter code, function contract hoặc lỗi test.
2. Đưa 2–3 lựa chọn thực tế có distractor hợp lý.
3. Bắt buộc người học giải thích lựa chọn và loại trừ ít nhất một phương án khác.
4. Ánh xạ lựa chọn vào starter code/configuration.
5. Chạy test và hiện evidence ngắn gọn.
```

Đây không phải quiz nhiều lựa chọn đơn thuần: lựa chọn phải tạo ra code chạy được, lời giải thích
là evidence về reasoning, và test là evidence về behaviour.

### 13.2. Vòng dạy AI ở cấp micro-lab

Sau khi người học qua một card, AI apprentice nhận một micro-task isomorphic, không phải một
project business mới. Ví dụ người học vừa dạy về vai trò của system prompt; AI nhận một call API
có prompt khác và phải chọn/cấu trúc message đúng để pass test.

```text
Người học chọn + giải thích rule
  -> knowledge state lưu rule và nguồn evidence
  -> AI thử code/configure cùng objective với test data khác
  -> runner trả pass/fail + failure trace tối thiểu
  -> người học giải thích/sửa rule cho AI
  -> AI thử lại, tối đa số vòng đã định
```

Lỗi của AI phải map vào misconception hoặc knowledge gap đã định trước, không được random hoặc
giả ngu. AI pass micro-lab cho thấy người học đã truyền rule; nó **không** thay thế hidden transfer
test của người học.

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

decision_cards:
  - objective: distinguish_system_and_user_messages
    code_context: call_with_missing_message_role
    options: [option_a, option_b, option_c]
    expected_reasoning: [persona_is_stable_instruction, user_is_runtime_request]
    misconceptions: [persona_in_user_message]
    public_test: test_system_message

agent_variant:
  - source_card: distinguish_system_and_user_messages
    changed_input: different_persona_and_user_request
    hidden_test: test_agent_message_structure

transfer_challenge:
  - objectives: [distinguish_system_and_user_messages, handle_streaming_and_retry]
    hidden_tests: [transfer_message_role, transfer_retry]
```

Schema chỉ minh hoạ; field và đáp án thật phải được giảng viên/TA rà soát trước khi dùng.

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
1. Chọn Day N trong course map.
2. Mở slide/lesson và repo lab gốc của ngày đó.
3. Làm từng guided coding card:
     code context/test failure
       -> chọn phương án
       -> giải thích lý do
       -> starter code cập nhật
       -> public test
4. Chuyển sang "Dạy AI apprentice":
     AI nhắc lại rule vừa được dạy và phần còn chưa hiểu.
5. Mở "AI practice check":
     AI nhận một micro-task cùng objective, với input/test condition khác.
     AI tạo attempt; runner trả evidence pass/fail.
6. Nếu AI fail:
     người học giải thích hoặc sửa rule cho AI;
     knowledge state cập nhật;
     AI thử lại, tối đa 2–3 vòng.
7. Kết thúc day:
     lưu choices, explanations, code/test evidence, knowledge state và AI progress.
8. Khi đến module review hoặc thời điểm nhắc lại:
     người học làm transfer card độc lập, không có AI trợ giúp.
```

Người học không phải code từ trang trắng. Các lựa chọn dẫn dắt code ở đầu lab; khi tiến bộ hơn,
course có thể mở dần quyền sửa trực tiếp snippet hoặc repo. Dù bằng lựa chọn hay code trực tiếp,
người học luôn phải giải thích reasoning và code cuối cùng luôn phải qua test.

### 14.2. Một UI, hai research modes

Trong research, participant được server gán condition; không có hai app khác nhau.

| Bước UI chung: AI practice check | `reflective` / TeachYou-like | `enactment` / proposed product |
|---|---|---|
| Knowledge state | AI nhắc lại điều được dạy và hỏi follow-up bám state | Giống `reflective` |
| Hoạt động sau khi dạy | AI hội thoại trong time window cố định, không tạo code attempt | AI tạo code/configuration attempt cho micro-task isomorphic |
| Evidence trả về | Tóm tắt và câu hỏi phản tư | Hidden runner trả pass/fail/failure trace tối thiểu |
| Việc người học làm | Giải thích tiếp cho AI | Giải thích/sửa rule cho AI sau khi thấy attempt |

Hai mode giữ cố định: slide, lab, guided cards, starter code, public tests, persona, model setting,
knowledge-state format và thời lượng. Chỉ khác việc AI có **enact** kiến thức trên task/test mới
hay không. Vì đây là một feature flag, prototype không bị nhân đôi và log schema giống nhau.

### 14.3. Thành phần tối thiểu của prototype

| Thành phần | Trách nhiệm |
|---|---|
| Course map | Hiện ngày/module, skill dependency và progress |
| Lab Teaching Spec | Quy định card, options, expected reasoning, misconception, tests và agent variant cho từng lab |
| Guided coding UI | Hiện code context, choice, explanation và test result |
| Knowledge-state service | Lưu claim người học đã dạy, evidence source và phần AI chưa biết |
| Agent service | Giữ vai apprentice, hỏi bám state và tạo attempt theo mode |
| Isolated runner | Chạy code attempt qua public/hidden tests; không giữ API key của người học |
| Evidence log | Lưu lựa chọn, explanation, test summary, AI attempt, correction và completion dưới participant ID giả danh |
| Transfer-card service | Giao task độc lập khi đến thời điểm review, khóa AI feedback đến khi submit |

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
