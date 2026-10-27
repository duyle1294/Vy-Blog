# QA & Review Checklist — Phase 1

## 1. Automated checks

Chạy đúng scripts đã khai báo trong `package.json`; không thêm command giả định vào handoff.

- [ ] Dependency install từ lockfile sạch.
- [ ] Format check (nếu đã cấu hình).
- [ ] Lint (nếu đã cấu hình).
- [ ] Typecheck.
- [ ] Unit/component tests (nếu đã cấu hình).
- [ ] Nuxt production build.
- [ ] `README.md` commands đã chạy và đúng với project.

Mọi thất bại phải ghi command, summary và phân loại: introduced by change / pre-existing / environment limitation.

## 2. Route & functional checks

- [ ] `/` render; mọi CTA, category stop và header/footer links hoạt động.
- [ ] `/blog` render all posts và category `all`.
- [ ] `/blog?category=travel`, `experiences`, `marketing`, `books` lọc chính xác sau load/reload.
- [ ] Category và text search hoạt động đồng thời; clear/reset khôi phục list đúng.
- [ ] Unknown category không crash và có fallback rõ ràng.
- [ ] Post card mở đúng `/blog/<slug>`; post detail metadata/content khớp data.
- [ ] Slug không tồn tại hiển thị not-found/404.
- [ ] `/about`, `/contact` render đúng.
- [ ] Contact form validate; sau submit chỉ báo demo chưa gửi. Không network request, lưu, log nội dung form.
- [ ] Không có dead links, console errors hoặc broken local images.
- [ ] Blog list query/category/search/empty state đều có trạng thái nhìn thấy được, keyboard-accessible; refresh URL đã lọc giữ đúng category.
- [ ] Blog detail mở được bằng direct URL và refresh; metadata tùy chọn không bị hiển thị rỗng; internal/back links hoạt động.
- [ ] About ẩn hoặc diễn đạt trung tính cho mọi optional content chưa được Vy duyệt; không xuất hiện thông tin placeholder thô, sai link hoặc facts tự dựng.

## 3. Viewport checks

Rà tối thiểu tại widths:

- [ ] 320px (narrow mobile overflow check)
- [ ] 390px (mobile)
- [ ] 820px (tablet)
- [ ] 1024px (breakpoint edge)
- [ ] 1440px (desktop)

Kiểm tra horizontal overflow, nav, image crop, line length, whitespace, grid columns, form controls và footer. Article content ở desktop giữ max width khoảng 680–760px.

## 4. Accessibility checks

- [ ] Có landmarks, skip-to-content nếu layout cần, một H1/page và heading order logic.
- [ ] Dùng Tab/Shift+Tab/Enter/Space/Escape; menu mở/đóng và focus không bị mất.
- [ ] Tất cả interactive controls có accessible name, focus-visible; không chỉ dùng màu cho state.
- [ ] Category/search/form dùng label hoặc accessible name rõ.
- [ ] Validation error gắn đúng field và thông báo đọc được.
- [ ] Ảnh nội dung có alt mô tả; ảnh trang trí alt rỗng.
- [ ] Contrast chữ/nút/focus trên background đáp ứng WCAG AA mục tiêu; xác minh bằng công cụ khi có.
- [ ] `prefers-reduced-motion: reduce` không còn animation không cần thiết.

## 5. Content, visual & policy checks

- [ ] Garden palette/brand calm; layout không generic SaaS/corporate.
- [ ] Travel journal cues giới hạn tại Home journey và Travel context; không copy reference art/layout/assets/copy.
- [ ] Nội dung sample không trình bày facts giả như tiểu sử thật của Vy.
- [ ] Không có ảnh bên ngoài không rõ quyền sử dụng; asset có nguồn/license ghi lại.
- [ ] Article body readable; decoration không lấn át văn bản.
- [ ] `/blog`, `/blog/[slug]`, `/about` và `/contact` dùng cùng header/footer, tokens, palette và typography với Home; không tạo palette/branding/navigation riêng.
- [ ] Internal pages giữ bố cục editorial hiện đại, whitespace/hierarchy rõ; không sao chép Home hero/map/postcard, không biến list thành dashboard hoặc About thành corporate CV.
- [ ] Card metadata và article metadata gọn, đúng dữ liệu; title/excerpt tự nhiên, nội dung mock không được khẳng định là trải nghiệm/tiểu sử thật của Vy nếu chưa duyệt.
- [ ] Blog detail giữ reading column khoảng 680–760px desktop và body type/line-height theo `page-spec.md`.
- [ ] Không có Supabase/auth/API/CMS/Tiptap/upload/analytics.

## 6. Handover report

Khi kết thúc QA, báo:

1. Commit/PR hoặc danh sách file tích hợp.
2. Commands đã chạy và kết quả.
3. Viewports/browser được xem thực tế; không khẳng định đã kiểm tra nếu chưa.
4. Accessibility/functional defects còn lại và severity.
5. Known limitations/placeholder cần Vy xác nhận.
6. Kết quả sẵn sàng gửi preview cho Vy hay chưa.
