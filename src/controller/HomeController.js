import userService from "../service/userService.js";

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  console.log("Cookies:", req.cookies);
  const userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  userService.CreateNewUser(email, password, username);
  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUsers(req.params.id);
  return res.redirect("/user");
};

const getUpdateUser = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserByID(id);
  let userData = user || {};
  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  await userService.updateUser(email, username, id);
  return res.redirect("/user");
};

const HomeController = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUser,
  handleUpdateUser,
};

export default HomeController;
