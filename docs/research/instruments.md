# Instruments cho pilot

Các câu hỏi dưới đây là bản nháp. Cần hai giảng viên thuật toán rà soát, pilot độ khó và kiểm tra
ceiling/floor effect trước khi dùng.

## 1. Screening tối thiểu

- Bạn đã học lập trình trong bao lâu?
- Bạn tự đánh giá mức hiểu Binary Search từ 1–5?
- Bạn tự đánh giá mức hiểu Selection Sort từ 1–5?
- Bạn có đồng ý để lưu transcript đã giả danh cho mục đích nghiên cứu không?

Không thu tên, email hoặc mã sinh viên trong cùng dataset với transcript.

## 2. Blueprint pre/post-test

Mỗi topic cần hai form tương đương, đổi form theo thứ tự. Không lặp nguyên câu giữa pre và post.

| Construct | Số câu | Dạng | Điểm |
|---|---:|---|---:|
| Preconditions/invariant | 1 | giải thích ngắn | 0–2 |
| Trace execution | 1 | bảng trạng thái | 0–2 |
| Boundary/edge case | 1 | dự đoán và giải thích | 0–2 |
| Complexity | 1 | chọn + giải thích | 0–2 |
| Near transfer | 1 | sửa thuật toán/pseudocode | 0–3 |

Ví dụ Binary Search, không dùng đồng thời ở pre và post:

- Vì sao dữ liệu phải được sắp xếp? Trả lời phải nối tính có thứ tự với việc loại bỏ một nửa.
- Với mảng rỗng hoặc một phần tử, điều kiện dừng nào tránh truy cập sai?
- Khi `a[mid] < target`, tại sao có thể bỏ nửa trái?
- Viết invariant của đoạn tìm kiếm còn lại.

Ví dụ Selection Sort:

- Sau vòng lặp ngoài thứ `i`, phần nào của mảng đã có tính chất gì?
- Vì sao chỉ cần một lần swap ở cuối mỗi vòng ngoài?
- Thuật toán thay đổi thế nào với mảng rỗng, một phần tử hoặc nhiều phần tử bằng nhau?
- So sánh số phép so sánh trong best và worst case.

## 3. Transcript coding rubric

Đơn vị chấm là một tutor utterance có nội dung học thuật. Một utterance chỉ nhận một nhãn cao nhất.

| Nhãn | Định nghĩa hành vi | Ví dụ rút gọn |
|---|---|---|
| KT-COMPREHENSION | Nhắc lại định nghĩa hoặc bước đã học | “Binary Search lấy phần tử giữa.” |
| KT-HINT | Bảo AI sửa/thử một bước nhưng không giải thích | “Giờ tăng low lên.” |
| KB-ELABORATION | Thêm lý do, ví dụ hoặc điều kiện | “Tăng low vì mọi vị trí bên trái đều nhỏ hơn target.” |
| KB-SENSEMAKING | Tự sửa lỗi, tạo kết nối hoặc suy ra hệ quả | “Nếu dùng low = mid thì có thể lặp vô hạn, nên phải mid + 1.” |
| OFF-TASK | Không liên quan nội dung học | “Hôm nay mệt quá.” |

Quy tắc ưu tiên: nếu một utterance vừa nhắc lại vừa có suy luận mới, chọn KB-SENSEMAKING; nếu có
lý do mới nhưng không tự sửa/kết nối, chọn KB-ELABORATION.

Rater training:

1. Cùng chấm 20 utterances ngoài dataset chính.
2. Thảo luận bất đồng và cập nhật manual trước khi đóng băng.
3. Chấm độc lập transcript đã ẩn condition.
4. Tính Krippendorff's alpha và giữ nhãn gốc của cả hai rater.
5. Adjudication tạo nhãn cuối nhưng không thay thế báo cáo reliability.

## 4. Post-condition survey

Thang 1 “hoàn toàn không đồng ý” đến 7 “hoàn toàn đồng ý”:

- Việc giải thích giúp tôi nhận ra phần mình chưa hiểu.
- Phản hồi của AI bám sát điều tôi vừa giảng.
- Tôi phải suy nghĩ lại trước khi trả lời AI.
- AI đã vô tình đưa cho tôi đáp án.
- Tôi cảm thấy khó chịu vì AI hỏi quá nhiều.
- Tôi muốn dùng cách học này cho một thuật toán khác.

Mental effort: “Bạn đã phải đầu tư bao nhiêu nỗ lực tinh thần?” từ 1 rất thấp đến 9 rất cao.

## 5. Interview prompts

- Lúc nào câu hỏi của AI khiến bạn thay đổi cách giải thích?
- Có lúc nào AI tỏ ra biết nhiều hơn vai học trò không?
- Câu hỏi nào hữu ích và câu hỏi nào chỉ làm gián đoạn?
- Bạn cần thêm thông tin hoặc cấu trúc gì để biết nên dạy tiếp phần nào?

## 6. Transcript schema

```json
{
  "schemaVersion": 1,
  "participantId": "P001",
  "sequence": "S1",
  "condition": "active",
  "topic": "binary-search",
  "startedAt": "ISO-8601",
  "endedAt": "ISO-8601",
  "messages": [
    {
      "turn": 1,
      "role": "tutor",
      "text": "...",
      "timestamp": "ISO-8601"
    }
  ]
}
```

Không thêm tên, email, mã sinh viên hoặc nội dung clipboard tự động vào schema.
