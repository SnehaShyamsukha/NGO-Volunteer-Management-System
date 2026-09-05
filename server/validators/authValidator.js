import { body } from "express-validator";

export const registerValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Enter valid email"),

    body("password")
        .isLength({
            min: 6
        })
        .withMessage(
            "Password must contain minimum 6 characters"
        )
];


export const loginValidator = [
    body("email")
        .isEmail()
        .withMessage("Enter valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];


export const forgotPasswordValidator = [
    body("email")
        .isEmail()
        .withMessage("Enter valid email")
];


export const resetPasswordValidator = [
    body("password")
        .isLength({
            min: 6
        })
        .withMessage(
            "Password must contain minimum 6 characters"
        )
];