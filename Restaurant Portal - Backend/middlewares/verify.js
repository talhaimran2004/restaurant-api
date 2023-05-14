const { SECRET_KEY } = require("../key");
const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  jwt.verify(req.headers.token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send("Error =>", err);
    }

    console.log(decoded.email);
    req.user = decoded.email;
    next();
  });
};
