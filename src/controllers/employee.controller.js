import Employee from "../models/Employee.js";

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
  const employee = await Employee.findById(req.params.employeeId);
  return res.json({ success: true, data: employee });
};

export const getEmployees = async (req, res, next) => {
  const employees = await Employee.find();
  return res.json({ success: true, data: employees });
};

export const displayallEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    return res.render("displayEmployee1.ejs", { dataTableEmployee: employee });
  } catch (error) {
    console.log(error);
  }
};
export const editEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    return res.render("editEmployee.ejs", { dataTableEmployee: employee , Employee:employee });
  } catch (error) {
    console.log(error);
  }
};
export const displayDashboard = async (req, res) => {
  try {
    const employee = await User.find();
    return res.render("displayDashboard.ejs", { dataTableEmployee: employee});
  } catch (error) {
    console.log(error);
  }
};
