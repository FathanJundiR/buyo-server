const { User, Laptop } = require("../models");

async function laptopAuthorization(req, res, next) {
  try {
    const { userId, role } = req.logInfo;

    if (role === "staff") {
      const user = await User.findByPk(userId);

      if (!user) {
        throw { name: "Forbidden" };
      }

      const { id } = req.params;
      const laptop = await Laptop.findByPk(id);

      if (!laptop) {
        throw { name: "NotFound", id };
      }
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

function adminAuthorization(req, res, next) {
  const { role } = req.logInfo;
  if (role === "admin") {
    next();
  } else {
    throw { name: "Forbidden" };
  }
}

module.exports = { laptopAuthorization, adminAuthorization };
