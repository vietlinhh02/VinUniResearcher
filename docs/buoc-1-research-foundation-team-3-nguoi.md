# Bước 1: Research foundation cho team 3 người

Tài liệu này chuyển giai đoạn **Tuần 1: khóa research foundation** trong tài liệu
[`huong-dan-bat-dau-research.md`](huong-dan-bat-dau-research.md)
thành kế hoạch làm việc cụ thể cho team ba người.

## 1. Mục tiêu của bước này

Trong tuần đầu, team cần trả lời được ba câu hỏi:

1. Nghiên cứu đang kiểm tra vấn đề gì?
2. Bằng chứng hiện có cho phép và chưa cho phép kết luận điều gì?
3. Khoảng trống nào đủ hẹp để kiểm tra bằng một pilot 20–40 người?

Câu hỏi trung tâm hiện tại là:

> Khi sinh viên Việt Nam dạy một thuật toán bằng tiếng Việt, AI học trò chủ động
> hỏi ngược có làm cho lời giải thích của họ sâu hơn so với AI học trò chỉ lắng
> nghe hay không?

Trong bước này, team chưa build prototype và chưa tuyển người tham gia. Prototype chỉ bắt đầu
sau khi câu hỏi nghiên cứu, biến can thiệp và cách đo đã được chốt.

## 2. Đầu ra bắt buộc

Cuối tuần, team phải có đủ các đầu ra sau:

- Tám paper ưu tiên đã được đọc kỹ và ghi chú từ paper gốc.
- Hai mươi paper trong
  [`research/evidence-matrix.csv`](research/evidence-matrix.csv) đã được kiểm tra.
- [`research/search-log.md`](research/search-log.md) ghi được database, ngày tìm, query,
  số kết quả và lý do giữ hoặc loại nguồn.
- Một đoạn research gap dài 150–200 từ do team tự viết.
- RQ1–RQ4 và giả thuyết chính H1 đã được chốt.
- Phân biệt chính xác Active và Passive condition.
- Giảng viên đã kiểm tra tính hợp lý của research gap.

Primary outcome hiện được đề xuất là:

```text
knowledge_building_rate
= số lượt KB-ELABORATION hoặc KB-SENSEMAKING
/ tổng số lượt giảng có nội dung học thuật
```

Không dùng số lượt chat, số từ hoặc satisfaction để thay thế learning gain.

## 3. Cách làm việc chung

Mỗi thành viên duy trì research notebook riêng theo mẫu:

```text
Ngày:
Việc đã làm:
Paper đã đọc:
Population:
Intervention:
Comparator:
Outcome:
Bằng chứng chính:
Hạn chế:
Liên quan đến đề tài:
Điều còn chưa chắc:
Quyết định đã đưa ra:
Việc tiếp theo:
```

Mọi kết quả định lượng phải được kiểm tra trong paper gốc. Không lấy số từ blog,
bản tóm tắt, ResearchGate hoặc
[`tong-quan-ai-tutor-toan-dien.md`](tong-quan-ai-tutor-toan-dien.md)
nếu chưa truy được nguồn gốc.

## 4. Phân công ba người

Cả ba người cùng đọc E05 — AlgoBo trước khi chia các paper còn lại. Đây là nghiên cứu gần
nhất với đề tài và là cơ sở để thống nhất biến can thiệp.

- **Người 1 — cơ sở lý thuyết và research gap:** đọc sâu E03 Kobayashi và
  E10 Roscoe & Chi; kiểm tra các dòng E01–E07 trong matrix.
- **Người 2 — bằng chứng trong giáo dục lập trình:** đọc sâu E06 Chen và
  E16 HypoCompass; kiểm tra các dòng E08–E14.
- **Người 3 — nghiên cứu LLM teachable agent gần đây:** đọc sâu E17, E18 và E19;
  kiểm tra E15–E20 và quản lý search log.

Tám paper phải đọc kỹ trước khi chốt proposal là E03, E05, E06, E10, E16, E17,
E18 và E19.
Danh sách và vai trò của từng paper nằm trong
[`research/literature-review.md`](research/literature-review.md).

Phân công matrix nghĩa là người phụ trách phải mở nguồn gốc và kiểm tra từng trường,
không chỉ đọc lại nội dung đang có trong CSV.

## 5. Kế hoạch năm ngày

### Ngày 1: Đọc AlgoBo và đồng bộ cách hiểu

Cả ba người đọc *Teach AI How to Code* theo ba lượt:

1. Abstract, introduction và conclusion.
2. System, method và measures.
3. Results, tables và limitations.

Mỗi người tự trả lời sáu câu sau trước khi họp nhóm:

1. AlgoBo giải quyết vấn đề gì?
2. Reflect–Respond hoạt động thế nào?
3. Mode-shifting thay đổi hành vi AI ra sao?
4. Nhóm can thiệp và nhóm đối chứng khác nhau ở những thành phần nào?
5. Cohen's `d = 0.71` đo biến nào?
6. Hạn chế nào của AlgoBo tạo cơ hội cho nghiên cứu hiện tại?

Cuối ngày, họp 45 phút để thống nhất câu trả lời. Team phải ghi đúng rằng `d = 0.71`
đo mật độ phát biểu knowledge-building, không phải learning gain. AlgoBo cũng thay đổi
đồng thời mode-shifting và Teaching Helper, nên chưa tách riêng tác động của chính sách
hỏi ngược.

### Ngày 2–3: Đọc paper và kiểm tra evidence matrix

Mỗi người đọc các paper ưu tiên được giao, sau đó kiểm tra nhóm dòng của mình trong
matrix. Với mỗi paper, phải trả lời đủ:

- Ai tham gia và cỡ mẫu bao nhiêu?
- Họ học nội dung gì?
- Nghiên cứu dùng thiết kế nào?
- Intervention là gì?
- Comparator là gì?
- Primary outcome thực sự là gì?
- Kết quả chính và effect size hoặc confidence interval là gì?
- Tác giả tự nêu hạn chế gì?
- Paper hỗ trợ quyết định nào của nghiên cứu hiện tại?

Nếu không truy được full text hoặc không xác nhận được một con số, ghi rõ trạng thái
chưa xác minh. Không suy đoán để điền cho đủ ô.

### Ngày 4: Review chéo

Mỗi người kiểm tra lại hai paper quan trọng của thành viên khác:

- Người 1 review E06 và E16.
- Người 2 review E17 và E18.
- Người 3 review E03 và E10.

Review chéo tập trung vào ba lỗi thường gặp:

1. Nhầm process outcome với learning outcome.
2. Biến association thành kết luận nhân quả.
3. Bỏ qua việc intervention thay đổi nhiều thành phần cùng lúc.

Mọi bất đồng phải được giải quyết bằng nội dung paper gốc và ghi lại trong
notebook.

### Ngày 5: Tổng hợp và chốt research foundation

Cả team cùng hoàn thành:

1. Viết research gap 150–200 từ bằng lời của team.
2. Chốt RQ1–RQ4.
3. Chốt H1 là giả thuyết chính; RQ2–RQ4 là exploratory trong pilot.
4. Chốt primary outcome và công thức tính.
5. Mô tả chính xác điểm khác nhau duy nhất giữa Active và Passive.
6. Liệt kê điều còn chưa chắc để hỏi giảng viên.
7. Gửi research gap và research questions cho giảng viên kiểm tra.

Active và Passive phải giữ nguyên giao diện, thời gian, tài liệu, feedback và persona.
Chỉ chính sách hỏi ngược được thay đổi.

## 6. Những phần hiện có nhưng chưa được coi là hoàn tất

Repo đã có 20 dòng trong evidence matrix, nhưng team vẫn phải kiểm tra lại vì:

- E17 chưa có trích xuất đầy đủ method, sample và results từ full text.
- Matrix chưa tách `outcome` thành một cột riêng như hướng dẫn yêu cầu.
- Search log mới ghi các query tổng quát, chưa có log riêng cho từng lần tìm kiếm.
- Một số số liệu trong `tong-quan-ai-tutor-toan-dien.md` chưa truy được về paper
  gốc.
- [`research/instruments.md`](research/instruments.md) vẫn là bản nháp và cần hai
  giảng viên rà content validity ở giai đoạn sau.

Vì vậy, nhiệm vụ tuần này là kiểm chứng và hoàn thiện các artifact hiện có,
không viết lại toàn bộ từ đầu.

## 7. Definition of Done

Research foundation chỉ hoàn thành khi cả team trả lời “có” cho tất cả câu sau:

- [ ] Team mô tả được vấn đề nghiên cứu trong hai câu.
- [ ] Cả ba người phân biệt được AI tutor và AI tutee.
- [ ] Cả ba người giải thích đúng ý nghĩa của `d = 0.71` trong AlgoBo.
- [ ] Tám paper ưu tiên đã được đọc kỹ.
- [ ] Hai mươi paper đã được kiểm tra và điền đủ trong evidence matrix.
- [ ] Outcome và main evidence của mỗi paper được phân biệt rõ.
- [ ] Search log đủ thông tin để người khác lặp lại hướng tìm kiếm.
- [ ] Team chỉ ra được research gap chưa được các paper hiện tại giải quyết.
- [ ] Team có một primary outcome được định nghĩa bằng công thức.
- [ ] Active và Passive condition chỉ khác nhau ở question policy.
- [ ] Team giải thích được vì sao 20–40 người chỉ phù hợp với pilot.
- [ ] Giảng viên đã kiểm tra tính hợp lý của gap.

Nếu còn bất kỳ mục nào chưa đạt, team tiếp tục research foundation và chưa đóng băng
thiết kế để build prototype.

## 8. Việc phải làm ngay hôm nay

1. Tạo research notebook cho từng người.
2. Cả ba người đọc AlgoBo và trả lời sáu câu ở Ngày 1.
3. Kiểm tra dòng E05 trong evidence matrix bằng paper gốc.
4. Họp 45 phút để thống nhất cách hiểu về intervention, outcome và limitation.
5. Chốt người phụ trách từng nhóm paper theo bảng phân công.

Ngày đầu tiên chưa sửa prototype.
