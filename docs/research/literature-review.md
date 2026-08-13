# Rapid literature review: AI học trò trong giáo dục lập trình

Ngày tìm kiếm: 2026-07-19. Corpus hiện có 20 bài: 19 bài peer-reviewed và 1 preprint.
Đây là rapid evidence review phục vụ thiết kế pilot, chưa phải systematic review hoàn
chỉnh theo PRISMA.

## Câu hỏi của review

Khi AI cùng đóng vai học trò và cùng có cơ hội hỏi ngược, việc chọn follow-up
question từ knowledge state có làm learner giải thích sâu hơn so với đi theo một
question policy cố định hay không?

## Cách tìm và chọn nguồn

Chuỗi tìm kiếm lõi:

```text
("learning by teaching" OR "teachable agent" OR "AI tutee")
AND (LLM OR "large language model" OR ChatGPT)
AND (programming OR algorithm OR education)
```

Nguồn được ưu tiên theo thứ tự: paper peer-reviewed/DOI, bản thảo chính thức
của tác giả, rồi arXiv cho nghiên cứu mới. Blog, trang tổng hợp và repository
không được dùng làm bằng chứng về learning outcome. Chi tiết trích xuất nằm
trong `evidence-matrix.csv`; query, tiêu chí chọn và các nguồn chưa được phép trích
định lượng nằm trong `search-log.md`.

## Bản đồ 20 nguồn

Corpus được chia thành bốn lớp để tránh coi mọi paper có giá trị như nhau:

| Lớp bằng chứng | Mục đích | ID trong matrix |
|---|---|---|
| Cơ chế Learning by Teaching | Protégé effect và knowledge-building | E01–E03, E10, E15 |
| Teachable agent trước LLM | Feedback, prompt và agency | E11–E14, E20 |
| LLM teachable agent trong CS | Lập trình và thuật toán | E05–E06, E08, E16–E17 |
| Triển khai gần đây | Engagement và learning mechanism | E04, E07, E09, E18–E19 |

Không cần đọc sâu cả 20 bài ngay. Tám bài cần đọc trước khi chốt proposal là
E03, E05, E06, E10, E16, E17, E18 và E19. Các bài còn lại dùng để giải thích quyết
định thiết kế hoặc kiểm tra boundary condition.

## Những gì đã có bằng chứng

### 1. Learning by Teaching có nền tảng trước LLM

Betty's Brain cho thấy teachable agent có thể khiến người học đầu tư công sức và
tham gia vào self-regulation, nhưng giao tiếp dựa trên concept map thay vì hội thoại
tự nhiên. Nghiên cứu về Protégé Effect cho thấy chỉ riêng việc tin rằng mình
đang dạy một agent đã có thể tăng nỗ lực học. Các kết quả này cung cấp cơ
chế hợp lý, nhưng không tự động chứng minh rằng mọi chatbot đóng vai học trò
đều cải thiện điểm số.

Meta-analysis gồm 28 nghiên cứu ước lượng Hedges' `g = 0.35` cho chuẩn bị để dạy
và `g = 0.56` cho chuẩn bị rồi thực sự dạy so với học thông thường. Hoạt
động tương tác có lợi hơn hoạt động không tương tác. Tuy vậy, corpus này
không tập trung vào LLM và không cho phép dùng `g = 0.56` như effect size kỳ vọng
trực tiếp cho prototype hiện tại.

Nguồn: [Biswas et al.](https://doi.org/10.1080/08839510590910200),
[Chase et al.](https://doi.org/10.1007/s10956-009-9180-4),
[Kobayashi](https://doi.org/10.1111/jpr.12221).

### 2. Câu hỏi chủ động thay đổi chất lượng hội thoại

AlgoBo/TeachYou là nghiên cứu gần nhất với sản phẩm đề xuất. Hệ thống dùng
Reflect-Respond để giới hạn knowledge state và mode-shifting để agent định kỳ hỏi
`why/how`. Trong nghiên cứu 40 người mới học thuật toán, điều kiện có
mode-shifting và Teaching Helper tạo mật độ phát biểu knowledge-building cao hơn với
Cohen's `d = 0.71`.

Điểm cần diễn giải đúng: `d = 0.71` là hiệu ứng trên mật độ thông điệp
knowledge-building, không phải learning gain. Hơn nữa, mode-shifting và Teaching Helper cùng
thay đổi giữa hai điều kiện, nên chưa tách được tác động riêng của chính
sách hỏi ngược.

Nguồn: [Jin et al., CHI 2024](https://doi.org/10.1145/3613904.3642349).

Các nghiên cứu trước LLM giúp giải thích vì sao câu hỏi có thể có tác dụng.
Roscoe và Chi phân biệt `knowledge-telling`—chỉ nhắc lại hoặc đưa thủ
tục—với `knowledge-building`—tự giải thích, suy luận và sửa hiểu nhầm.
SimStudent sau đó cho thấy việc agent yêu cầu giải thích có thể đạt kết quả
học tương đương với ít bài luyện hơn trong cùng thời gian. Đây là nền tảng
hợp lý để đo tỷ lệ knowledge-building, nhưng không phải bằng chứng trực tiếp
cho LLM tiếng Việt.

Nguồn: [Roscoe & Chi (PDF full text)][roscoe-chi-pdf],
[Matsuda et al.](https://doi.org/10.1109/DIGITEL.2012.12).

### 3. Learning outcome còn chưa nhất quán

Nghiên cứu ChatGPT với 41 sinh viên báo cáo điểm kiến thức điều chỉnh và độ
rõ của pseudocode cao hơn nhóm xem video rồi tự code, nhưng không có khác biệt đáng
kể về correctness. Đây là dấu hiệu rằng AI có thể giúp người học diễn đạt
rõ mà không nhất thiết giúp họ tự sửa lỗi tốt hơn.

Một nghiên cứu conversational agent khác cho thấy người học cảm thấy gõ lời
diễn giải hữu ích hơn chọn câu có sẵn, nhưng cảm nhận đó không chuyển thành
learning gain trong tương tác cố định. Chrysalis cũng không tìm thấy khác biệt quiz
giữa AI tutor và AI tutee do điểm chạm trần. Vì vậy, pilot không được dùng
satisfaction hoặc độ dài hội thoại làm đại diện cho việc học.

Nguồn: [Chen et al.](https://doi.org/10.1111/bjet.70001),
[Love et al.](https://doi.org/10.1007/s40593-025-00461-1),
[Arun et al.](https://arxiv.org/abs/2510.05271).

HypoCompass bổ sung bằng chứng gần với programming: 19 sinh viên giúp LLM tìm giả
thuyết lỗi, điểm debugging tăng 11,7% và thời gian hoàn thành giảm 13,6% từ
pre-test sang post-test. Tuy nhiên đây là single-group pre/post, nên practice effect, khác
biệt độ khó item và selection đều có thể giải thích một phần kết quả. Con
số này chỉ chứng minh tính khả thi, không chứng minh hiệu quả nhân quả.

`Playing Dumb to Get Smart` là nghiên cứu CHI 2025 trực tiếp triển khai LLM teachable
agent trong lớp computer science đại học. Đây là nguồn phải đọc kỹ, nhưng matrix
hiện chỉ ghi những gì đã được xác nhận từ metadata. Chưa dùng bất kỳ con
số outcome nào cho tới khi trích xuất full text.

Nguồn: [Ma et al.](https://doi.org/10.1007/978-3-031-64302-6_19),
[Rogers et al.](https://doi.org/10.1145/3706598.3713644).

### 4. Người học cần scaffold để biết cách dạy

Nghiên cứu 24 sinh viên của Debbané và cộng sự ghi nhận rào cản tâm lý, thiếu
kinh nghiệm dạy và thiếu feedback khi dạy một mình. Virtual agent bị đánh giá
thấp khi trông giả hoặc không đưa ra phản hồi hữu ích. Điều này dẫn đến
hai yêu cầu sản phẩm: agent phải phản hồi dựa trên lời giảng vừa nhận, và
giao diện phải cho người học một lesson path tối thiểu thay vì để họ tự nghĩ
toàn bộ cách dạy.

Nguồn: [Debbané et al.](https://doi.org/10.1145/3579501).

### 5. Chất lượng tương tác quan trọng hơn số lượt chat

Phân tích log của 533 học sinh dùng AI teachable agent trong toán cho thấy nhóm cải
thiện có tỷ lệ tương tác constructive cao hơn, trong khi tương tác passive xuất
hiện nhiều hơn ở nhóm suy giảm. Vì đây là phân tích quan sát, không thể nói
constructive interaction gây ra learning gain. Nhưng kết quả đủ mạnh để bác bỏ
cách đo đơn giản kiểu “chat nhiều là học nhiều”.

Nghiên cứu năm 2026 về tutor learning tiếp tục cho thấy tỷ lệ câu trả lời
knowledge-building dự đoán điểm conceptual và procedural post-test sau khi kiểm soát
pre-test. Đây vẫn là association, không phải tác động nhân quả riêng của follow-up
question. Vì vậy pilot hiện tại nên thao tác question policy và dùng knowledge-building
làm primary process outcome, còn learning gain là secondary outcome.

Nguồn: [Liu et al.](https://doi.org/10.1038/s41598-025-24841-8),
[Ameen et al.](https://doi.org/10.1007/s41237-026-00294-9).

### 6. Feedback và persona là biến gây nhiễu cần khóa

Hai thí nghiệm của Okita và Schwartz cho thấy recursive feedback, khi người dạy quan
sát học trò dùng điều vừa học, hỗ trợ transfer tốt hơn direct feedback. Nghiên
cứu về humor cho thấy tone của agent có thể thay đổi motivation và effort mà không
bảo đảm thay đổi learning outcome. Vì vậy fixed và state-aware condition phải giữ
nguyên persona, tone và cách thể hiện “AI đã học được gì”; chỉ cách chọn
question target được thay đổi.

Nguồn: [Okita & Schwartz](https://doi.org/10.1080/10508406.2013.807263),
[Ceha et al.](https://doi.org/10.1145/3411764.3445068).

## Vấn đề trong tài liệu tổng quan ban đầu

`tong-quan-ai-tutor-toan-dien.md` hữu ích để định hướng thuật ngữ nhưng chưa đủ
điều kiện làm nguồn trích dẫn. Những số liệu sau không được paper AlgoBo hỗ
trợ như cách tài liệu đang trình bày:

- `d = 0.71` bị gắn thành learning gain thay vì knowledge-building density.
- Các số tăng readability 34%, thời gian 47 phút và dropout 8% chưa truy được về
  paper gốc.
- TeachYou bị mô tả là hệ thống chủ đề tổng quát. Paper gốc chỉ nghiên cứu
  môi trường học thuật toán.
- Các con số cho ALTER-Math và quiz TeachYou thiếu citation định danh để kiểm tra.

Không dùng các con số này trong abstract, proposal hoặc power analysis.

## Research gap khả thi sau khi mở rộng corpus

AlgoBo cho thấy một condition có Mode-shifting và Teaching Helper tạo nhiều
knowledge-building hơn baseline, nhưng hai thành phần thay đổi cùng lúc. Chu kỳ hỏi
sau mỗi ba lượt cũng không giải quyết việc nên hỏi phần nào khi knowledge state
có nhiều gap.

Khoảng trống đủ hẹp cho pilot là:

> Trong corpus hiện tại, chưa có bằng chứng nhân quả cho thấy chọn question target
> và strategy từ external knowledge state tốt hơn một policy đi theo lesson path cố
> định, khi model, persona, question opportunities và các scaffold khác được giữ
> nguyên.

Đóng góp phù hợp với cỡ pilot gồm protocol và rubric tiếng Việt, fidelity data cho
state/gap/question pipeline, cùng một effect estimate ban đầu trên knowledge-building.
Learning gain và transfer chưa phải confirmatory claim.

## Kết luận cho thiết kế

Với 20–40 người, thiết kế phù hợp là within-subject counterbalanced trên hai
objective tương đương. Mỗi người trải nghiệm cả fixed và state-aware policy trong
cùng question budget. Primary outcome là knowledge-building do hai rater chấm ẩn condition;
independent transfer là exploratory. Protocol chi tiết nằm tại `protocol.md`.

## Giới hạn của review này

Corpus 20 bài đủ để định hướng proposal và pilot, nhưng không đủ để tự gọi
là systematic review. Việc tìm kiếm chưa cung cấp flow diagram, double screening,
forward/backward citation search đầy đủ hoặc đánh giá risk of bias theo công cụ
chuẩn. Trước khi viết manuscript, cần chạy protocol tìm kiếm có thể tái lập
trên các database, deduplicate và lưu lý do loại từng full text.

[roscoe-chi-pdf]: https://education.asu.edu/sites/g/files/litvpz656/files/lcl/rod_chi_rer_07_3.pdf

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Nối literature gap với intervention mới | Fixed vs state-aware |
| Inflation | Hạ learning claim về mức pilot | Transfer là exploratory |
| Vocabulary | Nói rõ biến được thao tác | Question target và strategy |
