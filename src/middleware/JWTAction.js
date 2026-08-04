import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const creatJWT = (payload) => {
  let key = process.env.JWT_token;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (e) {
    console.log(e);
  }

  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_token;
  let data = null;
  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (err) {
    console.log(err);
  }

  return data;
};


const extractToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  if (req.cookies && req.cookies.jwt) {
    return req.cookies.jwt;
  }
  return null;
};

const checkUserJWT = (req, res, next) => {
  const nonSecurePaths = ["/login", "/register", "/logout"];
  if (nonSecurePaths.includes(req.path)) return next();
  let token = extractToken(req); // Đọc token từ Header hoặc Cookie
  if (token) {
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      return next();
    } else {
      return res.status(401).json({
        EC: -1,
        EM: "Not authenticated the user",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Not authenticated the user",
      DT: "",
    });
  }
};


const checkUserPermission = (req, res, next) => {
  const nonSecurePaths = ["/login", "/register", "/logout"];
  if (nonSecurePaths.includes(req.path) || req.path === "/account") return next();
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.roles ? req.user.roles.roles : [];
    let currentPath = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource...",
      });
    }

    let canAccess = roles.some((item) => item.url === currentPath);
    if (canAccess === true) {
      return next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource...",
      });
    }
  } else {
    return res.status(403).json({
      EC: -1,
      DT: "",
      EM: "You don't have permission to access this resource...",
    });
  }
};

module.exports = {
  creatJWT,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
