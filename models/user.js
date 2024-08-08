"use strict";
const { hash } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transaction, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Full Name Required",
          },
          notEmpty: {
            msg: "Full Name Required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password Required",
          },
          notEmpty: {
            msg: "Password Required",
          },
          len: {
            args: [5],
            msg: "Password Required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email Required",
          },
          notEmpty: {
            msg: "Email Required",
          },
          isEmail: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Address Required",
          },
          notEmpty: {
            msg: "Address Required",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "PhoneNumber Required",
          },
          notEmpty: {
            msg: "PhoneNumber Required",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Role Required",
          },
          notEmpty: {
            msg: "Role Required",
          },
        },
        defaultValue: "buyer",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, option) => {
    instance.password = hash(instance.password);
  });
  return User;
};
