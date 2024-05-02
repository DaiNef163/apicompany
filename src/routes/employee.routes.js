import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  displayallEmployee,
  editEmployee,
  postEditEmployee,

} from "../controllers/employee.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/displayEmployee", displayallEmployee);

router.get("/editEmployee/:id", editEmployee);
router.post("/update-employee/:id", postEditEmployee);
// router.post('/update-employee',getpostEditEmployee)
// router.post("/", [verifyToken, isAdmin, checkExistingUser], createEmployee);
// router.get("/", [verifyToken, isAdmin, checkExistingUser], getEmployees);
router.get(
  "/:employeeId",
  [verifyToken, isAdmin, checkExistingUser],
  getEmployee
);
export default router;
