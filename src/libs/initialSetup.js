import Role from "../models/Role.js";
import User from "../models/User.js";
import { faker } from "@faker-js/faker";

import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from "../config.js";
import bcrypt from "bcryptjs";
import Employee from "../models/Employee.js";
import Product from "../models/Product.js";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const userFound = await User.findOne({ email: ADMIN_EMAIL });
  console.log(userFound);
  if (userFound) return;

  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

  const newUser = await User.create({
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    roles: roles.map((role) => role._id),
  });

  console.log(`new user created: ${newUser.email}`);
};

export const create500Employee = async () => {
  const roleForUser = await Role.find({ name: "user" });
  console.log(roleForUser);

  for (let i = 0; i < 500; i++) {
    const newEmployee = await Employee.create({
      employeeId: i + "",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      vacationDays: faker.number.int({ min: 0, max: 30 }), // Số ngày nghỉ phép
      paidToDate: faker.number.int({ min: 0, max: 10000 }), // Số tiền đã thanh toán đến ngày
      paidLastYear: faker.number.int({ min: 0, max: 10000 }), // Số tiền đã thanh toán trong năm trước
      payRate: faker.number.float(0.8), // Tỉ lệ thanh toán
      payRateId: faker.number.int(1), // Mã tỷ lệ thanh toán
    });
    console.log(
      `new employee created: ${newEmployee.firstName} ${newEmployee.lastName}`
    );
  }
};

export const create500Users = async () => {
  const roleForUser = await Role.find({ name: "user" });
  console.log(roleForUser);

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync("123456", salt);
  console.log("check hashPassword: ", hashPassword);

  for (let i = 0; i < 500; i++) {
    const newUser = await User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roles: roleForUser.map((role) => role._id),
    });
    console.log(`new user created: ${newUser.email}`);
  }
};

export const create500Products = async () => {
  const roleForUser = await Role.find({ name: "user" });
  console.log(roleForUser);

  for (let i = 0; i < 190; i++) {
    const newProduct = await Product.create({
      name: faker.lorem.words(2),
      category: faker.commerce.department(),
      price: faker.commerce.price(),
    });
    console.log(`new user created: ${newProduct.name}`);
  }
};

// createRoles();
// createAdmin();
create500Products();
// create500Users();
// create500Employee();
