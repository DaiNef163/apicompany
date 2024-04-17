import { config } from "dotenv";
config();
import sql from "mssql";

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/apicompany";
export const PORT = process.env.PORT || 4000;
export const SECRET = "yoursecretkey";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

export const sqlConfig = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASS || "123456",
  server: process.env.DB_HOST || "DESKTOP-USCQBCD\\HOAINAM",
  database: process.env.DB_DATABASE || "HR",
  // options: {
  //   encrypt: true, // for azure
  //   trustServerCertificate: true,
  //   enableArithAbort: true,
  //   // port: parseInt(process.env.DB_PORT) || 1433,
  // },
};
async function connectToSqlServer() {
  try {
    await sql.connect(sqlConfig);
    console.log("Connected to SQL Server");
  } catch (error) {
    console.error("Error connecting to SQL Server:", error);
  }
}

// Call the function to connect to SQL Server
connectToSqlServer();
// import sql from "mssql/msnodesqlv8";

// config for your database

// var sqlConfig = {
//   user: "root",
//   password: "",
//   server: "DESKTOP-USCQBCD", // chỉ định tên máy tính
//   database: "HR",
//   port: "1433",
//   dialect: "mssql",
//   dialectOptions: {
//     instanceName: "HOAINAM", // chỉ định tên thực thể
//   },
// };

// (async () => {
//   try {
//     // connect to your database

//     let pool = await sql.connect(sqlConfig);

//     // create Request object

//     const request = pool.request();

//     // query to the database and get the records

//     request.query("select * from Employment", (err, result) => {
//       console.dir(result);
//     });
//   } catch (err) {
//     // ... error checks

//     console.log("This is Error");

//     console.log(err);

//     console.dir(err);
//   }
// })();

// sql.on("error", (err) => {
//   // ... error handler

//   console.log("This is Error handler");
// });

// const sqlConfig = {
//   authentication: {
//     type: 'default',
//     options: {
//       userName: "", // Bỏ trống user name để sử dụng Windows authentication
//       password: "" // Bỏ trống password để sử dụng Windows authentication
//     }
//   },
//   server: process.env.DB_HOST || "DESKTOP-USCQBCD\\HOAINAM", // Set default server to "DESKTOP-USCQBCD" if not provided
//   database: process.env.DB_DATABASE || "HR", // Make sure to provide database name in the environment
//   options: {
//     port: parseInt(process.env.DB_PORT) || 1433 // Parse port to integer and set default to 1433 if not provided
//   }
// };

// const poolPromise = new sql.ConnectionPool(sqlConfig)
// .connect()
// .then((pool) => {
//   console.log('Connected to MSSQL');
//   return pool;
// })
// .catch((err) => console.log('Database Connection Failed! Bad Config: ', err));

// export  {
// sqlConfig,
// poolPromise,
// }

// let sqlConfig = {
//   connectionString: 'Driver=SQL Server;Server=YOURINSTANCE\\SQLEXPRESS;Database=master;Trusted_Connection=true;'
// };
// sql.connect(sqlConfig, err => {
//   new sql.Request().query('SELECT 1 AS justAnumber', (err, result) => {
//     console.log(".:The Good Place:.");
//     if(err) { // SQL error, but connection OK.
//       console.log("  Shirtballs: "+ err);
//     } else { // All is rosey in your garden.
//       console.dir(result);
//     };
//   });
// });
// sql.on('error', err => { // Connection borked.
//   console.log(".:The Bad Place:.");
//   console.log("  Fork: "+ err);
// });
