import express from "express";


import protect from "../middleware/authMiddleware.js";

import authorizeRoles from "../middleware/roleMiddleware.js";


import {

    registerEvent,

    myRegistrations,

    cancelRegistration,

    getAllRegistrations,

    updateRegistrationStatus

} from "../controllers/registrationController.js";





const router = express.Router();







// =====================================
// VOLUNTEER ROUTES
// =====================================



// Register for event

router.post(

    "/:eventId",

    protect,

    authorizeRoles("volunteer"),

    registerEvent

);







// My registrations

router.get(

    "/my",

    protect,

    authorizeRoles("volunteer"),

    myRegistrations

);







// Cancel registration

router.delete(

    "/:id",

    protect,

    authorizeRoles("volunteer"),

    cancelRegistration

);









// =====================================
// ADMIN ROUTES
// =====================================



// Get all registrations

router.get(

    "/",

    protect,

    authorizeRoles("admin"),

    getAllRegistrations

);







// Approve / Reject registration

router.put(

    "/:id/status",

    protect,

    authorizeRoles("admin"),

    updateRegistrationStatus

);








export default router;