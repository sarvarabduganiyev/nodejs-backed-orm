const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const validateUser = require("../helpers/validate");
const prisma = new PrismaClient();

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  },
  addUser: async (req, res) => {
    try {
      const { error } = validateUser(req.body);

      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }

      const solt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, solt);

      const new_user = await prisma.user.create({
        data: {
          username: req.body.username,
          password: req.body.password,
        },
      });
      const selectedUser = {
        id: new_user.id,
        username: new_user.username,
      };
      res.status(201).json(selectedUser);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  },
};
