import Certificate from "../models/Certificate.js";




// =================================
// VERIFY CERTIFICATE
// =================================

export const verifyCertificate = async(req,res)=>{


    try{


        const {
            certificateNumber
        } = req.params;




        const certificate = await Certificate.findOne({

            certificateNumber

        })

        .populate(

            "volunteer",

            "name email"

        )

        .populate(

            "event",

            "title date venue"

        );





        if(!certificate){


            return res.status(404).json({


                success:false,


                message:"Invalid certificate"


            });


        }






        res.status(200).json({


            success:true,


            data:certificate


        });





    }

    catch(error){


        res.status(500).json({


            success:false,


            message:error.message


        });


    }


};