# Page & Component Specification — Phase 1

> Mọi copy/ảnh/name chưa được Vy cung cấp phải là sample rõ ràng, trung tính; không giả lập thông tin cá nhân như sự thật. Visual constraints chi tiết ở `feedback-vy.md` và `vy-blog-requirements.md`.

## 1. Global shell

### Shared visual language for every page

- Home is the current visual reference for brand mood, not a template to copy section-for-section. Internal pages must feel like the same garden/editorial publication while remaining optimized for browsing and reading.
- Reuse the existing global tokens in `app/assets/css/main.css`: warm background/surface, deep green text/actions, muted text, soft border, restrained sky/yellow accents, shared radius, container and reading widths. Do not introduce a second palette or repeat raw color values in every page.
- Reuse the default layout, `SiteHeader`, `SiteFooter`, navigation data and established post/category components. Do not build page-specific copies of shared navigation or footer. Keep the same wordmark, category labels/order, link behavior and focus treatment as the Home navigation.
- Keep the editorial pairing consistent with current Home styling: `DM Serif Display`/Georgia for prominent editorial headings, and a readable sans-serif (`DM Sans`/system sans fallback) for body/UI. Avoid adding duplicate font imports per page; if font loading needs to be centralized, ask the integration owner. Handwriting and travel-journal decorations are reserved for the Home hero/journey treatment; never use handwriting for article body, filters, forms or navigation.
- Use generous whitespace, clear hierarchy and natural local imagery; prefer simple editorial surfaces and image-led layouts over repeated bordered/shadowed cards, gradients, badges or decorative panels. Soft corners and subtle hover/focus states may echo Home without turning each page into a map/postcard.
- Each page has its own calm, clear page intro and one H1. Shared content container is about `1120–1180px`; long-form reading column is `680–760px`. Keep page-specific sizing responsive rather than forcing Home's full-bleed hero or display typography onto all pages.
- At mobile widths, simplify layout intentionally (stack content, keep controls usable, preserve image crops and readable line lengths); do not shrink a desktop grid until it overflows.
- Existing shared-shell inconsistency to resolve through integration owner: Home currently displays `Vy’s World`, while shared `SiteHeader` displays `Vy`. Internal pages must use the shared header, not a page-local copy; before visual acceptance, align the shared wordmark with Home’s current `Vy’s World` branding unless Vy approves another name. Do not solve this by forking headers in WO-04/WO-05.
- The display font is currently imported from Home’s scoped stylesheet. If direct-loading an internal route does not load that font, ask the integration owner to centralize font loading; do not add separate external font imports in each page.

### Header

- Personal wordmark tạm thời `Vy` (đổi khi Vy xác nhận), link về `/`.
- Desktop navigation: Home, About, Travel, Experiences, Marketing, Books, Contact.
- Category nav vào `/blog?category=<slug>`; không thêm mục menu “Admin”, “Login” hoặc menu mở rộng không cần thiết.
- Mobile dùng nút menu có label “Open menu”/“Close menu” theo trạng thái và `aria-expanded`/`aria-controls`.
- Current route/category có active state bằng style và semantic phù hợp; không chỉ dùng màu để chỉ trạng thái.

### Footer

- Wordmark, nav tối giản, email/social links chỉ render khi có giá trị được duyệt; không bịa link.
- Copyright text không khẳng định năm/đơn vị không cần thiết; năm hiện tại có thể lấy động.
- Tránh newsletter signup hoặc social feed backend.

## 2. Home `/`

Thứ tự section bắt buộc:

1. Hero: personal quote ngắn + original airy nature visual; quote hiện tại phải xem là sample, không tuyên bố quote chính thức.
2. Welcome/introduction: “little garden” feeling, nói rõ Vy chia sẻ stories/experiences/ideas.
3. Topic exploration: Travel, Experiences, Books, Marketing; link vào category Blog List.
4. Featured/latest stories: post cards từ mock data, tối đa 3–4 để không dày.
5. Category journey: nếu dùng route/map thì 3–4 stop, motif chỉ nằm tại section này; route không thay thế link/category label rõ ràng.
6. About preview: short bio placeholder, CTA `/about`; không bịa chức danh, số năm hoặc thành tích.
7. Friendly contact CTA tới `/contact`.

Hero và map có thể cùng trang nhưng phải cân bằng; không tái tạo nguyên bố cục/asset trong ảnh tham chiếu.

## 3. Blog List `/blog`

- Dùng `SiteHeader`/`SiteFooter` của layout và một page intro editorial: eyebrow nhỏ tùy chọn, H1 “Stories” hoặc “Journal”, một mô tả ngắn thân thiện. Không tạo hero full-screen; page title phải đưa danh sách bài viết lên gần đầu trang.
- Search input có label/accessibility name rõ, placeholder gợi ý tìm tiêu đề/chủ đề; filter ngay trên local mock posts theo title/excerpt/category. Bố trí search và category controls thành một cụm tiện dụng, không làm thành dashboard toolbar.
- Category controls: All, Travel, Experiences, Marketing, Books; thêm Life khi taxonomy có bài Life. Hiển thị trạng thái chọn bằng màu/viền/semantics, không chỉ màu; điều khiển dùng được bằng keyboard.
- Query `?category=travel` là trạng thái filter có thể chia sẻ; unknown category chuyển về `all` một cách an toàn.
- Search text và category phải phối hợp (AND): bài cần khớp cả hai tiêu chí đang chọn.
- Dùng shared `PostCard` hiện có làm card cho Blog List. Home hiện đang có markup/card styling riêng trong `app/pages/index.vue`, chưa dùng component này; vì vậy card Blog cần theo cùng tinh thần image-led, serif title, garden-green links, excerpt/date gọn và frameless spacing như Home. Không sửa markup Home/shared component trong WO-04; nếu cần thống nhất chính component giữa hai trang, yêu cầu integration owner điều phối.
- Grid: tối đa 3 columns desktop, 2 tablet khi còn đủ chỗ, 1 mobile; khoảng cách đều và không thêm card chrome nặng. Nếu có ít bài, căn layout tự nhiên thay vì tạo khoảng trống lớn.
- Sort theo ngày xuất bản mới nhất trước. Empty state thân thiện giải thích chưa tìm thấy bài và cung cấp nút clear search/category; trạng thái không làm layout nhảy bất thường.
- Nếu có pagination/load more trong tương lai phải có lý do từ lượng content; Phase 1 mock list không cần pagination.

## 4. Blog Detail `/blog/[slug]`

- Not-found thật khi không tìm thấy slug.
- Khung bài đọc editorial, không dùng card bao toàn bài: breadcrumb/back link về Stories, category, H1, ngày xuất bản và reading time chỉ khi dữ liệu có giá trị. Metadata phải gọn và có thứ bậc thấp hơn title.
- Cover image rộng theo reading column hoặc được mở rộng có chủ đích trong content container; giữ aspect ratio, có alt text và caption khi khai báo. Không ép crop ảnh theo chiều cao tùy ý.
- Article max width `680–760px` desktop; body 18px với line-height `1.7–1.9`, mobile body `16–18px`. Paragraph ngắn vừa phải, có khoảng cách đoạn; H2/H3 phân cấp, list/quote/link dễ phân biệt và dễ đọc.
- Render semantic blocks: paragraph, heading, quote, list, image/caption, link; không inject HTML. Link ngoài dùng target/rel an toàn theo implementation; link nội bộ điều hướng bằng Nuxt-native link.
- Cuối bài có back-to-stories link và optional related/next posts chỉ khi dữ liệu hợp lý; không tạo comments/share counters/social features trong Phase 1.
- Không thêm bản đồ/card decoration vào bài non-travel. Với bài Travel có thể có postcard treatment nhẹ quanh ảnh, không ảnh hưởng body text.

## 5. About `/about`

- Dùng cùng page intro, container, type scale, palette và footer như Blog; mở đầu bằng lời giới thiệu ngắn ấm áp, ảnh chân dung chỉ khi có asset được duyệt.
- Flow gợi ý: personal introduction → những chủ đề Vy viết/chia sẻ → experience hoặc selected projects chỉ khi Vy cung cấp dữ kiện đã duyệt → interests → contact CTA. Mỗi section phải có nội dung; bỏ section không có thông tin thay vì dựng khung rỗng.
- Có thể dùng text-led editorial layout hoặc một ảnh/portrait nhẹ để tạo điểm nhấn; không dùng CV dashboard, skill progress bars, logo wall, số liệu thành tích giả hoặc timeline với mốc chưa xác nhận.
- Không bịa chức danh, employer, khách hàng, giải thưởng, địa điểm, năm kinh nghiệm hay thành tích. Mock bio hiện tại phải được coi là nội dung minh họa nội bộ, không phải tiểu sử đã xác thực; chỉ hiển thị copy trung tính, rõ ràng nếu chưa có nội dung Vy duyệt.
- Interests trình bày như danh sách/nhóm chủ đề nhẹ, không biến thành tag cloud dày đặc. CTA cuối trang dẫn Contact, không tạo form lặp ở About.

## 6. Contact `/contact`

- Dùng page intro gọn với H1 thân thiện “Let’s connect.”, một câu mời liên hệ và bố cục đơn giản; ưu tiên biểu mẫu dễ dùng, không làm thành landing page marketing.
- UI form: Name, Email, Message; label luôn hiển thị, required/format validation phía client, lỗi gắn đúng field và trạng thái dễ hiểu bằng keyboard/screen reader.
- Email/social links chỉ hiện khi có giá trị do Vy cung cấp/duyệt; không hiện placeholder link hay icon không có đích.
- Submit chỉ hiển thị notice rõ ràng: đây là bản demo, dữ liệu chưa được gửi. Không báo “Message sent” hoặc “Vy will reply” vì không có backend.
- Không gửi network request, lưu/ghi/log giá trị người dùng; reset form chỉ khi hành vi đó không làm mất thông tin bất ngờ và thông báo vẫn rõ.
- Trên desktop có thể xếp form và contact details thành hai cột nếu có details hợp lệ; nếu không, dùng một cột gọn. Trên mobile luôn xếp một cột.

## 7. Shared components & API tối thiểu

Các component tái sử dụng nhận dữ liệu bằng props, không tự tra nguồn global:

- `PostCard`: `post: Post`.
- `CategoryFilter`: `categories`, `selectedCategory`, `onSelect` hoặc Nuxt-native route/query ownership được chọn nhất quán.
- `ArticleBody`: `blocks: ArticleBlock[]`.
- `HomeHero`: nội dung/asset từ typed page data hoặc props.
- `CategoryJourney`: list of category stops, links rõ; `aria-hidden` cho artwork trang trí.
- `SiteHeader`: active route từ router; mobile menu state nội bộ.

Tránh abstraction “card” đa cấu hình không cần thiết. Chia component khi có tái sử dụng hoặc có trách nhiệm accessibility/state riêng.

## 8. Visual acceptance

- Cảm giác fresh/natural/warm/personal/calm; typography và whitespace ưu tiên hơn decoration.
- Ảnh bright, airy, natural; không dùng generic SaaS artwork.
- Home journey/map là accent có chủ đích. Map texture, postcard, dotted path, pin, torn-paper transition không được xuất hiện tràn lan.
- Warm white/green/sky/soft yellow là palette; coral/peach tiết chế.
- Focus visible, contrast đủ; không dùng animation liên tục/parallax mạnh.
