import { config } from "dotenv";
config();
import sql from "mssql";
import express from "express";
let app = express();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/apicompany";
export const PORT = process.env.PORT || 4000;
export const SECRET = "yoursecretkey";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

export const PORT1 = process.env.PORT1 || 5000;
export const SERVER = process.env.DB_SERVER || `DESKTOP-USCQBCD\\HOAINAM`;
export const DATABASE = process.env.DB_DATABASE || "HR";

app.get("/", async (req, res) => {
  try {
    const dbConfig = {
      server: "DESKTOP-USCQBCD\\HOAINAM",
      user: "sa",
      password: "1",
      database: "HR",
      options: {
        trustedConnection: true,
        encrypt: true,
        trustServerCertificate: true,
      },
    };

    console.log("Connecting to MSSQL server...");
    await sql.connect(dbConfig);
    console.log("Connected to MSSQL server successfully.");
    const request = new sql.Request();
    // Truy vấn cơ sở dữ liệu và lấy các bản ghi
    const result = await request.query("select * from dbo.Personal");
    res.send(result.recordset);
  } catch (err) {
    console.error("Database query error:", err.message);
    res.status(500).json({ err: "Internal server error" });
  }
});

app.listen(PORT1, () => {
  console.log(`Server is running on port ${PORT1}`);
});


