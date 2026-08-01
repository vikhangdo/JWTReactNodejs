import userAPIService from "../service/userAPIService.js";
const showFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await userAPIService.getAllUser(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const createFunc = async (req, res) => {
  let data = await userAPIService.createUser(req.body);
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
};
const updateFunc = async (req, res) => {
  let data = await userAPIService.updateUser(req.body);
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
};
const deleteFunc = async (req, res) => {
  let data = await userAPIService.deleteUser(req.body.id);
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
};

const getUserAccount = (req, res) => {
  return res.status(200).json({
    EM: 'ok',
    EC: 0,
    DT: {
      access_token: req.token,
      user: req.user,
    },
  });
}

module.exports = {
  showFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getUserAccount
};
