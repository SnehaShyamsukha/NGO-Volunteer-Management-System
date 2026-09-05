import express from "express";

import protect from "../middleware/authMiddleware.js";

import authorizeRoles from "../middleware/roleMiddleware.js";


import {

adminDashboard,

chartData,

volunteerDashboard

} from "../controllers/dashboardController.js";



const router = express.Router();





router.get(

"/admin",

protect,

authorizeRoles("admin"),

adminDashboard

);






router.get(

"/charts",

protect,

authorizeRoles("admin"),

chartData

);







router.get(

"/volunteer",

protect,

volunteerDashboard

);





export default router;