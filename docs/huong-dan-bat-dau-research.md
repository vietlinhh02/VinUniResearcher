# Hướng dẫn bắt đầu research AI học trò từ số 0

Tài liệu này là điểm bắt đầu duy nhất cho dự án. Nếu chưa từng làm research, hãy đọc và thực hiện
theo thứ tự từ trên xuống. Chưa cần đọc toàn bộ các file khác trong repo.

## 1. Nghiên cứu này đang làm gì?

Ý tưởng chung là đảo vai trò quen thuộc của AI:

- Người học đóng vai giáo viên và giảng một thuật toán cho AI.
- AI đóng vai học trò, chỉ sử dụng những gì vừa được dạy.
- Ở một số thời điểm, AI hỏi lại “tại sao?”, yêu cầu làm rõ hoặc đưa ra edge case.
- Quá trình phải giải thích và trả lời AI có thể giúp người học nhận ra lỗ hổng kiến thức.

Tên hướng nghiên cứu là **Learning by Teaching với LLM-based Teachable Agent**.

### Câu hỏi trung tâm

> Khi sinh viên Việt Nam dạy một thuật toán bằng tiếng Việt, AI học trò chủ động hỏi ngược có
> làm cho lời giải thích của họ sâu hơn so với AI học trò chỉ lắng nghe hay không?

Đây là câu hỏi nên giữ cố định trong giai đoạn đầu. Đừng mở rộng ngay sang nhiều môn học, nhiều
độ tuổi, voice, hình ảnh, knowledge graph hoặc fine-tuning.

## 2. Tại sao hướng này đáng nghiên cứu?

Các nghiên cứu Learning by Teaching trước thời LLM cho thấy việc chuẩn bị để dạy và thực sự dạy
có thể hỗ trợ việc học. Meta-analysis của Kobayashi tổng hợp 28 nghiên cứu và báo cáo hiệu ứng
trung bình tích cực, nhưng mức độ khác nhau lớn giữa các nghiên cứu và corpus không tập trung vào
LLM. Vì vậy không được lấy effect size đó làm kết quả kỳ vọng trực tiếp cho sản phẩm này.

Nguồn: [Kobayashi, 2019](https://doi.org/10.1111/jpr.12221).

AlgoBo là nghiên cứu gần nhất với ý tưởng hiện tại. Trong nghiên cứu 40 người mới học thuật toán,
phiên bản có mode-shifting và Teaching Helper tạo nhiều phát biểu knowledge-building hơn, với
Cohen's `d = 0.71`. Con số này đo chất lượng hội thoại, **không phải learning gain**.

Nguồn: [Jin et al., CHI 2024](https://doi.org/10.1145/3613904.3642349).

Nghiên cứu ChatGPT trong lập trình cho thấy người học có thể đạt điểm kiến thức và độ rõ tốt hơn,
nhưng không cải thiện đáng kể khả năng sửa lỗi code. Điều này có nghĩa là “giải thích hay hơn” và
“lập trình đúng hơn” phải được đo riêng.

Nguồn: [Chen et al., 2026](https://doi.org/10.1111/bjet.70001).

Nghiên cứu của Debbané và cộng sự cũng cho thấy sinh viên gặp rào cản tâm lý và không biết nên
dạy thế nào nếu thiếu hướng dẫn. Vì vậy sản phẩm phải có lesson path tối thiểu và phản hồi bám
đúng lời giảng, không chỉ là một ô chat trống.

Nguồn: [Debbané et al., 2023](https://doi.org/10.1145/3579501).

## 3. Research gap cụ thể

Khoảng trống khả thi cho dự án này là:

> Trong phạm vi rapid review hiện tại, chưa tìm thấy nghiên cứu xác nhận tác động riêng của chính
> sách hỏi ngược của AI học trò lên chất lượng giải thích thuật toán bằng tiếng Việt, khi giao
> diện, tài liệu, thời gian và persona được giữ giống nhau giữa hai điều kiện.

Điểm quan trọng là **tác động riêng của việc hỏi ngược**. Nghiên cứu AlgoBo thay đổi đồng thời
mode-shifting và Teaching Helper, nên khó biết thành phần nào tạo ra hiệu ứng.

Đóng góp phù hợp với 20–40 người tham gia là:

1. Xây dựng protocol và rubric tiếng Việt có thể tái sử dụng.
2. Ước lượng ban đầu ảnh hưởng của active questioning lên độ sâu lời giải thích.
3. Đo answer leakage, persona drift và câu hỏi không bám nội dung.
4. Thu dữ liệu feasibility để tính sample size cho nghiên cứu lớn hơn.

Không tuyên bố rằng một pilot 20–40 người đã “chứng minh AI giúp sinh viên học tốt hơn”.

## 4. Bạn phải bắt đầu từ đâu?

Thứ tự đúng là:

```text
Câu hỏi nghiên cứu
  → đọc paper gốc
  → evidence matrix
  → research gap
  → protocol và measurement
  → prototype
  → usability pilot
  → ethics approval
  → thu dữ liệu
  → phân tích và viết báo cáo
```

Không đảo thứ tự thành “làm app trước rồi tìm xem app chứng minh điều gì”.

### Có làm research và build song song không?

Có, nhưng không chia đều hai việc ngay từ ngày đầu và không đợi research hoàn thành 100% mới
build. Hai phần nối tiếp và phản hồi lẫn nhau theo nhịp sau:

```text
Research nền tảng
  → build prototype tối thiểu
  → chạy usability pilot
  → sửa protocol, instrument và prototype
  → đóng băng thiết kế
  → thu dữ liệu chính
  → phân tích và viết báo cáo
```

Trong tuần đầu, ưu tiên research để chốt câu hỏi, biến can thiệp Active/Passive và cách đo. Sang
tuần thứ hai, bắt đầu build prototype trong khi tiếp tục hoàn thiện learning sheet, test, rubric
và protocol. Kết quả chạy thử ở tuần thứ ba được dùng để sửa cả prototype lẫn thiết kế nghiên
cứu.

Prototype chỉ cần phục vụ đúng thí nghiệm, không cần trở thành sản phẩm hoàn chỉnh. Không build
thêm voice, hình ảnh, knowledge graph, fine-tuning hoặc dashboard nếu các phần đó không phục vụ
trực tiếp cho protocol. Sau khi bắt đầu thu dữ liệu chính, không sửa prompt, flow hoặc cách đo
giữa chừng.

## 5. Việc phải làm ngay hôm nay

### Bước 1: Tạo research notebook

Dùng một file hoặc sổ riêng. Mỗi ngày ghi:

```text
Ngày:
Việc đã làm:
Paper đã đọc:
Bằng chứng quan trọng:
Điều còn chưa chắc:
Quyết định đã đưa ra:
Việc tiếp theo:
```

Không ghi kiểu “paper này nói AI tốt”. Phải ghi đúng population, intervention, comparator,
outcome và limitation.

### Bước 2: Đọc paper AlgoBo trước

Đọc [Teach AI How to Code](https://doi.org/10.1145/3613904.3642349) theo ba lượt:

Dùng [mẫu ghi chú paper AlgoBo](research/ghi-chu-paper-algobo.md) để ghi lại bằng
chứng trong lúc đọc.

1. Abstract, introduction và conclusion để hiểu câu hỏi chung.
2. System, method và measures để hiểu họ thực sự làm gì.
3. Results, tables và limitations để biết họ đã chứng minh được điều gì.

Sau khi đọc, phải trả lời được:

- AlgoBo cố giải quyết vấn đề gì?
- Reflect-Respond hoạt động thế nào?
- Mode-shifting thay đổi hành vi AI ra sao?
- Nhóm đối chứng khác nhóm can thiệp ở những thành phần nào?
- `d = 0.71` đo biến nào?
- Điểm yếu nào tạo cơ hội cho nghiên cứu của mình?

### Bước 3: Đọc tám nguồn ưu tiên

Không cần đọc sâu cả 20 bài cùng lúc. Sau AlgoBo, đọc bảy bài sau theo thứ tự:

1. [Roscoe & Chi: Knowledge-building và knowledge-telling (PDF full text)][roscoe-chi-pdf].
2. [Learning by Preparing-to-Teach and Teaching](https://doi.org/10.1111/jpr.12221).
3. [Learning by teaching with ChatGPT](https://doi.org/10.1111/bjet.70001).
4. [HypoCompass cho debugging](https://doi.org/10.1007/978-3-031-64302-6_19).
5. [Playing Dumb to Get Smart](https://doi.org/10.1145/3706598.3713644).
6. [Engagement patterns với AI teachable agent](https://doi.org/10.1038/s41598-025-24841-8).
7. [Beyond prior knowledge](https://doi.org/10.1007/s41237-026-00294-9).

Tám bài này gồm AlgoBo và bảy bài trên. Chúng trả lời bốn việc cần thiết: cơ chế lý thuyết,
bằng chứng tổng hợp, nghiên cứu gần nhất trong lập trình và cách đo quality của tương tác.

Sau đó mới đọc 12 bài bổ trợ trong `research/evidence-matrix.csv`. Nhóm bổ trợ dùng để thiết kế
feedback, persona, scaffold, platform và nhận diện giới hạn; không cần đọc theo thứ tự năm xuất
bản.

Không cần hiểu toàn bộ thống kê ở lần đọc đầu. Trước hết cần biết:

- Ai tham gia?
- Họ học nội dung gì?
- Can thiệp kéo dài bao lâu?
- Nhóm hoặc điều kiện được so sánh là gì?
- Primary outcome là gì?
- Kết quả nào có ý nghĩa, kết quả nào không?
- Tác giả tự nhận hạn chế gì?

### Bước 4: Điền evidence matrix

Mở [research/evidence-matrix.csv](research/evidence-matrix.csv). Với mỗi paper mới, thêm một dòng
gồm:

| Trường | Câu hỏi cần trả lời |
|---|---|
| Population | Ai tham gia và bao nhiêu người? |
| Domain | Toán, lập trình hay nội dung khác? |
| Design | Between-subject, within-subject hay qualitative? |
| Intervention | AI hoặc hoạt động đã làm gì? |
| Comparator | So sánh với điều kiện nào? |
| Outcome | Họ đo chính xác biến nào? |
| Main evidence | Effect size, CI hoặc kết quả định tính nào? |
| Limitation | Điều gì chưa thể kết luận? |
| Relevance | Paper giúp nghiên cứu hiện tại ở điểm nào? |

Không trích số từ blog, ResearchGate summary hoặc tài liệu tổng hợp nếu chưa mở paper gốc.

### Bước 5: Ghi search log

Mở [research/search-log.md](research/search-log.md). Mỗi lần tìm thêm paper, ghi database, ngày,
query, số kết quả và lý do giữ hoặc loại. Nếu một preprint đã có bản conference/journal, giữ bản
peer-reviewed và đánh dấu preprint là duplicate. Đây là cách tránh danh sách paper dài nhưng
không thể giải thích vì sao chúng xuất hiện.

## 6. Câu hỏi nghiên cứu và giả thuyết

### Research questions

- RQ1: Active tutee có làm tăng tỷ lệ knowledge-building so với passive tutee không?
- RQ2: Active tutee có tạo learning gain lớn hơn không?
- RQ3: Active tutee ảnh hưởng thế nào đến mental effort, frustration và trải nghiệm?
- RQ4: AI giữ vai học trò tốt đến đâu trong mỗi điều kiện?

### Giả thuyết chính

> H1: Tỷ lệ knowledge-building utterances trong active condition cao hơn passive condition.

Chỉ H1 là giả thuyết chính. RQ2–RQ4 nên được gọi là exploratory trong pilot.

## 7. Sản phẩm sẽ so sánh điều gì?

Hai phiên bản dùng cùng giao diện, thời gian, tài liệu và persona. Chỉ thay đổi chính sách hỏi.

### Passive tutee

- Phản ánh ngắn điều vừa được dạy.
- Yêu cầu người học tiếp tục.
- Chỉ hỏi làm rõ nếu câu quá ngắn hoặc không thể hiểu thành một claim.
- Không tự hỏi “tại sao?”, edge case hoặc phản ví dụ.

### Active tutee

- Có toàn bộ hành vi của passive tutee.
- Sau mỗi 2–3 lượt, đặt đúng một câu hỏi làm rõ, đào sâu, kết nối hoặc edge case.
- Câu hỏi phải nhắc tới claim cụ thể vừa được người học dạy.
- Không tự cung cấp đáp án hoặc code hoàn chỉnh.

Nếu thay cả prompt, giao diện, persona, tài liệu và feedback cùng lúc thì không thể biết yếu tố nào
tạo ra khác biệt.

## 8. Thiết kế nghiên cứu với 20–40 người

Không chia 20 người thành nhóm 10–10 rồi kết luận hiệu quả. Dùng within-subject counterbalanced:

| Sequence | Phiên 1 | Phiên 2 |
|---|---|---|
| S1 | Binary Search — Active | Selection Sort — Passive |
| S2 | Binary Search — Passive | Selection Sort — Active |
| S3 | Selection Sort — Active | Binary Search — Passive |
| S4 | Selection Sort — Passive | Binary Search — Active |

Mỗi người trải nghiệm cả hai condition nhưng trên hai topic khác nhau. Phân gần đều bốn sequence
để giảm ảnh hưởng của topic và thứ tự.

Một buổi nghiên cứu dự kiến:

1. Consent và participant ID: 5 phút.
2. Pre-test hai topic: 10 phút.
3. Đọc learning sheet topic 1: 8 phút.
4. Dạy AI topic 1: 12 phút.
5. Post-test và survey: 8 phút.
6. Nghỉ 3 phút.
7. Lặp lại với topic 2: 20 phút.
8. Survey so sánh và phỏng vấn: 5–10 phút.

Tổng thời gian khoảng 60–70 phút/người.

## 9. Đo cái gì?

### Primary outcome

```text
knowledge_building_rate
= số lượt ELABORATION hoặc SENSEMAKING
/ tổng số lượt giảng có nội dung học thuật
```

Hai người chấm độc lập transcript đã ẩn condition. Các nhãn chính:

- KT-COMPREHENSION: nhắc lại kiến thức.
- KT-HINT: bảo AI thực hiện một bước nhưng không giải thích.
- KB-ELABORATION: thêm lý do, ví dụ hoặc điều kiện.
- KB-SENSEMAKING: tự sửa lỗi, tạo kết nối hoặc suy ra hệ quả.
- OFF-TASK: không liên quan bài học.

Rubric đầy đủ nằm tại [research/instruments.md](research/instruments.md).

### Secondary outcomes

- Điểm post-test trừ pre-test.
- Near-transfer correctness.
- Mental effort 1–9.
- Frustration, perceived learning và willingness to reuse.
- Số lượt và số từ chỉ được xem là engagement proxy, không phải learning gain.

### Fidelity outcomes

- Answer leakage: AI đưa đáp án chưa được dạy.
- Persona drift: AI chuyển sang vai giáo viên.
- Ungrounded question: câu hỏi không bám claim.
- Repetition: hỏi lại cùng ý dù đã nhận câu trả lời.

## 10. Lộ trình 2–4 tuần

Lộ trình này kết hợp research và build theo từng giai đoạn. Tỷ trọng công việc chuyển dần từ
research nền tảng sang prototype, pilot và thu dữ liệu; không phải hai luồng độc lập chạy ngang
nhau từ đầu đến cuối.

### Tuần 1: khóa research foundation

- Đọc kỹ tám paper ưu tiên, khoảng hai paper mỗi ngày.
- Sàng lọc và điền đủ 20 paper trong evidence matrix.
- Cập nhật search log, gồm cả nguồn bị loại và duplicate.
- Viết lại research gap bằng lời của mình.
- Chốt RQ1–RQ4 và H1.
- Nhờ giảng viên kiểm tra xem gap có hợp lý không.

Đầu ra tuần 1: literature review, evidence matrix và câu hỏi nghiên cứu đã chốt.

### Tuần 2: khóa instrument và prototype

- Bắt đầu build prototype tối thiểu cho hai condition Active và Passive.
- Soạn hai learning sheets tương đương.
- Soạn pre/post-test cho Binary Search và Selection Sort.
- Nhờ hai giảng viên rà content validity.
- Chạy prototype đủ bốn sequence.
- Kiểm tra transcript export và prompt fidelity.
- Huấn luyện hai người chấm rubric trên dữ liệu giả.

Đầu ra tuần 2: prototype usable, test/instrument và coding manual.

### Tuần 3: usability pilot và ethics

- Chạy 5–8 người để tìm lỗi quy trình.
- Kiểm tra thời lượng, câu khó/dễ, answer leakage và persona drift.
- Không trộn dữ liệu usability pilot vào dataset chính.
- Hoàn thành consent, data management và ethics/IRB.
- Đóng băng prompt, protocol, exclusion và analysis plan.

Đầu ra tuần 3: protocol preregistration-ready và quyết định go/no-go.

### Tuần 4: bắt đầu study nếu đã đủ điều kiện

- Phân participant ID vào bốn sequence.
- Chạy đúng cùng một quy trình cho mọi người.
- Ghi toàn bộ technical failure và attrition.
- Không xem kết quả condition giữa chừng rồi sửa hypothesis.
- Chỉ phân tích sau khi dataset và exclusion log đã đóng băng.

Nếu chưa có ethics approval hoặc prototype chưa đạt fidelity, tuần 4 tiếp tục sửa hệ thống; không
thu dữ liệu chính thức chỉ để kịp thời hạn.

## 11. Điều kiện trước khi mời người thật

Chỉ bắt đầu thu dữ liệu khi đạt tất cả điều kiện:

- 10/10 phiên thử export JSON hợp lệ.
- Transcript không tự thu tên, email hoặc mã sinh viên.
- Answer leakage dưới 10% agent turns trong fidelity test.
- Hai người chấm đạt Krippendorff's alpha từ 0.67 trong vòng luyện tập.
- Hai giảng viên đã rà pre/post-test.
- Có ethics approval hoặc xác nhận chính thức rằng dự án không cần review.
- Model, version, prompt, temperature và thời điểm chạy đã được ghi lại.

## 12. Những sai lầm cần tránh

1. Đọc summary rồi trích số mà không mở paper gốc.
2. Viết research gap quá rộng như “chưa có AI Tutor tốt cho Việt Nam”.
3. Làm nhiều tính năng trước khi chốt biến can thiệp.
4. Dùng satisfaction hoặc số từ để tuyên bố learning gain.
5. Thay prompt giữa quá trình thu dữ liệu mà không tạo version mới.
6. Chỉ chấm transcript bằng LLM rồi coi đó là ground truth.
7. Loại những người có điểm xấu sau khi đã xem condition.
8. Coi `p > .05` là bằng chứng hai condition tương đương.
9. Gọi pilot 20–40 người là nghiên cứu xác nhận hiệu quả.
10. Thu dữ liệu trước khi giải quyết consent, privacy và ethics.

## 13. Cách sử dụng các file trong repo

Đọc và làm theo thứ tự:

1. File hiện tại: bản đồ công việc từ đầu đến cuối.
2. [research/literature-review.md](research/literature-review.md): bằng chứng đã tổng hợp.
3. [research/evidence-matrix.csv](research/evidence-matrix.csv): nơi ghi paper.
4. [research/protocol.md](research/protocol.md): thiết kế study chi tiết.
5. [research/instruments.md](research/instruments.md): test, rubric và survey.
6. [research/prompt-spec.md](research/prompt-spec.md): active/passive prompt và fidelity test.

File `tong-quan-ai-tutor-toan-dien.md` chỉ nên dùng làm bản đồ thuật ngữ. Không lấy các
bảng số liệu trong đó để viết proposal nếu chưa đối chiếu paper gốc.

## 14. Checklist hoàn thành giai đoạn bắt đầu

Bạn hoàn thành giai đoạn research foundation khi có thể trả lời “có” cho tất cả câu sau:

- Tôi mô tả được vấn đề nghiên cứu trong hai câu.
- Tôi phân biệt được AI tutor và AI tutee.
- Tôi giải thích đúng `d = 0.71` trong paper AlgoBo.
- Tôi đã đọc kỹ ít nhất 8 paper ưu tiên.
- Tôi có 20 paper đã sàng lọc và điền trong evidence matrix.
- Tôi có search log để người khác lặp lại hướng tìm kiếm.
- Tôi chỉ ra được gap mà paper hiện tại chưa giải quyết.
- Tôi có một primary outcome được định nghĩa bằng công thức.
- Tôi biết chính xác active và passive condition khác nhau ở đâu.
- Tôi biết vì sao 20–40 người chỉ phù hợp với pilot.
- Tôi có kế hoạch consent, privacy và ethics.

## 15. Nhiệm vụ đầu tiên

Hôm nay chỉ làm bốn việc:

1. Đọc paper AlgoBo và trả lời sáu câu ở Bước 2.
2. Mở `research/evidence-matrix.csv`, kiểm tra dòng E05 bằng paper gốc.
3. Đọc Roscoe & Chi để tự phân biệt knowledge-telling và knowledge-building bằng hai ví dụ.
4. Viết một đoạn 150–200 từ giải thích research gap bằng lời của bạn, không dùng AI viết hộ.

Sau khi hoàn thành, mỗi ngày đọc tiếp hai bài trong danh sách ưu tiên. Chưa cần sửa prototype
trong ngày đầu tiên.

[roscoe-chi-pdf]: https://education.asu.edu/sites/g/files/litvpz656/files/lcl/rod_chi_rer_07_3.pdf
