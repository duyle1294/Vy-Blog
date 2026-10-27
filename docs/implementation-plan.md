# Implementation Plan — Real Project, Phase 1

> Trạng thái: sẵn sàng cho implementation. Phạm vi public-site UI-only, theo `project-kickoff.md`, `architecture.md`, `page-spec.md`, `content-contract.md` và `agent-work-orders.md`.

## Mục tiêu bàn giao

Thay prototype HTML tĩnh bằng website Nuxt 4 + TypeScript + Tailwind CSS gồm Home, Blog List, Blog Detail, About và Contact; có mock content có kiểu dữ liệu, responsive, accessible và sẵn sàng cho Vy review qua preview deployment. Không triển khai backend/CMS trong phase này.

## Quy tắc điều phối agents

- Mỗi work order trong `agent-work-orders.md` là một phạm vi độc lập; agent chỉ sửa file thuộc phạm vi được giao.
- Agent triển khai đọc `.github/copilot-instructions.md`, `docs/feedback-vy.md`, `docs/project-kickoff.md`, `docs/architecture.md`, `docs/page-spec.md`, `docs/content-contract.md` trước khi sửa code.
- Một integration owner duy nhất quản lý `package.json`, lockfile, `nuxt.config.ts`, root app shell và tích hợp các nhánh. Không để nhiều agents cùng sửa các file này.
- Chốt types, tokens, component props và route behavior trước khi giao page work song song. Khi cần đổi contract, cập nhật tài liệu trước rồi thông báo các agents.
- Mỗi agent trả lại: file đã đổi, quyết định/giả định, lệnh kiểm tra đã chạy, kết quả và blocker.
- Nếu phát hiện mâu thuẫn giữa tài liệu, dừng phần bị ảnh hưởng và nêu câu hỏi; không tự ý mở rộng scope.

## Trình tự và dependencies

| Mốc | Work order | Phụ thuộc | Kết quả |
| --- | --- | --- | --- |
| 0. Khởi tạo nền | `WO-01` | Không | Nuxt 4 app, TypeScript, Tailwind, scripts, chạy được dev/build |
| 1. Contract & shell | `WO-02` | WO-01 | Tokens, types, mock content, global layout, header/footer/menu |
| 2. Trang chính | `WO-03` | WO-02 | Home hoàn chỉnh theo garden + travel-journal feedback |
| 3. Blog | `WO-04` | WO-02 | Blog list/filter/search mock và article detail |
| 4. About/Contact | `WO-05` | WO-02 | About portfolio nhẹ, contact demo không gửi dữ liệu |
| 5. Tích hợp & QA | `WO-06` | WO-03, WO-04, WO-05 | responsive/accessibility/SEO/build, sửa lỗi tích hợp, preview-ready |

WO-03, WO-04, WO-05 có thể chạy song-song sau WO-02. Mỗi agent sở hữu file routes/components riêng đã nêu ở work order. WO-06 phải có một integration owner.

### Tiếp tục implementation hiện tại

- Home đã có implementation trong `app/pages/index.vue`; dùng trạng thái Home hiện tại làm visual reference khi triển khai WO-04/WO-05, không sao chép riêng hero/map vào internal pages.
- Shared foundation hiện có trong `app/assets/css/main.css`, `app/layouts/default.vue`, `app/components/layout/**`, `app/components/blog/**`, `app/types/content.ts` và `app/data/**`. WO-04/WO-05 có thể bắt đầu khi các file này nằm trong branch/worktree được giao; nếu thiếu component hoặc contract, integration owner điều phối thay đổi thay vì agent sửa shared files ngoài ownership.
- Đọc `page-spec.md` cho shared visual language, layout từng trang và `content-contract.md` cho quy tắc mock/editorial. Dùng `qa-checklist.md` để kiểm chứng các page khớp nhau và đọc tốt trên mobile.
- Với Home vừa được chỉnh sửa, integration owner chạy lại typecheck/build sau khi tích hợp; không mặc định kết quả kiểm tra cũ áp dụng cho nội dung mới nhất.

## Cổng nghiệm thu theo mốc

### Gate A — Scaffold

- Nuxt 4 và Tailwind CSS cài đặt theo phiên bản tương thích, có lockfile.
- `dev`, `build`, `preview` và type checking (nếu không được build đảm bảo) được ghi thành scripts/documented commands.
- Trang khởi động render không lỗi; không cài backend, UI kit lớn hay analytics.

### Gate B — Shared contract

- Design tokens tập trung; components dùng token, không lặp palette hard-code.
- Categories, posts, article blocks và profile có types dùng chung.
- Global nav đáp ứng desktop/mobile, có active state, keyboard access và semantics.

### Gate C — Pages

- Các trang đáp ứng `page-spec.md`; mọi nav/filter/search link hoạt động với mock data.
- Blog detail tìm theo slug; slug không hợp lệ hiển thị not-found.
- Contact form chỉ validate/trình bày trạng thái demo; không gửi, lưu hay log thông tin người dùng.
- Blog/About/Contact dùng chung token/shell/typography với Home nhưng giữ bố cục editorial riêng phù hợp mục đích từng trang; không mở rộng travel-journal motif ra toàn site.
- Copy/metadata/profile chỉ dựa trên nội dung được duyệt hoặc sample trung tính; optional sections/links không có dữ liệu thì ẩn.

### Gate D — Release candidate

- Theo `qa-checklist.md`: build, route check, responsive, keyboard, reduced motion, metadata, ảnh và nội dung.
- Review tại mobile 390px, tablet 820px, desktop 1440px tối thiểu; kiểm tra thêm width 320px.
- Vy review preview; feedback mới được ghi vào `feedback-vy.md` trước khi thay đổi visual đã chốt.

## Definition of Done tổng

- [ ] Năm public routes hoạt động: `/`, `/blog`, `/blog/[slug]`, `/about`, `/contact`.
- [ ] Category nav mở Blog List đã lọc đúng; mọi bài có CTA tới route detail đúng slug.
- [ ] Tất cả UI dùng mock data typed; không có API, auth, database, CMS hoặc form submission.
- [ ] Có loading/error/not-found UX phù hợp nơi cần thiết; không để dead links.
- [ ] Desktop/tablet/mobile, keyboard, focus, contrast, alt text, semantic headings và reduced motion đã rà soát.
- [ ] Format/lint/typecheck/tests/build chạy theo scripts hiện diện; kết quả và known limitations được ghi nhận.
- [ ] README hướng dẫn cài dependencies và chạy local; prototype cũ vẫn được giữ nguyên cho đến khi được review và có quyết định archive riêng.

## Rủi ro và cách xử lý

- **Thiếu nội dung/brand asset thật:** dùng sample copy trung tính và placeholder local; không bịa kinh nghiệm, địa danh, thông tin nghề nghiệp hay thông tin liên hệ của Vy.
- **Ảnh tham chiếu dễ bị sao chép quá sát:** lấy motif/feel, tạo minh hoạ/layout gốc; kiểm tra theo `feedback-vy.md`.
- **Nuxt/Tailwind version/config thay đổi:** WO-01 xác nhận tương thích từ tài liệu phiên bản hiện hành, commit lockfile; không đoán version hoặc thêm module chồng lấn.
- **Merge conflict giữa agents:** file ownership của work order là ràng buộc; mọi thay đổi shared contract do integration owner điều phối.
- **Nội dung markdown/rich text có rủi ro injection:** render typed blocks thành semantic Vue templates; không `v-html` với mock/user content.
