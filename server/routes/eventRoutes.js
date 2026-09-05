import express from "express";


import protect from "../middleware/authMiddleware.js";

import authorizeRoles from "../middleware/roleMiddleware.js";


import {

    createEvent,

    getEvents,

    getEventById,

    updateEvent,

    deleteEvent,

    updateEventStatus,

    generateAttendanceQR

} from "../controllers/eventController.js";



const router = express.Router();





// =====================================
// GET ALL EVENTS
// Admin + Volunteer
// =====================================

router.get(

    "/",

    protect,

    getEvents

);








// =====================================
// CREATE EVENT
// Admin only
// =====================================

router.post(

    "/",

    protect,

    authorizeRoles("admin"),

    createEvent

);








// =====================================
// GET SINGLE EVENT
// Admin + Volunteer
// =====================================

router.get(

    "/:id",

    protect,

    getEventById

);








// =====================================
// UPDATE EVENT
// Admin only
// =====================================

router.put(

    "/:id",

    protect,

    authorizeRoles("admin"),

    updateEvent

);








// =====================================
// UPDATE EVENT STATUS
// Admin only
// =====================================

router.patch(

    "/:id/status",

    protect,

    authorizeRoles("admin"),

    updateEventStatus

);








// =====================================
// GENERATE ATTENDANCE QR CODE
// Admin only
// =====================================

router.post(

    "/:id/generate-qr",

    protect,

    authorizeRoles("admin"),

    generateAttendanceQR

);








// =====================================
// DELETE EVENT
// Admin only
// =====================================

router.delete(

    "/:id",

    protect,

    authorizeRoles("admin"),

    deleteEvent

);






export default router;