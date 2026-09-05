import express from "express";


import protect from "../middleware/authMiddleware.js";

import authorizeRoles from "../middleware/roleMiddleware.js";

import {

    getVolunteers,

    getVolunteerById,

    updateVolunteerStatus,

    deleteVolunteer,

    exportVolunteerPDF

} from "../controllers/userController.js";



const router = express.Router();




// Admin only

router.get(

    "/volunteers",

    protect,

    authorizeRoles("admin"),

    getVolunteers

);


router.get(

    "/volunteers/export/pdf",

    protect,

    authorizeRoles("admin"),

    exportVolunteerPDF

);

router.get(

    "/volunteers/:id",

    protect,

    authorizeRoles("admin"),

    getVolunteerById

);




router.put(

    "/volunteers/:id/status",

    protect,

    authorizeRoles("admin"),

    updateVolunteerStatus

);




router.delete(

    "/volunteers/:id",

    protect,

    authorizeRoles("admin"),

    deleteVolunteer

);



export default router;