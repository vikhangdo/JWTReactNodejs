import bcrypt from "bcryptjs";
import db from "../models/models/index.js";
import { Op } from "sequelize";
import { raw } from "body-parser";
import getGroupWithRoles from "./getGroupWithRoles.js";
import { creatJWT, verifyToken } from "../middleware/JWTAction.js";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};
const checkEmailExists = async (userEmail) => {
  let user = await db.user.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }

  return false;
};

const checkPhoneExists = async (UserPhone) => {
  let user = await db.user.findOne({
    where: { phone: UserPhone },
  });
  if (user) {
    return true;
  }

  return false;
};

const registerService = async (userData) => {
  try {
    //check exits info
    let isEmailExists = await checkEmailExists(userData.email);
    if (isEmailExists === true) {
      return {
        EM: "Email da ton tai!",
        EC: 1,
        DT: "",
      };
    }
    let isPhoneExists = await checkPhoneExists(userData.phone);
    if (isPhoneExists === true) {
      return {
        EM: "So dien thoai da ton tai!",
        EC: 1,
        DT: "",
      };
    }
    // hash password
    let hashPass = hashPassword(userData.password);

    // create new user
    await db.user.create({
      email: userData.email,
      password: hashPass,
      username: userData.username,
      phone: userData.phone,
      groupId: 3,
    });

    return {
      EM: "A new user has been created",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something was wrong!!",
      EC: "1",
    };
  }
};

const checkPassword = (inputPassword, hassPassword) => {
  return bcrypt.compare(inputPassword, hassPassword);
};

const handleUserLogin = async (rawData) => {
  //check email/phone
  try {
    let users = await db.user.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (users) {
      // console.log(">>> Check user: ", users.get({ plain: true }));
      let checkPass = await checkPassword(rawData.password, users.password);
      if (checkPass === true) {
        let roles = await getGroupWithRoles(users);
        let payload = {
          email: users.email,
          username: users.username,
          roles,
        };
        let token = creatJWT(payload);
        return {
          EM: "OK!",
          EC: 0,
          DT: {
            access_token: token,
            roles,
            email: users.email,
            username: users.username,
          },
        };
      }
    }

    return {
      EM: "Emai/Phone or password is incorrect!",
      EC: 1,
    };
  } catch (e) {
    console.log(">> Check error from handleUserLogin: ", e);

    return {
      EM: "Something went wrong in login service!",
      EC: -1,
      DT: "",
    };
  }
  //check password
};
module.exports = {
  registerService,
  handleUserLogin,
};
