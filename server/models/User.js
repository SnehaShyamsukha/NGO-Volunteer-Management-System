import mongoose from "mongoose";


const userSchema = new mongoose.Schema(

{

    // ===============================
    // BASIC INFORMATION
    // ===============================


    name: {
        type:String,
        required:true,
        trim:true
    },


    middleName:{
        type:String,
        default:""
    },


    lastName:{
        type:String,
        default:""
    },


    certificateName:{
        type:String,
        default:""
    },



    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },


    password:{
        type:String,
        required:true
    },



    // ===============================
    // CONTACT DETAILS
    // ===============================


    phone:{
        type:String,
        default:""
    },


    address:{
        type:String,
        default:""
    },


    city:{
        type:String,
        default:""
    },


    state:{
        type:String,
        default:""
    },


    pincode:{
        type:String,
        default:""
    },



    // ===============================
    // PERSONAL DETAILS
    // ===============================


    gender:{
        type:String,
        enum:[
            "Male",
            "Female",
            "Other"
        ],
        default:"Other"
    },


    dob:{
        type:Date
    },


    bloodGroup:{
        type:String,
        default:""
    },



    // ===============================
    // EDUCATION / EXPERIENCE
    // ===============================


    education:{
        type:String,
        default:""
    },


    occupation:{
        type:String,
        default:""
    },


    experience:{
        type:String,
        default:""
    },



    // ===============================
    // VOLUNTEER PREFERENCES
    // ===============================


    availability:{
        type:String,
        enum:[
            "Weekdays",
            "Weekends",
            "Both"
        ],
        default:"Both"
    },


    skills:[
        {
            type:String
        }
    ],


    interests:[
        {
            type:String
        }
    ],


    languages:[
        {
            type:String
        }
    ],



    emergencyContact:{
        type:String,
        default:""
    },



    // ===============================
    // DOCUMENTS
    // ===============================


    profilePhoto:{
        type:String,
        default:""
    },


    resume:{
        type:String,
        default:""
    },



    // ===============================
    // VOLUNTEER RECORD
    // ===============================


    joiningDate:{
        type:Date,
        default:Date.now
    },


    totalHours:{
        type:Number,
        default:0
    },


    totalEvents:{
        type:Number,
        default:0
    },


    totalCertificates:{
        type:Number,
        default:0
    },



    // ===============================
    // PROFILE STATUS
    // ===============================


    profileCompleted:{
        type:Boolean,
        default:false
    },



    // ===============================
    // ROLE MANAGEMENT
    // ===============================


    role:{
        type:String,
        enum:[
            "admin",
            "volunteer"
        ],
        default:"volunteer"
    },


    status:{
        type:String,
        enum:[
            "active",
            "inactive"
        ],
        default:"active"
    },



    // ===============================
    // PASSWORD RESET
    // ===============================


    resetPasswordToken:String,


    resetPasswordExpire:Date


},


{
    timestamps:true
}


);



export default mongoose.model(
    "User",
    userSchema
);