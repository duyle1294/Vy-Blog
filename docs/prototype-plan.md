# Kế hoạch UI Prototype tĩnh — Vy's World

## 1. Mục đích

Tạo một bộ prototype HTML tĩnh để Vy xem nhanh **giao diện, layout, nội dung mẫu và cảm giác thương hiệu** trước khi đi vào code chính thức. Đây là bản demo UI độc lập, không có CMS, database, đăng nhập hay API.

Mục tiêu của bản demo:

- Chốt hướng hình ảnh: một khu vườn nhỏ, xanh và yên trên Internet.
- Làm rõ cấu trúc của 5 trang public trước khi triển khai Nuxt.
- Dùng nội dung mẫu gần với chủ đề của Vy để việc góp ý thực tế hơn.
- Có thể mở trực tiếp bằng trình duyệt hoặc gửi thư mục `prototype/` cho Vy.

## 2. Phạm vi deliverable

| Hạng mục | File | Vai trò |
| --- | --- | --- |
| Trang chủ | `prototype/index.html` | Kể câu chuyện thương hiệu, hướng người đọc đến các chủ đề và bài viết nổi bật. |
| Danh sách bài viết | `prototype/blog.html` | Demo tìm kiếm, lọc chủ đề và cards bài viết. |
| Chi tiết bài viết | `prototype/article.html` | Chứng minh trải nghiệm đọc dài, typography và ảnh trong bài. |
| Giới thiệu | `prototype/about.html` | Portfolio nhẹ nhàng, cá nhân, không phải CV corporate. |
| Liên hệ | `prototype/contact.html` | Cách kết nối và form gửi lời nhắn ở mức UI demo. |
| Style dùng chung | `prototype/css/style.css` | Token màu, typography, grid, responsive và các component visual. |
| Tương tác dùng chung | `prototype/js/main.js` | Mobile menu, mock search/filter, thông báo submit form và render header/footer. |
| Ảnh local | `prototype/images/` | Bản sao ảnh tham khảo để gửi prototype độc lập. |

## 3. Hướng thiết kế được áp dụng

### Cảm giác cốt lõi

**Fresh + Natural + Warm + Personal + Calm.** Nội dung và trải nghiệm đọc luôn đứng trước hiệu ứng.

### Bảng màu

| Token | Màu | Vai trò |
| --- | --- | --- |
| `--canvas` | `#FAFBF7` | Nền trắng ấm, không bị lạnh. |
| `--leaf` | `#8FBF9F` | Mảng vườn, trạng thái active, chi tiết xanh nhẹ. |
| `--forest` | `#477A5B` | CTA, heading và các điểm neo thị giác. |
| `--sky` | `#B9DDF2` | Không khí bầu trời, các mảng liên hệ. |
| `--sun` | `#F4D98B` | Ánh nắng, làm accent tiết chế. |
| `--ink` | `#34443A` | Chữ chính có độ tương phản tốt. |

### Typography

- Headline: `DM Serif Display` — cảm giác journal/editorial.
- Nội dung và điều hướng: `DM Sans` — rõ ràng, thân thiện, dễ đọc.
- Body bài viết desktop đạt `18px` và `line-height: 1.85`.

### Tham chiếu Home

`index.html` giữ tinh thần và hierarchy của `sample/Unknown-11.jpg`: nền trời, hero quote lớn, phong cảnh thiên nhiên ở đáy màn hình, menu text mảnh và khoảng thở rộng. Màu sắc được chuyển về palette garden của Vy; minh hoạ địa phương bằng CSS/SVG để Home không phụ thuộc mạng.

## 4. Cấu trúc nội dung mỗi trang

### Home

1. Hero “Be your authentic self” với bầu trời, mây, núi, đồi cỏ và hoa.
2. Lời chào “Welcome to my little garden.”
3. Đường khám phá 4 chủ đề: Travel, Experiences, Books, Marketing.
4. Ba bài viết mới nhất.
5. Hành trình chủ đề dạng route mềm mại.
6. Giới thiệu ngắn về Vy.
7. CTA liên hệ và footer.

### Blog list

1. Tiêu đề trang và mô tả ngắn.
2. Search UI có thể tìm theo title/excerpt/category (client-side demo).
3. Tabs lọc All, Travel, Experiences, Marketing, Books, Life.
4. Grid bài viết 3 cột desktop, 2 cột tablet, 1 cột mobile.

### Article

1. Nhãn category, tiêu đề, ngày, thời gian đọc và cover image.
2. Nội dung mẫu có heading, quote, ảnh/caption và list.
3. CTA đọc thêm ở cuối bài.

### About

1. Intro cá nhân và chân dung minh hoạ tối giản.
2. Kinh nghiệm/journey dạng timeline, không dùng số liệu CV.
3. Skills dạng chip typography; interests và CTA kết nối.

### Contact

1. Lời mời kết nối thân thiện.
2. Email/social links.
3. Form Name, Email, Message với phản hồi demo sau khi submit.

## 5. Responsive và accessibility

- **Desktop:** từ `1024px`, nav text đầy đủ, grid rộng và khoảng trắng lớn.
- **Tablet:** `768px–1023px`, grids giảm cột hợp lý.
- **Mobile:** dưới `768px`, hamburger button điều khiển menu có `aria-expanded`; trang không chỉ thu nhỏ desktop.
- Tất cả ảnh nội dung có `alt`, controls có label, focus visible, landmark semantic, menu đóng bằng phím `Escape`.
- Motion chỉ là hover/fade nhẹ; tôn trọng `prefers-reduced-motion`.

## 6. Cách review với Vy

1. Mở `prototype/index.html` bằng browser và xem trước trên desktop lẫn mobile.
2. Review theo thứ tự: **cảm giác Home → màu/typography → cấu trúc nội dung → từng trang → chi tiết trang trí**.
3. Ghi feedback theo từng trang, ví dụ: “Home / Hero / quote quá lớn” hoặc “Blog / Card / muốn ảnh sáng hơn”.
4. Chốt một vòng UI trước khi chuyển sang Nuxt 4 + Tailwind.

## 7. Những phần cố ý chưa làm

- Không có backend, CMS, login, database, upload ảnh hoặc analytics.
- Search, category filter và form chỉ mô phỏng bằng JavaScript trên browser.
- Nội dung, email, social links và ảnh hiện là sample để thay bằng dữ liệu Vy cung cấp.

## 8. Handoff sang implementation chính

Khi UI được duyệt, model/code tiếp theo có thể chuyển prototype theo thứ tự:

1. Di chuyển tokens trong `style.css` sang Tailwind theme/design tokens.
2. Tách header, footer, post card, category route và contact form thành Nuxt/Vue components.
3. Đưa mock data trong `main.js` vào typed content model.
4. Giữ semantic HTML và responsive rules đã được kiểm chứng.
5. Chỉ bắt đầu Supabase/Tiptap ở Phase 2 sau khi public UI ổn định.

## 9. Tiêu chí hoàn thành prototype

- [ ] Vy nhận diện được đây là không gian cá nhân của mình trong vài giây.
- [ ] Hero Home vẫn gợi đúng bố cục từ ảnh `Unknown-11.jpg`.
- [ ] Mọi trang đọc ổn ở desktop, tablet và mobile.
- [ ] Blog detail thoáng, dễ đọc và không bị trang trí quá mức.
- [ ] Navigation, filter, search, mobile menu và form demo hoạt động.
- [ ] Không có dependency build hoặc server bắt buộc để xem giao diện.