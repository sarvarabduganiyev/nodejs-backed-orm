const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");

const prisma = new PrismaClient();

module.exports = {
  getPosts: async (req, res) => {
    try {
      const posts = await prisma.post.findMany({});
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: req.params.id,
        },
      });

      if (!post) {
        res.status(404).send("Post not found");
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  createPost: async (req, res) => {
    try {
      const { error } = validation(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }
      const new_post = await prisma.post.create({
        data: {
          title: req.body.title,
        },
      });
      res.status(201).json(new_post);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  editPost: async (req, res) => {
    try {
      const { error } = validation(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }
      const post = await prisma.post.update({
        where: {
          id: req.params.id,
        },
        data: {
          title: req.body.title,
        },
      });
      res.json(post);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong" + error,
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await prisma.post.delete({
        where: {
          id: req.params.id,
        },
      });
      res.json(post);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong" + error,
      });
    }
  },
};

// create validation

function validation(post) {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(55),
  });

  const result = schema.validate(post);

  return result;
}
