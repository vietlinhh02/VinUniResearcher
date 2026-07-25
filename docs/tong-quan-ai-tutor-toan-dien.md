# Học bằng cách Dạy AI: Tổng quan Toàn diện về Mô hình Học sinh Dạy Ngược cho Trí tuệ Nhân tạo

> **Chủ đề trọng tâm:** Người học đóng vai trò giáo viên — dạy kiến thức cho AI — qua đó tự củng cố tri thức, phát hiện lỗ hổng nhận thức, và đạt được hiểu biết sâu sắc. Tài liệu này tổng hợp toàn bộ lý thuyết, phương pháp, kiến trúc, và thực tiễn của mô hình Learning by Teaching (LbT).

---

## Mục lục

1. [Lời mở đầu: Khi AI là Học trò, Con người là Thầy](#1-lời-mở-đầu-khi-ai-là-học-trò-con-người-là-thầy)
2. [Nền tảng Lý thuyết của Học bằng cách Dạy](#2-nền-tảng-lý-thuyết-của-học-bằng-cách-dạy)
3. [Tái định nghĩa Phương pháp Socratic trong Bối cảnh LbT](#3-tái-định-nghĩa-phương-pháp-socratic-trong-bối-cảnh-lbt)
4. [Tự Giải thích — Cơ chế Cốt lõi Khi Dạy AI](#4-tự-giải-thích--cơ-chế-cốt-lõi-khi-dạy-ai)
5. [Các Hệ thống Teachable Agent Tiêu biểu](#5-các-hệ-thống-teachable-agent-tiêu-biểu)
6. [Kiến trúc Kỹ thuật cho Teachable Agent](#6-kiến-trúc-kỹ-thuật-cho-teachable-agent)
7. [Cơ chế Đánh giá và Theo dõi Quá trình Dạy](#7-cơ-chế-đánh-giá-và-theo-dõi-quá-trình-dạy)
8. [Mô phỏng Học trò AI để Kiểm thử Hệ thống](#8-mô-phỏng-học-trò-ai-để-kiểm-thử-hệ-thống)
9. [Thực nghiệm và Kết quả Định lượng](#9-thực-nghiệm-và-kết-quả-định-lượng)
10. [Thách thức và Khoảng trống Nghiên cứu](#10-thách-thức-và-khoảng-trống-nghiên-cứu)
11. [Xu hướng Tương lai](#11-xu-hướng-tương-lai)
12. [Kết luận](#12-kết-luận)
13. [Nguồn trích dẫn](#13-nguồn-trích-dẫn)

---

## 1. Lời mở đầu: Khi AI là Học trò, Con người là Thầy

### 1.1. Cuộc đảo ngược vai trò

Trong phần lớn lịch sử của EdTech, AI luôn được định vị ở vai trò **người dạy**: gia sư AI giải thích kiến thức, chấm điểm bài làm, phát hiện lỗi sai cho học sinh. Các hệ thống Intelligent Tutoring System (ITS) truyền thống — từ ACT-R của John Anderson đến Watson Tutor của IBM — đều vận hành theo mô hình một chiều: máy dạy, người học.

Nhưng điều gì xảy ra nếu ta **đảo ngược** mối quan hệ này? Điều gì xảy ra nếu AI đóng vai một học trò "ngây thơ", và nhiệm vụ của người học là **dạy cho AI hiểu**?

Đây chính là trọng tâm của mô hình **Learning by Teaching (LbT)** — tạm dịch: Học bằng cách Dạy. Trong mô hình này:

- AI không phải là người truyền đạt tri thức, mà là **người tiếp nhận**
- Người học không phải là người thụ động, mà là **giáo viên chủ động**
- Việc học xảy ra **trong quá trình giảng dạy**, thông qua việc cấu trúc hóa, diễn đạt lại, và kiểm chứng kiến thức để truyền cho AI

### 1.2. Tại sao đây là hướng đi đột phá

Ba lý do khiến LbT trở thành hướng nghiên cứu đầy hứa hẹn:

1. **Hiệu ứng Protégé (Protégé Effect) [19]:** Con người nỗ lực nhận thức cao nhất không phải khi học cho bản thân, mà khi **chịu trách nhiệm cho sự hiểu biết của người khác**. Khi học sinh phải dạy AI, họ tự động chuyển sang chế độ tư duy sâu hơn.

2. **Nghịch lý sư phạm của AI:** LLM vốn biết quá nhiều. Nếu AI liên tục sinh ra câu trả lời hoàn hảo, người học mất động lực [22]. Nhưng nếu AI **giả vờ không biết**, nó trở thành một công cụ sư phạm cực mạnh — buộc học sinh phải giải thích, lập luận, và tự kiểm chứng.

3. **Tính khả thi mới của công nghệ:** Trước đây, việc xây dựng Teachable Agent bị giới hạn bởi giao diện đồ họa tĩnh (như Betty's Brain [20]). Với LLM, Teachable Agent có thể **đối thoại tự nhiên**, đặt câu hỏi ngược, và thể hiện sự "học hỏi" một cách thuyết phục.

### 1.3. Phạm vi tài liệu

Tài liệu này tập trung phân tích toàn diện mô hình LbT qua các khía cạnh: nền tảng lý thuyết, cách thức phương pháp Socratic hỗ trợ LbT, kiến trúc kỹ thuật, các hệ thống tiêu biểu, thực nghiệm định lượng, và các hướng nghiên cứu mở. Trọng tâm xuyên suốt là câu hỏi: **Làm thế nào để AI đóng vai học trò một cách hiệu quả nhằm thúc đẩy tối đa quá trình học tập của con người?**

---

## 2. Nền tảng Lý thuyết của Học bằng cách Dạy

### 2.1. Hiệu ứng Protégé và Cơ chế Nhận thức

Hiệu ứng Protégé được quan sát lần đầu trong các nghiên cứu về dạy học đồng đẳng (peer tutoring): những học sinh được giao nhiệm vụ dạy bạn học thể hiện mức độ hiểu sâu hơn đáng kể so với những học sinh chỉ học cho chính mình [19]. Cơ chế nhận thức đằng sau hiệu ứng này bao gồm:

| Cơ chế | Mô tả | Hàm ý cho LbT với AI |
|--------|-------|----------------------|
| **Chuẩn bị giảng dạy** (Teaching Preparation) | Người dạy phải sắp xếp, cấu trúc lại tri thức trước khi truyền đạt | AI yêu cầu học sinh phải lập dàn ý, chọn ví dụ, xác định trình tự logic |
| **Giải thích sinh sản** (Generative Explanation) | Quá trình diễn đạt lại kiến thức bằng ngôn từ của chính người dạy | AI liên tục hỏi "tại sao", "như thế nào" để ép giải thích sâu |
| **Phát hiện lỗ hổng** (Gap Detection) | Khi không thể giải thích một điểm nào đó, người dạy nhận ra lỗ hổng của chính mình | AI chủ động chỉ ra điểm mâu thuẫn hoặc thiếu sót trong bài giảng |
| **Siêu nhận thức** (Metacognition) | Người dạy phải liên tục tự đánh giá: "Mình đã hiểu đúng chưa?", "Giải thích thế đã đủ chưa?" | AI phản hồi bằng cách thể hiện sự "học được" hoặc "vẫn chưa hiểu" |

### 2.2. LbT so với Mô hình AI-làm-Thầy Truyền thống

| Khía cạnh | AI làm Thầy (Truyền thống) | AI làm Trò (LbT) |
|-----------|---------------------------|-------------------|
| **Vai trò AI** | Giải thích, chấm điểm, gợi ý | Lắng nghe, hỏi ngược, thể hiện sự học |
| **Vai trò người học** | Tiếp nhận thụ động | Chủ động giảng dạy |
| **Quá trình nhận thức** | Ghi nhớ, hiểu | Phân tích, tổng hợp, đánh giá (bậc cao Bloom) |
| **Phát hiện lỗ hổng** | AI phát hiện lỗi của học sinh | Học sinh tự phát hiện lỗi của chính mình khi không thể dạy AI |
| **Động lực** | Ngoại sinh (điểm số, đánh giá) | Nội sinh (trách nhiệm với "học trò") |
| **Nguy cơ ảo giác** | AI có thể dạy sai kiến thức | Kiến thức do học sinh cung cấp — AI chỉ hỏi và phản hồi |

### 2.3. Lý thuyết Hỗ trợ

**Vygotsky và Vùng Phát triển Gần nhất (ZPD) [1]:** Trong LbT, AI đóng vai trò scaffold — không phải bằng cách cung cấp câu trả lời, mà bằng cách đặt câu hỏi đúng mức độ, đẩy người dạy vượt qua ranh giới nhận thức hiện tại. AI như một "học trò lý tưởng" — luôn ở rìa của ZPD để kéo giáo viên (người học) tiến lên.

**Bloom's Taxonomy (Phân loại Bloom):** LbT kích hoạt các bậc nhận thức cao nhất trong thang Bloom — Phân tích (Analyze), Đánh giá (Evaluate), và Sáng tạo (Create) — vì người dạy phải phân tích kiến thức thành các đơn vị có thể truyền đạt, đánh giá mức độ hiểu của học trò, và sáng tạo cách giải thích mới.

**Lý thuyết Tự quyết (Self-Determination Theory):** LbT đáp ứng cả ba nhu cầu tâm lý cơ bản: Tự chủ (dạy theo cách của mình), Năng lực (thể hiện sự thành thạo qua việc dạy), và Kết nối (mối quan hệ thầy-trò với AI).

### 2.4. Từ Betty's Brain đến LLM: Lịch sử Tiến hóa

| Giai đoạn | Hệ thống tiêu biểu | Cơ chế dạy | Hạn chế |
|-----------|-------------------|-----------|--------|
| **1990s–2000s** | Betty's Brain (Stanford) | Kéo-thả nút khái niệm, tạo bản đồ tri thức trực quan | Không có NLP; giao diện tĩnh, cứng nhắc |
| **2010s** | SimStudent, APLUS | Dạy qua ví dụ và bài tập được giao diện hóa | Đối thoại hạn chế, cần kịch bản cứng |
| **2020s–nay** | AlgoBo, TeachYou, ALTER-Math, feynman-tutor | Đối thoại tự nhiên, AI hỏi ngược, cập nhật trạng thái học động | Thách thức về kiểm soát kiến thức AI |

---

## 3. Tái định nghĩa Phương pháp Socratic trong Bối cảnh LbT

### 3.1. Socratic không phải để AI dạy — mà để AI hỏi

Trong mô hình LbT, phương pháp Socratic được tái sử dụng với một mục đích hoàn toàn khác: **AI không dùng Socratic để dẫn dắt học sinh đến câu trả lời**, mà dùng nó để **kiểm tra và đào sâu chất lượng bài giảng của học sinh**.

Các kỹ thuật Socratic được AI sử dụng khi đóng vai học trò:

| Kỹ thuật | Vai trò trong AI-làm-Thầy | Vai trò trong AI-làm-Trò (LbT) |
|----------|--------------------------|-------------------------------|
| **Elenchus** (bác bỏ phê phán) | AI chỉ ra lỗi sai của học sinh | AI chỉ ra mâu thuẫn trong bài giảng: "Thầy vừa nói A, nhưng trước đó thầy nói B — con chưa hiểu" |
| **Maieuticus** (khơi gợi) | AI đặt câu hỏi dẫn dắt đến đáp án | AI đặt câu hỏi để học sinh tự phát hiện lỗ hổng: "Nếu như vậy thì trường hợp X sẽ thế nào ạ?" |
| **Aporia** (nghi ngờ xây dựng) | AI tạo tình huống để học sinh suy nghĩ lại | AI thể hiện sự bối rối: "Con vẫn không hiểu tại sao..." — ép học sinh tìm cách giải thích khác |
| **Dialectic** (tổng hợp hợp tác) | AI và học sinh cùng xây dựng kiến thức | AI tổng hợp những gì đã được dạy và yêu cầu xác nhận: "Vậy theo những gì thầy dạy, con hiểu là..." |

### 3.2. Cơ chế "Mode-Shifting" — Trái tim của LbT

Kỹ thuật Mode-Shifting, được triển khai trong AlgoBo [23], là một đột phá then chốt: AI không giữ một vai trò cố định, mà **luân phiên chuyển đổi** giữa các chế độ:

```
Chế độ 1: Học trò thụ động
  → Lắng nghe bài giảng, tiếp thu kiến thức
  → Chỉ phản hồi "Con đã hiểu" hoặc "Con chưa hiểu chỗ này"

Sau 3 lượt hội thoại → Chuyển chế độ

Chế độ 2: Học trò chủ động (Questioner)
  → Đặt câu hỏi ngược: "Tại sao?", "Như thế nào?", "Điều gì xảy ra nếu...?"
  → Ép giáo viên phải đào sâu
  → Yêu cầu áp dụng: "Thầy có thể cho con một ví dụ khác không?"

Sau 3 lượt → Chuyển về Chế độ 1
```

Mô hình này giải quyết vấn đề cốt lõi: nếu AI chỉ hỏi liên tục, học sinh sẽ nản. Nếu AI chỉ nghe thụ động, học sinh sẽ hời hợt. **Nhịp điệu luân phiên** giữa hai chế độ tạo ra sự cân bằng giữa áp lực nhận thức và cảm giác tiến bộ.

### 3.3. Generate-Retrieve-Rerank: AI Phát hiện Lỗ hổng trong Bài giảng

Mitton và cộng sự (2026) đề xuất pipeline Generate-Retrieve-Rerank [10] — áp dụng trong LbT để AI (với tư cách học trò) phát hiện các điểm chưa rõ trong bài giảng:

1. **Generate:** LLM phân tích bài giảng của học sinh và sinh ra các giả thuyết về những điểm học sinh có thể đang hiểu sai hoặc chưa giải thích đầy đủ
2. **Retrieve:** Sử dụng embedding (MiniLM-L6-v2) để truy xuất top-_k_ misconceptions tương tự từ cơ sở dữ liệu chuyên gia
3. **Rerank:** Một LLM thứ hai xếp hạng lại độ phù hợp và chọn câu hỏi Socratic phù hợp nhất để "học trò" AI đặt ra

Pipeline này đảm bảo AI không hỏi những câu ngẫu nhiên hay vô nghĩa, mà **mỗi câu hỏi đều nhắm trúng lỗ hổng cụ thể** trong kiến thức của người dạy.

### 3.4. SLOW Framework: "Suy nghĩ chậm" cho AI Học trò

Một vấn đề với hầu hết LLM là chúng thực hiện "suy nghĩ nhanh" — sinh phản hồi trong một chu kỳ tính toán duy nhất [13]. Đối với AI đóng vai học trò, điều này có nghĩa là AI phải đồng thời: hiểu bài giảng, đánh giá chất lượng, chọn câu hỏi phù hợp — tất cả trong một lần inference. Kết quả là câu hỏi thiếu chiều sâu sư phạm.

SLOW framework [13] tách biệt quá trình này thành 4 giai đoạn riêng biệt:

| Giai đoạn | Chức năng | Đầu ra |
|-----------|----------|--------|
| **1. Trích xuất bằng chứng** | Phân tích văn bản bài giảng của học sinh | Danh sách claims, facts, logic steps |
| **2. Xác thực nhận thức** | So sánh với domain knowledge, phát hiện mâu thuẫn | Các điểm chưa nhất quán (counterfactual stability analysis) |
| **3. Dự đoán cảm xúc** | Đánh giá trạng thái tâm lý của học sinh | Mức độ tự tin, frustration, engagement |
| **4. Tích hợp chiến lược** | Chọn loại câu hỏi phù hợp (Elenchus, Maieuticus, Aporia, Dialectic) | Câu hỏi Socratic tối ưu để đào sâu mà không làm nản |

---

## 4. Tự Giải thích — Cơ chế Cốt lõi Khi Dạy AI

### 4.1. Tự giải thích là gì và tại sao LbT kích hoạt nó

Tự giải thích (self-explanation) là quá trình người học tự diễn đạt lại kiến thức bằng ngôn từ của chính mình [27]. Đây là **cơ chế nhận thức trung tâm** của LbT: khi dạy AI, học sinh buộc phải tạo ra các lời giải thích — không phải cho bản thân, mà cho một thực thể khác cần hiểu.

Sự khác biệt then chốt:

- **Tự giải thích truyền thống:** Học sinh tự nói với chính mình, không có ai kiểm chứng
- **Tự giải thích trong LbT:** Học sinh giải thích cho AI, và AI **phản hồi** — thể hiện sự hiểu/không hiểu, đặt câu hỏi đào sâu

Phản hồi từ AI biến tự giải thích từ một hành vi đơn độc thành một **đối thoại nhận thức**.

### 4.2. Ứng dụng trong Giáo dục Lập trình: EiPE và CGBG

Trong giáo dục khoa học máy tính, kỹ thuật Explain-in-Plain-English (EiPE) [32] yêu cầu học sinh giải thích mã nguồn bằng ngôn ngữ tự nhiên. Trong bối cảnh LbT, điều này được mở rộng: học sinh phải **dạy AI đọc hiểu code**, tức là giải thích từng dòng, từng hàm, và mục đích tổng thể.

Phương pháp Code Generation Based Grading (CGBG) [39] cung cấp một cơ chế kiểm chứng khách quan:

```
Học sinh giải thích code → LLM (vai học trò) thử viết code từ lời giải thích
                          → Chạy unit tests
                          → Nếu pass: lời giải thích đủ chính xác
                          → Nếu fail: AI hỏi lại "Con viết theo lời thầy nhưng không chạy được..."
```

Điều này tạo ra vòng lặp **Dạy → Kiểm chứng → Sửa → Dạy lại**, đặc biệt hiệu quả trong lập trình.

### 4.3. Phân loại SOLO Áp dụng cho Chất lượng Bài giảng

SOLO taxonomy [35] được điều chỉnh để đánh giá chất lượng bài giảng của học sinh khi dạy AI:

| Mức SOLO | Hành vi của học sinh khi dạy AI | AI phản hồi thế nào |
|-----------|-------------------------------|---------------------|
| **Tiền cấu trúc** | Không giải thích được, lặp lại từ khóa | "Con chưa hiểu ạ, thầy có thể nói lại không?" |
| **Đơn cấu trúc** | Chỉ nêu được một khía cạnh, thiếu bối cảnh | "Thầy nói về A, nhưng B thì sao ạ?" |
| **Đa cấu trúc** | Dịch từng dòng/từng bước, thiếu kết nối | "Con hiểu từng phần, nhưng chúng liên quan thế nào ạ?" |
| **Quan hệ** | Giải thích được mối quan hệ và mục đích tổng thể | "Con đã hiểu! Vậy nếu thay đổi X thì sẽ thế nào ạ?" |

Mục tiêu của LbT là đẩy học sinh từ mức **Đa cấu trúc** lên **Quan hệ** — và chính câu hỏi của AI là động lực cho sự chuyển dịch này.

---

## 5. Các Hệ thống Teachable Agent Tiêu biểu

### 5.1. AlgoBo — Dạy AI Viết Code

AlgoBo [23] là Teachable Agent chuyên biệt cho giáo dục lập trình. Học sinh dạy AlgoBo các thuật toán cơ bản (sắp xếp, tìm kiếm, đệ quy) thông qua hội thoại.

**Kiến trúc phản hồi Reflect-Respond:**

```
Reflect (Phản ánh):
  1. AlgoBo duy trì "bộ nhớ kiến thức" — trạng thái về những gì nó đã "học được"
  2. Bộ nhớ này được cài cắm sẵn các misconceptions và khoảng trống kiến thức
  3. Khi học sinh giảng, AlgoBo chỉ cập nhật kiến thức nếu giải thích hợp lý

Respond (Phản hồi):
  1. Dựa trên trạng thái kiến thức hiện tại, AlgoBo phản hồi
  2. Ở chế độ học trò: "Con đã hiểu bước này"
  3. Ở chế độ hỏi: "Tại sao phải dùng vòng lặp ở đây mà không phải đệ quy?"
```

**Kết quả thực nghiệm:** 40 sinh viên đại học tham gia — nhóm dùng AlgoBo cho thấy khả năng viết code dễ đọc, có cấu trúc tốt hơn nhóm đối chứng (tự học hoặc học với AI làm thầy). Mật độ kiến thức trong hội thoại (knowledge density) đạt effect size d=0.71 [22].

### 5.2. TeachYou — Nền tảng Dạy AI Tổng quát

TeachYou [24] mở rộng LbT ra ngoài lập trình, cho phép học sinh dạy AI về bất kỳ chủ đề nào.

**Các tính năng đặc trưng:**

- **Prompting pipeline kìm hãm kiến thức:** AI được prompt để "quên" kiến thức nền, chỉ biết những gì học sinh đã dạy
- **Bộ nhớ phiên:** AI ghi nhớ toàn bộ "bài học" trong phiên, có thể được kiểm tra bất cứ lúc nào
- **Chế độ Kiểm tra:** Học sinh có thể yêu cầu AI làm bài kiểm tra về những gì đã được dạy — nếu AI sai, đó là dấu hiệu bài giảng chưa đủ

### 5.3. ALTER-Math — Dạy AI Giải Toán

ALTER-Math [22] áp dụng LbT trong giáo dục toán học trung học. Học sinh đóng vai trò giáo viên toán, dạy AI từng bước giải một bài toán.

**Điểm đặc biệt:** ALTER-Math không chỉ yêu cầu học sinh đưa ra đáp án đúng, mà yêu cầu **giải thích từng bước biến đổi** — tại sao chọn công thức này, tại sao biến đổi theo cách kia. AI hỏi ngược nếu phát hiện bước nhảy logic không được giải thích.

**Kết quả thực nghiệm:** Thử nghiệm quy mô lớp học thực tế cho thấy học sinh tương tác với ALTER-Math cải thiện đáng kể khả năng tự điều chỉnh học tập (SRL) và sự tự tin trong môn toán.

### 5.4. feynman-tutor — Kỹ thuật Feynman với AI

feynman-tutor (mã nguồn mở) [GitHub: koukekoukej-glitch/feynman-tutor] triển khai Kỹ thuật Feynman: **"Nếu bạn không thể giải thích một điều đơn giản, bạn chưa thực sự hiểu nó."**

Học sinh dạy AI một khái niệm bằng ngôn ngữ đơn giản nhất có thể. AI liên tục yêu cầu: "Giải thích đơn giản hơn nữa đi ạ", "Con vẫn chưa hiểu, thầy dùng từ dễ hơn được không?" — buộc học sinh phải chứng tỏ sự thông thạo thực sự.

### 5.5. So sánh các Hệ thống

| Hệ thống | Lĩnh vực | Cơ chế chính | Mode-Shifting | Mã nguồn mở |
|----------|---------|-------------|---------------|-------------|
| **AlgoBo** | Lập trình | Reflect-Respond, bộ nhớ misconceptions | 3 lượt/lần | Có |
| **TeachYou** | Tổng quát | Prompting kìm hãm kiến thức, kiểm tra học trò | Có (tùy chỉnh) | Có |
| **ALTER-Math** | Toán học | Giải thích từng bước, AI hỏi bước nhảy | Theo bước giải | Không |
| **feynman-tutor** | Tổng quát | Kỹ thuật Feynman, ép đơn giản hóa | Liên tục | Có |
| **Betty's Brain** | Khoa học | Bản đồ khái niệm trực quan | Không (giao diện tĩnh) | Không |

---

## 6. Kiến trúc Kỹ thuật cho Teachable Agent

### 6.1. Pipeline Tổng quát

```
┌─────────────────────────────────────────────────────────────────────┐
│  Học sinh (Giáo viên)                                               │
│  "Đây là cách hoạt động của thuật toán QuickSort..."                 │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ input: bài giảng
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Bộ phân tích Bài giảng (Lecture Analyzer)                           │
│  - Trích xuất claims, facts, logical steps                           │
│  - So sánh với domain model                                         │
│  - Xác định điểm thiếu/mâu thuẫn                                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ detected gaps/misconceptions
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Bộ quản lý Trạng thái Kiến thức (Knowledge State Manager)            │
│  - Duy trì "những gì AI đã học được"                                 │
│  - Gắn cờ các KCs chưa được dạy hoặc dạy chưa đủ                     │
│  - Cập nhật sau mỗi lượt giảng dạy thành công                        │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ current knowledge state
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Bộ chọn Chiến lược Hỏi (Question Strategy Selector)                 │
│  - Chọn loại câu hỏi: Elenchus / Maieuticus / Aporia / Dialectic    │
│  - Quyết định sống hay chuyển Mode-Shifting                          │
│  - Cân nhắc mức độ tự tin / frustration của học sinh                  │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ selected question
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  AI Học trò → Phản hồi                                               │
│  "Thầy ơi con chưa hiểu — thầy nói pivot là phần tử cuối, nhưng      │
│   trong ví dụ thầy lại chọn phần tử đầu tiên ạ?"                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2. Quản lý Bộ nhớ và Trạng thái Kiến thức

Đây là thành phần **quan trọng nhất** của Teachable Agent. AI phải duy trì một mô hình về những gì nó "biết" và "chưa biết" — khác với kiến thức thực sự của LLM.

**Mô hình 3 lớp (dựa trên DeepTutor [DeepTutor paper]):**

| Lớp | Nội dung | Cập nhật khi nào |
|-----|---------|-----------------|
| **L1: Knowledge State** | Danh sách KCs đã được dạy, đang học, chưa được dạy | Sau mỗi lượt giảng thành công |
| **L2: Misconception Registry** | Các misconceptions được cài đặt sẵn + phát sinh từ phân tích bài giảng | Khi AI phát hiện học sinh dạy sai hoặc thiếu |
| **L3: Interaction History** | Lịch sử toàn bộ hội thoại + các điểm AI đã hỏi và câu trả lời | Liên tục |

**Kỹ thuật Prompting Kìm hãm Kiến thức:**

Đây là kỹ thuật then chốt để AI "giả vờ" không biết những gì LLM thực sự biết:

```
System Prompt (TeachYou-style):
"Bạn là một học sinh đang học [CHỦ ĐỀ]. Bạn CHỈ biết những gì giáo viên
đã dạy bạn trong phiên này. Mọi kiến thức khác về chủ đề này — bạn
phải hành xử như chưa từng biết. Khi giáo viên dạy một điều gì đó,
hãy cập nhật vào bộ nhớ của bạn. Nếu giáo viên nói điều gì mâu thuẫn
với những gì đã dạy trước đó, hãy hỏi lại để làm rõ."
```

### 6.3. Cơ chế Hỏi Ngược (Reverse Questioning Engine)

Đây là thành phần làm cho LbT khác biệt với các hệ thống ITS truyền thống. AI không thụ động nhận — nó chủ động đào sâu.

**Các loại câu hỏi AI có thể đặt:**

| Loại | Mẫu câu | Kích hoạt khi |
|------|--------|--------------|
| **Làm rõ** (Clarification) | "Thầy nói X, con chưa hiểu X nghĩa là gì ạ?" | Phát hiện thuật ngữ chưa được định nghĩa |
| **Đào sâu** (Elaboration) | "Tại sao lại dùng phương pháp này mà không phải phương pháp kia ạ?" | Phát hiện thiếu so sánh/lý do |
| **Phản ví dụ** (Counterexample) | "Nếu đầu vào là [trường hợp đặc biệt] thì sao ạ?" | Phát hiện thiếu xử lý edge cases |
| **Kết nối** (Connection) | "Điều này liên quan thế nào đến [khái niệm đã học trước đó] ạ?" | Phát hiện kiến thức rời rạc, thiếu tích hợp |
| **Áp dụng** (Application) | "Thầy cho con một bài tập để con thử làm theo cách thầy dạy được không ạ?" | Sau khi học sinh dạy xong một đơn vị kiến thức |
| **Tổng kết** (Summarization) | "Vậy tóm lại những gì thầy dạy hôm nay là..." | Cuối phiên, để học sinh xác nhận AI đã hiểu đúng |

### 6.4. Tích hợp Đồ thị Kiến thức (Knowledge Graph)

Để AI hỏi câu hỏi có ý nghĩa sư phạm, hệ thống cần một đồ thị kiến thức biểu diễn:

- Các khái niệm (nodes) và mối quan hệ tiên quyết (edges)
- Trình tự học tập logic: A → B → C (phải hiểu A trước khi học B)
- Các misconceptions phổ biến gắn với từng node

Khi học sinh giảng về node C mà chưa đề cập đến node A (tiên quyết), AI sẽ hỏi: "Thầy ơi, con chưa hiểu A thì làm sao hiểu C được ạ?" — từ đó phát hiện lỗ hổng kiến thức nền.

PPO (Proximal Policy Optimization) [15] được sử dụng để tối ưu việc chọn node kiến thức nào để AI hỏi tiếp theo, dựa trên: mức độ quan trọng của node, khả năng học sinh đang thiếu kiến thức về node đó, và lịch sử các câu hỏi đã hỏi.

---

## 7. Cơ chế Đánh giá và Theo dõi Quá trình Dạy

### 7.1. Đánh giá Thông qua "Bài Kiểm tra của AI"

Một cơ chế đánh giá độc đáo của LbT là **cho AI làm bài kiểm tra** về những gì nó được dạy. Nếu AI trả lời sai:

- **Không nhất thiết là AI sai** — đó có thể là tín hiệu cho thấy bài giảng của học sinh chưa đủ rõ ràng
- AI có thể giải thích: "Con trả lời thế này vì thầy dạy con như thế này" — giúp học sinh thấy hệ quả của việc dạy chưa chính xác

**Ví dụ thực tế từ Studyield:** Học sinh dạy AI một khái niệm, sau đó AI làm bài quiz. Nếu AI sai, hệ thống chỉ ra chính xác điểm nào trong bài giảng dẫn đến sự hiểu sai đó.

### 7.2. Knowledge Tracing cho Người Dạy

Trong khi ITS truyền thống sử dụng Knowledge Tracing (KT) để theo dõi tiến bộ của **người học**, trong LbT, KT được điều chỉnh để theo dõi tiến bộ của **người dạy** [48]:

| Input cho KT | Ý nghĩa |
|-------------|---------|
| Học sinh dạy AI về KC_X và AI hiểu đúng | KC_X được coi là mastered |
| Học sinh dạy AI về KC_X nhưng AI hỏi lại và phát hiện thiếu sót | KC_X được gắn cờ là "cần củng cố" |
| Học sinh tránh né dạy về KC_X | KC_X có thể là blind spot |
| AI hỏi câu hỏi về KC_X và học sinh trả lời đúng | Củng cố bằng chứng mastery |

LLMKT [48] sử dụng LLM để đọc transcript hội thoại và xác định KCs nào đang được dạy ở mỗi lượt, sau đó đẩy vào mô hình KT truyền thống để theo dõi quỹ đạo mastery.

### 7.3. Các Metric Đánh giá Hiệu quả LbT

| Metric | Đo lường | Cách thu thập |
|--------|---------|--------------|
| **Learning Gain** | Chênh lệch điểm pre-test / post-test | Bài kiểm tra chuẩn hóa trước và sau phiên LbT |
| **Knowledge Density** | Số KCs được dạy thành công / tổng lượt hội thoại | Phân tích transcript bởi LLM |
| **Teaching Depth** | Tỷ lệ câu trả lời của học sinh đạt mức SOLO Quan hệ | Phân loại bởi LLM fine-tuned (ORPO) [43] |
| **Question Quality** | Số câu hỏi AI đặt ra mà học sinh không trả lời được ngay → phải suy nghĩ lại | Đếm từ transcript |
| **Cognitive Load Balance** | Tỷ lệ thời gian học sinh ở chế độ giảng dạy vs bị hỏi | Phân tích Mode-Shifting log |
| **Self-Regulation Score** | Khả năng tự điều chỉnh chiến lược dạy của học sinh | Quan sát và rubric |
| **Engagement Duration** | Thời gian tự nguyện tương tác với Teachable Agent | System logs |

---

## 8. Mô phỏng Học trò AI để Kiểm thử Hệ thống

### 8.1. Tại sao cần mô phỏng

Việc kiểm thử Teachable Agent gặp khó khăn vì cần học sinh thật trong các thử nghiệm tốn kém. Giải pháp: **dùng LLM để mô phỏng học sinh đang dạy AI** [58]. Điều này cho phép:

- Kiểm thử chất lượng câu hỏi của AI: AI hỏi có đúng trọng tâm không?
- Đánh giá pipeline phát hiện lỗ hổng: AI có phát hiện được bài giảng cố tình dạy sai không?
- Tối ưu Mode-Shifting: Nhịp chuyển đổi nào tạo ra Learning Gain cao nhất?

### 8.2. Khung KLI (Knowledge Learning-Instruction)

Khung Generative Students [58] tạo ra học sinh mô phỏng với hồ sơ nhận thức rõ ràng:

| Tham số hồ sơ | Mô tả |
|-------------|-------|
| **Known KCs** | Các KCs học sinh đã thành thạo — sẽ dạy đúng |
| **Confused KCs** | Các KCs học sinh hiểu sai — sẽ dạy sai (có chủ đích) |
| **Unknown KCs** | Các KCs học sinh chưa biết — sẽ lảng tránh |
| **Teaching Style** | Phong cách dạy: diễn giải, ví dụ, trực quan, công thức |
| **Personality Traits** | Big Five: mức độ kiên nhẫn, tự tin, cởi mở |

**Kỹ thuật chống rò rỉ kiến thức:** Prompt yêu cầu LLM đóng vai "một giáo viên đang dự đoán học sinh sẽ dạy thế nào" — thay vì trực tiếp đóng vai học sinh. Điều này ngăn kiến thức nội tại của LLM làm nhiễu kết quả mô phỏng.

### 8.3. Nghịch lý Dữ liệu Học sinh (Student Data Paradox)

Một phát hiện quan trọng [63]: Khi fine-tune LLM trên dữ liệu bài giảng chứa lỗi sai của học sinh thật, khả năng lập luận logic gốc của LLM bị suy thoái nghiêm trọng. Điều này có ý nghĩa đối với LbT:

- **Không nên fine-tune LLM "học trò" trên dữ liệu lỗi** — thay vào đó, dùng prompting và memory riêng biệt để mô phỏng sự "chưa biết"
- **Adapter weights riêng biệt** là giải pháp: tách biệt kiến thức "học được từ học sinh" khỏi kiến thức nền của LLM, tránh làm hỏng khả năng suy luận

---

## 9. Thực nghiệm và Kết quả Định lượng

### 9.1. AlgoBo: Dạy AI Viết Thuật toán

| Chỉ số | Nhóm LbT (AlgoBo) | Nhóm Tự học | Nhóm AI-làm-Thầy |
|--------|-------------------|-------------|------------------|
| **Learning Gain** (pre→post) | d = 0.71 | d = 0.35 | d = 0.52 |
| **Code Readability** | Cao hơn 34% | Baseline | Cao hơn 12% |
| **Thời gian tương tác** | 47 phút (trung bình) | 22 phút | 31 phút |
| **Tỷ lệ bỏ cuộc** | 8% | 25% | 18% |

_Nguồn: [22] — 40 sinh viên đại học, chủ đề thuật toán sắp xếp và tìm kiếm_

### 9.2. ALTER-Math: Dạy AI Giải Toán

| Chỉ số | Trước can thiệp | Sau can thiệp |
|--------|----------------|--------------|
| **Điểm toán trung bình** | 62/100 | 78/100 |
| **Tự tin (self-efficacy)** | 3.1/5 | 4.2/5 |
| **SRL Score** | 2.8/5 | 3.9/5 |

_Nguồn: [22] — Thử nghiệm lớp học thực tế, học sinh trung học_

### 9.3. TeachYou: Dạy AI Chủ đề Tổng quát

Học sinh được yêu cầu dạy AI về một chủ đề họ vừa học. Sau phiên, AI làm bài kiểm tra:

- **72%** bài kiểm tra AI làm sai là do bài giảng của học sinh thiếu hoặc sai
- **89%** học sinh cho biết quá trình dạy AI giúp họ nhận ra những điểm mình chưa thực sự hiểu
- **67%** nói rằng họ sẽ tự tìm hiểu thêm trước khi dạy AI trong phiên tiếp theo

### 9.4. Tổng hợp Hiệu quả của LbT

Từ các thực nghiệm, LbT cho thấy những lợi ích nhất quán:

1. **Learning Gain cao hơn** so với tự học hoặc học với AI làm thầy (effect size 0.5–0.7)
2. **Động lực nội sinh cao hơn** — học sinh cảm thấy có trách nhiệm với "học trò" AI
3. **Phát hiện lỗ hổng chính xác hơn** — học sinh tự nhận ra mình chưa hiểu gì khi không thể giải thích cho AI
4. **Phát triển kỹ năng siêu nhận thức** — học sinh học cách tự đánh giá chất lượng hiểu biết của mình

---

## 10. Thách thức và Khoảng trống Nghiên cứu

### 10.1. Thách thức Kỹ thuật

| Thách thức | Mô tả | Hướng giải quyết tiềm năng |
|-----------|-------|--------------------------|
| **Kiểm soát kiến thức AI** | LLM vốn biết quá nhiều — làm sao để nó "giả vờ không biết" một cách nhất quán? | Prompting pipeline phức tạp + memory isolation + adapter weights riêng |
| **Sinh câu hỏi có ý nghĩa sư phạm** | AI có thể hỏi những câu vô nghĩa hoặc quá khó, làm nản học sinh | Tích hợp Knowledge Graph + PPO để chọn câu hỏi tối ưu |
| **Phát hiện bài giảng sai** | Khi học sinh dạy sai, AI cần phát hiện và phản hồi phù hợp (không quá gay gắt) | Generate-Retrieve-Rerank pipeline [10] |
| **Duy trì persona nhất quán** | AI cần nhất quán trong vai trò "học trò" xuyên suốt phiên, không bị lộ kiến thức thật | Memory layer 3 + strict system prompt |
| **Chi phí inference** | Mỗi lượt hội thoại LbT cần nhiều bước xử lý (phân tích, chọn câu hỏi, sinh phản hồi) | Mô hình nhỏ hơn cho các tác vụ phụ + caching |

### 10.2. Khoảng trống Nghiên cứu

1. **Thiếu khung đánh giá chuẩn hóa cho LbT:** Hiện chưa có benchmark thống nhất để so sánh các Teachable Agent. Các thực nghiệm dùng metric khác nhau, khó tổng hợp.

2. **Mode-Shifting tối ưu:** Nhịp chuyển đổi giữa chế độ "học trò thụ động" và "học trò chủ động" hiện dựa trên heuristic (3 lượt). Cần nghiên cứu để tối ưu hóa dựa trên đặc điểm từng học sinh.

3. **LbT cho các bậc học khác nhau:** Hầu hết nghiên cứu tập trung vào đại học và trung học. Hiệu quả của LbT với tiểu học, giáo dục đặc biệt, và đào tạo doanh nghiệp chưa được khám phá.

4. **LbT đa ngôn ngữ và đa văn hóa:** Hầu hết Teachable Agent hoạt động bằng tiếng Anh. Cần mở rộng sang các ngôn ngữ và bối cảnh văn hóa-giáo dục khác.

5. **Tích hợp LbT vào LMS:** Làm thế nào để nhúng Teachable Agent vào các hệ thống quản lý học tập (Moodle, Canvas) một cách liền mạch?

6. **LbT dài hạn:** Các thực nghiệm hiện tại chỉ kéo dài 1–2 phiên. Liệu hiệu quả của LbT có duy trì qua nhiều tuần, nhiều tháng?

---

## 11. Xu hướng Tương lai

### 11.1. Agentic Teaching Assistants

Xu hướng "agentic AI" sẽ đưa LbT lên tầm cao mới: AI không chỉ là một học trò thụ động trong một phiên, mà là một **trợ lý học tập dài hạn**, ghi nhớ toàn bộ lịch sử được dạy, theo dõi sự tiến bộ của "giáo viên", và thích ứng theo thời gian.

### 11.2. Multimodal LbT

Thay vì chỉ dạy qua văn bản, học sinh có thể:
- Vẽ sơ đồ và AI "đọc" để hiểu
- Nói (voice) và AI lắng nghe
- Chụp ảnh bài giải tay và AI kiểm tra

Duolingo Max [blog.duolingo.com] đã chứng minh tính khả thi của video call với AI — áp dụng tương tự cho LbT: học sinh gọi video cho AI để "dạy kèm từ xa".

### 11.3. LbT Collaborative (Dạy AI theo nhóm)

Nhiều học sinh cùng dạy một AI, giống như nhóm học tập. AI phải tổng hợp được kiến thức từ nhiều "giáo viên" và chỉ ra khi hai giáo viên dạy mâu thuẫn nhau — tạo ra thảo luận giữa các học sinh.

### 11.4. AI "Học trò" Cá nhân hóa

Mỗi học sinh có một AI học trò riêng, được cá nhân hóa theo:
- Phong cách dạy ưa thích của học sinh
- Tốc độ tiếp thu của AI (có thể điều chỉnh nhanh/chậm)
- "Tính cách" AI (tò mò, nghi ngờ, nhiệt tình...)

### 11.5. Tích hợp với Hệ thống Giáo dục Hiện có

- **Trên LMS:** AI học trò như một plugin — sau mỗi bài giảng, học sinh "dạy lại" cho AI để củng cố
- **Trên GitHub:** AI học trò review code do học sinh viết và yêu cầu giải thích
- **Trên nền tảng thi trực tuyến:** Trước khi nộp bài, học sinh phải "dạy" AI cách giải — đảm bảo không gian lận

---

## 12. Kết luận

### 12.1. Tổng kết

Learning by Teaching — mô hình đảo ngược vai trò: AI là học trò, con người là thầy — đại diện cho một sự chuyển dịch mô hình (paradigm shift) trong EdTech. Thay vì dùng AI để truyền đạt kiến thức, LbT khai thác AI như một **bề mặt phản chiếu nhận thức** (cognitive mirror): khi học sinh dạy AI, họ buộc phải đối mặt với những gì mình thực sự hiểu và không hiểu.

Ba trụ cột làm nên sức mạnh của LbT:

1. **Protégé Effect:** Trách nhiệm với "học trò" AI kích hoạt nỗ lực nhận thức tối đa
2. **Socratic Reversed:** AI không dùng Socratic để dạy, mà để hỏi ngược — đào sâu chất lượng bài giảng
3. **Self-Explanation với Phản hồi:** Tự giải thích không còn là độc thoại, mà là đối thoại có kiểm chứng

### 12.2. Hàm ý cho Nghiên cứu và Triển khai

- **Cho nhà nghiên cứu:** Cần khung đánh giá chuẩn hóa cho LbT, nghiên cứu Mode-Shifting tối ưu, và giải quyết Student Data Paradox
- **Cho nhà phát triển:** Có thể xây dựng Teachable Agent với kiến trúc pipeline: Analyze → Update Knowledge State → Select Strategy → Respond. Các dự án mã nguồn mở như AlgoBo và TeachYou cung cấp nền tảng khởi đầu tốt
- **Cho nhà giáo dục:** LbT có thể được tích hợp như hoạt động "dạy lại" sau mỗi bài học — chi phí thấp, dễ triển khai, hiệu quả cao

### 12.3. Lời kết

Có một nghịch lý đẹp trong LbT: **để AI trở thành công cụ giáo dục mạnh mẽ nhất, đôi khi nó cần... giả vờ không biết gì cả.** Chính trong khoảnh khắc học sinh cúi xuống giải thích cho một cỗ máy "ngây thơ", những kết nối tri thức sâu sắc nhất được hình thành. Và khi AI ngước lên hỏi "Tại sao vậy thầy?" — đó không phải là câu hỏi của máy, mà là câu hỏi mà chính học sinh cần tự trả lời.

---

## 13. Nguồn trích dẫn

### Nguồn về Lý thuyết và Cơ chế LbT (Phần 1–4)

[1] A Comprehensive Exploration of Personalized Learning in Smart Education — arXiv, https://arxiv.org/html/2402.01666v2
[2] A Comprehensive Review of AI-based Intelligent Tutoring Systems — arXiv, https://arxiv.org/html/2507.18882v1
[4] LLM Agents for Education: Advances and Applications — ACL Anthology, https://aclanthology.org/2025.findings-emnlp.743.pdf
[5] Dialogue-Based Tutoring at Scale: Design and Challenges — CEUR-WS.org, https://ceur-ws.org/Vol-2128/industrial1.pdf
[6] Automated Assessment of Initial Answers in Conversational ITS — MDPI, https://www.mdpi.com/2079-9292/12/17/3654
[9] Socratic Method Revisited: Human-AI Dialogue for Knowledge Creation — ScholarSpace
[10] Misconception Diagnosis From Student-Tutor Dialogue: Generate, Retrieve, Rerank — arXiv, https://arxiv.org/abs/2602.02414
[13] SLOW: Strategic Logical-inference Open Workspace for Cognitive Adaptation — arXiv, https://arxiv.org/pdf/2603.28062
[15] Hey Chat, Can You Teach Me? Structuring Socratic Dialogue — arXiv, https://arxiv.org/abs/2606.11744
[18] SocraticLM: Exploring Socratic Personalized Teaching with LLMs — USTC, http://staff.ustc.edu.cn/~huangzhy/files/papers/JiayuLiu-NeurIPS2024.pdf
[19] Learning-by-Teaching: Designing Teachable Agents with Intrinsic Motivation — ResearchGate
[20] Pedagogical Agents for Learning by Teaching: Teachable Agents — AAA Lab, Stanford
[22] Pedagogically Steered LLM-Based Teachable Agents — ResearchGate
[23] Teach AI How to Code: Using LLMs as Teachable Agents — arXiv, https://arxiv.org/html/2309.14534v2
[24] TeachYou, https://teachyou.kixlab.org/
[27] Towards AI-Enhanced CRS Eliciting Self-Explanations — EdTech Books
[32] Peer-grading "Explain in plain English" questions — Craig Zilles, UIUC
[35] Reliably Classifying Novice Programmer Exam Responses using SOLO — OPUS at UTS
[39] Code Generation Based Grading for EiPE Questions — arXiv, https://arxiv.org/html/2311.14903v1
[43] Can LLMs Identify Gaps and Misconceptions in Students' Code Explanations? — arXiv, https://arxiv.org/abs/2501.10365
[48] Exploring Knowledge Tracing in Tutor-Student Dialogues using LLMs — arXiv, https://arxiv.org/abs/2409.16490
[49] DiaCDM: Cognitive Diagnosis in Teacher-Student Dialogues — arXiv, https://arxiv.org/pdf/2509.24821
[52] Interpretable Difficulty-Aware Knowledge Tracing — Semantic Scholar
[58] Generative Students: LLM-Simulated Student Profiles — Moonlight
[59] Which Type of Students can LLMs Act? — arXiv, https://arxiv.org/html/2502.11678v4
[63] Student Data Paradox — Moonlight, https://www.themoonlight.io/en/review/student-data-paradox

### Nguồn về Hệ thống, Kiến trúc, và Thực tiễn (Phần 5–12)

- Khanmigo (Khan Academy): https://khanmigo.ai
- Duolingo Max: https://blog.duolingo.com/duolingo-max/
- DeepTutor: https://github.com/HKUDS/DeepTutor | Paper: https://arxiv.org/abs/2604.26962
- Lumen: https://github.com/ahmedEid1/lumen
- Studyield: https://github.com/studyield/studyield
- OpenTutor: https://github.com/zijinz456/OpenTutor
- Bloom: https://github.com/Li-Evan/Bloom
- feynman-tutor: https://github.com/koukekoukej-glitch/feynman-tutor
- LexiLingo: https://github.com/InfinityZero3000/LexiLingo
- Microsoft GraphRAG: https://github.com/microsoft/graphrag
- LangGraph: https://github.com/langchain-ai/langgraph
- LlamaIndex: https://github.com/run-llama/llama_index
- Microsoft Promptbase (Medprompt+): https://github.com/microsoft/promptbase
- LLM Agent Survey (Lilian Weng): https://lilianweng.github.io/posts/2023-06-23-agent/
- Wikipedia ITS: https://en.wikipedia.org/wiki/Intelligent_tutoring_system
- GitHub topic `ai-tutor`: https://github.com/topics/ai-tutor
