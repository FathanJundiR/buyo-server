"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.hasMany(models.Transaction, { foreignKey: "PaymentId" });
    }
  }
  Payment.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Amount Required",
          },
          notEmpty: {
            msg: "Amount Required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status Required",
          },
          notEmpty: {
            msg: "Status Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
