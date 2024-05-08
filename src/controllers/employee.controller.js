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
    res.render("displayEmployee1.ejs", { dataTableEmployee: data });
  } catch (err) {
    console.log(err);
  }
};
export const editEmployee = async (req, res) => {
  try {
    console.log("sql connecting......");
    const employeeId = req.params.id;
    const employee = await Employee.findOne({ employeeId: employeeId });

    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .input("employeeId", sql.Int, employeeId) // Đưa vào giá trị của ID nhân viên
      .query("SELECT * FROM Personal WHERE Employee_ID = @employeeId");

    const hr = result.recordsets[0];
    const data = hr.map(record => ({ ...record, ...employee._doc }));

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
    } = req.body;

    const employee = await Employee.findOneAndUpdate(
      { employeeId: employeeId },
      { firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate },
      { new: true }
    );



    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    } else {
      return res.redirect("/api/employee/displayEmployee");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id; // Lấy employeeId từ req.params
    const employee = await Employee.findOne({ employeeId: employeeId }); // Tìm nhân viên dựa trên employeeId

    return res.render("deleteEmployee.ejs", {
      employee: employee,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params?.id;
    if (!employeeId) {
      return res.status(404).json({ message: "Employee Id not found!" });
    }

    const employee = await Employee.findOneAndDelete({
      employeeId: employeeId,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    } else {
      return res.redirect("/api/employee/displayEmployee");
    }
  } catch (error) {
    console.log(error);
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

export const mergeData = async (req, res) => {
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
    res.render("testdisplay.ejs", { employees: data });
  } catch (err) {
    console.log(err);
  }
};

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
  try {
    console.log("sql connecting......");
    const employee = await Employee.findOne({ employeeId: 1 }); // Lấy thông tin nhân viên có ID là 1 từ đối tượng Employee
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .input("employeeId", sql.Int, 1) // Sử dụng ID cụ thể để truy vấn dữ liệu cho nhân viên có ID là 1
      .query("select * from Personal"); // subject is my database table name
    const hr = result.recordsets[0];
    const data = [];
    for (let i = 0; i < employee.length; i++) {
      for (let j = 0; j < result.recordsets[0].length; j++) {
        if (employee[i].employeeId == hr[j].Employee_ID) {
          data.push({ ...hr[j], ...employee[i]._doc });
        }
      }
    }
    res.render("testdisplay.ejs", { employees: data });
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
