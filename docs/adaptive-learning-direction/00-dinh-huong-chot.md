# Quyết định nghiên cứu: tập trung vào câu hỏi tiếp theo của AI apprentice

## Vấn đề cần giải quyết

Một sinh viên có thể hoàn thành lab bằng starter code, hướng dẫn từng bước
hoặc code do AI sinh. Bài nộp pass test không cho biết sinh viên có hiểu lý do đằng
sau giải pháp hay không.

Mentee tạo một phiên teach-back sau lab. Sinh viên đóng vai người dạy, còn AI là
một học viên mới. Câu hỏi nghiên cứu không phải là AI có giải lại được
bài lab hay không. Điều team cần hiểu là AI nên hỏi gì sau mỗi lời giải thích
để làm lộ ra phần reasoning còn thiếu.

Đây là bài toán đủ rộng để nghiên cứu ngoài một course cụ thể: duy trì một
mô hình kiến thức có thể kiểm tra, phát hiện mục tiêu hội thoại chưa được
làm rõ và chọn câu hỏi tiếp theo mà không biến AI thành tutor đưa đáp án.

## Phần kế thừa từ AlgoBo/TeachYou

Team giữ lại:

- AI luôn ở vai học trò;
- knowledge state được lưu ngoài LLM;
- phản hồi chỉ dựa trên lời learner đã dạy;
- AI có thể hỏi `why`, `how`, yêu cầu ví dụ hoặc đưa edge case;
- transcript được dùng để đo knowledge-building.

Team không sao chép nguyên bản chu kỳ hỏi sau mỗi ba lượt. Đó là một heuristic
của AlgoBo. Mentee nghiên cứu cách chọn mục tiêu và loại câu hỏi từ knowledge
state hiện tại.

Teaching Helper cũng chưa nằm trong intervention đầu tiên. Nếu vừa thay question policy
vừa thêm feedback về cách dạy, kết quả sẽ không cho biết thành phần nào tạo
ra khác biệt.

## Flow chốt

```text
1. Learner hoàn thành toàn bộ lab
2. Lab gửi objective và completion summary tối thiểu
3. Learner giải thích một skill hẹp cho AI apprentice
4. State updater trích xuất claim và đoạn nguồn
5. Learner xác nhận hoặc sửa cách hệ thống hiểu lời mình
6. Gap detector tìm phần thiếu, mơ hồ, thiếu lý do hoặc mâu thuẫn
7. Question selector chọn một target và một strategy
8. AI hỏi đúng một câu, không gợi đáp án
9. Learner trả lời; knowledge state được cập nhật
10. Vòng lặp dừng khi hết question budget hoặc không còn target theo rubric
11. Learner làm independent transfer khi AI và hint bị khóa
```

“Không còn target” chỉ có nghĩa rubric của phiên chưa tìm thấy điểm cần hỏi
tiếp. Nó không có nghĩa learner đã hiểu 100% hoặc đã mastery.

## Research question

> Trong một phiên post-lab Learning-by-Teaching, câu hỏi được chọn từ knowledge
> state hiện tại có khơi gợi nhiều knowledge-building hơn câu hỏi chọn theo policy
> cố định hay không?

Các câu hỏi phụ:

1. State updater và gap detector khớp với annotation của chuyên gia đến đâu?
2. Câu hỏi được tạo có bám đúng claim và đúng reasoning gap không?
3. State-aware questioning ảnh hưởng thế nào đến cognitive load và trải nghiệm?
4. Independent transfer có thay đổi không? Đây là outcome exploratory trong pilot.

## So sánh trong study đầu tiên

Hai condition dùng cùng model, persona, giao diện, tài liệu, thời lượng, knowledge state
format và số cơ hội hỏi.

| Condition | Cách chọn câu hỏi |
| --- | --- |
| Fixed policy | Đi theo lesson path và strategy order đã viết trước |
| State-aware policy | Chọn target và strategy từ gap đang có trong knowledge state |

Giữ cùng số cơ hội hỏi giúp team không nhầm tác động của “hỏi nhiều
hơn” với tác động của “chọn câu hỏi tốt hơn”.

## Chưa làm trong study đầu tiên

- Không cho AI chạy lại toàn bộ lab rồi dùng kết quả đó để suy ra hiểu biết.
- Không dùng AI pass, số lượt chat hoặc độ dài câu trả lời làm learning outcome.
- Không xây learner model xuyên nhiều lab.
- Không tự sinh curriculum hoặc reference answer trong live session.
- Không tuyên bố hiệu quả giáo dục tổng quát từ feasibility pilot.

AI enactment có thể trở thành một intervention riêng sau khi team kiểm soát được
model capability và xác định được nó trả lời câu hỏi nghiên cứu nào. Hiện
tại nó không nằm trong core loop.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Chốt một cơ chế | Knowledge state → gap → question |
| Vocabulary | Nêu vấn đề cụ thể | “AI nên hỏi gì tiếp theo?” |
| Hedging/Filler | Bỏ các claim rộng chưa có dữ liệu | Không coi AI pass là mastery |
| Rhythm/Style | Thay đổi nhịp câu | “Đó là một heuristic của AlgoBo.” |
