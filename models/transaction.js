"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.hasMany(models.TransactionDetail, {
        foreignKey: "TransactionId",
      });
      Transaction.belongsTo(models.Payment, {
        foreignKey: "PaymentId",
      });
      Transaction.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Transaction.init(
    {
      PaymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Payment ID Required",
          },
          notEmpty: {
            msg: "Payment ID Required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User ID Required",
          },
          notEmpty: {
            msg: "User ID Required",
          },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total Price Required",
          },
          notEmpty: {
            msg: "Total Price Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
