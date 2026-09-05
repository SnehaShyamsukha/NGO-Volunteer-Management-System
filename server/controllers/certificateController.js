import Certificate from "../models/Certificate.js";
import User from "../models/User.js";
import Event from "../models/Event.js";
import Attendance from "../models/Attendance.js";

import fs from "fs";
import path from "path";
import QRCode from "qrcode";

import {
    generateCertificateFile
} from "../services/certificateService.js";

import {
    v4 as uuid
} from "uuid";

import createActivity from "../utils/createActivity.js";

import {
    generateCertificateNumber
} from "../utils/certificateGenerator.js";




// ======================================
// GET PENDING CERTIFICATES
// ======================================

export const getPendingCertificates = async(req,res)=>{

    try{


        const attendance = await Attendance.find()

            .populate(
                "volunteer",
                "name email"
            )

            .populate(
                "event",
                "title date venue"
            )

            .sort({

                createdAt:-1

            });





        const certificates = await Certificate.find();





        const generatedCertificates = certificates.map(

            certificate =>

            `${certificate.volunteer}-${certificate.event}`

        );






        const pending = attendance.filter(item=>{


            if(

                !item.volunteer ||

                !item.event

            ){

                return false;

            }






            const key =

            `${item.volunteer._id}-${item.event._id}`;





            return !generatedCertificates.includes(key);


        });







        res.status(200).json({

            success:true,

            data:pending

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
// GENERATE CERTIFICATE
// ======================================

export const generateCertificate = async(req,res)=>{


    try{


        const {

            volunteer,

            event,

            hours

        } = req.body;






        const user = await User.findById(

            volunteer

        );





        if(!user){


            return res.status(404).json({

                success:false,

                message:"Volunteer not found"

            });


        }








        const eventData = await Event.findById(

            event

        );





        if(!eventData){


            return res.status(404).json({

                success:false,

                message:"Event not found"

            });


        }








        const existingCertificate =

        await Certificate.findOne({

            volunteer,

            event

        });






        if(existingCertificate){


            return res.status(400).json({

                success:false,

                message:"Certificate already generated"

            });


        }








        const certificateNumber =

        generateCertificateNumber();







        const verificationCode =

        uuid().slice(

            0,

            12

        );








        const verificationUrl =

        `${process.env.CLIENT_URL}/verify/${certificateNumber}`;







        const verificationQR =
await QRCode.toDataURL(
    verificationUrl,
    {
        width:300,
        margin:2,
        errorCorrectionLevel:"H"
    }
);









        const pdfPath =

        await generateCertificateFile({


            name:user.name,


            eventName:eventData.title,


            venue:eventData.venue,


            date:eventData.date,


            hours:hours || 0,


            certificateNumber,


            verificationCode,


            verificationUrl,


            verificationQR


        });









        const certificate =

        await Certificate.create({



            volunteer,


            event,


            hours:hours || 0,


            certificateNumber,


            verificationCode,


            verificationQR,


            verificationUrl,


            pdfPath



        });









        await createActivity({


            user:req.user._id,


            action:"GENERATE_CERTIFICATE",


            description:

            `Generated certificate for ${user.name}`,


            ipAddress:req.ip


        });









        res.status(201).json({


            success:true,


            message:"Certificate generated successfully",


            data:certificate



        });




    }

    catch(error){


        console.error(error);



        res.status(500).json({


            success:false,


            message:error.message



        });


    }


};









// ======================================
// GET ALL CERTIFICATES (ADMIN)
// ======================================

export const getCertificates = async(req,res)=>{


    try{


        const certificates =

        await Certificate.find()

        .populate(

            "volunteer",

            "name email"

        )

        .populate(

            "event",

            "title date venue"

        )

        .sort({

            createdAt:-1

        });







        res.status(200).json({


            success:true,


            data:certificates



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
// GET MY CERTIFICATES (VOLUNTEER)
// ======================================

export const getMyCertificates = async(req,res)=>{

    try{


        const certificates = await Certificate.find({

            volunteer:req.user._id

        })

        .populate(

            "event",

            "title date venue"

        )

        .sort({

            issuedDate:-1

        });



        res.status(200).json({

            success:true,

            data:certificates

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
// DOWNLOAD CERTIFICATE PDF
// ======================================

export const downloadCertificate = async(req,res)=>{

    try{


        const certificate = await Certificate.findById(

            req.params.id

        );



        if(!certificate){


            return res.status(404).json({

                success:false,

                message:"Certificate not found"

            });

        }





        // Volunteer can access only own certificate

        if(

            req.user.role === "volunteer" &&

            certificate.volunteer.toString()
            !==
            req.user._id.toString()

        ){

            return res.status(403).json({

                success:false,

                message:"Unauthorized access"

            });

        }






        if(!certificate.pdfPath){


            return res.status(404).json({

                success:false,

                message:"Certificate PDF unavailable"

            });

        }





        let filePath;





        if(path.isAbsolute(

            certificate.pdfPath

        )){


            filePath = certificate.pdfPath;


        }

        else{


            filePath = path.join(

                process.cwd(),

                certificate.pdfPath

            );


        }





        if(!fs.existsSync(filePath)){


            return res.status(404).json({

                success:false,

                message:"PDF file not found"

            });


        }






        res.download(

            filePath,

            `Certificate-${certificate.certificateNumber}.pdf`

        );




    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};





// ======================================
// VERIFY CERTIFICATE PUBLIC
// ======================================

export const verifyCertificate = async(req,res)=>{

    try{


        const certificate = await Certificate.findOne({

            certificateNumber:
            req.params.certificateNumber

        })

        .populate(

            "volunteer",

            "name email"

        )

        .populate(

            "event",

            "title venue date"

        );







        if(!certificate){


            return res.status(404).json({

                success:false,

                message:"Certificate is invalid"

            });


        }







        res.status(200).json({

            success:true,

            message:"Certificate verified successfully",

            data:{

                ...certificate.toObject(),


                verified:true,


                verificationUrl:

                `${process.env.CLIENT_URL}/verify/${certificate.certificateNumber}`


            }


        });





    }

    catch(error){


        console.error(

            "Certificate Verification Error:",

            error

        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};




// ======================================
// DELETE CERTIFICATE (ADMIN)
// ======================================

export const deleteCertificate = async(req,res)=>{

    try{


        const certificate = await Certificate.findById(

            req.params.id

        );



        if(!certificate){


            return res.status(404).json({

                success:false,

                message:"Certificate not found"

            });


        }





        // Delete PDF file also

        if(certificate.pdfPath){


            const filePath = path.join(

                process.cwd(),

                certificate.pdfPath

            );


            if(fs.existsSync(filePath)){


                fs.unlinkSync(filePath);


            }


        }





        await certificate.deleteOne();





        await createActivity({

            user:req.user._id,

            action:"DELETE_CERTIFICATE",

            description:

            `Deleted certificate ${certificate.certificateNumber}`,

            ipAddress:req.ip

        });






        res.status(200).json({

            success:true,

            message:"Certificate deleted successfully"

        });





    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};