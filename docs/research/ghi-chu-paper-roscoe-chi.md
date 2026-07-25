# Ghi chú đọc paper Roscoe và Chi

Paper: [Bản PDF full text][roscoe-chi-pdf]

DOI: [10.3102/0034654307309920](https://doi.org/10.3102/0034654307309920)

Mã trong evidence matrix: E10

Tài liệu này là bước tiếp theo sau khi hoàn thành E05 — AlgoBo. Chỉ ghi những gì xác
nhận được từ paper gốc. Nếu chưa tìm thấy bằng chứng, ghi `chưa xác minh` thay vì tự
suy đoán.

## 1. Việc cần chốt trước khi đọc E10

*(Phần này dành cho họp team nội bộ, đã được đánh dấu xác nhận)*

* [x] Baseline và TeachYou trong E05 cùng dùng Reflect–Respond.

  **Trả lời:** Đúng. Baseline vẫn sử dụng Reflect–Respond và cùng seed knowledge
  state với TeachYou; đây không phải phiên bản AlgoBo-Basic trong formative study.

* [x] Hai condition của E05 khác nhau đồng thời ở Mode-shifting và Teaching Helper.

  **Trả lời:** Đúng. TeachYou có cả Mode-shifting và Teaching Helper, còn Baseline
  không có cả hai thành phần này. Vì vậy, đây là một can thiệp gộp chứ không phải
  phép so sánh chỉ thay đổi chính sách đặt câu hỏi.

* [x] Cohen's `d = 0.71` đo knowledge-building density trong problem-solving phase,
  không phải learning gain.

  **Trả lời:** Đúng. Trong problem-solving phase, mật độ knowledge-building của
  TeachYou là `8.4 ± 7.1%`, so với `3.5 ± 6.6%` ở Baseline, với `p = 0.03` và
  Cohen's `d = 0.71`. Paper không đo learning gain trực tiếp bằng pre-test/post-test.

* [x] E05 chưa tách được tác động riêng của active questioning.

  **Trả lời:** Đúng. Do Mode-shifting và Teaching Helper được thay đổi cùng lúc,
  chênh lệch quan sát được không thể quy riêng cho active questioning. Muốn đo tác
  động này, nghiên cứu hiện tại phải giữ các thành phần khác cố định và chỉ thay đổi
  question policy.

Nguồn dùng để đối chiếu:
[ghi chú E05](ghi-chu-paper-algobo.md).

## 2. Mục tiêu khi đọc E10

Sau khi đọc, phải giải thích được:

1. Knowledge-telling là gì?
2. Knowledge-building là gì?
3. Vì sao việc giải thích có thể giúp người dạy học?
4. Câu hỏi và phản hồi của người được dạy ảnh hưởng thế nào đến người
   dạy?
5. Làm sao nhận diện knowledge-building trong transcript tiếng Việt?
6. E10 hỗ trợ cách định nghĩa `knowledge_building_rate` như thế nào?

Không đọc E10 để tìm effect size cho LLM. Đây là paper lý thuyết tổng hợp
nghiên cứu peer tutoring, không phải thí nghiệm về LLM teachable agent.

## 3. Cách đọc paper

### 3.1. Lượt 1: Hiểu lập luận chung

Đọc abstract, introduction và conclusion. Ghi lại:

- Tutor learning là hiện tượng gì?
- Tác giả muốn giải thích cơ chế nào?
- Paper phân biệt những loại hoạt động giảng dạy nào?

### 3.2. Lượt 2: Tìm cơ chế

Tập trung vào các đoạn nói về:

- chuẩn bị để dạy;
- giải thích cho người học;
- đặt và trả lời câu hỏi;
- nhận ra lỗ hổng hoặc mâu thuẫn trong kiến thức;
- knowledge-telling và knowledge-building.

### 3.3. Lượt 3: Tìm bằng chứng và giới hạn

Kiểm tra:

- Lập luận nào được hỗ trợ bởi nghiên cứu thực nghiệm?
- Lập luận nào là mô hình hoặc diễn giải lý thuyết?
- Population và domain của các nghiên cứu được tổng hợp là gì?
- Paper cho phép và chưa cho phép kết luận điều gì?

## 4. Thông tin chung

4.1. **Ngày đọc:** 22/07/2026
4.2. **Tác giả và năm xuất bản:** Rod Roscoe và Michelene Chi, 2007.
4.3. **Hội nghị hoặc tạp chí:** Review of Educational Research (Tập san Đánh giá
Nghiên cứu Giáo dục).
4.4. **Loại paper:** Bài viết đánh giá (Review article / Literature review).
4.5. **Mục tiêu chính của paper:** Xem xét các nghiên cứu về quá trình dạy kèm thực
tế (process data) nhằm giải thích sự khác biệt trong kết quả học tập của gia sư, tập
trung vào cách hai hoạt động **giải thích (explaining)** và **đặt câu hỏi
(questioning)** thúc đẩy việc xây dựng kiến thức (knowledge-building) hay chỉ đơn
thuần là kể lại kiến thức (knowledge-telling).

## 5. Knowledge-telling

5.1. **Paper định nghĩa hoặc mô tả knowledge-telling như thế nào?** Kể lại kiến thức
là khi gia sư "thuyết trình" (lecturing) hoặc "nêu ra những gì họ đã biết" bằng cách
tóm tắt các sự thật/dữ kiện mà rất ít hoặc không có sự diễn giải chi tiết
(elaboration) hay tự giám sát (self-monitoring) (trang 8).
5.2. **Người dạy thực hiện những hành vi quan sát được nào khi chỉ
knowledge-telling?** Chỉ cung cấp đáp án, đọc/tóm tắt lại các sự kiện từ văn bản,
hoặc đưa ra các hướng dẫn mang tính thủ tục (procedural) từng bước một cách máy móc
mà không giải thích nguyên lý hay lý do đằng sau (trang 14, 15, 18).
5.3. **Việc nhắc lại định nghĩa hoặc thủ tục có luôn là knowledge-telling không? Điều
kiện nào làm cách phân loại thay đổi?** Có, nó thường là knowledge-telling. Phân loại
sẽ thay đổi thành knowledge-building nếu việc nhắc lại đó được kết hợp với một ví dụ
mới, sự liên hệ tới một nguyên lý cốt lõi, hoặc kèm theo các phát biểu tự giám sát
(self-monitoring) (trang 14, 18).
5.4. **Knowledge-telling có thể hỗ trợ việc học ở mức nào?** Nó có thể cải thiện khả
năng nhớ lại sự thật (factual recall) thông qua việc ôn tập (rehearsal) và có thể là
chất xúc tác (tiền đề cần thiết) cho quá trình xây dựng kiến thức sau đó (trang 20).
5.5. **Trích dẫn hoặc số trang chứa bằng chứng:** Trang 8, 14, 15, 18, 20.

## 6. Knowledge-building

6.1. **Paper định nghĩa hoặc mô tả knowledge-building như thế nào?** Được gọi là
"xây dựng kiến thức mang tính phản ánh" (reflective knowledge-building), bao gồm:
tự giám sát mức độ hiểu, tích hợp kiến thức mới và kiến thức nền tảng (prior
knowledge), kiến tạo và diễn giải kiến thức thông qua suy luận (inferences) (trang
8).
6.2. **Elaboration khác việc nhắc lại kiến thức như thế nào?** Elaboration đi xa hơn
việc chỉ tóm tắt sách; nó yêu cầu gia sư phải tạo ra các ví dụ mới, áp dụng nguyên
lý, kết nối các ý tưởng, và suy luận logic để sửa chữa các mô hình tâm lý (mental
models) đứt gãy của chính họ (trang 12, 19).
6.3. **Sense-making xuất hiện khi người dạy làm gì?** Xuất hiện khi người dạy cố gắng
làm rõ một khái niệm khó hiểu bằng cách "nghĩ thành tiếng" (think aloud) tương tự như
quá trình tự giải thích (self-explaining), hoặc khi họ tự đánh giá lại suy nghĩ của
mình (overt self-monitoring) (trang 12, 18).
6.4. **Việc phát hiện và sửa hiểu nhầm có được coi là knowledge-building không?**
Có. Nhận diện các lỗ hổng/quan niệm sai lầm và cố gắng sửa chữa (repair errors)
chúng thông qua suy luận là một cơ chế cốt lõi của knowledge-building (trang 8, 12).
6.5. **Trích dẫn hoặc số trang chứa bằng chứng:** Trang 8, 12, 18, 19.

## 7. Cơ chế tutor learning

7.1. **Việc chuẩn bị để dạy có thể giúp người học như thế nào?** Giúp người dạy ôn
tập, tổ chức, định hình (reshape) lại tài liệu để trình bày, từ đó tự họ nhìn nhận vấn
đề theo những góc độ mới và hiểu sâu hơn cấu trúc cơ bản của môn học (theo Gartner
et al., 1971) (trang 8).
7.2. **Việc tự giải thích trong lúc dạy có thể giúp người học như thế nào?** Tương tự
như việc học từ ví dụ (worked-out examples), tự giải thích giúp người dạy kiểm tra
mức độ hiểu, tạo ra các suy luận kết nối giữa các bước, sắp xếp lại các kiến thức rời
rạc, và sửa chữa các lỗ hổng (impasses) (trang 12).
7.3. **Câu hỏi của người được dạy có thể kích hoạt quá trình tư duy nào?** Câu hỏi
của tutee cung cấp một "tín hiệu siêu nhận thức" (metacognitive cue) hoặc "xung đột
nhận thức" (cognitive conflict). Sự bối rối dai dẳng của tutee buộc tutor phải sửa
đổi hoặc tạo ra một lời giải thích hoàn toàn mới (trang 21-22).
7.4. **Khi nào người dạy nhận ra knowledge gap của mình?** Khi họ cố gắng đưa ra một
lời giải thích hoàn chỉnh, chính xác; hoặc khi tutee đặt những câu hỏi sâu, suy luận
vượt ra ngoài tài liệu gốc khiến gia sư nhận ra mình trả lời sai hoặc không thể trả
lời (trang 12, 21).
7.5. **Paper mô tả vai trò của metacognitive monitoring như thế nào?** Nó là một
thách thức lớn và là giới hạn quan trọng. Nếu gia sư không thể hoặc không muốn đánh
giá chất lượng lời giải thích của chính mình (thiếu self-monitoring), quá trình xây
dựng kiến thức mang tính phản ánh sẽ bị ngăn cản (trang 13, 31).
7.6. **Cơ chế nào liên quan trực tiếp nhất đến active questioning trong nghiên cứu
hiện tại?** Việc trả lời các câu hỏi mang tính lập luận sâu (deep reasoning questions)
từ người được dạy buộc gia sư phải đối mặt với kiến thức đứt gãy của mình, từ đó thúc
đẩy hoạt động tự giám sát (self-monitoring) và xây dựng kiến thức (trang 21-22, 26).

## 8. Bằng chứng mà paper sử dụng

8.1. **Paper tổng hợp loại nghiên cứu nào?** Các nghiên cứu có báo cáo quan sát định
lượng về hành vi của gia sư (process data), ưu tiên những nghiên cứu kết hợp đo lường
kết quả học tập của gia sư (process-outcome studies), và các nghiên cứu chỉ đo lường
quá trình (process-only studies) (trang 8-9).
8.2. **Population và nội dung học phổ biến là gì?** Chủ yếu là học sinh tiểu học,
THCS; nội dung phổ biến nhất là Toán học. Ngoài ra có Tập đọc, Khoa học, và Sinh viên
Đại học (trang 9).
8.3. **Có intervention và comparator thống nhất giữa các nghiên cứu không?** Không
hoàn toàn thống nhất. Đa số so sánh gia sư được đào tạo chiến lược (trained) vs
không/ít được đào tạo; hoặc gia sư vs học sinh tự học (non-tutors/controls) (trang 4,
13-14).
8.4. **Paper có báo một effect size chung không?** Có. Dựa trên các bài review trước,
tác giả ước tính sơ bộ effect size trung bình của hiệu ứng tutor learning là khoảng
**0.35** (trang 6, 27).
8.5. **Kết luận nào được nhiều nghiên cứu hỗ trợ?** Lời giải thích mang tính xây dựng
kiến thức hỗ trợ học tập tốt hơn. Tuy nhiên, gia sư đồng cấp luôn có **thiên hướng kể
lại kiến thức (knowledge-telling bias)** mạnh mẽ, ngay cả khi đã được đào tạo (trang
19, 27).
8.6. **Kết luận nào vẫn còn chưa chắc?** Tỷ lệ tối ưu giữa knowledge-telling và
knowledge-building nên là bao nhiêu để đạt hiệu quả học tập cao nhất (trang 20).

## 9. Chuyển khái niệm thành coding rubric

9.1. **Đơn vị phân tích phù hợp là gì: câu, lượt nói hay toàn bộ đoạn hội thoại?**
Lượt nói (turns/statements) trong một bối cảnh tương tác liên tục (scaffolding
interactions) (trang 9, 17, 18).
9.2. **Dấu hiệu để gán `KB-ELABORATION`:** Tạo ra các ví dụ mới, các phép loại suy,
liên hệ khái niệm để giải thích nguyên lý cốt lõi, hoặc suy luận xa hơn những gì được
cung cấp trong sách (trang 14, 19).
9.3. **Dấu hiệu để gán `KB-SENSEMAKING`:** Các phát biểu thể hiện sự tự đánh giá
(overt self-monitoring) (ví dụ: "Tớ không chắc điều đó nghĩa là gì"), sự sửa lời
(self-correction), "nghĩ thành tiếng" để làm rõ khái niệm bị nghẽn (impasses) (trang
18, 26).
9.4. **Dấu hiệu để gán knowledge-telling:** Chỉ cung cấp đáp án thẳng, đọc lại định
nghĩa, hoặc mô tả các bước mang tính thủ tục ("đầu tiên làm X, sau đó làm Y") mà
không giải thích nguyên do (trang 14, 15).
9.5. **Trường hợp nào cần gắn nhãn `không chắc` để hai coder thảo luận?** Khi gia sư
đưa ra một câu dài có dùng thuật ngữ, nhưng không rõ đó là họ đang diễn giải mở rộng
(elaboration) hay chỉ đang lặp lại nguyên xi một câu phức tạp mà họ học vẹt từ SGK.
9.6. **Những dấu hiệu bề mặt nào không đủ để kết luận knowledge-building? Ví dụ: tin
nhắn dài, dùng nhiều thuật ngữ hoặc có từ `vì`.** Độ dài hay từ ngữ nối (vì, do đó)
không đủ để kết luận, bởi nếu nội dung phía sau chữ "vì" chỉ là một sự thật cơ bản
lấy từ tài liệu (factual statement) mà không có sự suy luận/kết nối mới, nó vẫn chỉ
là knowledge-telling.

## 10. Tự viết ví dụ tiếng Việt

### 10.1. Knowledge-telling

**Ví dụ do bạn tự viết:** "Hàm `print()` trong Python được dùng để in ra kết quả
trên màn hình. Cậu cứ viết `print(tên_biến)` là xong." *(Chỉ nêu chức năng cơ bản và
thủ tục)*

### 10.2. KB-ELABORATION

**Ví dụ do bạn tự viết:** "Hàm `print()` giống như việc cậu gửi một bức thư ra ngoài
hòm thư để mọi người đọc được. Còn hàm `return` thì giống như cậu cất tài liệu vào
két sắt để dùng cho phép tính khác bên trong chương trình, người dùng ngoài màn hình
không thấy được." *(Sử dụng phép loại suy mới để so sánh và làm rõ khái niệm)*

### 10.3. KB-SENSEMAKING

**Ví dụ:** "Nếu chia mảng làm đôi thì `mid` sẽ bằng `(left + right) / 2`... À từ từ,
lỡ mảng có số lượng phần tử chẵn, thì phép chia có phần thập phân sẽ bị lỗi index,
mình phải ép nó về số nguyên `// 2` mới chạy được." *(Phát hiện lỗ hổng logic khi
nghĩ thành tiếng và sửa lỗi)*

### 10.4. Trường hợp khó phân loại

**Ví dụ:** "Ta loại bỏ nửa bên trái vì `target` lớn hơn số ở giữa."
**Giải thích cần thêm ngữ cảnh:** Nếu trước đó tutee vừa hỏi một câu hoàn toàn mới
và tutor tự phân tích để rút ra kết luận này, nó là một phần của quá trình
*KB-Elaboration/Sense-making* cơ bản. Nhưng nếu đây là câu mẫu bê nguyên từ sách giáo
khoa mà tutor vừa đọc 2 phút trước, nó hoàn toàn là *Knowledge-telling*. Cần lịch sử
đoạn chat để quyết định.

## 11. Liên quan đến nghiên cứu hiện tại

11.1. **E10 hỗ trợ chọn primary outcome nào?** Phân tích tỉ lệ/mật độ các lượt hội
thoại được xếp loại là knowledge-building (bao gồm Elaboration và Sense-making) so
với tổng số lượt thoại.
11.2. **E10 hỗ trợ thiết kế câu hỏi của Active tutee như thế nào?** Active tutee
(LLM) không nên chỉ hỏi "what" (sự thật). Nó cần đặt câu hỏi "why" (tại sao làm thế),
"how" (bước này liên kết với nguyên lý nào), "what if" (điều gì xảy ra nếu điều kiện
bị đảo ngược) để ép người học ra khỏi trạng thái knowledge-telling.
11.3. **Hành vi nào của Passive tutee cần tránh để không vô tình kích hoạt
knowledge-building?** Passive tutee chỉ nên gật đầu, đồng ý ("ok, tớ hiểu rồi") hoặc
hỏi những câu xác nhận thông tin bề mặt (verification questions) như "vậy kết quả là
5 đúng không?". Không được hỏi vặn hay thể hiện sự bối rối kéo dài.
11.4. **Có thể dùng nguyên taxonomy của E10 cho transcript tiếng Việt không? Vì
sao?** Không. E10 tổng hợp nhiều nghiên cứu với các coding scheme khác nhau và chủ
yếu dành cho tương tác giữa người-người (với nhiều nhiễu xã hội, giao tiếp phi ngôn
ngữ).
11.5. **Cần bổ sung quy tắc nào để coder phân biệt elaboration, sense-making và chỉ
kể lại kiến thức?** Cần quy tắc truy vết nguồn gốc (Traceability): Đối chiếu nội dung
phát biểu của người học với tài liệu đọc ban đầu (learning material). Nếu thông tin
có sẵn $\rightarrow$ Knowledge-telling. Nếu thông tin là suy luận mới phái sinh
$\rightarrow$ Knowledge-building.

## 12. Hạn chế khi áp dụng E10

12.1. **Paper có nghiên cứu LLM hoặc teachable agent không?** Không, bài báo chỉ tập
trung vào gia sư đồng cấp là con người (human peer tutors) (trừ 1 trích dẫn nhỏ về
teachable agent Betty's Brain, nhưng không phải trọng tâm phân tích).
12.2. **Paper có kiểm tra active và passive AI tutee không?** Không.
12.3. **Paper có cung cấp bằng chứng trực tiếp cho sinh viên Việt Nam học bằng tiếng
Việt không?** Không.
12.4. **Vì sao không thể dùng paper này để tuyên bố active questioning làm tăng
learning gain?** Vì E10 là một bài lý thuyết tổng hợp, chỉ quan sát sự tương quan
(correlation) giữa chất lượng câu hỏi từ tutee người thật và hành vi của tutor người
thật. Động lực tâm lý khi bị AI "quay" (chất vấn) có thể hoàn toàn khác (ví dụ: bực
tức, bỏ cuộc) so với việc giải đáp thắc mắc cho một con người.
12.5. **Những khái niệm nào cần pilot và kiểm tra inter-rater reliability trước khi
dùng chính thức?** Việc phân ranh giới giữa *Elaboration* (diễn giải mở rộng) và
*Knowledge-telling* (nói dài nhưng vẫn là sách giáo khoa).

## 13. Tóm tắt sau khi đọc

13.1. **Citation:** Roscoe, R., & Chi, M. (2007). Understanding Tutor Learning:
Knowledge-Building and Knowledge-Telling in Peer Tutors' Explanations and Questions.
*Review of Educational Research, 77*(4), 534-574.
13.2. **Loại bằng chứng:** Lý thuyết / Đánh giá tài liệu (Literature Review).
13.3. **Main argument:** Quá trình dạy kèm mang lại lợi ích cao nhất khi người dạy
tham gia vào việc xây dựng kiến thức phản ánh (reflective knowledge-building). Tuy
nhiên, hầu hết gia sư mắc phải thiên kiến "kể lại kiến thức" (knowledge-telling
bias), làm giảm tiềm năng học tập.
13.4. **Định nghĩa knowledge-telling:** Truyền đạt, tóm tắt sự thật đã biết với rất ít
sự tự phản ánh hay diễn giải.
13.5. **Định nghĩa knowledge-building:** Tạo ra ý nghĩa mới thông qua suy luận, ví dụ,
tự sửa lỗi, kết nối kiến thức mới và cũ, và giám sát mức độ hiểu của chính mình.
13.6. **Cơ chế liên quan đến active questioning:** Những câu hỏi đào sâu từ người
được dạy (tutee) gây ra "xung đột nhận thức", ép người dạy phải suy nghĩ lại, sửa
chữa lỗi và tạo ra những diễn giải sâu sắc hơn để giải quyết sự bối rối của tutee.
13.7. **Điều paper hỗ trợ cho primary outcome:** Xây dựng cơ sở lý thuyết vững chắc
để biện minh cho việc dùng tỷ lệ *knowledge-building utterances* làm thước đo hiệu
quả (process outcome) cho môi trường LBT.
13.8. **Limitation:** Nghiên cứu dựa trên người thật, trước kỷ nguyên LLM; chưa xác
định rõ tỷ lệ cân bằng tối ưu giữa telling và building.
13.9. **Điều còn chưa chắc hoặc chưa xác minh:** Liệu người dùng có thực sự nảy sinh
các hành vi "sense-making" (như ngập ngừng, tự thừa nhận lỗi) khi đối thoại vô danh
với một Agent bằng văn bản hay không (so với khi đối diện người thật).

## 14. Cập nhật evidence matrix

*(Các trường đã được kiểm tra chéo với nội dung paper)*

* [x] **Population:** Phản ánh chung các nhóm học sinh (literature), không phải mẫu
  đơn lẻ.
* [x] **Domain:** Đa lĩnh vực (Toán, Đọc, Khoa học...).
* [x] **Design:** Theoretical/Literature review.
* [x] **Intervention/Comparator:** So sánh hành vi knowledge-building vs. knowledge-telling.
* [x] **Main evidence:** Ghi nhận các kết luận về thiên kiến kể lại kiến thức và vai
  trò của câu hỏi sâu (không tự bịa effect size).
* [x] **Limitation:** Paper cũ, không phải về LLM, không kiểm tra active/passive AI
  trực tiếp.
* [x] **Relevance:** Cung cấp khung lý thuyết mã hóa (coding scheme).

## 15. Definition of Done

* [x] Tôi phân biệt được knowledge-telling và knowledge-building bằng lời của mình.
* [x] Tôi viết được ít nhất một ví dụ tiếng Việt cho mỗi loại.
* [x] Tôi giải thích được elaboration khác sense-making như thế nào.
* [x] Tôi chỉ ra được câu hỏi của tutee có thể kích hoạt tutor learning bằng cơ chế
  nào.
* [x] Tôi không trình bày E10 như một thí nghiệm LLM.
* [x] Tôi không gán effect size nếu paper không báo effect size đó.
* [x] Tôi đã ghi số trang cho các định nghĩa và bằng chứng chính.
* [x] Tôi đã kiểm tra dòng E10 trong evidence matrix bằng paper gốc.
* [x] Team đã review chéo ít nhất hai ví dụ coding.

## 16. Việc tiếp theo sau E10

Sau khi hoàn thành file này:

1. Người phụ trách cập nhật dòng E10 trong evidence matrix.
2. Một thành viên khác review định nghĩa và các ví dụ coding.
3. Team thống nhất bản nháp đầu tiên của `KB-ELABORATION` và `KB-SENSEMAKING`.
4. Tiếp tục các paper được phân công trong Ngày 2–3:
   - Người 1: E03 sau E10.
   - Người 2: E06 rồi E16.
   - Người 3: E17, E18 và E19.

Chưa build prototype ở bước này. Mục tiêu là khóa cơ sở lý thuyết và cách đo
trước.

[roscoe-chi-pdf]: https://education.asu.edu/sites/g/files/litvpz656/files/lcl/rod_chi_rer_07_3.pdf
