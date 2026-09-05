import { body } from "express-validator";

export const eventValidator = [
    body("title")
        .notEmpty()
        .withMessage(
            "Event title is required"
        ),

    body("category")
        .notEmpty()
        .withMessage(
            "Event category is required"
        ),

    body("date")
        .notEmpty()
        .withMessage(
            "Event date is required"
        ),

    body("venue")
        .notEmpty()
        .withMessage(
            "Event venue is required"
        ),

    body("maxVolunteers")
        .isNumeric()
        .withMessage(
            "Maximum volunteers must be a number"
        )
];