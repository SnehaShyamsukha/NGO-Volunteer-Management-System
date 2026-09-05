import mongoose from "mongoose";

import dotenv from "dotenv";

import bcrypt from "bcrypt";

import User from "../models/User.js";


dotenv.config();



const createAdmin = async()=>{


    try{


        await mongoose.connect(
            process.env.MONGO_URI
        );



        const password =
            await bcrypt.hash(
                "admin123",
                10
            );



        await User.create({

            name:
            "NGO Admin",


            email:
            "admin@ngo.com",


            password,


            role:
            "admin"

        });



        console.log(
            "Admin created successfully"
        );


        process.exit();



    }


    catch(error){


        console.log(error);

        process.exit(1);


    }


};



createAdmin();