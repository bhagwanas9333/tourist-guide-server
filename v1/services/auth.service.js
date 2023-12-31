const { compare } = require("../helpers/encryption");
const { userModule, pickUser } = require("../models/user.model");
const { createToken, verifyToken } = require("../helpers/token");

const authService = {
  async userLogin({ origin, email, password }) {
    //validate email
    const result = await userModule.findOne({ email, status: 1 });
    if (result?._id) {
      //email is valid
      //check password
      if (compare(password, result?.password)) {
        //valid password
        //generate token

        const accessToken = createToken(
          {
            id: result?._id,
            email,
            role: result?.role,
            type: "access",
            origin,
          },
          60 * 15
        );

        const refreshToken = createToken(
          {
            id: result?._id,
            email,
            role: result?.role,
            type: "refresh",
            origin,
          },
          60 * 30
        );

        if (accessToken) {
          return { accessToken, refreshToken, data: pickUser(result) };
        } else {
          return Promise.reject("Internal problem, try  again! ");
        }
      } else {
        //invalid password
        return Promise.reject("Invalid password");
      }
    } else {
      //user not available email
      return Promise.reject("Invalid email or user is disabled");
    }
  }, //useLogin
  async passwordResetLink(email) {
    //check email exists in database
    const result = await userModule?.findOne({ email, status: 1 });

    return result;
  }, //password reset link
  async validateToken(token) {
    const payload = verifyToken(token);
    // console.log("payload", payload);
    // console.log("token", token);
    if (payload?.id) {
      //token is valid
      return Promise.resolve(payload);
    } else {
      //token is invalid

      return Promise.reject(null);
    }
  }, //validateToken
  async refreshToken({ refreshT, clientDomain }) {
    // validate refresh token
    const payload = verifyToken(refreshT);
    if (!payload) return null;
    const { id, email, type, origin, role } = payload;

    if (type == "refresh" && id && origin == clientDomain) {
      // if valid and refresh token
      const data = { id, email, origin, role };
      const accessToken = createToken({ ...data, type: "access" }, 60 * 15);
      const refreshToken = createToken({ ...data, type: "refresh" }, 60 * 30);
      return { accessToken, refreshToken };
      //return access and refresh token
    } else {
      return null;
    }
  },
};

module.exports = authService;
