# PRD — Bước "Dạy ngược AI" (AI Apprentice) trên Mentee

Phiên bản: 0.1 — 26/07/2026. Trạng thái: bản thảo, viết theo **bộ quyết định làm việc** ở
`tong-quan-huong-day-nguoc-ai.md` §17 (mentor có quyền lật bất kỳ quyết định nào).

## 1. Bối cảnh và ranh giới sản phẩm

Hệ sinh thái hiện có **ba mảnh, Mentee chỉ làm mảnh thứ ba**:

- Trang học gồm slide/lesson buổi sáng nằm trên web học riêng. Mentee chỉ liên kết tới đó.
- Web lab có starter code, public tests, `grade.py` và chức năng nộp bài. Mentee không xây lại
  sandbox hoặc auto-grader. Ví dụ hiện tại là K4 Day 01 LLM API.
- **Bước dạy ngược AI** nằm trong Mentee và là toàn bộ phạm vi PRD này: học viên dạy AI
  apprentice, AI enact, hidden runner chấm, học viên sửa lời dạy rồi làm transfer card.

Nguyên tắc từ tài liệu định hướng (§2): *không lấy việc xây sandbox hoặc auto-grader mới làm
contribution*. Người học làm lab ở môi trường sẵn có; Mentee bắt đầu từ thời điểm học viên
**đã có artifact** và chuyển sang hoạt động dạy ngược.

### 1.1. Vấn đề

Học viên xem lesson và hoàn thành lab nhưng kiến thức không chuyển thành khả năng tự áp dụng
vào task biến thể (transfer). Cơ chế can thiệp: buộc học viên **dạy** một AI apprentice các rule
họ vừa dùng trong lab, **quan sát AI áp dụng** rule đó vào một micro-task tương đương (isomorphic)
được chấm bằng hidden test, và **sửa lời dạy** khi AI fail.

### 1.2. Mục tiêu

1. **Sản phẩm**: một flow "dạy ngược AI" hoàn chỉnh cho Day 01 (LLM API), chạy lại được cho mọi
   Day khác chỉ bằng cách thêm Lab Teaching Spec — không code mới.
2. **Nghiên cứu**: cùng một hệ thống chạy được 2 condition (`enactment` vs `reflective`) khác
   nhau đúng một biến (có verification hay không), đủ chuẩn để chạy pilot 5–8 người rồi study
   ~120 người; log đủ cho bài báo 1 (system + fidelity, nhắm L@S/ITiCSE).

### 1.3. Non-goals (chốt cứng)

- Không xây trang lesson, không xây lab/sandbox/IDE, không chấm điểm lab.
- Không cho LLM tự sinh Lab Teaching Spec (research riêng, §13.4 tài liệu định hướng).
- Không cho AI apprentice sinh code tự do — chỉ **điền slot trong template**.
- Không dùng số lượt chat/số từ làm metric thành công.
- Không thu PII, API key, clipboard vào transcript.
- Không claim "đầu tiên làm teachable agent cho lập trình" ở bất kỳ đâu (marketing lẫn paper).

## 2. Người dùng

- **Học viên K4** đã làm lab buổi chiều cần dạy AI bằng tiếng Việt lẫn thuật ngữ Anh, thấy AI
  tiến bộ thật và không gặp tình trạng AI "diễn kịch" hoặc leak đáp án.
- **Nhà nghiên cứu / TA** cần soạn và duyệt Lab Teaching Spec, gán condition, theo dõi fidelity
  và export dữ liệu giả danh.
- **Mentor** cần xem tổng quan thiết kế và có quyền lật quyết định trước khi thu dữ liệu chính.

## 3. Luồng người dùng (học viên)

Tương ứng §14.1 tài liệu định hướng, đã cắt phần thuộc web lab:

```text
0. Vào Mentee sau khi làm lab, chọn Day (vd. Day 01) — link lesson/lab chỉ để tham chiếu
1. Framing: "bạn sẽ dạy một AI apprentice, và nó sẽ bị test trên bài khác"
   (bắt buộc, cả 2 condition)
2. Pre-test ngắn (6–8 item bám learning objective + prior experience)
3. Với từng ĐIỂM NEO của Day (Day 01 có 2: system-vs-user, streaming/retry):
   a. Học viên phát biểu rule theo khuôn:  Khi [___] thì [___] vì [___]   (song ngữ Việt–Anh)
   b. Knowledge state lưu rule + nguồn evidence
   c. AI apprentice nhắc lại điều được dạy, khai báo phần chưa hiểu
   d. "AI practice check": AI nhận template isomorphic có 2–3 slot khuyết
      - enactment:  AI điền slot CHỈ từ knowledge state; slot chưa dạy → để trống + khai báo
                    "chưa được dạy"; hidden runner assert các slot thuộc objective
                    → pass/fail + trace tối thiểu (tên assertion, expected vs actual)
      - reflective: AI nhận CÙNG template, nói thành lời sẽ điền gì và vì sao — không runner
   e. Nếu fail (enactment): học viên sửa/bổ sung rule → AI thử lại, tối đa 2 vòng
4. Transfer card ngay cuối buổi (25', 7 điểm, KHÔNG có AI hỗ trợ) — primary outcome
5. Exit survey: credibility, mental effort (1–9), boredom
6. +7 ngày: delayed transfer card (20') — secondary
```

Hai condition giữ cố định mọi thứ (persona, template, số điểm neo, thời lượng, knowledge-state
format); khác **đúng một thứ: có verification hay không**. Đây là feature flag ở backend, không
phải hai app.

## 4. Yêu cầu chức năng

### F1 — Lab Teaching Spec (nội dung điều khiển toàn bộ engine)

- Spec dạng YAML/JSON theo schema §13.3 tài liệu định hướng: `learning_objectives`,
  `teaching_input` (khuôn when_then_because, song ngữ), `blocks` (cờ `anchor`), `decision_cards`
  (tham chiếu — phần guided coding thuộc web lab, Mentee chỉ cần biết block/objective),
  `enactment_template` (slots, `maps_to_rule`, `assert`, `unteachable_slots_policy:
  leave_blank_and_declare`, `runner_scope: assert_only_slots_in_objective`,
  `max_repair_rounds: 2`, `reflective_variant`), `transfer_card` (4 phần A–D,
  `must_not_share_assertions_with`).
- Import qua file + validate schema; version hóa (spec đóng băng theo version khi thu dữ liệu).
- Spec Day 01 do người soạn (nhóm nghiên cứu), có bước duyệt; **không** sinh tự động.
- Distractor/misconception trong spec Day 01 lấy từ log lỗi K4 cũ (việc #2 §17.4).

### F2 — Phiên dạy & Knowledge State

- Tạo phiên dạy theo (user, day, condition); condition do server gán, học viên không thấy tên
  condition.
- Input dạy: form 3 ô "Khi — thì — vì" (không free text hoàn toàn — quyết định #6 §17.1);
  validate ô "vì" không rỗng; cho phép tiếng Việt lẫn thuật ngữ Anh.
- Knowledge state lưu **ngoài model**: mỗi claim = rule + turn nguồn + block/evidence tham chiếu;
  format JSON kiểu AlgoBo (`facts` + phần ánh xạ slot). Cập nhật sau mỗi lượt dạy.
- Transcript đầy đủ từng lượt theo schema JSON v1 (`instruments.md`), thêm trường cho
  enactment attempt.

### F3 — AI Apprentice (agent service)

- System prompt theo `prompt-spec.md`: vai sinh viên mới học, **chỉ dùng KNOWLEDGE_STATE**, không
  leak đáp án/code/step chưa dạy, nêu mâu thuẫn nhưng không tự chọn đúng, tối đa 2 câu, giữ vai
  toàn phiên; chịu được prompt injection/persona bait.
- Context block backend cung cấp: `TOPIC / LESSON_PATH / KNOWLEDGE_STATE / COUNTER /
  CURRENT_TUTOR_TURN` (+ `TEMPLATE` khi enact).
- Hai hành vi tại điểm neo theo condition (điền slot vs verbalize) — cùng prompt nền.
- Model/provider/temperature chọn một lần, ghi model snapshot + ngày + config vào mỗi phiên;
  đổi config → version mới.

### F4 — Enactment Runner (chỉ condition `enactment`)

- Nhận template + slot đã điền, assert **chỉ các slot thuộc objective** (`runner_scope`), bỏ qua
  phần còn lại; slot khai báo "chưa được dạy" không bị tính fail vì lý do rác.
- Trả pass/fail + trace tối thiểu: tên assertion, expected vs actual. Không stack trace dài,
  không gợi ý sửa.
- Chạy cô lập (không nhận API key người học; template Day 01 assert cấu trúc
  message/tham số — không cần gọi LLM API thật trong runner).
- Giới hạn 2 vòng repair mỗi điểm neo (đếm và log `RepairCount`).

### F5 — Transfer Card

- Immediate (cuối buổi) và delayed (+7 ngày, nhắc qua email), cấu trúc 7 điểm:
  A chọn+giải thích (2đ) / B điền function body (2đ) / C debug (1đ) / D giải thích mở rubric mù
  (0–2đ).
- **Khóa AI hoàn toàn** cho đến khi submit; log keystroke/timestamp (thời gian đến submit đầu,
  số lần sửa, thứ tự A→B→C) — việc #2 §17.2.
- Hidden test của transfer card **khác điểm assert** với enactment template (enforce bằng
  `must_not_share_assertions_with` khi validate spec).
- Phần A/B/C chấm tự động bằng hidden test; phần D xuất ra cho rater chấm mù ngoài hệ thống.

### F6 — Fidelity Harness (chạy như CI, không phải checklist)

- Regression suite 7 case của `prompt-spec.md` (chưa-được-dạy / lời giảng ngắn / claim hợp lệ /
  misconception / edge case / prompt injection / persona bait), mỗi condition ≥ 3 lần với config
  đóng băng; chạy trước mỗi đợt thu dữ liệu và khi đổi prompt/model.
- Online check trên **mọi** agent turn trong pilot: answer-leakage filter (rule-based + LLM
  judge), groundedness (claim trong response phải truy về knowledge state), persona drift,
  redundant question. Log để ra được bảng kiểu "leakage rate X% qua N turn".
- Ngưỡng: leakage > ~5% số turn → dừng, ưu tiên sửa guardrail (ngưỡng đổi hướng §6.2).

### F7 — Research Console (TA/researcher)

- Gán/luân phiên condition; danh sách phiên + trạng thái; dashboard fidelity.
- Export dataset giả danh: transcript, knowledge state, enactment attempts, transfer submissions,
  survey — đúng quy tắc no-PII; participant ID không chứa mã sinh viên.
- Quản lý spec version, prompt version, model snapshot.

### F8 — Nền tảng kỹ thuật (nợ hiện tại phải trả trước)

- Thêm middleware auth tái sử dụng và user trong `context.Context`. Hiện `Authenticate` chỉ
  được gọi trong handler `me`, trong khi mọi endpoint mới đều cần xác thực.
- Bảo vệ `GET /api/v1/users/{id}` vì endpoint đang public và làm lộ email.
- Thêm LLM client và các biến `LLM_PROVIDER`, `LLM_API_KEY`, `LLM_MODEL`,
  `LLM_TEMPERATURE` vào `internal/config` và `.env.example`.
- Nới `WriteTimeout` hoặc dùng timeout riêng cho route SSE vì giới hạn 10 giây hiện tại sẽ cắt
  stream phản hồi AI.
- Mở rộng `lib/api.ts` với `getJSON`, PATCH/DELETE và SSE helper; hiện file chỉ có `postJSON`.
- Thêm `_test.go` cho auth service và các module mới; chuyển fidelity suite thành test chạy
  được. Repo hiện chưa có test.

## 5. Data model đề xuất (migration `000003+`)

```text
lab_specs        (id, slug, version, spec_jsonb, status[draft|frozen], created_by, timestamps)
participants     (id, user_id FK, pseudonym_code UNIQUE, condition[enactment|reflective], cohort)
teaching_sessions(id, participant_id FK, lab_spec_id FK, phase[pretest|teaching|transfer|delayed],
                  started_at, ended_at, model_snapshot, prompt_version)
turns            (id, session_id FK, idx, role[tutor|apprentice|system], text, counter, created_at)
claims           (id, session_id FK, block_id, when_text, then_text, because_text,
                  source_turn_id FK, slot_ids[], created_at)          -- knowledge state
enactment_attempts(id, session_id FK, anchor_block_id, round[1|2],
                  filled_slots_jsonb, declared_untaught[], runner_result[pass|fail|skipped],
                  trace_jsonb, created_at)
transfer_submissions(id, participant_id FK, kind[immediate|delayed], part[A|B|C|D],
                  answer_jsonb, auto_score, events_jsonb /*keystroke/timestamps*/, submitted_at)
surveys          (id, participant_id FK, kind[pretest|exit|comparison], answers_jsonb)
fidelity_events  (id, turn_id FK, check[leakage|grounded|persona|redundant],
                  verdict, judge_meta_jsonb, created_at)
```

Ràng buộc: bảng nối user↔pseudonym tách khỏi dataset export; export mặc định chỉ dùng
`pseudonym_code`.

## 6. API đề xuất (theo convention module `internal/modules/<name>/`)

```text
POST   /api/v1/specs                     (researcher) import + validate spec
POST   /api/v1/specs/{id}/freeze
POST   /api/v1/sessions                  tạo phiên (server gán condition)
GET    /api/v1/sessions/{id}
POST   /api/v1/sessions/{id}/turns       lượt dạy (khuôn khi–thì–vì) → phản hồi apprentice
POST   /api/v1/sessions/{id}/enact       chạy practice check tại điểm neo (theo condition)
POST   /api/v1/sessions/{id}/repair      vòng sửa (tối đa 2)
POST   /api/v1/transfer/{kind}/submit    nộp transfer card, kind=immediate|delayed
POST   /api/v1/surveys
GET    /api/v1/research/export           (researcher) dataset giả danh
GET    /api/v1/research/fidelity         (researcher) dashboard số liệu
```

## 7. Frontend (Next.js hiện có)

- `/dashboard` nối số liệu thật (phiên, điểm neo hoàn thành, transfer đến hạn).
- `/dashboard/sessions` → flow phiên dạy: form "Khi–thì–vì", panel knowledge state (AI "đã học
  gì"), khung chat apprentice, màn practice check (kết quả runner hoặc verbalization tùy
  condition — UI không đặt tên condition).
- Trang transfer card riêng, chặn điều hướng về chat khi đang làm, log events.
- Các placeholder cũ (`topics/gaps/quizzes/progress`) giữ nguyên "Đang phát triển" — thuộc hướng
  cũ, ngoài scope PRD này.

## 8. Đo lường thành công

**Sản phẩm/pilot (bài báo 1 — không phụ thuộc kết quả học tập):**

- Export transcript hợp lệ trong 10/10 phiên thử.
- PII trong export mặc định bằng 0.
- Answer leakage dưới 5% agent turn; protocol gate hiện tại là dưới 10%.
- Pilot 5–8 người cho thấy học viên điền khuôn "Khi–thì–vì" tự nhiên. Tỉ lệ ô "vì" bỏ trống
  hoặc điền lấy lệ sẽ được đo ở pilot rồi mới chốt ngưỡng.
- Mỗi failure của runner truy được về đúng một slot và một rule trong 100% trường hợp. Ràng
  buộc này phải được kiểm tra bằng test.
- Fidelity suite bảy case pass toàn bộ trước mỗi đợt thu dữ liệu.

**Nghiên cứu (bài báo 2 — ngoài scope build nhưng hệ thống phải log đủ):** primary = hidden
`TransferScore` cuối buổi; secondary = delayed +7 ngày, %KBR, AgentPassRate, RepairCount
(process only). Không nâng process metric thành outcome.

## 9. Lộ trình

- **M0 — Nền tảng:** auth middleware, bảo vệ users endpoint, LLM client/config và spec loader
  có validation.
- **M1 — Phiên dạy:** form "Khi–thì–vì", knowledge state, apprentice chat chưa có enactment và
  transcript log. Phụ thuộc M0.
- **M2 — Enactment:** template slot-filling, runner/trace, repair loop và feature flag
  `reflective`. Phụ thuộc M1 và bản nháp spec Day 01.
- **M3 — Transfer & survey:** transfer card immediate/delayed, khóa AI, event log và survey.
  Phụ thuộc M2.
- **M4 — Fidelity & console:** seven-case suite, online checks, export và dashboard. Phụ thuộc
  M2.
- **M5 — Pilot 5–8 người:** kiểm tra khuôn dạy có tự nhiên không và thu số liệu fidelity thật.
  Phụ thuộc M3, M4 và spec Day 01 đã duyệt.

Việc nội dung chạy song song (không chặn code): đào log lỗi K4 cũ → viết distractor/misconception
→ viết Lab Teaching Spec Day 01 đầy đủ → nhờ giảng viên/TA rà content validity.

## 10. Rủi ro & câu hỏi mở

1. **Mentor chưa duyệt hướng:** framing apprentice/reviewer và primary outcome còn mở. Nhóm
   build theo bộ quyết định §17, version hóa mọi thứ để có thể lật và gửi tài liệu cùng PRD cho
   mentor sớm.
2. **Tích hợp web lab:** Mentee cần biết học viên đã làm block hoặc evidence nào. Phase 1 chạy
   standalone; học viên tự vào Mentee sau lab và spec tự mô tả block. Import test output hoặc
   checkpoint để sau.
3. **Agent leak đáp án:** chạy fidelity harness như CI. Nếu leakage vượt 5%, dừng và ưu tiên
   leakage-control.
4. **Khuôn "Khi–thì–vì" quá gò bó:** đo trực tiếp ở M5. Fallback là chuyển thành gợi ý và quay
   lại pilot extraction free-text ở §16.6.
5. **Ethics/IRB là bottleneck lịch:** hỏi quy trình ngay theo việc #4 §17.4. Trước approval chỉ
   chạy pilot usability/fidelity nội bộ.
6. **Delayed transfer attrition:** immediate là primary; delayed chỉ là secondary.
7. **Chưa chọn LLM provider/model:** chốt ở M0, ghi snapshot vào mọi phiên và chạy lại fidelity
   suite khi thay đổi.
