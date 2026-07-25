# Protocol pilot: AI học trò hỏi ngược khi học thuật toán

Phiên bản: 0.1 — phải đóng băng và preregister trước khi thu dữ liệu chính.

## 1. Mục tiêu

Ước lượng tác động của việc AI học trò chủ động hỏi làm rõ, hỏi lý do và đưa edge case lên độ sâu
lời giải thích của sinh viên khi dạy thuật toán bằng tiếng Việt.

Đây là feasibility/exploratory pilot. Cỡ mẫu 20–40 không được dùng để tuyên bố hiệu quả giáo dục
tổng quát hoặc thay thế một confirmatory study đã được power analysis.

## 2. Câu hỏi và giả thuyết

- RQ1: Active tutee có làm tăng tỷ lệ knowledge-building utterances so với passive tutee không?
- RQ2: Active tutee có tạo learning gain lớn hơn không?
- RQ3: Active tutee ảnh hưởng thế nào đến effort, cognitive load và trải nghiệm?
- RQ4: Agent giữ vai học trò tốt đến đâu ở mỗi điều kiện?

Giả thuyết chính H1: tỷ lệ knowledge-building utterances trong active condition cao hơn passive
condition. RQ2–RQ4 là exploratory; không điều chỉnh câu chuyện nghiên cứu sau khi xem kết quả.

## 3. Thiết kế

Within-subject, hai phiên, counterbalanced theo topic, condition và order.

| Sequence | Phiên 1 | Phiên 2 |
|---|---|---|
| S1 | Binary Search — Active | Selection Sort — Passive |
| S2 | Binary Search — Passive | Selection Sort — Active |
| S3 | Selection Sort — Active | Binary Search — Passive |
| S4 | Selection Sort — Passive | Binary Search — Active |

Phân sequence theo vòng lặp S1–S4 sau khi xáo trộn danh sách participant ID. Mỗi sequence lệch
không quá một người. Người chấm transcript không được biết condition.

## 4. Người tham gia

### Inclusion

- Từ 18 tuổi và đồng ý tham gia.
- Sinh viên đã học biến, điều kiện và vòng lặp.
- Đọc và viết tiếng Việt đủ để giải thích thuật toán.
- Chưa tự đánh giá là thành thạo cả Binary Search và Selection Sort.

### Exclusion và attrition

- Không hoàn thành cả hai phiên: không vào paired primary analysis nhưng vẫn báo cáo attrition.
- Transcript mất trên 25% lượt vì lỗi kỹ thuật: không vào transcript analysis.
- Không loại người chỉ vì điểm thấp, giải thích sai hoặc không thích AI.
- Mọi exclusion phải ghi lý do trước khi mở condition trong dữ liệu chấm.

## 5. Intervention

Cả hai condition có cùng persona, giao diện, thời gian, lesson path và knowledge-state format.

### Passive tutee

- Chỉ phản ánh điều đã nghe và yêu cầu người học tiếp tục.
- Có thể hỏi định nghĩa khi đầu vào không thể diễn giải.
- Không chủ động hỏi `why/how`, edge case hoặc phản ví dụ.

### Active tutee

- Phản ánh điều đã nghe như passive condition.
- Sau mỗi 2–3 lượt, chọn đúng một chiến lược: clarification, elaboration, connection hoặc edge case.
- Câu hỏi phải trỏ tới một claim cụ thể trong lượt hiện tại hoặc knowledge state.
- Không đưa đáp án, pseudocode hoàn chỉnh hoặc tự sửa lời giảng.

## 6. Procedure

1. Consent, demographic tối thiểu và participant ID giả danh: 5 phút.
2. Pre-test cho cả hai topic: 10 phút.
3. Đọc learning sheet của topic phiên 1: 8 phút.
4. Dạy AI: 12 phút hoặc tối thiểu 6 tutor turns.
5. Post-test topic phiên 1 và survey condition: 8 phút.
6. Nghỉ 3 phút.
7. Lặp lại bước 3–5 cho topic và condition còn lại.
8. Survey so sánh và phỏng vấn ngắn: 5–10 phút.

Tổng thời gian dự kiến: 60–70 phút/người.

## 7. Outcomes

### Primary

`knowledge_building_rate = số tutor utterances thuộc elaboration hoặc sense-making / tổng tutor
utterances có nội dung học thuật`.

Hai người chấm độc lập toàn bộ transcript sau khi xóa nhãn condition và lời AI nếu cần thiết để
giảm nhận diện điều kiện. Báo cáo Krippendorff's alpha; không chỉ báo cáo phần trăm đồng thuận.

### Secondary

- Gain score theo topic: post-test trừ pre-test.
- Near-transfer correctness và explanation score.
- Số từ/tutor turn và số tutor turns, chỉ là engagement proxy.
- Mental effort một câu 1–9 sau mỗi phiên.
- Perceived learning, frustration và willingness to reuse, mỗi mục 1–7.

### Fidelity

- Answer leakage: AI đưa trực tiếp lời giải chưa được người học dạy.
- Persona drift: AI chuyển sang vai giáo viên/chuyên gia.
- Ungrounded question: câu hỏi không gắn với claim hoặc topic đang dạy.
- Repetition: lặp lại cùng ý hỏi mà không dùng câu trả lời mới.

## 8. Analysis plan

1. Tính participant-level difference `Active - Passive` cho primary outcome.
2. Báo cáo median, IQR, mean, SD, paired effect size và bootstrap 95% CI.
3. Dùng exact paired permutation test làm kiểm định chính vì mẫu nhỏ và tỷ lệ bị chặn 0–1.
4. Phân tích gain score tương tự nhưng ghi rõ exploratory.
5. Mô tả kết quả riêng theo topic và order để phát hiện topic/carryover imbalance.
6. Không đổi outcome, exclusion hoặc hướng kiểm định sau khi xem condition results.
7. Không diễn giải `p > .05` thành “hai điều kiện tương đương”.

Sau pilot, dùng variance, within-person correlation, attrition và fidelity thu được để power
analysis cho confirmatory study. Không lấy effect size quan sát đơn lẻ làm ước lượng chắc chắn;
dùng sensitivity range và hiệu ứng tối thiểu có ý nghĩa giáo dục.

## 9. Data management và ethics

- Xin phê duyệt ethics/IRB của đơn vị trước recruitment.
- Consent nêu rõ nghiên cứu dùng AI, dữ liệu chat được lưu và quyền rút lui.
- Participant ID không chứa mã sinh viên; bảng liên kết danh tính lưu riêng nếu thật sự cần.
- Không thu tên, email, số điện thoại hoặc API key trong transcript.
- Mã hóa storage, giới hạn người truy cập và đặt ngày xóa dữ liệu trước recruitment.
- Không dùng kết quả ảnh hưởng điểm học phần.
- Công bố model/provider/version, system prompt, temperature và thời điểm chạy.

## 10. Stop/go gate

Chỉ chuyển từ usability pilot sang thu dữ liệu khi:

- 10/10 phiên thử export transcript hợp lệ.
- Không có PII trong JSON export mặc định.
- Answer leakage dưới 10% agent turns trong test script cố định.
- Hai rater đạt alpha từ 0.67 ở vòng luyện tập và giải quyết được bất đồng rubric.
- Pre/post-test được ít nhất hai giảng viên rà soát content validity.
- Có phê duyệt ethics hoặc văn bản xác nhận không cần review theo quy định của đơn vị.
