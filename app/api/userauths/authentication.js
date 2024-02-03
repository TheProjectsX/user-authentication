import { readData, updateData } from "../dblite/datahelper";
import * as bcrypt from "bcryptjs";
import crypto from "crypto";

const generateUniqueId = (email) => {
  const hash = crypto.createHash("md5").update(email).digest("hex");
  return hash.slice(0, 8);
};

// Create User
const createUser = async (fullName, userEmail, userPassword) => {
  const existingUsers = await readData();
  if (existingUsers.some((user) => user.email === userEmail)) {
    return { success: false, msg: "User Already Exists!" };
  }

  const hashedPassword = bcrypt.hashSync(userPassword, 10);
  const uniqueId = generateUniqueId(userEmail);

  const userData = {
    fullName: fullName,
    email: userEmail,
    password: hashedPassword,
    uniqueId,
    createdAt: Date.now(),
  };

  return { success: updateData(userData) };
};

// Check User Login
const checkLogin = async (userEmail, userPassword) => {
  const existingUsers = await readData();

  const dataMatched = existingUsers.filter((user) => {
    if (user.email === userEmail) {
      return bcrypt.compareSync(userPassword, user.password);
    }
  });

  if (dataMatched.length === 0) {
    return null;
  }

  const { password, ...filteredData } = dataMatched[0];

  return filteredData;
};

export { createUser, checkLogin };
