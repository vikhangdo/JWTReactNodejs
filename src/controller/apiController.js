import loginRegisterService from "../service/loginRegisterService.js";

// const testAPI = (req, res) => {
//     res.status(200).json({
//         message: "Hello, this is a simple API endpoint!",
//         data: 'test api data'
//     });
// };

const handleRegister = async (req, res) => {
  //tiếp nhận yêu cầu từ FE
  //check dữ liệu từ FE gửi lên
  if (!req.body.email || !req.body.phone) {
    return res.status(400).json({
      message: "Bi thieu goi ma!",
    });
  }

  //nếu đủ rồi thì mình tạo user
  let data = await loginRegisterService.registerService(req.body);

  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: "",
  });
};

const handleLogin = async (req, res) => {
  let data = await loginRegisterService.handleUserLogin(req.body);
  if (data && data.DT && data.DT.access_token) {
    res.cookie("jwt", data.DT.access_token, {
      httpOnly: true,
      maxAge: 3600000, // 1 tiếng (3.600.000 milliseconds)
    });
  }
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
};
export default { handleRegister, handleLogin };
