import AppError from "../utils/AppError.js";

export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value = {} } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const validationErrors = error.details.map((d) => d.message);
      const err = new AppError(validationErrors, 400);
      return next(err);
    }
    req.validatedData = value;
    next();
  };
};
