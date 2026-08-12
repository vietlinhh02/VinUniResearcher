# Định hướng AI Thực Chiến để trao đổi với mentor

Trạng thái: Bản thảo thảo luận — 25/07/2026.  
Mục đích: dùng trong buổi hỏi mentor/chị Ba trước khi đổi research question,
protocol và prototype hiện tại.

## 1. Vấn đề sản phẩm cần giải quyết

AI Thực Chiến không nhằm dạy người dùng chat nhiều hơn với AI, cũng không chỉ
nhằm biến AI thành một học trò.

Vấn đề cần giải quyết là:

> Người học AI, đặc biệt người non-tech, thường xem xong lesson nhưng không
> biến được kiến thức thành một workflow hoặc artifact hoạt động, không biết
> kiểm tra nó, và không tự sửa được khi yêu cầu thay đổi ở bài tiếp theo.

Sản phẩm cần đưa người học từ "đã xem tutorial" sang "đã làm được một việc AI
có tiêu chí kiểm chứng". API và code là một nhánh sau, không phải điều kiện để
bắt đầu học.

## 2. Đối tượng và track học

Một learning loop có thể dùng cho nhiều mức người học; chỉ artifact và scaffold
thay đổi theo track.

| Track | Ví dụ daily mission | Artifact cần nộp | Cách kiểm chứng |
|---|---|---|---|
| AI foundations/no-code | Tạo workflow trả lời khách hàng | Prompt, policy và test scenarios | Chạy các scenario cố định theo rubric |
| Workflow/low-code | Nối form với bước AI xử lý | Flow cấu hình và output format | Kiểm thử input/output và failure case |
| API | Gọi model và kiểm tra response | Project nhỏ có cấu hình secret an toàn | Test chạy, response đúng schema |
| Advanced | Xây RAG, agent hoặc evaluation | Repo, eval set và báo cáo trade-off | Quality, cost, grounding và safety rubric |

Người non-tech không bị buộc dùng API key hoặc viết code. Người đã biết code có
thể đi sang track API/advanced, nhưng vẫn dùng cùng vòng học cơ bản.

## 3. Core learning loop

```text
Chọn lesson hôm nay
  → làm một daily mission
  → tạo artifact có tiêu chí pass/fail
  → chạy test scenarios
  → giải thích hoặc bảo vệ quyết định quan trọng
  → AI hỏi bám vào artifact khi có lỗ hổng
  → sửa và xác nhận lại
  → hôm sau làm task biến thể để kiểm tra transfer
```

Ví dụ no-code: người học tạo workflow trợ lý chăm sóc khách hàng. AI không hỏi
"hãy dạy tôi prompt engineering" một cách chung chung; AI hỏi: "Nếu khách hỏi
ngoài chính sách đổi trả, workflow này phản hồi thế nào? Hãy chạy test case đó."

Ví dụ API: sau khi learner gọi API và nhận response, AI hỏi: "Nếu thiếu field
cần dùng, phần nào fail và bạn kiểm tra ở đâu?"

## 4. AI đóng vai gì?

Khuyến nghị: gọi AI là **AI practice partner** hoặc **AI reviewer**, không buộc
nó đóng vai AI học trò/người không biết gì.

AI cần có đủ context về mission, artifact, test result và requirement hiện tại để:

1. yêu cầu người học làm rõ một quyết định;
2. tạo scenario kiểm thử hoặc requirement biến thể;
3. chỉ ra chỗ artifact chưa thỏa acceptance criteria;
4. không tự làm hộ, không ném đáp án hoàn chỉnh khi người học chưa thử.

Người học vẫn có hoạt động *teach-back*: giải thích cách solution của mình hoạt
động và vì sao chọn cách đó. Nhưng UI nên gọi là "giải thích/defend solution",
không cần nói người học đang dạy AI.

## 5. Khác gì với TeachYou/AlgoBo?

| Khía cạnh | TeachYou/AlgoBo | AI Thực Chiến đề xuất |
|---|---|---|
| Vấn đề | Làm LLM trở thành teachable agent và khơi gợi knowledge-building | Biến lesson hằng ngày thành năng lực hoàn thành và điều chỉnh artifact thật |
| Nội dung | Một phiên Binary Search | Track nhiều lesson; pilot ban đầu chỉ chọn một micro-track |
| Vai AI | Học trò với knowledge state, mode-shifting và Teaching Helper | Practice partner/reviewer có context artifact và acceptance criteria |
| Can thiệp đang đo | Hai thành phần thay đổi cùng lúc: mode-shifting và Teaching Helper | Chỉ thay đổi policy câu hỏi bám artifact; lesson, rubric, sandbox và thời gian giữ cố định |
| Outcome | Knowledge-building density; không có pre/post learning gain trực tiếp | Verified artifact và next-day transfer là outcome sản phẩm; knowledge-building là process/mechanism |
| Người học | Algorithm novices có thể đọc/viết Python ngắn | Có thể bắt đầu bằng non-tech; code là track riêng |

TeachYou vẫn hữu ích như nền tảng: câu hỏi sâu có thể kích hoạt reflection và
knowledge-building. Tuy nhiên, nó không phải khuôn sản phẩm cần sao chép. Chi tiết
đã đối chiếu nằm trong [ghi chú AlgoBo](research/ghi-chu-paper-algobo.md).

## 6. Hướng nghiên cứu đề xuất

### 6.1. Câu hỏi trung tâm

> Với người mới học AI qua một daily mission không yêu cầu nền tảng code, AI
> practice partner đặt câu hỏi bám vào artifact vừa tạo có giúp họ điều chỉnh
> artifact cho một requirement biến thể ở bài hôm sau tốt hơn phản hồi thụ động
> không?

Đây là câu hỏi về **transfer sau thực hành**, không phải về việc AI hỏi nhiều hay
người học nói nhiều.

### 6.2. Giả thuyết và outcomes dự kiến

- **H1 đề xuất:** điểm verified next-day transfer của Active cao hơn Passive.
- **Secondary:** quality của artifact ban đầu, completion rate, mental effort,
  perceived usefulness và willingness to continue track.
- **Mechanism/process:** `knowledge_building_rate` trong phần learner giải thích và
  sửa solution.
- **Fidelity:** answer leakage, câu hỏi không bám artifact, persona drift, repetition
  và chênh lệch thời lượng giữa condition.

Không dùng số lượt chat, số từ, hoặc satisfaction làm bằng chứng thay thế cho skill.

### 6.3. Pilot tối thiểu

Không build toàn bộ platform và nhiều track trước khi có evidence.

1. Chọn **một track no-code entry-level** và hai daily missions tương đương.
2. Mỗi mission có acceptance criteria và test scenarios định trước.
3. Mỗi participant trải nghiệm Active và Passive trên hai mission; thứ tự được
   counterbalance.
4. Active chỉ thêm câu hỏi bám đúng artifact/test/requirement. Passive chỉ phản
   ánh hoặc hỏi clarification khi không hiểu input.
5. Ngày kế tiếp đưa một requirement biến thể để chấm transfer bằng rubric mù
   condition.
6. Chạy usability/fidelity trước, sau đó mới pilot 20–40 người.

Không trộn non-tech và developer vào cùng một pilot: họ có baseline, artifact và
thước đo khác nhau. Product có thể phục vụ cả hai, nhưng mỗi study chỉ nên có một
cohort/track rõ ràng.

## 7. Những gì cần quyết định sau buổi trao đổi

- [ ] Pilot đầu ưu tiên non-tech no-code hay API beginner?
- [ ] Daily mission đầu tiên là workflow nào và giá trị thực tế của nó là gì?
- [ ] Artifact nào đủ rõ để chấm pass/fail mà không cần chấm cảm tính?
- [ ] Transfer sẽ được đo sau một ngày thật hay trong phiên thứ hai mô phỏng ngày kế tiếp?
- [ ] H1 nên ưu tiên next-day transfer hay knowledge-building, xét giới hạn cỡ mẫu?
- [ ] Có cần giữ thuật ngữ Learning by Teaching trong proposal không, hay đổi sang
  adaptive reflective practice/artifact-grounded coaching?
- [ ] Ai sẽ rà content validity của missions, test scenarios và rubric?

## 8. Câu hỏi nên hỏi mentor/chị Ba

### Về vấn đề và người dùng

1. Vấn đề "xem tutorial nhưng không tự làm/sửa được artifact" có đủ rõ và đáng
   nghiên cứu cho đối tượng non-tech không?
2. Có nên định vị AI Thực Chiến là nền tảng học AI nói chung, hay chỉ là nơi học
   workflow AI phục vụ công việc?
3. Nhóm người dùng đầu tiên nên là sinh viên, người đi làm non-tech, hay người đã
   có trải nghiệm dùng AI nhưng chưa từng build workflow?
4. Một daily mission kéo dài bao lâu là hợp lý để tạo thói quen nhưng vẫn đủ tạo
   artifact có ý nghĩa?

### Về research contribution

5. Nếu bỏ vai AI học trò, contribution nên được gọi là *artifact-grounded adaptive
   questioning*, *adaptive reflective practice*, hay một framing khác?
6. Khoảng trống "câu hỏi bám artifact giúp next-day transfer" có đủ mới, đủ hẹp và
   đo được không?
7. Có hợp lý khi product phục vụ nhiều track nhưng research chỉ kiểm tra một
   no-code track đầu tiên không?
8. H1 nên là transfer score hay knowledge-building rate? Outcome còn lại nên là
   secondary hay exploratory?
9. Cần thêm literature nào ngoài teachable-agent/Learning by Teaching để bảo vệ
   framing mới: deliberate practice, retrieval practice, worked examples, reflection,
   self-regulated learning, hay microlearning?

### Về thiết kế và đo lường

10. Hai mission no-code nào đủ tương đương để dùng within-subject counterbalanced
    design mà không tạo chênh lệch độ khó?
11. Rubric transfer cần bao nhiêu tiêu chí để vừa đáng tin vừa không quá nặng khi chấm?
12. Có nên chấm artifact bằng test scenarios tự động, human rater mù condition, hay kết hợp cả hai?
13. Làm sao tách tác động của câu hỏi AI khỏi tác động của feedback kỹ thuật, starter
    template, scaffold và novelty của AI?
14. Với 20–40 người, kết luận nào là hợp lệ và kết luận nào phải để cho confirmatory study?
15. Có nên dùng delayed transfer sau 24 giờ thật? Nếu attrition cao, phương án thay thế hợp lý là gì?

### Về prototype và ethics

16. Prototype tối thiểu cần những phần nào: lesson, artifact editor, test scenario,
    chat, version history và export log?
17. Cần khóa model version, prompt, temperature và rubric ở mốc nào?
18. Nếu người học đưa API key, dữ liệu công việc hoặc thông tin nhạy cảm vào artifact,
    policy thu thập/xóa dữ liệu cần thiết là gì?
19. Khi nào AI được phép gợi ý, khi nào không được đưa đáp án để tránh answer leakage?
20. Tiêu chí stop/go nào chứng minh flow đã đủ usable để mời người tham gia thật?

## 9. Kết quả mong muốn của buổi trao đổi

Sau buổi trao đổi, cần chốt được đúng năm thứ:

1. Cohort đầu tiên.
2. Một track và hai daily missions cụ thể.
3. Artifact và acceptance criteria của từng mission.
4. H1/primary outcome của pilot.
5. Phạm vi prototype tối thiểu.

Chỉ sau đó mới thay [protocol hiện tại](research/protocol.md), instruments và prompt
spec. Không nên đổi tài liệu research thành hướng mới trước khi năm quyết định này được
mentor/chị Ba đồng ý.
