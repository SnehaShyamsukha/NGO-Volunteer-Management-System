import mongoose from "mongoose";


const certificateSchema = new mongoose.Schema(

{

    volunteer:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },


    event:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Event",

        required:true

    },


    hours:{

        type:Number,

        default:0

    },


    certificateNumber:{

        type:String,

        unique:true,

        required:true

    },


    verificationCode:{

        type:String,

        required:true

    },


    verificationQR:{

        type:String,

        default:""

    },


    verificationUrl:{

        type:String,

        default:""

    },


    pdfPath:{

        type:String,

        default:""

    },


    issuedDate:{

        type:Date,

        default:Date.now

    }

},

{

    timestamps:true

}

);



export default mongoose.model(

    "Certificate",

    certificateSchema

);