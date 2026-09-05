import mongoose from "mongoose";



const registrationSchema = new mongoose.Schema(

    {


        // ===============================
        // Volunteer
        // ===============================

        volunteer:{

            type:mongoose.Schema.Types.ObjectId,

            ref:"User",

            required:true

        },





        // ===============================
        // Event
        // ===============================

        event:{

            type:mongoose.Schema.Types.ObjectId,

            ref:"Event",

            required:true

        },





        // ===============================
        // Approval Workflow
        // ===============================

        status:{


            type:String,


            enum:[

                "pending",

                "approved",

                "rejected",

                "cancelled"

            ],


            default:"pending"


        },





        // ===============================
        // Registration Date
        // ===============================

        registeredAt:{


            type:Date,


            default:Date.now


        },





        // ===============================
        // Admin Review
        // ===============================

        reviewedBy:{


            type:mongoose.Schema.Types.ObjectId,


            ref:"User"


        },


        reviewedAt:{


            type:Date


        }



    },


    {

        timestamps:true

    }


);




// Prevent same volunteer registering
// multiple times for same event

registrationSchema.index(

    {

        volunteer:1,

        event:1

    },


    {

        unique:true

    }

);





export default mongoose.model(

    "Registration",

    registrationSchema

);