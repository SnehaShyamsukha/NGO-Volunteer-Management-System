import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (file.fieldname === "profilePhoto") {
            cb(null, "uploads/profile");
        } else if (file.fieldname === "resume") {
            cb(null, "uploads/resume");
        } else {
            cb(null, "uploads/certificates");
        }
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});


const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error("Invalid file format")
        );
    }
};


const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


export default upload;