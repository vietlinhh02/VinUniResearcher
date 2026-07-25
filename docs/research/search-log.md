# Search log

Ngày cập nhật: 2026-07-19.

File này ghi lại cách mở rộng corpus cho rapid review. Nó giúp phân biệt giữa “đã tìm thấy” và
“đã đọc đủ để dùng làm bằng chứng”. Đây chưa phải quy trình PRISMA hoặc systematic review.

## Phạm vi

- Population: người học phổ thông hoặc đại học.
- Intervention: learning by teaching, teachable agent hoặc LLM đóng vai học trò.
- Domain ưu tiên: computer science, programming, algorithm; các domain khác được giữ lại nếu
  giúp xác định cơ chế, measurement hoặc thiết kế tương tác.
- Outcome: learning gain, transfer, knowledge-building, effort, engagement và fidelity.
- Loại nguồn: ưu tiên bài peer-reviewed có DOI; preprint chỉ giữ khi chưa có bản xuất bản.

## Chuỗi tìm kiếm

```text
("learning by teaching" OR "teachable agent" OR "AI tutee")
AND (LLM OR "large language model" OR conversational)
AND (programming OR algorithm OR education)
```

```text
("teachable agent" OR "tutor learning")
AND (explanation OR questioning OR "knowledge building" OR feedback)
```

```text
("LLM-based teachable agent" OR "generative AI teachable agent")
AND (computer science OR mathematics OR classroom)
```

## Quy tắc sàng lọc

Giữ bài khi thỏa ít nhất một điều kiện:

1. Kiểm tra trực tiếp teachable agent hoặc learning by teaching.
2. Giúp định nghĩa cơ chế knowledge-building, recursive feedback hoặc protégé effect.
3. Cung cấp thiết kế, instrument hoặc cảnh báo cần thiết cho pilot hiện tại.

Loại hoặc hạ ưu tiên khi:

- AI chỉ đóng vai tutor và không giúp giải thích cơ chế cần nghiên cứu.
- Bài chỉ mô tả kỹ thuật mô phỏng học sinh, không có tương tác người học.
- Bài blog hoặc trang tổng hợp không dẫn được về paper gốc.
- Preprint trùng với bản peer-reviewed; chỉ giữ bản peer-reviewed.
- Outcome chỉ là benchmark của model, không phải hành vi hoặc kết quả của người học.

## Kết quả hiện tại

- 20 bài được đưa vào `evidence-matrix.csv`.
- 19 bài peer-reviewed và 1 preprint mới chưa có bản xuất bản thay thế trong corpus.
- 8 bài thuộc danh sách đọc kỹ trước khi chốt proposal.
- 12 bài dùng để kiểm tra nền tảng lý thuyết, thiết kế, measurement và boundary conditions.

Con số trên là trạng thái của rapid review, không phải số record của một systematic search. Nếu
viết bài để công bố, phải chạy lại tìm kiếm trên ít nhất Scopus/Web of Science, ACM Digital
Library, IEEE Xplore, ERIC và Google Scholar; lưu ngày tìm, query riêng cho từng database, số
record, deduplication và lý do loại full text.

## Chưa được phép trích như bằng chứng định lượng

- `Playing Dumb to Get Smart`: đã xác nhận metadata và DOI, nhưng phải trích xuất đầy đủ method,
  sample và results từ full text trước khi dùng con số.
- Các bài 2026 về agency/authority của generative teachable agents: có liên quan nhưng chưa được
  thêm vào matrix cho tới khi kiểm tra được full text và tránh trùng dataset với ALTER-Math.
- Những con số chỉ xuất hiện trong `tong-quan-ai-tutor-toan-dien.md`: không dùng nếu
  chưa truy được
  paper gốc.

## Đối chiếu eight-paper priority — 25/07/2026

- E03, E05, E06, E10, E16, E18 và E19: truy được paper gốc hoặc bản tác giả định danh rõ;
  ghi chú đọc được lưu cạnh `evidence-matrix.csv`.
- E17: DOI, tác giả, venue, năm và trang được xác nhận từ Crossref/OpenAlex, nhưng PDF ACM trả
  `403` trong môi trường hiện tại. Giữ trạng thái chưa trích xuất method/results; không dùng
  outcome định lượng cho tới khi có full text qua quyền truy cập thư viện hoặc tác giả.
