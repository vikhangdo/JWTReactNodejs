import express from "express";
import HomeController from "../controller/HomeController.js";
import apiController from "../controller/apiController.js";
import userController from "../controller/userController.js";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction.js";
const router = express.Router();
const initAPIRoutes = (app) => {
  router.use(checkUserJWT, checkUserPermission);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/account", userController.getUserAccount);

  //userAPI
  router.get("/users/show", userController.showFunc);
  router.post("/users/create", userController.createFunc);
  router.put("/users/update", userController.updateFunc);
  router.delete("/users/delete", userController.deleteFunc);

  return app.use("/api/v1/", router);
};
export default initAPIRoutes;
