import express from "express";
import HomeController from "../controller/HomeController.js";
import apiController from "../controller/apiController.js";
const router = express.Router();
const initWebRoutes = (app) => {
  router.get("/", HomeController.handleHelloWorld);
  router.get("/user", HomeController.handleUserPage);
  router.post("/user/create-user", HomeController.handleCreateNewUser);
  router.post("/delete-user/:id", HomeController.handleDeleteUser);
  router.get("/update-user/:id", HomeController.getUpdateUser);
  router.post("/user/update-user", HomeController.handleUpdateUser);


  //rest api
  return app.use("/", router);
};
export default initWebRoutes;
