import { includes } from "lodash";
import db from "../models/models/index.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
const getAllUser = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.user.findAndCountAll({
      attributes: ["id", "email", "username", "phone", "groupId"],
      include: { model: db.group, attributes: ["description"] },
      offset: offset,
      limit: limit,
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count, // Tổng số dòng
      totalPages: totalPages, // Tổng số trang
      users: rows, // Danh sách users của trang này
    };

    return {
      EM: "Fetch users with pagination success",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrong in service",
      EC: -1,
      DT: "",
    };
  }
};

const isEmailExist = async (userEmail) => {
  let user = await db.user.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.user.findOne({
    where: { phone: userPhone },
  });
  if (user) return true;
  return false;
};

const hashPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createUser = async (data) => {
  let checkEmail = await isEmailExist(data.email);
  if (checkEmail === true) {
    return {
      EM: "The email is already exist in database!",
      EC: 1,
      DT: "email",
    };
  }
  let isPhoneExist = await checkPhoneExist(data.phone);
  if (isPhoneExist === true) {
    return {
      EM: "The phone number is already registered by another user!",
      EC: 1,
      DT: "phone",
    };
  }

  const hashPass = hashPassword(data.password);
  await db.user.create({
    email: data.email,
    username: data.username,
    phone: data.phone,
    password: hashPass,
    address: data.address,
    sex: data.sex,
    groupId: data.groupId,
  });

  return {
    EM: "A user is created successfully!",
    EC: 0,
    DT: "",
  };
};
const updateUser = async (data) => {
  let user = await db.user.update(
    {
      username: data.username,
      phone: data.phone,
      address: data.address,
      sex: data.sex,
      groupId: data.groupId,
    },
    { where: { id: data.id } },
  );

  return {
    EM: "Update user success",
    EC: 0,
    DT: data,
  };
};
const deleteUser = async (id) => {
  let user = await db.user.findOne({ where: { id: id } });
  if (user) {
    await user.destroy();
    return {
      EM: "Delete user successfully",
      EC: 0,
      DT: "",
    };
  }
};
module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
