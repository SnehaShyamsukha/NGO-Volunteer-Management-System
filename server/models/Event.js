import mongoose from "mongoose";


const eventSchema = new mongoose.Schema(

    {

        title: {

            type:String,

            required:true

        },


        description:String,


        category:String,


        date:Date,


        time:String,


        venue:String,


        coordinator:{

            type:mongoose.Schema.Types.ObjectId,

            ref:"User"

        },


        maxVolunteers:Number,


        registrationDeadline:Date,



        status:{

            type:String,

            enum:[

                "upcoming",

                "ongoing",

                "completed",

                "closed"

            ],

            default:"upcoming"

        },



        // ===============================
        // Attendance Code System
        // ===============================

        attendanceCode:{

            type:String,

            default:""

        }


    },


    {

        timestamps:true

    }


);



export default mongoose.model(

    "Event",

    eventSchema

);