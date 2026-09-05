import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
    getActivities
} from "../controllers/activityController.js";


const router = express.Router();


router.get(
    "/",
    protect,
    authorizeRoles("admin"),
    getActivities
);


export default router;