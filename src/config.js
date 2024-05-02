import { config } from "dotenv";
import sql from "mssql";
import express from "express";
import mongoose from "mongoose";

let app = express();
config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/apicompany";
export const PORT = process.env.PORT || 4000;
export const SECRET = "yoursecretkey";


export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

export const SERVER = process.env.DB_SERVER || `DESKTOP-USCQBCD\\HOAINAM`;
export const DATABASE = process.env.DB_DATABASE || "HR";

export const dbConfig = {
  server: SERVER,
  user: "sa",
  password: "1",
  database: DATABASE,
  options: {
    trustedConnection: true,
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Hàm kết nối đến SQL Server
export const connectToSQLServer = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error('Error connecting to SQL Server:', error.message);
    throw error;
  }
};

// Hàm thực hiện truy vấn
export const executeQuery = async (query) => {
  try {
    const pool = await connectToSQLServer();
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    console.error('Error executing SQL query:', error.message);
    throw error;
  }
};

  


