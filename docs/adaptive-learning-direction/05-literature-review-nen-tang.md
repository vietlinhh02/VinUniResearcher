# Literature synthesis và quyết định cho Mentee product-first

Corpus chi tiết nằm trong `06-evidence-matrix.csv`. Đây là synthesis phục vụ quyết
định build, không phải systematic review hoàn chỉnh.

## 1. Learning-by-Teaching có cơ sở, nhưng không bảo đảm mọi chatbot đều hiệu quả

Betty's Brain, protégé effect và meta-analysis của Kobayashi cho thấy chuẩn bị để
dạy và thực sự dạy có thể hỗ trợ nỗ lực, tổ chức kiến thức và learning outcome.
Tuy nhiên phần lớn bằng chứng có trước LLM hoặc nằm ngoài lab AI thực chiến.

Quyết định:

- Giữ vai learner-as-teacher.
- Không claim efficacy chỉ từ literature.
- Đo task transfer của learner trong chính domain mục tiêu.

Nguồn chính: Biswas et al. (2005), Chase et al. (2009), Kobayashi (2019).

## 2. AI apprentice cần knowledge boundary có thể kiểm tra

TeachYou/AlgoBo dùng knowledge state ngoài model với pipeline Reflect–Respond.
Technical evaluation cho thấy hành vi agent thay đổi theo seed state, nhưng paper
cũng báo variance, prompt sensitivity, repetitive questions và xu hướng ưu tiên
kiến thức đúng phổ biến hơn misconception learner vừa dạy.

Quyết định:

- State lưu ngoài model.
- Learner xác nhận claims trước enactment.
- Mỗi action dẫn claim nguồn.
- Có fidelity regression; prompt instruction một mình không đủ.

Nguồn chính: Jin et al. (CHI 2024).

## 3. `why/how` hỗ trợ knowledge-building, không phải bằng chứng learning gain

TeachYou thấy condition có Mode-shifting và Teaching Helper tạo knowledge-building
density cao hơn (`d = 0.71`). Hai component thay đổi cùng lúc và study không đo
pre/post learning gain trực tiếp.

Quyết định:

- Apprentice chỉ hỏi câu làm rõ bám claim/schema field thiếu.
- Không ép tần suất cố định cho mọi task.
- Không dùng số câu hỏi hoặc số lượt chat làm outcome.

## 4. Recursive feedback là cơ sở trực tiếp cho verified enactment

Okita và Schwartz định nghĩa recursive feedback là việc tutor quan sát pupil dùng
điều đã được dạy. Trong các thí nghiệm của họ, recursive feedback hỗ trợ transfer
tốt hơn các control thiếu cơ chế này.

Quyết định:

- AI phải thực hiện hành vi quan sát được, không chỉ nhắc lại lời learner.
- Runner evidence phải cho learner thấy hậu quả của lời dạy.
- Comparator research phù hợp là reflective teach-back không có verified
  enactment–repair.

Nguồn chính: Okita & Schwartz (2013).

## 5. Applied programming cần nhắm một cognitive skill đủ hẹp

HypoCompass không dạy “debugging nói chung”. Nó tập trung vào comprehensive và
accurate hypothesis construction, dùng cognitive debugging model, test cases và
immediate feedback. Các subtask không thuộc objective được giao cho agent. Study
19 người có pre/post improvement nhưng không có control group, nên chỉ hỗ trợ
feasibility chứ chưa kết luận nhân quả.

Quyết định:

- Mỗi session chỉ nhắm một objective hẹp.
- Teaching Schema phải xuất phát từ cognitive workflow của task.
- Runner và transfer phải align đúng objective.
- Offload phần không thuộc objective khi việc đó giảm extraneous load.

Nguồn chính: Ma et al. (AIED 2024).

## 6. LLM tutee trong lớp CS khả thi nhưng không còn là novelty

MatlabTutee được phát triển và triển khai qua nhiều thí nghiệm trong lớp CS đại
học. Vì vậy Mentee không tuyên bố là LLM teachable agent đầu tiên. Khác biệt cần
kiểm tra nằm ở artifact grounding, structured enactment, verification và repair.

Nguồn chính: Rogers et al. (CHI 2025).

## 7. Chất lượng interaction quan trọng hơn engagement thô

Các nghiên cứu về conversational/teachable agents cho thấy satisfaction, độ dài
hội thoại hoặc cảm giác hữu ích không ổn định với learning gain. Phân tích log cho
thấy constructive interaction liên quan tới improvement, nhưng quan sát tương quan
không chứng minh nhân quả.

Quyết định:

- Process metrics dùng để giải thích cơ chế và debug sản phẩm.
- Independent transfer là learning outcome chính.
- Tránh quiz dễ gây ceiling effect.

Nguồn chính: Love et al. (2025), Liu et al. (2025), Shahriar et al. (2026),
Arun et al. (2025 preprint).

## 8. Scaffold phải có nhưng nên fade

Người học có thể không biết “dạy như thế nào”; free-form hoàn toàn gây blank-page
problem. Nhưng một sentence frame chung như `Khi–thì–vì` không phản ánh đầy đủ
debugging, evaluation, safety hoặc system design.

Quyết định:

- Dùng schema family theo task.
- Guidance/examples thuộc author spec.
- Có thể giảm guidance theo proficiency về sau.
- Chưa claim adaptive fading trước khi learner model được validate.

## 9. Những gì literature chưa hỗ trợ

- Không có bằng chứng để coi AI pass là mastery.
- Không có cơ sở dùng một learner-state machine chung cho mọi skill AI thực chiến.
- Chưa có bằng chứng rằng scheduler xuyên track tạo learning gain trong thiết kế này.
- Chưa có paper xác nhận schema `Khi–thì–vì` cho mọi applied-AI task.
- Chưa có bằng chứng nhân quả trực tiếp cho tổ hợp artifact-grounded knowledge
  state + verified enactment + repair trong nhiều lab AI thực chiến.

## 10. Research gap và contribution an toàn

> Mentee đóng góp một engine spec-driven cho nhiều applied-AI labs, trong đó LLM
> apprentice enact confirmed learner reasoning trên task biến thể có verification;
> research đánh giá fidelity, usability và liệu repair từ verified recursive
> feedback có cải thiện independent transfer so với reflective teach-back.

Đây là extension và kiểm tra cơ chế. Không tuyên bố phát minh Learning-by-Teaching,
teachable agent, knowledge state hoặc automated testing.

## 11. Nguồn cần đọc trước khi freeze study

1. Jin et al. 2024 — TeachYou/AlgoBo.
2. Okita & Schwartz 2013 — recursive feedback.
3. Ma et al. 2024 — HypoCompass.
4. Rogers et al. 2025 — MatlabTutee.
5. Kobayashi 2019 — meta-analysis Learning-by-Teaching.
6. Roscoe & Chi 2007 — knowledge-telling vs knowledge-building.

Trước manuscript cần systematic search có protocol, double screening, citation
chaining và risk-of-bias assessment; evidence matrix hiện tại chỉ là rapid review.
