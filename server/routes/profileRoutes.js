import express from "express";
import multer from "multer";
import path from "path";
import protect from "../middleware/authMiddleware.js";

import {
    getProfile,
    updateProfile,
    uploadProfilePhoto,
    changePassword
} from "../controllers/profileController.js";

const router = express.Router();

// ======================================
// MULTER STORAGE
// ======================================

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(
            null,
            "uploads/profile"
        );

    },

    filename:(req,file,cb)=>{

        const ext =
        path.extname(
            file.originalname
        );

        cb(
            null,
            `profile-${Date.now()}${ext}`
        );

    }

});

// ======================================
// FILE FILTER
// ======================================

const fileFilter=(req,file,cb)=>{

    const allowedTypes=[

        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp"

    ];

    if(
        allowedTypes.includes(
            file.mimetype
        )
    ){

        cb(
            null,
            true
        );

    }
    else{

        cb(

            new Error(
                "Only JPG, PNG and WEBP images are allowed"
            ),

            false

        );

    }

};

const upload = multer({

    storage,

    fileFilter,

    limits:{

        fileSize:
        5 * 1024 * 1024

    }

});

// ======================================
// PROFILE ROUTES
// ======================================

// GET COMPLETE PROFILE

router.get(

    "/",

    protect,

    getProfile

);

// UPDATE PROFILE DETAILS

router.put(

    "/",

    protect,

    updateProfile

);

// CHANGE PASSWORD

router.put(

    "/change-password",

    protect,

    changePassword

);

// UPLOAD PROFILE PHOTO

router.put(

    "/photo",

    protect,

    upload.single(
        "profilePhoto"
    ),

    uploadProfilePhoto

);

export default router;