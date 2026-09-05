import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";



// ======================================
// CREATE CERTIFICATE PDF
// ======================================


export const createCertificatePDF = (data,filePath)=>{


    return new Promise((resolve,reject)=>{


        try{


            const directory = path.dirname(filePath);



            if(!fs.existsSync(directory)){


                fs.mkdirSync(

                    directory,

                    {
                        recursive:true
                    }

                );


            }





            const doc = new PDFDocument({

                size:"A4",

                margin:40

            });





            const stream = fs.createWriteStream(

                filePath

            );





            doc.pipe(stream);









            // ======================================
            // BORDER DESIGN
            // ======================================


            doc
            .lineWidth(6)
            .strokeColor("#1B5E20")
            .rect(

                25,

                25,

                545,

                792

            )
            .stroke();





            doc
            .lineWidth(2)
            .strokeColor("#D4AF37")
            .rect(

                40,

                40,

                515,

                762

            )
            .stroke();









            // ======================================
            // HEADER
            // ======================================


            doc
            .font("Helvetica-Bold")
            .fontSize(22)
            .fillColor("#1B5E20")
            .text(

                "SITA DEVI TOSHNIWAL",

                70,

                75,

                {
                    align:"center",
                    width:455
                }

            );



            doc
            .fontSize(22)
            .text(

                "CHARITABLE TRUST",

                70,

                105,

                {
                    align:"center",
                    width:455
                }

            );




            doc
            .font("Helvetica")
            .fontSize(11)
            .fillColor("#555")
            .text(

                "Dedicated to Community Service and Social Empowerment",

                70,

                140,

                {
                    align:"center",
                    width:455
                }

            );









            // ======================================
            // TITLE
            // ======================================


            doc
            .font("Helvetica-Bold")
            .fontSize(30)
            .fillColor("#222")
            .text(

                "CERTIFICATE",

                70,

                210,

                {
                    align:"center",
                    width:455
                }

            );





            doc
            .fontSize(18)
            .fillColor("#1B5E20")
            .text(

                "OF VOLUNTEER APPRECIATION",

                70,

                250,

                {
                    align:"center",
                    width:455
                }

            );









            // ======================================
            // BODY
            // ======================================


            doc
            .font("Helvetica")
            .fontSize(14)
            .fillColor("#333")
            .text(

                "This certificate is proudly presented to",

                70,

                310,

                {
                    align:"center",
                    width:455
                }

            );









            // ======================================
            // VOLUNTEER NAME
            // ======================================


            doc
            .font("Helvetica-Bold")
            .fontSize(32)
            .fillColor("#1565C0")
            .text(

                data.name.toUpperCase(),

                70,

                355,

                {
                    align:"center",
                    width:455
                }

            );









            doc
            .font("Helvetica")
            .fontSize(13)
            .fillColor("#333")
            .text(

                "For valuable contribution, dedication and commitment\n"+
                "towards community service initiatives.",


                90,

                415,

                {
                    align:"center",
                    width:410
                }

            );









            // ======================================
            // EVENT DETAILS BOX
            // ======================================


            const boxY = 500;


            doc
            .roundedRect(

                90,

                boxY,

                420,

                120,

                10

            )
            .strokeColor("#cccccc")
            .stroke();






            doc
            .font("Helvetica-Bold")
            .fontSize(13)
            .fillColor("#1B5E20")
            .text(

                "EVENT DETAILS",

                120,

                boxY+20

            );





            doc
            .font("Helvetica")
            .fontSize(12)
            .fillColor("#222")
            .text(

                `Event : ${data.eventName}`,

                120,

                boxY+45

            );



            doc.text(

                `Date : ${
                    data.date
                    ?
                    new Date(data.date)
                    .toLocaleDateString()
                    :
                    "-"
                }`,

                120,

                boxY+65

            );



            doc.text(

                `Venue : ${data.venue || "-"}`,

                120,

                boxY+85

            );






// ======================================
// QR CODE
// ======================================

if(data.verificationQR){

    try{


        const qrBase64 =
        data.verificationQR.split(",")[1];



        const qrBuffer =
        Buffer.from(

            qrBase64,

            "base64"

        );



        doc.image(

            qrBuffer,

            430,

            620,

            {

                width:120,

                height:120

            }

        );


    }
    catch(error){


        console.log(

            "QR rendering failed:",
            error.message

        );


    }

}





            // ======================================
            // CERTIFICATE INFORMATION
            // ======================================


            doc
            .fontSize(10)
            .fillColor("#555")
            .text(

                `Certificate ID : ${data.certificateNumber}`,

                70,

                650

            );



            doc.text(

                `Verification Code : ${data.verificationCode || "-"}`,

                70,

                670

            );



            doc.text(

                `Issued On : ${
                    new Date()
                    .toLocaleDateString()
                }`,

                70,

                690

            );









            // ======================================
            // SIGNATURE
            // ======================================


            doc
            .moveTo(

                330,

                740

            )
            .lineTo(

                470,

                740

            )
            .stroke();




            doc
            .fontSize(11)
            .fillColor("#222")
            .text(

                "Authorized Signatory",

                340,

                750

            );





            doc.text(

                "Sita Devi Toshniwal",

                340,

                765

            );








            // ======================================
            // FOOTER
            // ======================================


            doc
            .fontSize(9)
            .fillColor("#777")
            .text(

                "This certificate can be verified using the QR code or official verification portal.",

                80,

                785,

                {
                    align:"center",
                    width:420
                }

            );






            doc.end();






            stream.on(

                "finish",

                resolve

            );



            stream.on(

                "error",

                reject

            );




        }

        catch(error){


            reject(error);


        }


    });


};