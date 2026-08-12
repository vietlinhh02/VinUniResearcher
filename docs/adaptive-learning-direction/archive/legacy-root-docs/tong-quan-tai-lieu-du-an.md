# Tổng quan tài liệu dự án Mentee (VinUniResearcher)

Cập nhật: 12/08/2026. Mục đích: bản đồ toàn bộ `docs/` — file nào nói gì,
trạng thái ra sao và cái gì được dùng làm nền cho hướng Adaptive
Learning-by-Teaching xuyên track.

## 1. Bức tranh chung

Repo chứa **hai thứ chạy song song**:

1. **Sản phẩm Mentee** (Go backend + Next.js frontend) — hiện mới có auth (register/login/
   logout/me), landing page và dashboard shell với 6 trang "Đang phát triển". **Chưa có dòng
   code nào cho teachable agent/LLM.**
2. **Bộ tài liệu nghiên cứu** trong `docs/` — có các lớp định hướng cũ và một
   hướng hiện hành:

- **A. Pilot "AI học trò hỏi ngược"** là hướng cũ, chi tiết nhất về instrument. Tài liệu gồm
  `research/protocol.md`, `research/prompt-spec.md`, `research/instruments.md` và
  `huong-dan-bat-dau-research.md`. AI học trò chat thuần về Binary Search/Selection Sort;
  primary outcome là `knowledge_building_rate`. Trạng thái: draft v0.1, chưa freeze hoặc
  preregister.
- **B. Pivot "AI Thực Chiến"** nằm trong `dinh-huong-ai-thuc-chien-de-hoi-mentor.md` (25/07).
  AI là practice partner/reviewer; primary outcome là verified next-day transfer. Đây là bản
  thảo chưa qua mentor, còn 7 quyết định mở.
- **C. Adaptive Learning-by-Teaching xuyên track** là hướng hiện hành, nằm trong
  `tong-quan-huong-day-nguoc-ai.md`,
  `dinh-huong-adaptive-learning-xuyen-suot-track.md` và PRD. Learner dạy AI
  apprentice; AI enact một task isomorphic; runner tạo evidence; learner model
  theo skill chọn repair/review/transfer qua nhiều lab. Primary outcome dự kiến
  là independent `TransferScore` ở cuối module/track.

**Lớp C là hướng hiện hành.** PRD được viết theo lớp C, tái sử dụng instrument
của lớp A và giữ các ràng buộc quy trình hữu ích của lớp B. Hướng này chưa được
đóng băng cho pilot/study chính.

## 2. Từng tài liệu — mục đích và trạng thái

### 2.1. Định hướng

- `tong-quan-huong-day-nguoc-ai.md` là **tài liệu định hướng chính**: verified
  enactment, learner model theo skill, adaptation policy và scope xuyên track.
- `dinh-huong-adaptive-learning-xuyen-suot-track.md` giải thích cơ chế,
  state-transition policy, lộ trình feasibility/pilot/study và định vị prior art.
- `prd-buoc-day-nguoc-ai.md` mô tả engine sản phẩm: skill graph, Lab Teaching
  Spec, learner model, scheduler, assessment và research console.
- `dinh-huong-ai-thuc-chien-de-hoi-mentor.md` đề xuất pivot sang "AI Thực Chiến", core loop
  artifact → test scenario → giải thích → transfer hôm sau và 20 câu hỏi cho mentor. Bản thảo
  ngày 25/07 còn checkbox trống và mâu thuẫn framing reviewer/apprentice với lớp C; lớp C đã
  ghi nhận ở §11.
- `tong-quan-ai-tutor-toan-dien.md` khảo sát rộng LbT, gồm Socratic đảo chiều, pipeline năm
  khối, knowledge state ba lớp, CGBG/EiPE loop và SOLO taxonomy. **Không dùng số liệu trong
  file làm bằng chứng**; `literature-review.md` đã bác bỏ bốn nhóm số liệu. Chỉ dùng file làm
  bản đồ ý tưởng và thuật ngữ.
- `huong-dan-bat-dau-research.md` là cẩm nang từ RQ đến lộ trình bốn tuần và các lỗi cần tránh.
  File chốt cho hướng cũ, nhưng nguyên tắc freeze trước khi thu dữ liệu và không dùng proxy
  vẫn còn hiệu lực.
- `buoc-1-research-foundation-team-3-nguoi.md` là kế hoạch năm ngày để ba người đọc tám paper
  và kiểm chứng matrix. DoD 12 checkbox chưa tick; research foundation chưa chính thức xong.

### 2.2. Research artifacts (`docs/research/`)

- `protocol.md` có bốn fidelity metric, ngưỡng leakage dưới 10%, stop/go gate sáu điều kiện,
  quy tắc ethics/no-PII và within-subject four-sequence. Đây là draft v0.1 cho hướng cũ và
  **cần viết lại** trước study mới vì primary outcome và unit nghiên cứu đổi từ
  %KBR trong một phiên sang TransferScore ở cấp module/track.
- `prompt-spec.md` có common system prompt, context block và regression suite bảy case. File
  vẫn là draft, chưa chọn provider/model và cần mở rộng cho enactment slot-filling cùng khai
  báo "chưa được dạy".
- `instruments.md` có rubric năm nhãn, quy trình rater training, ngưỡng Krippendorff alpha,
  blueprint năm construct, transcript JSON schema v1, survey và mental-effort item. Đây là bản
  nháp tự khai, chưa qua content-validity review.
- `literature-review.md` tổng hợp sáu phát hiện, research gap và các confound phải khóa. Đây là
  rapid review, chưa phải systematic review theo PRISMA.
- `evidence-matrix.csv` có 20 nguồn E01–E20, gồm E05 AlgoBo, E12 Okita & Schwartz, E16
  HypoCompass và E19 isomorphic post-test. Matrix đã điền 20/20 nhưng chưa kiểm chứng chéo và
  thiếu cột `outcome` riêng.
- `search-log.md` lưu query, quy tắc giữ/loại và danh sách chưa được trích làm bằng chứng. File
  đang được cập nhật.
- Tám file `ghi-chu-paper-*.md` lưu ghi chú theo template. Hai file trọng tâm là
  `ghi-chu-paper-algobo.md` và `ghi-chu-paper-roscoe-chi.md`. Các ghi chú giữ trạng thái chưa
  xác minh khi thiếu nguồn; E17 hiện chỉ xác nhận được metadata do ACM trả về 403.

### 2.3. Khác

- `docs/README.md` là index và điểm bắt đầu để đọc bộ tài liệu nghiên cứu.
- `docs/superpowers/` chứa plan/spec housekeeping đổi tên file đã thực thi. Convention là tên
  file tiếng Việt dạng kebab-case; plan/spec đặt trong
  `docs/superpowers/{plans,specs}/YYYY-MM-DD-<slug>.md`.
- `frontend/AGENTS.md` đã lỗi thời ở phần styling; nguồn đúng là `frontend/DESIGN.md` và
  `frontend/app/globals.css`.

## 3. Mâu thuẫn và nợ tài liệu cần biết trước khi build

1. **Framing AI**: lớp B gọi AI là reviewer/practice partner; lớp C giữ AI
   apprentice bị giới hạn knowledge state. PRD theo lớp C, nhưng framing cần
   được phản biện trước study chính.
2. **Primary outcome**: `protocol.md` hiện đặt %KBR là primary; hướng hiện hành
   đề xuất TransferScore ở cấp module/track. Protocol phải được viết lại và
   freeze trước bất kỳ thu thập dữ liệu efficacy nào.
3. **UI dashboard hiện tại phản ánh hướng cũ**: 6 placeholder (Phiên dạy/Chủ đề/Lỗ hổng/Bài kiểm
   tra/Tiến độ/Cài đặt) mô tả pilot dạy thuật toán chat thuần. Khi build theo lớp C, thông tin
   trong các placeholder này chỉ là tham khảo, không phải cam kết scope.
4. **Chưa chọn LLM provider/model/temperature** — phải chốt và đóng băng trước fidelity test.
5. **Ethics/IRB chưa có** — mọi phiên thu dữ liệu người thật trước approval chỉ được là
   usability/fidelity pilot nội bộ.
6. **DoD research foundation chưa tick**; instruments chưa được review content validity.

## 4. Nguyên tắc bất biến (đã thống nhất xuyên suốt các lớp)

- Knowledge state **lưu ngoài model**, mỗi claim có turn nguồn (provenance).
- AI không leak đáp án chưa được dạy; không tự sửa lời giảng; giữ vai học trò toàn phiên.
- Không dùng số lượt chat / số từ / satisfaction làm bằng chứng learning.
- Hai condition nghiên cứu chỉ được khác **đúng một biến**: verified
  enactment–repair so với reflective teach-back.
- Freeze prompt/flow/instrument trước khi thu dữ liệu chính; mọi sửa đổi tạo version mới.
- Không thu PII/API key vào transcript; participant ID giả danh; công bố model snapshot.
- Sau khi bắt đầu thu dữ liệu chính: không sửa prompt, flow, cách đo.

## 5. Thứ tự đọc đề xuất cho người mới vào dự án

1. `tong-quan-huong-day-nguoc-ai.md` — hiểu cơ chế và research question hiện hành.
2. `dinh-huong-adaptive-learning-xuyen-suot-track.md` — learner model và policy.
3. `docs/prd-buoc-day-nguoc-ai.md` — scope sản phẩm cụ thể.
4. `research/prompt-spec.md` + `research/protocol.md` §7–8 — guardrail và fidelity.
5. `research/instruments.md` — rubric, schema export.
6. `ghi-chu-paper-algobo.md` — baseline `reflective` và knowledge state format.
7. Còn lại đọc khi cần trích dẫn.
