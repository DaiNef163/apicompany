import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  displayallEmployee,
} from "../controllers/employee.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/displayEmployee", displayallEmployee);
// router.post("/", [verifyToken, isAdmin, checkExistingUser], createEmployee);
// router.get("/", [verifyToken, isAdmin, checkExistingUser], getEmployees);
router.get(
  "/:employeeId",
  [verifyToken, isAdmin, checkExistingUser],
  getEmployee
);
export default router;
