import dotenv from "dotenv";
import app from "./src/app.js";
import swaggerDocs from "./src/docs/swager.js";
import connectDB from "./src/config/db.js";

dotenv.config();

// Konfigurasi Swagger
swaggerDocs(app);

// Koneksi ke database
connectDB();

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
