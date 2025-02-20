import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().messages({
        "string.empty": "Username is required",
        "string.min": "Username must be at least 3 characters long",
        "string.alphanum": "Username can only contain letters and numbers"
    }),
    email: Joi.string().email().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format"
    }),
    password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$"))
    .required()
    .messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 6 characters long.",
        "string.pattern.base": "Password must contain at least one uppercase letter, one number, and one special character."
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords do not match",
        "string.empty": "Confirm password is required.",
    })

})