import path from "path";

import {
    fileURLToPath
} from "url";


import {
    createCertificatePDF
} from "../utils/generateCertificate.js";





const __filename = fileURLToPath(

    import.meta.url

);


const __dirname = path.dirname(

    __filename

);








// ======================================
// GENERATE CERTIFICATE FILE
// ======================================


export const generateCertificateFile = async(data)=>{


    try{


        const fileName =

        `${data.certificateNumber}.pdf`;






        const filePath = path.join(


            __dirname,


            "../uploads/certificates",


            fileName


        );








        await createCertificatePDF(

            {

                name:data.name,


                eventName:data.eventName,


                venue:data.venue,


                date:data.date,


                hours:data.hours,


                certificateNumber:
                data.certificateNumber,


                verificationCode:
                data.verificationCode,


                verificationUrl:
                data.verificationUrl,


                verificationQR:
                data.verificationQR


            },


            filePath


        );








        return path.join(


            "uploads",


            "certificates",


            fileName


        );




    }

    catch(error){


        console.error(

            "Certificate Generation Service Error:",

            error

        );


        throw error;


    }


};