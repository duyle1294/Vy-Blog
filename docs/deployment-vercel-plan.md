# Kế hoạch deploy Vy Blog lên Vercel — hướng dẫn lần đầu

> Mục tiêu: đưa public site lên một URL `*.vercel.app` để Vy xem và góp ý. Đây là hướng dẫn thao tác; chưa có tài khoản hay provider nào được tạo/kết nối bởi AI.
>
> Repo hiện dùng Nuxt 4 + TypeScript + Tailwind, npm, Node `>=22.19.0`; nội dung đang là mock local, chưa có backend hoặc secrets.

## 1. Ai làm phần nào?

| Việc | AI có thể chuẩn bị/hỗ trợ | Bạn cần tự làm hoặc phê duyệt |
| --- | --- | --- |
| Kiểm tra source | Rà code/config, chạy typecheck/build, tìm lỗi và hướng dẫn sửa. | Xác nhận nội dung, ảnh, thay đổi và bản build đủ tốt để chia sẻ. |
| GitHub | Kiểm tra remote/trạng thái Git; giải thích commit, push, branch và hỗ trợ xử lý lỗi. | Đăng nhập GitHub, sở hữu/có quyền repo, xem diff, quyết định nội dung được commit và tự xác nhận thao tác push nếu cần đăng nhập. |
| Vercel | Đọc log deploy, giải thích cài đặt phù hợp, đề xuất bước sửa. | Tạo/đăng nhập tài khoản Vercel của bạn, kết nối GitHub, cấp quyền cho repository và xác nhận mọi lựa chọn về plan/billing. |
| Chia sẻ với Vy | Chuẩn bị checklist kiểm tra và nội dung bàn giao. | Mở URL kiểm tra lần cuối và tự gửi link cho Vy. |
| Domain/production | Có thể hướng dẫn sau khi được yêu cầu. | Chọn tên miền, thanh toán (nếu có), xác nhận nội dung đã sẵn sàng public và cho phép nối domain. Không bắt buộc cho lần review này. |

**Không gửi mật khẩu, mã xác minh, token, cookie, thẻ thanh toán hoặc file `.env` vào chat.** Khi cần xác thực, bạn tự thao tác trong trang GitHub/Vercel chính thức. Phase hiện tại không cần environment variables; nếu màn hình hỏi thì để trống.

## 2. Trước khi bấm Deploy

### 2.1. Kiểm tra repo và bản thay đổi

Repository đã có remote GitHub là `duyle1294/Vy-Blog`, branch hiện tại là `main`. Điều đó không có nghĩa GitHub/Vercel đã đăng nhập hoặc Vercel đã kết nối.

Tại thời điểm lập tài liệu, working tree còn nhiều file thay đổi/chưa commit, gồm cả file prototype HTML/CSS cũ bị xóa và file Nuxt mới chưa được track. Trước khi deploy:

1. Trong VS Code, mở **Source Control** và xem toàn bộ danh sách **Changes**.
2. Xác nhận việc xóa prototype và đưa app Nuxt vào repo là chủ ý; kiểm tra các file trong `app/`, `public/`, cấu hình và `package-lock.json` có nằm trong commit.
3. Không đưa `.DS_Store`, `.nuxt-dev.pid`, `node_modules/`, `.nuxt/`, `.output/`, log hoặc secrets vào commit. `node_modules/` và output Nuxt đã được ignore; file máy macOS/log/pid cũng không thuộc source của website.
4. Nếu không chắc một thay đổi có chủ ý không, dừng và nhờ AI giải thích diff trước khi stage/commit. Không dùng “Stage All” một cách mù quáng.
5. Giữ repo private nếu muốn; không cần public hóa repo để chia sẻ website. Vercel cần được cấp quyền đọc repo qua GitHub.

### 2.2. Chạy kiểm tra local

Dùng Node `22.19.0` trở lên. Mở Terminal tại thư mục project, kiểm tra `node -v`, rồi chạy:

```zsh
npm ci
npm run typecheck
npm run build
```

Nếu `npm ci` thành công và hai lệnh kiểm tra đều kết thúc không lỗi, source đã qua kiểm tra cơ bản. Nếu máy đang dùng Node thấp hơn, đổi sang Node 22.19.0+ trước; không chỉnh package engine chỉ để né lỗi.

Sau đó commit các thay đổi đã xem xét vào GitHub. Có thể dùng giao diện VS Code **Source Control**: nhập message dễ hiểu (ví dụ `Prepare public site for preview`), chọn **Commit**, rồi **Push/Sync Changes**. Chỉ push khi bạn đã xác nhận danh sách file đúng.

## 3. Tạo tài khoản và kết nối GitHub

Các thao tác dưới đây cần bạn thực hiện:

1. Nếu chưa có, tạo/đăng nhập tài khoản GitHub tại [github.com](https://github.com/). Dùng tài khoản bạn kiểm soát lâu dài.
2. Kiểm tra repository `Vy-Blog` đã có commit chứa source muốn deploy và branch mặc định là branch bạn định dùng (hiện là `main`).
3. Tạo/đăng nhập Vercel tại [vercel.com](https://vercel.com/), ưu tiên dùng đăng nhập GitHub để liên kết đúng provider.
4. Khi Vercel xin quyền GitHub, đọc danh sách quyền và repository được yêu cầu. Chỉ cấp quyền cần thiết cho tài khoản/repo bạn muốn deploy; không chia sẻ thông tin đăng nhập với người khác.
5. Chọn gói phù hợp sau khi đọc điều khoản/giới hạn hiện hành. Không cần mua domain cho URL review; không bật trial/nâng cấp trả phí nếu chưa chủ động đồng ý.

## 4. Import project và deploy lần đầu

1. Trong Vercel Dashboard chọn **Add New… → Project** (hoặc [New Project](https://vercel.com/new)).
2. Chọn GitHub và import repository `Vy-Blog`.
3. Ở cấu hình project, xác nhận:
   - **Project name:** tùy chọn, ví dụ `vy-blog` (tên URL `vercel.app` phụ thuộc tên còn khả dụng).
   - **Root Directory:** repo root (`./`/để mặc định). `package.json` và `nuxt.config.ts` nằm ở root.
   - **Framework Preset:** Nuxt được Vercel nhận diện tự động; nếu không, chọn **Nuxt**.
   - **Build Command / Install Command / Output Directory:** giữ tự động theo framework và lockfile; không ép `nuxt generate`, không tự điền output folder. Project hiện hướng tới `nuxt build`/SSR.
   - **Node.js Version:** chọn nhánh Node 22.x (hoặc runtime tương thích với yêu cầu `>=22.19.0` của `package.json`) nếu cần chọn thủ công.
   - **Environment Variables:** để trống. Public site hiện không cần biến môi trường.
4. Nhấn **Deploy** và chờ trạng thái hoàn tất. Mở build log nếu thất bại; đừng thêm secrets hoặc đổi build settings ngẫu nhiên để chữa lỗi.
5. Khi deploy thành công, Vercel cấp URL dạng `https://<project-name>.vercel.app`. Mở URL đó trong trình duyệt và kiểm tra các trang trước khi gửi.

### Lưu ý quan trọng: deployment đầu tiên

Theo hành vi hiện tại của Vercel, **deployment đầu tiên của một project luôn được đánh dấu Production**, kể cả khi được tạo từ Git import hoặc từ branch khác `main`. URL `vercel.app` có thể truy cập công khai nếu người khác biết URL; nó không tự động là link riêng tư/password-protected. Vì vậy:

- Xem lần deploy đầu là bản public đầu tiên, dù chưa gắn domain riêng.
- Chỉ bấm Deploy khi source và nội dung đủ phù hợp để có thể truy cập công khai.
- Không chia sẻ link trước khi bạn đã kiểm tra.
- Các lần push sau lên branch không phải production branch (thường là `main`) sẽ tạo Preview deployment theo cấu hình Git mặc định. Push/merge vào `main` sẽ cập nhật production.
- Nếu cần link preview không phải deployment đầu tiên, sau khi project đã có deployment đầu, tạo branch riêng (ví dụ `vy-review`), push thay đổi lên branch đó và chia sẻ URL Preview mới nhất. Không merge branch vào `main` cho đến khi bạn đồng ý cập nhật bản production.

Không có domain riêng vẫn đủ để Vy xem site. Không cần cấu hình DNS, Supabase, backend hay Vercel CLI cho quy trình này.

## 5. Kiểm tra trước khi gửi link cho Vy

Trên URL Vercel, kiểm tra tối thiểu:

- `/`, `/about`, `/blog`, `/contact` và một bài `/blog/<slug>` mở được khi truy cập trực tiếp/reload.
- Ảnh local, font, menu mobile, footer và liên kết không bị lỗi; không có trang trắng hoặc lỗi runtime.
- Thử category URL như `/blog?category=travel` nếu có nội dung tương ứng.
- Xem ít nhất một viewport điện thoại và một viewport desktop.
- Contact form đang là demo, không gửi/lưu thông tin; không nhập dữ liệu cá nhân thật để thử.
- Nội dung mẫu/ảnh/placeholder và mọi thông tin về Vy đã được bạn chấp thuận trước khi công khai.

Khi đạt, bạn gửi cho Vy URL `vercel.app` cùng lời nhắn đây là bản preview để review. Nói rõ góp ý mong muốn (ví dụ mobile, nội dung, hình ảnh) và ghi lại phản hồi; link có thể được mở bởi người khác nếu bị chuyển tiếp.

## 6. Cập nhật tiếp theo và rollback

- Sửa nội dung/code trên branch riêng để nhận Preview link; kiểm tra link mới mỗi lần deploy vì URL theo deployment/branch có thể đổi hoặc cập nhật.
- Khi bạn xác nhận thay đổi, merge/push vào `main`; branch production mặc định sẽ tạo deployment cập nhật production.
- Nếu bản production mới có lỗi, cách dễ hiểu và dễ truy vết là revert commit gây lỗi trên GitHub/VS Code rồi push lại. Có thể dùng thao tác rollback/promote deployment trong Vercel khi bạn hiểu rõ deployment đích.
- Không xóa project/repo hoặc đổi DNS trong lúc xử lý lỗi nếu chưa biết tác động. Xem **Deployments → build logs** để tìm thông báo lỗi và gửi phần log liên quan (đã loại bỏ thông tin nhạy cảm) cho AI.

## 7. Lỗi thường gặp

| Triệu chứng | Kiểm tra trước |
| --- | --- |
| Không thấy repo khi import | Đảm bảo đang đăng nhập đúng GitHub; Vercel GitHub App được cấp quyền đúng account/repository; repository đã tồn tại. |
| Build báo Node không hỗ trợ | Chọn Node 22.x tương thích với `>=22.19.0`, sau đó redeploy. |
| Không tìm thấy build script/dependency | Root Directory phải là repo root; `package.json` và `package-lock.json` phải được commit; không commit `node_modules`. |
| Build thành công nhưng route/assets lỗi | Mở URL đầy đủ trực tiếp, xem build/runtime logs; kiểm tra đường dẫn/case của local assets và source đã được push. |
| Muốn đổi build/output settings | Trước hết chọn Framework Preset Nuxt và khôi phục mặc định; không dùng `public` làm output folder cho ứng dụng Nuxt đã build. |
| URL mở được nhưng chưa muốn public | Không chia sẻ URL; nhớ deployment đầu tiên có thể là Production và URL không tự có mật khẩu. Trao đổi trước khi bật bất kỳ cài đặt access protection nào. |

## 8. Phạm vi chưa làm trong kế hoạch này

- Không tạo tài khoản, kết nối GitHub/Vercel, cấp quyền OAuth hoặc deploy thay bạn.
- Không mua domain, thêm billing, mở repo công khai hay thay đổi production branch.
- Không thêm server/API, database, authentication, CMS, form submission, analytics hoặc secrets.
- Không cam kết mức giá/giới hạn gói cụ thể; kiểm tra trang pricing/điều khoản của Vercel ngay trước khi chọn plan.

## 9. Tài liệu chính thức

- [Deploy Nuxt on Vercel](https://vercel.com/docs/frameworks/full-stack/nuxt)
- [Deploy Git repositories](https://vercel.com/docs/git)
- [Vercel environments: Preview và Production](https://vercel.com/docs/deployments/environments)
- [Cấu hình build và Framework Preset](https://vercel.com/docs/builds/configure-a-build)
- [Làm việc với domains](https://vercel.com/docs/domains/working-with-domains)
