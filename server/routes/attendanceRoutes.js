import express from "express";


import protect from "../middleware/authMiddleware.js";

import authorizeRoles from "../middleware/roleMiddleware.js";


import {

    markAttendance,

    generateAttendanceCode,

    markAttendanceWithCode,

    checkOut,

    getMyAttendance,

    getAttendance

} from "../controllers/attendanceController.js";



const router = express.Router();





// =====================================
// ADMIN MANUAL ATTENDANCE
// =====================================

router.post(

    "/manual",

    protect,

    authorizeRoles("admin"),

    markAttendance

);








// =====================================
// ADMIN GENERATE ATTENDANCE CODE
// =====================================

router.get(

    "/generate-code/:eventId",

    protect,

    authorizeRoles("admin"),

    generateAttendanceCode

);








// =====================================
// VOLUNTEER CHECK-IN USING CODE
// =====================================

router.post(

    "/check-in",

    protect,

    markAttendanceWithCode

);








// =====================================
// VOLUNTEER CHECKOUT
// =====================================

router.put(

    "/checkout/:eventId",

    protect,

    checkOut

);








// =====================================
// VOLUNTEER ATTENDANCE HISTORY
// =====================================

router.get(

    "/my",

    protect,

    getMyAttendance

);








// =====================================
// ADMIN VIEW ALL ATTENDANCE
// =====================================

router.get(

    "/",

    protect,

    authorizeRoles("admin"),

    getAttendance

);






export default router;