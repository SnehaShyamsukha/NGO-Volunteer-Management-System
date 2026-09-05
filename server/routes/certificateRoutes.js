import express from "express";

import protect from "../middleware/authMiddleware.js";

import authorizeRoles from "../middleware/roleMiddleware.js";


import {

    generateCertificate,

    getCertificates,

    getPendingCertificates,

    getMyCertificates,

    downloadCertificate,

    verifyCertificate

} from "../controllers/certificateController.js";



const router = express.Router();





// =====================================================
// PUBLIC CERTIFICATE VERIFICATION
// =====================================================
// Anyone can verify certificate using certificate number
// Example:
// /api/certificates/verify/CERT-12345
// =====================================================


router.get(

    "/verify/:certificateNumber",

    verifyCertificate

);







// =====================================================
// ADMIN CERTIFICATE MANAGEMENT
// =====================================================



// Generate new certificate

router.post(

    "/generate",

    protect,

    authorizeRoles("admin"),

    generateCertificate

);





// Get all generated certificates

router.get(

    "/",

    protect,

    authorizeRoles("admin"),

    getCertificates

);





// Get attendance eligible volunteers

// who don't have certificates yet

router.get(

    "/pending",

    protect,

    authorizeRoles("admin"),

    getPendingCertificates

);









// =====================================================
// VOLUNTEER CERTIFICATES
// =====================================================



// Logged in volunteer certificates

router.get(

    "/my",

    protect,

    authorizeRoles("volunteer"),

    getMyCertificates

);









// =====================================================
// DOWNLOAD CERTIFICATE PDF
// =====================================================



router.get(

    "/download/:id",

    protect,

    downloadCertificate

);







export default router;