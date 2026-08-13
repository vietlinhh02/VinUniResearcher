# Quyết định nghiên cứu: khép kín vòng tương tác với AI apprentice

## Vấn đề cần giải quyết

Một sinh viên có thể hoàn thành lab bằng starter code, hướng dẫn từng bước
hoặc code do AI sinh. Bài nộp pass test không cho biết sinh viên có giải thích
được lý do đằng sau giải pháp hay không.

Mentee tạo một phiên teach-back sau lab. Learner dạy một AI apprentice. Nhưng
lời dạy đi từ learner sang AI mới là nửa đầu của hoạt động. Sau khi cập nhật
knowledge state, AI phải tương tác trở lại để learner làm rõ, sửa hoặc bổ sung.
Câu trả lời mới của learner lại làm state thay đổi. Khi đó hệ thống mới có một
loop đầy đủ.

## Ý thầy được chuyển thành flow nào?

```text
1. Learner giải thích
2. AI cập nhật knowledge state
3. AI nhận ra phần thiếu, mơ hồ hoặc mâu thuẫn
4. AI chọn một reciprocal response phù hợp
5. Learner trả lời, sửa hoặc bổ sung
6. AI cập nhật knowledge state mới
7. Loop tiếp tục trong timebox
```

`Reciprocal response` không chỉ là câu hỏi. AI có thể:

- phản ánh lại cách nó đang hiểu để learner xác nhận;
- hỏi làm rõ một claim mơ hồ;
- yêu cầu learner giải thích `why/how`;
- chỉ ra hai claim đang mâu thuẫn mà không tự chọn đáp án;
- yêu cầu một ví dụ, connection hoặc edge case.

AI không chấm learner và không tự sửa lời dạy bằng kiến thức nền.

## Phần kế thừa từ AlgoBo/TeachYou

Team giữ external knowledge state, apprentice persona, Reflect–Respond và
active questioning. Nhưng Mentee không mặc định sao chép chu kỳ hỏi sau mỗi ba
lượt. Đó là một heuristic của AlgoBo.

Mentee cần biết state đã thay đổi ra sao, vấn đề nào đang mở và phản hồi ngược
nào phù hợp. Question selection là một bước trong pipeline này. Nó không còn
được dùng làm tên cho toàn bộ contribution.

Teaching Helper cũng chưa nằm trong phiên đầu tiên. Thêm feedback về cách dạy sẽ
tạo một biến khác ngoài reciprocal interaction.

## Research question hiện tại

> Làm thế nào một AI apprentice sử dụng knowledge state đang thay đổi để tạo ra
> tương tác ngược có căn cứ, giúp learner làm rõ những phần reasoning còn thiếu
> trong một phiên post-lab teach-back?

Các câu hỏi con:

1. Knowledge state có phản ánh đúng điều learner đã dạy không?
2. AI có phát hiện đúng phần cần làm rõ không?
3. Reciprocal response có bám state, đúng vai học trò và không gợi đáp án không?
4. Learner có phản hồi vào đúng target, và phản hồi đó làm state thay đổi ra sao?
5. Loop ảnh hưởng thế nào đến knowledge-building, mental effort và trải nghiệm?

Independent transfer vẫn được đo riêng. Trong feasibility study, nó là outcome mô
tả hoặc exploratory, chưa phải cơ sở để tuyên bố efficacy.

## Study đầu tiên kiểm tra gì?

Study đầu tiên chưa cần so sánh `Fixed` với `State-aware`. Trước hết team phải xác
nhận loop hoạt động:

```text
AI response có target rõ
→ learner phản hồi target đó
→ state có revision mới
→ gap được giải quyết, thay đổi hoặc giữ nguyên có lý do
```

Sau technical evaluation là usability/feasibility pilot. Chỉ khi pipeline đủ
fidelity và learner thực sự tham gia vào vòng phản hồi, team mới freeze một
comparative study.

Hai comparator có thể cân nhắc sau pilot:

- `One-way vs Reciprocal`: kiểm tra giá trị của việc khép kín loop.
- `Fixed vs State-aware`: kiểm tra cách chọn response bên trong một loop đã ổn định.

Đây là hai câu hỏi khác nhau. Docs hiện chưa chốt comparator nào.

## Chưa làm trong study đầu tiên

- Không cho AI chạy lại toàn bộ lab để suy ra learner hiểu hay không.
- Không dùng AI pass, số lượt chat hoặc độ dài câu trả lời làm learning outcome.
- Không xây learner model xuyên nhiều lab.
- Không tự sinh curriculum hoặc reference answer trong live session.
- Không gọi một state “clear 100%” hoặc `mastered`.
- Không tuyên bố hiệu quả giáo dục tổng quát từ feasibility pilot.

AI enactment và comparative policy study có thể đến sau. Hiện tại, công việc cần
hoàn thành là một vòng tương tác hai chiều có thể quan sát và kiểm tra.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Đặt loop trước experiment | Kiểm tra loop rồi mới chọn comparator |
| Vocabulary | Dùng khái niệm bao quát hơn | Reciprocal response thay question-only |
| Inflation | Hạ claim của study đầu | Feasibility trước efficacy |
| Soul | Nêu quyết định dứt khoát | Docs chưa chốt comparator |
