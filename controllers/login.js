const { PrismaClient } = require("@prisma/client");
const validateUser = require("../helpers/validate");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  auth: async (req, res) => {
    try {
      const { error } = validateUser(req.body);
      if (error) {
        res.status(404).send(error.details[0].message);
        return;
      }
      const user = await prisma.user.findUnique({
        where: { username: req.body.username },
      });

      if (!user) {
        res.status(400).send("user not found :(");
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isValidPassword) {
        res.status(400).send("bad password or username");
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN_KEY);

      res.json({ access_token: token });
    } catch (error) {
      res.status(500).send("Authorization failed :(" + error);
    }
  },
};
