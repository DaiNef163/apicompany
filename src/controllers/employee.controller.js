import { dbConfig } from "../database.js";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import sql from "mssql";

export const createEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId,
    } = req.body;

    // creating a new Employee object
    const employee = new Employee({
      employeeId,
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId,
    });

    // saving the new employee
    const savedUser = await employee.save();

    return res.status(200).json({
      success: true,
      data: {
        _id: savedUser._id,
        employeeId: savedUser.employeeId,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        vacationDays: savedUser.vacationDays,
        paidToDate: savedUser.paidToDate,
        paidLastYear: savedUser.paidLastYear,
        payRate: savedUser.payRate,
        payRateId: savedUser.payRateId,
      },
    });
  } catch (error) {
    console.error({ success: true, data: error });
  }
};

export const getEmployee = async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  return res.json({ success: true, data: employee });
};

export const getEmployees = async (req, res, next) => {
  const employees = await Employee.find();
  return res.json({ success: true, data: employees });
};

export const displayallEmployee = async (req, res) => {
  try {
    console.log("sql connecting......");
    const employee = await Employee.find();
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query("select * from Personal"); // subject is my database table name
    const hr = result.recordsets[0];
    const data = [];
    for (let i = 0; i < employee.length; i++) {
      for (let j = 0; j < result.recordsets[0].length; j++) {
        if (employee[i].employeeId == hr[j].Employee_ID) {
          data.push({ ...hr[j], ...employee[i]._doc });
        }
      }
    }
    // console.log(data);
    res.render("displayEmployee1.ejs", { dataTableEmployee: data });
  } catch (err) {
    console.log(err);
  }
};
export const editEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findOne({ employeeId: employeeId });

    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .input("employeeId", sql.Int, employeeId) // Đưa vào giá trị của ID nhân viên
      .query("SELECT * FROM Personal WHERE Employee_ID = @employeeId");

    const hr = result.recordsets[0];
    const data = hr.map((record) => ({ ...record, ...employee._doc }));

    console.log(data);
    res.render("editEmployee.ejs", { employee: data[0] });
  } catch (err) {
    console.log(err);
  }
};

export const postEditEmployee = async (req, res) => {
  try {
    const employeeId = req.params?.id;
    if (!employeeId) {
      return res.status(404).json({ message: "Employee Id not found!" });
    }

    const {
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      First_Name,
      Last_Name,
      Middle_Initial,
      Address1,
      Address2,
      City,
      State,
      Zip,
      Email,
      Phone_Number,
      Social_Security_Number,
      Drivers_License,
      Marital_Status,
      Gender,
      Shareholder_Status,
      Benefit_Plans,
      Ethnicity,
    } = req.body;

    // Validate that all required fields are present
    if (!firstName || !lastName || !First_Name || !Last_Name || !employeeId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Update employee in MongoDB
    const employee = await Employee.findOneAndUpdate(
      { employeeId },
      { firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Convert boolean value for Shareholder_Status to integer
    // Convert boolean value for Gender and Shareholder_Status to integer
    const genderValue = Gender ? 1 : 0;
    const shareholderStatus = Shareholder_Status ? 1 : 0;

    // Update employee in SQL Server
    let pool = await sql.connect(dbConfig);

    await pool
      .request()
      .input("First_Name", sql.NVarChar, First_Name)
      .input("Last_Name", sql.NVarChar, Last_Name)
      .input("Middle_Initial", sql.NVarChar, Middle_Initial)
      .input("Address1", sql.NVarChar, Address1)
      .input("Address2", sql.NVarChar, Address2)
      .input("City", sql.NVarChar, City)
      .input("State", sql.NVarChar, State)
      .input("Zip", sql.NVarChar, Zip)
      .input("Email", sql.NVarChar, Email)
      .input("Phone_Number", sql.NVarChar, Phone_Number)
      .input("Social_Security_Number", sql.NVarChar, Social_Security_Number)
      .input("Drivers_License", sql.NVarChar, Drivers_License)
      .input("Marital_Status", sql.NVarChar, Marital_Status)
      .input("Gender", sql.Bit, genderValue)
      .input("Shareholder_Status", sql.Bit, shareholderStatus)
      .input("Benefit_Plans", sql.NVarChar, Benefit_Plans)
      .input("Ethnicity", sql.VarChar, Ethnicity)
      .input("Employee_ID", sql.NVarChar, employeeId).query(`
      UPDATE Personal 
      SET 
        First_Name = @First_Name,
        Last_Name = @Last_Name,
        Middle_Initial = @Middle_Initial,
        Address1 = @Address1,
        Address2 = @Address2,
        City = @City,
        State = @State,
        Zip = @Zip,
        Email = @Email,
        Phone_Number = @Phone_Number,
        Social_Security_Number = @Social_Security_Number,
        Drivers_License = @Drivers_License,
        Marital_Status = @Marital_Status,
        Gender = @Gender,
        Shareholder_Status = @Shareholder_Status,
        Benefit_Plans = @Benefit_Plans,
        Ethnicity = @Ethnicity
      WHERE Employee_ID = @Employee_ID
    `);

    console.log(req.body);
    return res.redirect("/api/employee/displayEmployee");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findOne({ employeeId: employeeId });

    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .input("employeeId", sql.Int, employeeId) // Đưa vào giá trị của ID nhân viên
      .query("SELECT * FROM Personal WHERE Employee_ID = @employeeId");

    const hr = result.recordsets[0];
    const data = hr.map((record) => ({ ...record, ...employee._doc }));

    console.log(data);
    res.render("deleteEmployee.ejs", { employee: data[0] });
  } catch (err) {
    console.log(err);
  }
};

export const postDeleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params?.id;
    if (!employeeId) {
      return res.status(404).json({ message: "Employee Id not found!" });
    }

    // Xóa nhân viên khỏi MongoDB
    const employee = await Employee.findOneAndDelete({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Xóa nhân viên khỏi SQL Server
    let pool = await sql.connect(dbConfig);
    await pool.request().input("Employee_ID", sql.NVarChar, employeeId).query(`
          DELETE FROM Personal
          WHERE Employee_ID = @Employee_ID
        `);

    return res.redirect("/api/employee/displayEmployee");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const displayDashboard = async (req, res) => {
  try {
    const employee = await User.find();
    return res.render("displayDashboard.ejs", { dataTableEmployee: employee });
  } catch (error) {
    console.log(error);
  }
};

// (async function () {
//   try {
//     console.log("sql connecting......");
//     const employee = await Employee.find();
//     let pool = await sql.connect(dbConfig);
//     let result = await pool.request().query("select * from Personal"); // subject is my database table name
//     const hr = result.recordsets[0];
//     const data = [];
//     for (let i = 0; i < employee.length; i++) {
//       for (let j = 0; j < result.recordsets[0].length; j++) {
//         if (employee[i].employeeId == hr[j].Employee_ID ) {
//           data.push({ ...hr[j], ...employee[i]._doc });
//         }
//       }
//     }
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// })();

(async function () {
  try {
    console.log("sql connecting......");
    const employee = await Employee.find();
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query("select * from Personal"); // subject is my database table name
    const hr = result.recordsets[0];
    const data = [];
    for (let i = 0; i < employee.length; i++) {
      for (let j = 0; j < result.recordsets[0].length; j++) {
        if (employee[i].employeeId == hr[j].Employee_ID) {
          data.push({ ...hr[j], ...employee[i]._doc });
        }
      }
    }
    // console.log(employee);
  } catch (err) {
    console.log(err);
  }
})();

export const testdisplay = async (req, res) => {
  res.render("testdisplay.ejs");
};

function generateEmployeeId() {
  const timestamp = Date.now().toString().slice(-1); // Lấy 6 chữ số cuối của timestamp
  const randomNum = Math.floor(Math.random() * 10000); // Số ngẫu nhiên từ 0 đến 999
  return `${timestamp}${randomNum}`;
}

export const postCreateEmployee = async (req, res) => {
  try {
    // Tạo một giá trị employeeId duy nhất
    const employeeId = generateEmployeeId();

    const {
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId,
      First_Name,
      Last_Name,
      Middle_Initial,
      Address1,
      Address2,
      City,
      State,
      Zip,
      Email,
      Phone_Number,
      Social_Security_Number,
      Drivers_License,
      Marital_Status,
      Gender,
      Shareholder_Status,
      Benefit_Plans,
      Ethnicity,
    } = req.body;
    console.log(req.body);
    // Validate that all required fields are present
    if (!firstName || !lastName || !First_Name || !Last_Name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new employee object for MongoDB with employeeId
    const newEmployeeMongoDB = new Employee({
      employeeId, // Sử dụng giá trị employeeId đã tạo
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId,
    });
    // console.log("check id",employeeId);
    // Save the new employee record to MongoDB
    await newEmployeeMongoDB.save();

    // Create new employee object for SQL Server
    const newEmployeeSQL = [
      First_Name,
      Last_Name,
      Middle_Initial,
      Address1,
      Address2,
      City,
      State,
      Zip,
      Email,
      Phone_Number,
      Social_Security_Number,
      Drivers_License,
      Marital_Status,
      Gender,
      Shareholder_Status,
      Benefit_Plans,
      Ethnicity,
      payRateId,
    ];

    const pool = await sql.connect(dbConfig);
    // Insert the new employee record into SQL Server
    const genderValue = Gender ? "Male" : "Female";
    const shareholderStatus = Shareholder_Status ? "Yes" : "No";

    // console.log("check gender",genderValue);
    // Update employee in SQL Server
    await pool
      .request()
      .input("First_Name", sql.NVarChar, First_Name)
      .input("Last_Name", sql.NVarChar, Last_Name)
      .input("Middle_Initial", sql.NVarChar, Middle_Initial)
      .input("Address1", sql.NVarChar, Address1)
      .input("Address2", sql.NVarChar, Address2)
      .input("City", sql.NVarChar, City)
      .input("State", sql.NVarChar, State)
      .input("Zip", sql.NVarChar, Zip)
      .input("Email", sql.NVarChar, Email)
      .input("Phone_Number", sql.NVarChar, Phone_Number)
      .input("Social_Security_Number", sql.NVarChar, Social_Security_Number)
      .input("Drivers_License", sql.NVarChar, Drivers_License)
      .input("Marital_Status", sql.NVarChar, Marital_Status)
      .input("Gender", sql.Bit, genderValue)
      .input("Shareholder_Status", sql.Bit, shareholderStatus)
      .input("Benefit_Plans", sql.Float, Benefit_Plans)
      .input("Ethnicity", sql.VarChar, Ethnicity)
      .input("Employee_ID", sql.Float, employeeId).query(`
        INSERT INTO Personal (
          First_Name,
          Last_Name,
          Middle_Initial,
          Address1,
          Address2,
          City,
          State,
          Zip,
          Email,
          Phone_Number,
          Social_Security_Number,
          Drivers_License,
          Marital_Status,
          Gender,
          Shareholder_Status,
          Benefit_Plans,
          Ethnicity,
          Employee_ID
          
        ) VALUES (
          @First_Name,
          @Last_Name,
          @Middle_Initial,
          @Address1,
          @Address2,
          @City,
          @State,
          @Zip,
          @Email,
          @Phone_Number,
          @Social_Security_Number,
          @Drivers_License,
          @Marital_Status,
          @Gender,
          @Shareholder_Status,
          @Benefit_Plans,
          @Ethnicity,
          @Employee_ID
         
        )
      `);

    return res.redirect("/api/employee/displayEmployee");

    return res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const displayallUser = async (req, res) => {
  try {
    const employee = await Employee.find();
    return res.render("displayUser.ejs", { dataTableEmployee: employee });
  } catch (error) {
    console.log(error);
  }
  
};