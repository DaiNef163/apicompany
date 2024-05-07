import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";


const __dirname = path.resolve();

const app = express();



// Routes
import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/products.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
 



// const app = express();

// Settings
app.set("port", process.env.PORT || 4000);
app.set("port1", process.env.PORT1 || 5000);
app.set("json spaces", 4);
app.set("view engine", "ejs");
app.set("views", "./src/views/FrontEndEJS");

app.use((req, res, next) => {
  // Add multiple views directories to app settings
  app.set("views", ["./src/views/FrontEndEJS", "./src/views/FrontEndEJS/Personal"]);
  next();
});

// const path = require('path');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// // Tiếp tục cấu hình các định tuyến và các middleware khác...

// // Khởi động máy chủ
// app.listen(4001, () => {
  //     console.log('Server is running on port 4001');
  // });
  




  // Middlewares
  app.use(
    cors({
      // origin: "http://localhost:3000",
    })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use("/api", indexRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
export default app;
