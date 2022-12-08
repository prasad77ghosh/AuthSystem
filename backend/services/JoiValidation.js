import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const registerBodyValidation = ({ name, email, password }) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate({ name, email, password });
};

const loginBodyValidation = ({email, password}) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate({ name, email, password });
}

export { registerBodyValidation, loginBodyValidation };
