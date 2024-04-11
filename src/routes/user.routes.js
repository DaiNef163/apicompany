import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  displayallUser,
  displayDashboard,
  editUser,
} from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";
import {
  createEmployee,
  getEmployees,
  getEmployee,
} from "../controllers/employee.controller.js";
const router = Router();

// router.post("/", [verifyToken, isAdmin, checkExistingUser], createUser);
// router.get("/", [verifyToken, isAdmin, checkExistingUser], getUsers);
router.post("/", [checkExistingUser], createUser);
router.get("/", getUsers);
router.get("/displayUsers", displayallUser);
router.get("/displayDashboard", displayDashboard);
router.get("/editUser", editUser);
router.get("/:userId", [verifyToken, isAdmin, checkExistingUser], getUser);

export default router;
