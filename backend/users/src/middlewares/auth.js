const firebaseAdmin = require("firebase-admin");

const extractUserIdFromTokenAndPutItToBody = async (req, res, next) => {
  let error = "";

  if (req.headers.authorization) {
    await firebaseAdmin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then((decodedToken) => (req.body.tokenUserId = decodedToken.uid))
      .catch((err) => {
        req.body.tokenUserId = null;
        error = err;
      });

    if (req.body.tokenUserId) {
      next();
      return;
    }
  }

  //if here no token has been found (catching 1. bad format and 2. userId mismatch here)
  res.status(401).json({
    message: "You must be authenticated",
    details: error,
    code: 401,
  });
};

module.exports = {
  extractUserIdFromTokenAndPutItToBody,
};
