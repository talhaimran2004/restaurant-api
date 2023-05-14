const multer = require("multer");
const user = require("../model/user");
const asyncWrapper = require("../middlewares/async");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = require("../key");
const jwt = require("jsonwebtoken");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let getAllUsers = asyncWrapper(async (req, res) => {
  let allUsers = await user.find();
  res.status(200).json({ allUsers });
});

let getSingleUser = asyncWrapper(async (req, res) => {
  let { email } = req.params;
  let singleUser = await user.find({ email: email });
  res.status(200).json({ singleUser });
});

let createUser = asyncWrapper(async (req, res) => {
  const encPass = await bcrypt.hash(req.body.pass, 12);
  await user.create({
    username: req.body.name,
    email: req.body.email,
    password: encPass,
    profileImage: req.file.path,
  });
  return res.status(200).redirect("http://localhost:3000/login");
});

let loginUser = asyncWrapper(async (req, res) => {
  let existingUser = await user.findOne({ email: req.body.email });
  if (
    existingUser.email === req.body.email &&
    (await bcrypt.compare(req.body.pass, existingUser.password))
  ) {
    let token = await jwt.sign({ email: req.body.email }, SECRET_KEY, {expiresIn: '1h'});
    res.cookie(token, {
      httpOnly: true
    })
    res.status(200).redirect(`http://localhost:3000/shop`);
  } else {
    res.send("wrong credentials");
  }
});

let getCurrentUser = asyncWrapper(async (req, res) => {  
  let token = req.headers.token;
 let decodedCookie = decodeURIComponent(token)
 let newToken = decodedCookie.replace('=j:{"httpOnly":true}', '')
 
  
  await jwt.verify(newToken, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.send(err);
    } 
      res.json({email: decoded.email});
  });
})

let updateUser = asyncWrapper(async (req, res) => {
  let { id: itemID } = req.params;

  let updatedUser = await user.findOneAndUpdate(
    { _id: itemID },
    {
      username: req.body.name,
      email: req.body.desc,
      profileImage: "public\\uploads\\users\\1683706301686-nihari.png",
    },
    {
      new: true,
      runValidators: true,
    }
  );

  console.log("Update req =>", updatedUser);
  res.status(200).json({ updatedUser });
});

let deleteUser = asyncWrapper(async (req, res) => {
  let { id: itemID } = req.params;
  let DeletedUser = await user.deleteOne({ _id: itemID });
  res.status(200).json({ DeletedUser });
});

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  storage,
};
