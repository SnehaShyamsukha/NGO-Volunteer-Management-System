import User from "../models/User.js";
import bcrypt from "bcrypt";

// ======================================
// PROFILE COMPLETION
// ======================================

const calculateProfileCompletion = (user) => {

    const fields = [
        "name",
        "certificateName",
        "phone",
        "address",
        "city",
        "state",
        "pincode",
        "gender",
        "dob",
        "bloodGroup",
        "education",
        "occupation",
        "experience",
        "availability",
        "emergencyContact",
        "profilePhoto"
    ];

    let completed = 0;

    fields.forEach(field => {

        if (
            user[field] !== undefined &&
            user[field] !== null &&
            user[field] !== ""
        ) {
            completed++;
        }

    });

    if (user.skills?.length) completed++;
    if (user.interests?.length) completed++;
    if (user.languages?.length) completed++;

    const total = fields.length + 3;

    user.profileCompleted = completed === total;

    return Math.round((completed / total) * 100);

};

// ======================================
// GET PROFILE
// ======================================

export const getProfile = async (req,res)=>{

    try{


        const user = await User.findById(req.user._id)
        .select("-password -resetPasswordToken -resetPasswordExpire");


        if(!user){

            return res.status(404).json({

                success:false,
                message:"User not found"

            });

        }



        const profileCompletion =
        calculateProfileCompletion(user);





        // ===============================
        // CONTRIBUTION SUMMARY
        // ===============================


        const Attendance =
        (await import("../models/Attendance.js")).default;


        const Certificate =
        (await import("../models/Certificate.js")).default;


        const Event =
        (await import("../models/Event.js")).default;




        // Total Hours

        const hoursData =
        await Attendance.aggregate([

            {
                $match:{

                    volunteer:user._id,

                    status:"present"

                }
            },


            {
                $group:{

                    _id:null,

                    total:{

                        $sum:"$hours"

                    }

                }

            }


        ]);



        const totalHours =
Number(
    (hoursData[0]?.total || 0).toFixed(2)
);






        // Total Events attended

        const totalEvents =
        await Attendance.countDocuments({

            volunteer:user._id,

            status:"present"

        });






        // Total Certificates

        const totalCertificates =
        await Certificate.countDocuments({

            volunteer:user._id

        });







        res.status(200).json({

            success:true,

            data:{


                ...user.toObject(),


                profileCompletion,


                totalHours,


                totalEvents,


                totalCertificates


            }


        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};

// ======================================
// UPDATE PROFILE
// ======================================

export const updateProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        const fields = [
            "name",
            "certificateName",
            "phone",
            "address",
            "city",
            "state",
            "pincode",
            "gender",
            "dob",
            "bloodGroup",
            "education",
            "occupation",
            "experience",
            "availability",
            "emergencyContact"
        ];

        fields.forEach(field => {

            if (req.body[field] !== undefined) {

                user[field] = req.body[field];

            }

        });

        if (Array.isArray(req.body.skills)) {

            user.skills = req.body.skills;

        }

        if (Array.isArray(req.body.interests)) {

            user.interests = req.body.interests;

        }

        if (Array.isArray(req.body.languages)) {

            user.languages = req.body.languages;

        }

        const profileCompletion = calculateProfileCompletion(user);

        await user.save();

        res.status(200).json({

            success: true,

            message: "Profile updated successfully",

            data: {
                ...user.toObject(),
                profileCompletion
            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// UPLOAD PROFILE PHOTO
// ======================================

export const uploadProfilePhoto = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No file uploaded"

            });

        }

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        user.profilePhoto = `uploads/profile/${req.file.filename}`;

        const profileCompletion = calculateProfileCompletion(user);

        await user.save();

        res.status(200).json({

            success: true,

            message: "Profile photo uploaded successfully",

            photo: user.profilePhoto,

            profileCompletion

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// CHANGE PASSWORD
// ======================================

export const changePassword = async (req, res) => {

    try {

        const {

            currentPassword,
            newPassword

        } = req.body;

        if (!currentPassword || !newPassword) {

            return res.status(400).json({

                success: false,

                message: "Current password and new password are required"

            });

        }

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const isMatch = await bcrypt.compare(

            currentPassword,

            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Current password is incorrect"

            });

        }

        if (currentPassword === newPassword) {

            return res.status(400).json({

                success: false,

                message: "New password must be different"

            });

        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password changed successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};