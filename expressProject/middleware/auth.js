var jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.send({ success: false, message: "JWT Token is required" });
    }
    let decodedData;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.send(err);
        req.userId = user?.id;
        req.userName = user?.name;
        next();
      });
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
      next();
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = auth;
