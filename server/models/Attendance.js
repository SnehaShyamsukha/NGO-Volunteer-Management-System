import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema(

    {

        volunteer: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required:true

        },


        event: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Event",

            required:true

        },


        checkIn: {

            type: Date,

            default:null

        },


        checkOut: {

            type: Date,

            default:null

        },


        hours: {

            type:Number,

            default:0

        },


        method: {

            type:String,

            enum:[
                "manual",
                "qr"
            ],

            default:"manual"

        },


        status: {

            type:String,

            enum:[
                "present",
                "absent"
            ],

            default:"present"

        }

    },

    {

        timestamps:true

    }

);



// Prevent duplicate attendance
// One volunteer can have only one attendance per event

attendanceSchema.index(

    {

        volunteer:1,

        event:1

    },

    {

        unique:true

    }

);



export default mongoose.model(

    "Attendance",

    attendanceSchema

);