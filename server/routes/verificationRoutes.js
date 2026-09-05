import express from "express";

import {
    verifyCertificate
} from "../controllers/verificationController.js";



const router = express.Router();



router.get(

    "/:certificateNumber",

    verifyCertificate

);



export default router;