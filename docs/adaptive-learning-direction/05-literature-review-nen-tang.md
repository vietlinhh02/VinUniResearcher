# Literature synthesis cho reciprocal interaction loop

Corpus chi tiết nằm trong `06-evidence-matrix.csv`. Đây là bản tổng hợp để ra
quyết định thiết kế, chưa phải systematic review.

## Learning-by-Teaching cho biết điều gì?

Betty's Brain, nghiên cứu về protégé effect và meta-analysis của Kobayashi cho
thấy việc chuẩn bị để dạy và thực sự dạy có thể làm learner đầu tư effort, tổ
chức lại kiến thức và cải thiện một số learning outcome. Phần lớn bằng chứng
này có trước LLM hoặc nằm ngoài applied-AI labs.

Mentee giữ vai learner-as-teacher, nhưng không lấy literature làm bằng chứng
rằng prototype hiện tại chắc chắn hiệu quả. Learning outcome vẫn phải được đo
bằng task của learner.

Nguồn chính: Biswas et al. (2005), Chase et al. (2009), Kobayashi (2019).

## AlgoBo/TeachYou cung cấp nền tảng gần nhất

Jin et al. dùng Reflect–Respond để lưu knowledge state ngoài model. AlgoBo luân
phiên giữa help-receiver và questioner mode. Khi chuyển sang questioner mode, agent
hỏi `why/how` để learner giải thích sâu hơn.

Paper cho thấy condition TeachYou có knowledge-building density cao hơn trong
problem-solving phase (`d = 0.71`). Con số này không phải learning gain. Condition
cũng thay đổi cả Mode-shifting và Teaching Helper, nên không thể quy toàn bộ khác
biệt cho riêng tương tác hỏi ngược.

Mentee kế thừa external knowledge state, apprentice persona và reciprocal
response. Điểm cần làm rõ hơn AlgoBo là trace đầy đủ từ state tới AI response,
learner uptake và state revision tiếp theo.

Paper cũng báo LLM đôi khi ưu tiên kiến thức đúng phổ biến hơn misconception
learner vừa dạy. Prompt alone chưa đủ. State update và response đều cần
provenance, fidelity test và expert evaluation.

## Vì sao learner uptake quan trọng?

Roscoe và Chi phân biệt knowledge-telling với knowledge-building. Nhắc lại định
nghĩa hoặc thủ tục thuộc knowledge-telling; giải thích cơ chế, tạo kết nối, tự
sửa và suy ra hệ quả thuộc knowledge-building.

Deep reasoning questions có thể khơi gợi các hành vi này. Nhưng chỉ đếm câu hỏi
của AI chưa cho biết learner có tham gia vào loop hay không. Cần quan sát
learner uptake và xem lời giải thích mới có thay đổi knowledge state hoặc
unresolved target không.

Knowledge-building rate là process metric phù hợp. Nó chưa thay cho learning gain
hoặc independent transfer.

## Research gap hiện tại

Literature đã có bằng chứng cho Learning-by-Teaching, external knowledge state
và AI tutee chủ động hỏi. Corpus hiện chưa cho team một cách đã được kiểm chứng
để:

- nối AI response với target trong knowledge state;
- xác định learner turn nào là uptake của response;
- cập nhật state từ uptake;
- ghi target được giải quyết, giữ nguyên hay gán sai;
- đánh giá fidelity của cả vòng thay vì chỉ một model response.

Khoảng trống cho feasibility study là:

> Một AI apprentice có duy trì được reciprocal interaction loop có căn cứ trên
> knowledge state, trong đó AI response dẫn tới learner uptake và state revision có
> thể audit hay không?

Đây là extension của AlgoBo, không phải tuyên bố phát minh teachable agent,
knowledge state hoặc active questioning.

## Những paper khác giúp khóa thiết kế

HypoCompass cho thấy activity lập trình nên nhắm một cognitive skill hẹp, như
việc tạo giả thuyết lỗi, thay vì “debugging nói chung”. Mentee vì thế chọn một
objective và viết teaching map theo workflow của task.

Các thí nghiệm recursive feedback của Okita và Schwartz cho thấy tutor có thể
học từ việc quan sát pupil áp dụng điều đã được dạy. Cơ chế này đáng nghiên cứu,
nhưng khác reciprocal dialogue loop. Đưa enactment vào cùng feasibility pilot
sẽ khiến failure khó quy về một thành phần.

MatlabTutee và các LLM teachable-agent gần đây cho thấy khả năng triển khai trong
lớp CS. Novelty của Mentee không thể chỉ là “dùng LLM làm học trò”.

Các phân tích interaction log cho thấy constructive interaction có liên hệ với
improvement, nhưng correlation không phải causal effect. Số lượt chat, word count
và satisfaction chỉ là process hoặc UX metrics.

## Claims literature chưa hỗ trợ

- Mọi AI response đều tạo learner uptake.
- Một response có vẻ hay chắc chắn giải quyết được knowledge gap.
- Knowledge-building density tự động chuyển thành learning gain.
- LLM-generated knowledge state là ground truth về hiểu biết của learner.
- Một response taxonomy phù hợp với mọi domain.
- AI pass một task nghĩa là learner đã mastery.

## Contribution phù hợp với feasibility pilot

Nếu technical evaluation và pilot đạt gate, contribution nên được mô tả ở mức:

1. Một reciprocal loop cho post-lab teach-back bằng tiếng Việt.
2. External knowledge state và provenance xuyên suốt response, uptake và revision.
3. Một annotation scheme cho target, action, learner uptake và target transition.
4. Fidelity/feasibility data để chọn comparative research question tiếp theo.

Không ước lượng causal effect của policy từ single-condition pilot. Trước
manuscript, team vẫn cần systematic search, double screening, citation chaining và
risk-of-bias assessment.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Tổ chức evidence quanh loop | Response → uptake → revision |
| Inflation | Bỏ comparative causal claim | Feasibility contribution |
| Vocabulary | Thêm learner uptake | Không chỉ đếm AI questions |
| Rhythm/Style | Nối literature với quyết định | Một claim, một giới hạn |
