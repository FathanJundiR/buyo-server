const { Laptop, User } = require("../models");
const { Op } = require("sequelize");
const { GoogleGenerativeAI } = require("@google/generative-ai");

class LaptopController {
  static async read(req, res, next) {
    try {
      const { filter, search, sort, page } = req.query;
      const paramsQuerySql = {
        where: {},
      };

      if (filter) {
        if (filter.brand) {
          paramsQuerySql.where.brand = decodeURIComponent(filter.brand);
        }
        if (filter.cpu) {
          paramsQuerySql.where.cpu = decodeURIComponent(filter.cpu);
        }
        if (filter.ram) {
          paramsQuerySql.where.ram = decodeURIComponent(filter.ram);
        }
        if (filter.storage) {
          paramsQuerySql.where.storage = decodeURIComponent(filter.storage);
        }
        if (filter.gpu) {
          paramsQuerySql.where.gpu = decodeURIComponent(filter.gpu);
        }
      }

      if (search) {
        paramsQuerySql.where.name = { [Op.iLike]: `%${search}%` };
      }

      if (sort) {
        const ordering = sort[0] === "-" ? "DESC" : "ASC";
        const columnName = ordering === "DESC" ? sort.slice(1) : sort;

        paramsQuerySql.order = [[columnName, ordering]];
      }

      let limit = 10;
      let pageNumber = 1;
      if (page) {
        if (page.size) {
          limit = Number(page.size);
          paramsQuerySql.limit = limit;
        }
        if (page.number) {
          pageNumber = Number(page.number);
          paramsQuerySql.offset = limit * (pageNumber - 1);
        }
      }

      const { count, rows } = await Laptop.findAndCountAll(paramsQuerySql);
      res.status(200).json({
        message: "Successs Read Laptop",
        totalData: count,
        dataPerPage: limit,
        totalPage: Math.ceil(count / limit),
        page: pageNumber,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async readById(req, res, next) {
    try {
      const { id } = req.params;
      const laptop = await Laptop.findByPk(id);
      if (!laptop) {
        throw { name: "NotFound", id };
      }

      res
        .status(200)
        .json({ message: `Successs Read Laptop With Id ${id}`, data: laptop });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { userId } = req.logInfo;
      if (!userId) throw { name: "Unauthorized" };

      const { brand, name, cpu, ram, storage, gpu, screen, os, imgUrl, price } =
        req.body;

      const laptops = await Laptop.create({
        brand,
        name,
        cpu,
        ram,
        storage,
        gpu,
        screen,
        os,
        imgUrl,
        price,
      });
      res.status(201).json({
        message: "Success Create New Laptop Data",
        laptops,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      let laptop = await Laptop.findByPk(id);

      if (!laptop) {
        throw { name: "NotFound", id };
      }

      const { brand, name, cpu, ram, storage, gpu, screen, os, imgUrl, price } =
        req.body;
      await Laptop.update(
        {
          brand,
          name,
          cpu,
          ram,
          storage,
          gpu,
          screen,
          os,
          imgUrl,
          price,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: `Success Update Laptop with ID ${id}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const laptop = await Laptop.findByPk(id);

      if (!laptop) {
        throw { name: "NotFound", id };
      }

      await Laptop.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `Success Delete Laptop with id ${id}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async askAi(req, res, next) {
    try {
      const gemini = new GoogleGenerativeAI(process.env.GEMINI_KEY);
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt =
        "Please give me only a name for today's popular pokemon without bolding the text";

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      res.status(200).json(text);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = LaptopController;
