import bcrypt from "bcryptjs";
import connection from "../config/connectionDB.js";
import db from "../models/models/index.js";
const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const CreateNewUser = async (email, password, username) => {
  const hashPass = hashPassword(password);
    await db.user.create({
      email: email,
      password: hashPass,
      username: username
    });
};

const getUserList = async () => {

  let newUser = await db.user.findOne({
    where: {id : 1},
    include: {model : db.group},
    raw: true,
    nest: true
  })

  let users = [];
  users = await db.user.findAll();
  return users;
};


const deleteUsers = async (id) => {
  try {
    return await db.user.destroy({ where: { id } });
  } catch (error) {
    console.log(">>> Check error:", error);
  }
};

const getUserByID = async (id) => {
  try {
    return await db.user.findByPk(id);
  } catch (error) {
    console.log(">>> Check error:", error);
  }
};

const updateUser = async (email, username, id) => {
  try {
    return await db.user.update(
      { email, username },
      { where: { id } },
    );
  } catch (error) {
    console.log(">>> Check error:", error);
  }

};

const userService = {
  CreateNewUser,
  getUserList,
  deleteUsers,
  getUserByID,
  updateUser,
};

export default userService;
