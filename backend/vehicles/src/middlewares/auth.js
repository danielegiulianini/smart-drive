//import { createClient } from "@supabase/supabase-js";

createClient = require("@supabase/supabase-js");

const supabase = createClient.createClient(
  "https://epwsidhcgzajhezxiqyp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwd3NpZGhjZ3phamhlenhpcXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4NzI2NDEsImV4cCI6MTk3NzQ0ODY0MX0.qQQJSVDQkbG8SoJWa8ybUtmUTjn3ffyn9CfO8jwAcks"
);

//backend copy token from headers to body off client request
const extractUserIdFromTokenAndPutItToBody = async (req, res, next) => {
  let error = "";
  console.log("auth middleware in action");
  if (req.headers.authorization) {
    //retrieve access_token from request
    /*let access_token = req.headers.authorization;
    supabase.auth.api.getUser(access_token).catch((err) => {
      req.body.tokenUserId = null;
      error = err;
    });
    if (req.body.tokenUserId) {
      next();
      return;
    }*/

    access_token = req.headers.authorization;
    supabase.auth
      .getUser(access_token)
      .then((user) => (req.body.userId = user.id))
      .catch((err) => {
        req.body.userId = null;
        error = err;
      })
      .then(() => {
        if (req.body.userId) {
          next();
          return;
        } else {
          //if here no token has been found (catching 1. bad format and 2. userId mismatch here)
          res.status(401).json({
            message: "You must be authenticated!!",
            details: error,
            code: 401,
          });
        }
      });
  }
};

module.exports = {
  extractUserIdFromTokenAndPutItToBody,
};
