import express from "express";

import {

    getVolunteers,

    getVolunteerById,

    updateVolunteer,

    changeVolunteerStatus,

    deleteVolunteer,

    volunteerStatistics,

    exportVolunteerPDF

} from "../controllers/volunteerController.js";


import protect from "../middleware/authMiddleware.js";

import authorizeRoles from "../middleware/roleMiddleware.js";



const router = express.Router();



// =====================================
// All routes below require authentication
// =====================================

router.use(protect);




// =====================================
// ADMIN ONLY ROUTES
// =====================================


// Get all volunteers
// Search + Filter + Pagination

router.get(
    "/",
    authorizeRoles("admin"),
    getVolunteers
);




// Volunteer statistics cards

router.get(
    "/statistics",
    authorizeRoles("admin"),
    volunteerStatistics
);




// Export volunteer PDF

router.get(
    "/export/pdf",
    authorizeRoles("admin"),
    exportVolunteerPDF
);




// Get volunteer profile

router.get(
    "/:id",
    authorizeRoles("admin"),
    getVolunteerById
);




// Update volunteer

router.put(
    "/:id",
    authorizeRoles("admin"),
    updateVolunteer
);




// Activate / deactivate volunteer

router.patch(
    "/status/:id",
    authorizeRoles("admin"),
    changeVolunteerStatus
);




// Delete volunteer

router.delete(
    "/:id",
    authorizeRoles("admin"),
    deleteVolunteer
);



export default router;