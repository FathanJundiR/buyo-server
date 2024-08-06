"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    static associate(models) {
      TransactionDetail.belongsTo(models.Transaction, {
        foreignKey: "TransactionId",
      });
      TransactionDetail.belongsTo(models.Laptop, {
        foreignKey: "LaptopId",
      });
    }
  }
  TransactionDetail.init(
    {
      TransactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Transaction ID Required",
          },
          notEmpty: {
            msg: "Transaction ID Required",
          },
        },
      },
      LaptopId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Laptop ID Required",
          },
          notEmpty: {
            msg: "Laptop ID Required",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Quantity Required",
          },
          notEmpty: {
            msg: "Quantity Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionDetail",
    }
  );
  return TransactionDetail;
};
