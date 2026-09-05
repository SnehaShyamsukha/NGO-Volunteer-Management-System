import User from "../models/User.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import crypto from "crypto";

import sendEmail from "../services/emailService.js";



const generateToken = (id) => {

    return jwt.sign(

        {
            id
        },

        process.env.JWT_SECRET,

        {
            expiresIn: process.env.JWT_EXPIRE
        }

    );

};





// ==========================
// Register User
// ==========================

export const register = async(req,res)=>{

    try{


        const {

            name,
            email,
            password,

            phone,
            address,
            city,
            state,
            pincode,

            gender,
            dob,

            bloodGroup,

            education,
            occupation,
            experience,

            availability,

            skills,
            interests,
            languages,

            emergencyContact

        } = req.body;





        const existingUser =

            await User.findOne({

                email

            });





        if(existingUser){


            return res.status(400).json({

                success:false,

                message:"Email already registered"

            });


        }





        const hashedPassword =

            await bcrypt.hash(

                password,

                10

            );







        const user = await User.create({

            name,

            email,

            password:hashedPassword,


            phone,

            address,

            city,

            state,

            pincode,


            gender,

            dob,


            bloodGroup,


            education,

            occupation,

            experience,


            availability,


            skills,

            interests,

            languages,


            emergencyContact,


            role:"volunteer"


        });







        res.status(201).json({

            success:true,

            message:"Registration successful",


            user:{


                id:user._id,

                name:user.name,

                email:user.email,

                role:user.role


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









// ==========================
// Login User
// ==========================

export const login = async(req,res)=>{


    try{


        const {

            email,

            password,

            role

        } = req.body;





        const user =

            await User.findOne({

                email

            });





        if(!user){


            return res.status(401).json({

                success:false,

                message:"Invalid credentials"

            });


        }







        if(role && user.role !== role){


            return res.status(403).json({

                success:false,

                message:

                `This account is not registered as ${role}`


            });


        }








        const isMatch =

            await bcrypt.compare(

                password,

                user.password

            );







        if(!isMatch){


            return res.status(401).json({

                success:false,

                message:"Invalid credentials"

            });


        }







        const token =

            generateToken(

                user._id

            );







        res.json({

            success:true,

            message:"Login successful",


            token,



            user:{


                id:user._id,

                name:user.name,

                email:user.email,

                role:user.role


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









// ==========================
// Get Current User
// ==========================

export const getMe = async(req,res)=>{


    try{


        const user =

            await User.findById(

                req.user._id

            )

            .select("-password");






        res.json({

            success:true,

            data:user

        });




    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// ==========================
// Forgot Password
// ==========================

export const forgotPassword = async(req,res)=>{


    try{


        const {

            email

        } = req.body;






        const user =

            await User.findOne({

                email

            });







        if(!user){


            return res.status(404).json({

                success:false,

                message:"User not found"

            });


        }







        const resetToken =

            crypto

            .randomBytes(32)

            .toString("hex");








        user.resetPasswordToken =

            crypto

            .createHash("sha256")

            .update(resetToken)

            .digest("hex");







        user.resetPasswordExpire =

            Date.now()

            +

            15 * 60 * 1000;







        await user.save();







        const resetUrl =

        `${process.env.CLIENT_URL}/reset-password/${resetToken}`;








        await sendEmail({

            email:user.email,


            subject:"Password Reset Request",



            message:`

                <h2>Password Reset</h2>


                <p>Hello ${user.name}</p>


                <p>
                    You requested a password reset.
                </p>


                <a href="${resetUrl}">
                    Reset Password
                </a>


                <p>
                    Link expires in 15 minutes.
                </p>

            `


        });







        res.json({

            success:true,

            message:"Reset email sent"

        });




    }

    catch(error){


        console.log(

            "Forgot Password Error:",

            error

        );



        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// ==========================
// Reset Password
// ==========================

export const resetPassword = async(req,res)=>{


    try{


        const hashedToken =

            crypto

            .createHash("sha256")

            .update(req.params.token)

            .digest("hex");








        const user =

            await User.findOne({

                resetPasswordToken:hashedToken,


                resetPasswordExpire:{

                    $gt:Date.now()

                }


            });







        if(!user){


            return res.status(400).json({

                success:false,

                message:"Invalid or expired token"

            });


        }







        user.password =

            await bcrypt.hash(

                req.body.password,

                10

            );








        user.resetPasswordToken = undefined;


        user.resetPasswordExpire = undefined;







        await user.save();







        res.json({

            success:true,

            message:"Password reset successful"

        });





    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};