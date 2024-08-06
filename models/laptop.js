"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Laptop extends Model {
    static associate(models) {
      Laptop.hasMany(models.TransactionDetail, { foreignKey: "LaptopId" });
    }
  }
  Laptop.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Laptop Name Required",
          },
          notEmpty: {
            msg: "Laptop Name Required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price Required",
          },
          notEmpty: {
            msg: "Price Required",
          },
        },
      },
      ram: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "RAM Required",
          },
          notEmpty: {
            msg: "RAM Required",
          },
        },
      },
      gpu: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "GPU Required",
          },
          notEmpty: {
            msg: "GPU Required",
          },
        },
      },
      cpu: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "CPU Required",
          },
          notEmpty: {
            msg: "CPU Required",
          },
        },
      },
      storage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Storage Required",
          },
          notEmpty: {
            msg: "Storage Required",
          },
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Brand Required",
          },
          notEmpty: {
            msg: "Brand Required",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image URL Required",
          },
          notEmpty: {
            msg: "Image URL Required",
          },
        },
      },
      screen: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Screen Required",
          },
          notEmpty: {
            msg: "Screen Required",
          },
        },
      },
      os: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Operating System Required",
          },
          notEmpty: {
            msg: "Operating System Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Laptop",
    }
  );
  return Laptop;
};
