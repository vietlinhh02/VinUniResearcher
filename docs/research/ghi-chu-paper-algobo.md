# Ghi chú đọc paper AlgoBo

Paper: [Teach AI How to Code](https://doi.org/10.1145/3613904.3642349)  
Mã trong evidence matrix: E05

Ngày đối chiếu paper gốc: 22/07/2026

Các mục 1–8 bên dưới ghi bằng chứng từ paper. Mục 9 là diễn giải cho
nghiên cứu hiện tại; những nhận định không được paper kiểm tra trực
tiếp được đánh dấu là `suy luận`.

## 1. Thông tin chung

1.1. Ngày đọc: 22/07/2026.

1.2. Tác giả và năm xuất bản: Hyoungwook Jin, Seonghee Lee, Hyungyu
Shin và Juho Kim, 2024.

1.3. Hội nghị hoặc tạp chí: CHI '24, ACM CHI Conference on Human
Factors in Computing Systems.

1.4. Mục tiêu chính của paper: Nghiên cứu cách dùng LLM làm
teachable agent trong Learning by Teaching (LBT). Paper đề xuất
Reflect–Respond để giới hạn và cập nhật tri thức của LLM,
Mode-shifting để AI chủ động hỏi `why` và `how`, và Teaching Helper
để phản hồi về cách dạy.

## 2. Vấn đề nghiên cứu

2.1. Paper muốn giải quyết vấn đề gì?

Teachable agent truyền thống tốn công xây dựng tri thức riêng cho
từng môn. LLM giảm chi phí đó, nhưng vốn kiến thức rộng và khả năng
tự sửa quá nhanh khiến AI trông quá giỏi để làm người học, làm giảm
cơ hội và động lực giảng dạy của người dùng.

2.2. Vì sao tác giả cho rằng người học nên dạy AI?

LBT có thể giúp người học tổ chức lại kiến thức, nhận ra lỗ hổng và
xây dựng kiến thức mới. Teachable agent còn có tính sẵn sàng cao và
giảm các rào cản tâm lý như sợ mắc lỗi hoặc áp lực phải trả lời ngay
khi dạy một người thật.

2.3. Câu hỏi nghiên cứu của paper là gì?

- RQ1: Reflect–Respond mô phỏng các trạng thái hiểu sai và thiếu
  kiến thức tốt đến đâu?
- RQ2: TeachYou giúp khơi gợi knowledge-building trong LBT như thế
  nào?
- RQ3: Teaching Helper giúp người học phản tư siêu nhận thức về cách
  dạy như thế nào?

## 3. Người tham gia và nội dung học

3.1. Có bao nhiêu người tham gia?

- Formative study: 15 người.
- User study: 40 người, chia ngẫu nhiên 20 người vào Baseline và 20
  người vào TeachYou.

3.2. Người tham gia có kinh nghiệm lập trình ở mức nào?

Họ là người mới học thuật toán nhưng có thể đọc và viết chương trình
Python ngắn. Formative study yêu cầu khoảng 15 dòng; user study yêu
cầu hiểu khoảng 20 dòng với cú pháp cơ bản như `if` và `while`.

3.3. Người tham gia học hoặc dạy thuật toán nào?

Thuật toán tìm kiếm nhị phân.

3.4. Có tiêu chí chọn hoặc loại người tham gia nào đáng chú ý?

Formative study chọn người chưa quen với tìm kiếm nhị phân và LBT;
11/15 người thuộc các ngành kỹ thuật ngoài Computer Science. User
study loại người từng tham gia formative study và sàng lọc người đã
thành thạo tìm kiếm nhị phân. Ứng viên bị loại nếu đạt ít nhất ba
trong bốn tiêu chí: đúng ít nhất 5/6 câu MCQ, tự tin ít nhất 6/7, đã
cài đặt tìm kiếm nhị phân trong sáu tháng gần nhất, hoặc từng được
trả tiền để giảng dạy.

## 4. Cách hệ thống hoạt động

4.1. Reflect–Respond hoạt động như thế nào?

- Reflection: LLM trích xuất thông tin mới từ ba tin nhắn gần nhất
  rồi thêm hoặc sửa knowledge state.
- Response: LLM truy xuất phần tri thức liên quan từ knowledge state
  và chỉ kết hợp phần được truy xuất để tạo phản hồi. Nếu không có
  thông tin liên quan, AlgoBo nói rằng nó chưa biết và nhờ người học
  giải thích.

4.2. Hệ thống lưu và sử dụng knowledge state như thế nào?

Knowledge state là một JSON object gồm `facts`, chứa giải thích bằng
ngôn ngữ tự nhiên, và `code_implementation`, chứa các đoạn code.
Phản hồi của AlgoBo bị ràng buộc bởi trạng thái này; state trống tạo
hành vi không biết, còn thông tin đúng hoặc sai có thể cấu hình mức
hiểu biết hoặc misconception.

4.3. Mode-shifting thay đổi hành vi của AI ra sao?

AlgoBo luân phiên giữa help-receiver mode và questioner mode. Cứ mỗi
tin nhắn thứ ba, AI chuyển sang questioner mode, đặt câu hỏi đào sâu
và tiếp tục hỏi cho đến khi câu trả lời đủ sâu và có ví dụ hợp lệ.
Sau đó AI tóm tắt và quay lại receiver mode. Chu kỳ ba tin nhắn là
lựa chọn heuristic từ pilot của tác giả.

4.4. Teaching Helper hỗ trợ người học bằng cách nào?

Teaching Helper phân loại hội thoại theo thời gian thực và hiện một
trong bốn loại phản hồi. Với Commanding hoặc Spoon-feeding, hệ thống
hiện hộp đỏ, tạm khóa gửi tin nhắn và yêu cầu người học chọn cách xử
lý. Với Under-teaching hoặc hành vi mặc định, hệ thống hiện hộp xanh
để gợi ý hoặc khuyến khích.

4.5. Khi nào AI hỏi `why` hoặc `how`?

Trong giai đoạn dạy khái niệm và code, AlgoBo hỏi `why`. Trong giai
đoạn thảo luận, AI đưa ra thuật toán liên quan hoặc ví dụ thực tế
rồi hỏi `how` để người học kết nối và mở rộng kiến thức.

## 5. Thiết kế nghiên cứu

5.1. Nghiên cứu dùng thiết kế nào?

User study dùng thiết kế between-subjects với phân nhóm ngẫu nhiên.

5.2. Nhóm can thiệp sử dụng phiên bản hệ thống nào?

Nhóm TeachYou dùng Reflect–Respond, Mode-shifting và Teaching
Helper.

5.3. Nhóm đối chứng sử dụng phiên bản hệ thống nào?

Nhóm Baseline dùng TeachYou không có Mode-shifting và Teaching
Helper. Nhóm này vẫn dùng Reflect–Respond và cùng seed knowledge
state với nhóm can thiệp. Đây không phải AlgoBo-Basic ở formative
study.

5.4. Hai nhóm khác nhau ở chính xác những thành phần nào?

Nhóm TeachYou có thêm Mode-shifting và Teaching Helper. Paper không
tạo hai condition riêng để ước lượng độc lập tác động của từng thành
phần.

5.5. Mỗi phiên kéo dài bao lâu và người tham gia phải làm gì?

Người tham gia hoàn thành study online trong trung bình `60 ± 25`
phút. Table 7 phân bổ tối đa 40 phút cho hoạt động dạy AlgoBo; các
bước còn lại gồm học tìm kiếm nhị phân, làm Parsons problem, khảo
sát trước nhiệm vụ, đọc hướng dẫn LBT và làm các bảng hỏi sau nhiệm
vụ. Trong phần dạy, họ lần lượt kiểm tra hiểu biết của AlgoBo, giúp
nó giải bài tập và thảo luận sâu hơn.

## 6. Cách đo kết quả

6.1. Paper đo những biến nào?

- Technical evaluation: reconfigurability, persistence và
  adaptability của Reflect–Respond.
- User study: mật độ từng loại tin nhắn và knowledge-building trong
  hội thoại; cognitive load; self-perceived metacognition;
  satisfaction và nhận thức về AlgoBo; số lượt tin nhắn và phản hồi
  định tính.

6.2. Knowledge-building message được định nghĩa như thế nào?

Ba loại được tính là knowledge-building:
Prompting-Thought-provoking, Statement-Elaboration và
Statement-Sense-making. Mật độ là số lần xuất hiện loại tin nhắn
chia cho tổng số tin nhắn trao đổi trong dialogue.

6.3. Các lượt hội thoại được mã hóa bằng quy trình nào?

Taxonomy gồm ba nhóm chính: Instruction, Prompting và Statement.
Trong formative study, ba tác giả thực hiện ba vòng gán nhãn và đạt
Krippendorff's alpha `0.731` ở vòng cuối với 253 tin nhắn. Trong
user study, hai tác giả thực hiện ba vòng và đạt alpha `0.743` ở
vòng cuối với 400 tin nhắn.

6.4. Paper có đo learning gain hoặc code correctness không?

Không đo learning gain trực tiếp bằng pre-test/post-test. Việc code
của AlgoBo vượt test case là điều kiện để người tham gia có thể kết
thúc phần LBT, nhưng paper không báo code correctness như một
learning outcome so sánh giữa hai nhóm.

6.5. Biến nào là process outcome và biến nào là learning outcome?

Mật độ knowledge-building là process outcome. Paper chỉ dùng các chỉ
báo gián tiếp và tự báo cáo về việc học; không có learning outcome
trực tiếp.

## 7. Kết quả chính

7.1. Kết quả quan trọng nhất là gì?

Trong problem-solving phase, mật độ knowledge-building của TeachYou
cao hơn Baseline: `8.4 ± 7.1%` so với `3.5 ± 6.6%`. Paper không tìm
thấy khác biệt có ý nghĩa tương ứng trong discussion phase.

7.2. Cohen's `d = 0.71` được tính cho biến nào?

Mức chênh lệch mật độ knowledge-building giữa hai condition trong
problem-solving phase, không phải learning gain.

7.3. Kết quả nào có ý nghĩa thống kê?

Mật độ knowledge-building trong problem-solving phase khác biệt với
kiểm định t hai phía, `p = 0.03`, `d = 0.71`. TeachYou còn được đánh
giá cao hơn ở câu hỏi tự báo cáo về ích lợi của AlgoBo trong khám
phá kiến thức mới (`p < 0.01`, `d = 1.00`) và mức AlgoBo được nhìn
nhận như một người học đang gặp khó khăn (`p = 0.01`, `d = 0.93`).
Không có khác biệt có ý nghĩa ở các thang metacognition hoặc
cognitive load.

7.4. Bảng hoặc hình nào chứa bằng chứng cần trích lại?

- Table 8: mật độ từng loại tin nhắn theo condition và phase.
- Table 9: ví dụ hội thoại co-building knowledge.
- Table 10: kết quả metacognition.
- Table 11: perception, perceived usefulness và familiarity.

7.5. Paper có báo confidence interval không?

Không thấy confidence interval cho các so sánh chính; paper báo
mean, standard deviation, `p`-value và Cohen's `d`.

## 8. Hạn chế

8.1. Cỡ mẫu tạo ra hạn chế gì?

`Suy luận`: 40 người, mỗi condition 20 người, hạn chế độ chính xác
và khả năng khái quát. Tác giả ghi nhận phương sai giữa người tham
gia cao và đề xuất triển khai lớp học quy mô lớn hơn, theo dõi dài
hạn.

8.2. Việc thay đổi đồng thời Mode-shifting và Teaching Helper gây
khó khăn gì khi diễn giải?

Không thể quy toàn bộ chênh lệch nhân quả cho riêng Mode-shifting
hoặc Teaching Helper. Paper không có condition tách riêng vì tác giả
giả định tương tác giữa hai thành phần không đáng kể; bình luận của
người tham gia chỉ là bằng chứng định tính rằng Mode-shifting đóng
góp nhiều.

8.3. Paper có chứng minh được việc hỏi ngược làm tăng learning gain
không?

Không. Paper không dùng pre-test/post-test và chỉ đo learning gain
gián tiếp. Tác giả nêu đây là một limitation và đề xuất nghiên cứu
sau kiểm tra mối liên hệ giữa dialogue quality và learning gain trực
tiếp.

8.4. Kết quả có thể áp dụng cho sinh viên Việt Nam học bằng tiếng
Việt đến mức nào?

`Suy luận`: Chưa thể kết luận. User study dùng toàn bộ hướng dẫn và
tài liệu bằng tiếng Hàn, chỉ kiểm tra tìm kiếm nhị phân và
procedural knowledge trong lập trình. Paper không đánh giá hội thoại
tiếng Việt hoặc bối cảnh sinh viên Việt Nam.

8.5. Tác giả tự nêu những hạn chế nào khác?

- Phạm vi chỉ gồm algorithm learning và procedural knowledge; prompt
  và classifier được tối ưu cho lập trình và hội thoại tìm kiếm nhị
  phân.
- Learning gain chỉ được đo gián tiếp, không có pre-test/post-test.
- Cần triển khai trong lớp học lớn hơn và theo dõi dài hạn vì kết
  quả giữa người tham gia có phương sai cao.

## 9. Liên quan đến nghiên cứu hiện tại

9.1. Thành phần nào của AlgoBo có thể dùng lại?

- Reflect–Respond và knowledge state để giới hạn tri thức thể hiện
  của AI học trò.
- Chính sách hỏi chủ động tương tự Mode-shifting.
- Taxonomy hội thoại để xây dựng rubric knowledge-building.

9.2. Thành phần nào không nên dùng nguyên bản?

Không nên mặc định dùng Teaching Helper khóa nút gửi. Paper ghi nhận
gợi ý có lúc lặp lại, không liên quan ngữ cảnh hoặc khó áp dụng.
Thành phần này sẽ tạo thêm một biến can thiệp ngoài vòng đối thoại
giữa learner và AI. Vì vậy, pilot đầu tiên không dùng Teaching Helper.

9.3. Paper hỗ trợ lựa chọn primary outcome nào?

Paper hỗ trợ dùng transcript-coded knowledge-building density như
một process outcome. Nghiên cứu hiện tại cần định nghĩa denominator
rõ và vẫn đo learning gain riêng thay vì coi dialogue quality là
learning outcome.

9.4. Khoảng trống nào paper chưa giải quyết?

- AI có khép được vòng tương tác từ lời dạy, phản hồi ngược, learner
  uptake đến lần cập nhật state tiếp theo hay không.
- Mối liên hệ giữa knowledge-building trong hội thoại và learning
  gain trực tiếp.
- Tính khả dụng của LLM teachable agent cho sinh viên Việt Nam dạy
  bằng tiếng Việt.
- Fidelity khi knowledge state tiếp nhận lời dạy sai hoặc khi AI suy
  ra kiến thức ngoài state.

9.5. Paper này ảnh hưởng đến thiết kế pilot thế nào?

Pilot đầu tiên nên dùng một policy đối thoại ổn định và theo dõi toàn
bộ vòng: learner dạy, AI cập nhật state, AI phản hồi một điểm chưa rõ,
learner trả lời và state được cập nhật lại. Sau khi chứng minh vòng này
chạy đúng và người học thực sự tiếp tục tương tác, nghiên cứu mới chọn
comparator. Khi đó có thể so sánh one-way với reciprocal để kiểm tra
giá trị của việc khép vòng, hoặc Fixed với State-aware để kiểm tra cách
chọn target bên trong một vòng đã ổn định.

## 10. Tóm tắt sau khi đọc

10.1. Population: 40 algorithm novices, 20 người mỗi condition.

10.2. Intervention: TeachYou với Reflect–Respond, Mode-shifting và
Teaching Helper.

10.3. Comparator: TeachYou với cùng Reflect–Respond và seed
knowledge state nhưng không có Mode-shifting và Teaching Helper.

10.4. Primary process outcome: Mật độ knowledge-building messages
trong dialogue, được phân tích riêng cho problem-solving và
discussion phase.

10.5. Main evidence: Ở problem-solving phase, TeachYou đạt
`8.4 ± 7.1%`, Baseline đạt `3.5 ± 6.6%`; `p = 0.03`, `d = 0.71`.

10.6. Limitation: Hai thành phần cùng thay đổi; không đo learning
gain trực tiếp; phạm vi hẹp và cỡ mẫu nhỏ.

10.7. Điều paper hỗ trợ cho nghiên cứu hiện tại: Thiết kế knowledge
state, cơ chế phản hồi chủ động và taxonomy đánh giá chất lượng hội
thoại trong một vòng tương tác hai chiều.

10.8. Điều còn chưa chắc: AI có khép vòng đúng theo state hay không,
learner có tiếp tục làm rõ reasoning hay không, learning gain trực tiếp
và khả năng chuyển sang bối cảnh tiếng Việt.

## 11. Tự kiểm tra

- [x] Tôi giải thích được Reflect–Respond hoạt động như thế nào.
- [x] Tôi giải thích được Mode-shifting thay đổi hành vi AI ra sao.
- [x] Tôi nêu đúng điểm khác nhau giữa hai nhóm.
- [x] Tôi ghi đúng rằng `d = 0.71` đo mật độ knowledge-building
  trong problem-solving phase.
- [x] Tôi không gọi `d = 0.71` là learning gain.
- [x] Tôi ghi rõ confound do Mode-shifting và Teaching Helper cùng
  thay đổi.
- [x] Tôi đã đối chiếu số liệu được sử dụng với paper gốc.
