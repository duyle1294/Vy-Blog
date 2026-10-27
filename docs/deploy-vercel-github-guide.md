# Hướng dẫn deploy Vy Blog lên Vercel (source quản lý trên GitHub)

Áp dụng cho Phase 1: Nuxt 4 + TypeScript + Tailwind, dữ liệu mock local, **không cần environment variables**. Repo: `duyle1294/Vy-Blog`, branch `main`.

> Không gửi mật khẩu, token hoặc file `.env` vào chat/commit. Mọi bước đăng nhập tự thực hiện trên trang chính thức.

## 1. Yêu cầu

- Tài khoản GitHub có quyền với repo, tài khoản Vercel (gói **Hobby** miễn phí là đủ).
- Node `>=22.19.0` (xem `engines` trong `package.json`), npm.
- Git đã cài trên máy.

## 2. Kiểm tra local trước khi push

```bash
npm install
npm run typecheck
npm run build
npm run preview   # mở thử http://localhost:3000
```

Build phải thành công, không lỗi typecheck. Kiểm tra các trang `/`, `/blog`, `/blog/<slug>`, `/about`, `/contact` ở desktop, tablet, mobile.

## 3. Đẩy source lên GitHub

1. Đảm bảo `.gitignore` có `node_modules/`, `.nuxt/`, `.output/`, `.env*`, `.DS_Store`, `*.log`.
2. Xem lại thay đổi: `git status` và `git diff`. Chỉ stage file có chủ ý (đừng `git add .` mù quáng).
3. Commit và push:

```bash
git add app public docs nuxt.config.ts package.json package-lock.json tsconfig.json
git commit -m "feat: update public site"
git push origin main
```

Nếu repo chưa có remote:

```bash
git remote add origin https://github.com/duyle1294/Vy-Blog.git
git branch -M main
git push -u origin main
```

## 4. Tạo project trên Vercel

1. Vào <https://vercel.com> → **Sign Up / Log In** → chọn **Continue with GitHub**.
2. **Add New… → Project**.
3. Ở **Import Git Repository**, nếu chưa thấy repo: **Adjust GitHub App Permissions** → cấp quyền cho `Vy-Blog` (chọn *Only select repositories* là đủ).
4. Bấm **Import** cạnh `Vy-Blog`.
5. Cấu hình (Vercel thường tự nhận Nuxt):

| Mục | Giá trị |
| --- | --- |
| Framework Preset | **Nuxt** |
| Root Directory | `./` |
| Build Command | `npm run build` (mặc định) |
| Output Directory | để mặc định (Nitro tự xử lý) |
| Install Command | `npm install` (mặc định) |
| Node.js Version | **22.x** (Project Settings → General) |
| Environment Variables | để trống |

6. Bấm **Deploy** và chờ build xong (khoảng 1–3 phút). Vercel cấp URL dạng `vy-blog-xxxx.vercel.app`.

## 5. Quy trình deploy tự động

- Push lên `main` → Vercel tạo **Production deployment**.
- Push branch khác hoặc mở Pull Request → Vercel tạo **Preview deployment** với URL riêng, kèm comment trên PR. Dùng cái này để gửi Vy xem thử trước khi merge.
- Quy trình khuyến nghị:

```bash
git checkout -b feat/home-polish
# sửa code, chạy npm run build
git push -u origin feat/home-polish
# mở Pull Request → gửi link Preview cho Vy → merge vào main
```

## 6. Kiểm tra sau deploy

- Mở URL production, test 5 route chính và refresh trực tiếp ở `/blog/<slug>` (không được 404).
- Kiểm tra ảnh trong `public/images` hiển thị, font tải được.
- Mobile menu, filter category (`/blog?category=travel`), form Contact (chỉ demo, không gửi dữ liệu).
- Xem **Deployments → Logs** nếu có lỗi.

## 7. Domain riêng (tùy chọn)

1. Project → **Settings → Domains → Add**, nhập domain.
2. Làm theo bản ghi DNS Vercel hiển thị (A record cho apex, CNAME cho `www`).
3. Chờ DNS cập nhật (vài phút đến vài giờ); HTTPS được cấp tự động.
4. Domain có phí (~10–20 USD/năm) — cần Vy/Duy đồng ý trước.

## 8. Xử lý lỗi thường gặp

| Lỗi | Cách xử lý |
| --- | --- |
| `Unsupported engine` / Node version | Đặt Node.js 22.x trong Project Settings → General, redeploy. |
| Build lỗi type | Chạy `npm run typecheck` ở local, sửa rồi push lại. |
| Thiếu package | Đảm bảo `package-lock.json` được commit; chạy lại `npm install`. |
| Ảnh 404 | Kiểm tra đường dẫn phân biệt hoa/thường (Linux phân biệt), file nằm trong `public/`. Nên tránh tên có dấu cách/ký tự lạ. |
| Repo không hiện khi Import | Cấp lại quyền GitHub App cho repo. |
| Trang cũ vẫn hiển thị | Vào Deployments, kiểm tra commit mới nhất đã build; hard refresh trình duyệt. |
| Cần quay lại bản cũ | Deployments → chọn bản ổn định → **Promote to Production** / **Rollback**. |

## 9. Lưu ý chi phí và phạm vi

- Phase 1 chạy hoàn toàn trên gói Hobby miễn phí; không thêm dịch vụ trả phí khi chưa được duyệt.
- Khi sang Phase 2 (Supabase, CMS), thêm environment variables trong **Settings → Environment Variables** (không commit vào repo) và redeploy.
