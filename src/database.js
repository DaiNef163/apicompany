import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
import sql from "mssql";
import Employee from "./models/Employee.js";

try {
  const db = await mongoose.connect(MONGODB_URI);
  console.log("Database is connected to", db.connection.name);
} catch (error) {
  console.error(error.message);
}

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

