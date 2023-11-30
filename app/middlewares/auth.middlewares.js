const authCheck = (req, res, next) => {
  let is_logged_in = true;

  if (is_logged_in) {
    next();
  } else {
    req.status(401).json({
      result: null,
      status: false,
      message: "user not loggged in",
    });
  }
};

module.exports = authCheck;
