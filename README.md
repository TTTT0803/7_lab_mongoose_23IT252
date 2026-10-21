# 7_Mongoose 101 — Thao (23IT252)

## 1. Môi trường
- Node.js và npm
- Visual Studio Code
- MongoDB Atlas

## 2. Cấu trúc project
```text
7_lab_mongoose_23IT252/
├── index.js
├── models/
│   └── Character.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 3. Cài đặt
```bash
npm install
```

## 4. Kết nối MongoDB Atlas
1. Tạo database trên MongoDB Atlas.
2. Sao chép `.env.example` thành `.env`.
3. Thay `MONGODB_URI` bằng connection string thật của bạn.
4. Không đưa file `.env` lên GitHub.

## 5. Model Character
Model nằm trong `models/Character.js`, gồm hai trường String: `name` và `ultimate`. Trường `name` có `unique: true` để tạo unique index.

## 6–8. Chạy các cách lưu dữ liệu
```bash
npm start           # mặc định chạy async/await
npm run async       # async/await
npm run promise     # Promise then/catch
node index.js save  # save() trong hàm async
```
Nhân vật mẫu: `Thao`, ultimate: `Shinku Hadoken`.

Lưu ý: chạy các chế độ lưu nhiều lần sẽ gặp lỗi trùng tên vì `name` là duy nhất. Đây là hành vi mong đợi sau khi unique index được tạo.

## 9. Kiểm tra tính duy nhất
```bash
npm run unique
```
Lệnh này xóa các document có `name: "Thao"` trước khi thử, lưu một document rồi thử lưu document thứ hai cùng tên. Chỉ chạy trên database dùng cho bài thực hành vì thao tác này xóa bản ghi `Thao` hiện có.

## 10. GitHub
Tạo repository mới tên `7_lab_mongoose_23IT252`, sau đó chạy:
```bash
git init
git add .
git commit -m "Complete Mongoose 101 lab"
git branch -M main
git remote add origin https://github.com/<your-github-username>/7_lab_mongoose_23IT252.git
git push -u origin main
```
Thay `<your-github-username>` bằng username GitHub của bạn.
