const Joi = require("joi");

module.exports = function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required().min(5).max(55),
    password: Joi.string().required().min(6).max(555),
  });
  return schema.validate(user);
};
