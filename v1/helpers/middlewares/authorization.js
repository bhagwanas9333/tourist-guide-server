const { verifyToken } = require("../token");

const authorize = (roles = []) => {
  return (req, res, next) => {
    // get the token request
    const { authorization: token, origin } = req?.headers; 

    if (!token) {
      // send error response
      res
        ?.status(403)
        .send({ message: "Login to access the API", error: null });
    } else {
      //validate token
      const payload = verifyToken(token)
      console.log("Token:",token);
      console.log("payload", payload);
      // console.log("origin", origin);
       
      // check the origin (domain check)
      if (payload?.origin&&payload?.origin != origin) {
        //send error response
        res?.status(401 ).send({
          message: `Access the API only from ${payload?.origin}`,
          error: null,
        });
      } else {
        //if token is validate then check the role
        if (roles?.includes(payload?.role)) {
          next();
        } else {
          //error response
          res.status(401).send({
            message: `You are not authorized to access this`,
            error: null,
          });
        }
      }
    }
  };
};

module.exports = authorize; 
