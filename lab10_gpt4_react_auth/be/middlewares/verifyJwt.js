const verifyJwt = (req, res, next) => {
  // проверка accessToken
  next();
};

module.exports = verifyJwt;
