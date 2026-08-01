import path from "path";
import dotenv from "dotenv";
dotenv.config(); // Tự động đọc file .env ở thư mục gốc của dự án

const corsOptions = {
  origin: process.env.REACT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOptions;
