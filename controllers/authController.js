const { compare } = require("../helpers/bcrypt");
const { hash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "InvalidLogin" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: "LoginError" };
      }

      if (!compare(password, user.password)) {
        throw { name: "LoginError" };
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async cmsLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "InvalidLogin" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: "LoginError" };
      }

      if (user.role === "buyer") throw { name: "Forbidden" };

      if (!compare(password, user.password)) {
        throw { name: "LoginError" };
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });

      const payload = ticket.getPayload();
      console.log(payload);

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          fullName: payload.name,
          email: payload.email,
          password: hash("password_google"),
          address: "address_google",
          phoneNumber: "phone_google",
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async addBuyer(req, res, next) {
    try {
      const { fullName, email, password, phoneNumber, address } = req.body;

      const user = await User.create({
        fullName,
        email,
        password,
        phoneNumber,
        address,
      });

      res.status(201).json({
        message: "Success Register",
        user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addStaff(req, res, next) {
    try {
      const { fullName, email, password, phoneNumber, address } = req.body;

      const user = await User.create({
        fullName,
        email,
        password,
        phoneNumber,
        address,
        role: "staff",
      });

      res.status(201).json({
        message: "Success Add Staff",
        user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthController;
