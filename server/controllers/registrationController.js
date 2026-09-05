import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import createActivity from "../utils/createActivity.js";



// =====================================
// VOLUNTEER REGISTER EVENT
// =====================================

export const registerEvent = async(req,res)=>{

    try{


        const {
            eventId
        } = req.params;



        const event =
        await Event.findById(eventId);



        if(!event){

            return res.status(404).json({

                success:false,

                message:"Event not found"

            });

        }





        // Check existing registration

        const existing =

        await Registration.findOne({

            volunteer:req.user._id,

            event:eventId

        });



        if(existing){

            return res.status(400).json({

                success:false,

                message:"Already registered for this event"

            });

        }






        // Check volunteer limit

        if(event.maxVolunteers){


            const count =

            await Registration.countDocuments({

                event:eventId,

                status:"approved"

            });



            if(count >= event.maxVolunteers){


                return res.status(400).json({

                    success:false,

                    message:"Event capacity reached"

                });

            }

        }







        const registration =

        await Registration.create({

            volunteer:req.user._id,

            event:eventId

        });








        await createActivity({

            user:req.user._id,

            action:"REGISTER_EVENT",

            description:
            `Registered for event ${event.title}`,

            ipAddress:req.ip

        });








        res.status(201).json({

            success:true,

            message:"Registration submitted successfully",

            data:registration

        });




    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// =====================================
// VOLUNTEER MY REGISTRATIONS
// =====================================

export const myRegistrations = async(req,res)=>{


    try{


        const registrations =

        await Registration.find({

            volunteer:req.user._id

        })

        .populate(

            "event"

        )

        .sort({

            createdAt:-1

        });





        res.json({

            success:true,

            data:registrations

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// =====================================
// CANCEL REGISTRATION
// =====================================

export const cancelRegistration = async(req,res)=>{


    try{


        const registration =

        await Registration.findOne({

            _id:req.params.id,

            volunteer:req.user._id

        });




        if(!registration){


            return res.status(404).json({

                success:false,

                message:"Registration not found"

            });

        }





        registration.status="cancelled";


        await registration.save();





        res.json({

            success:true,

            message:"Registration cancelled"

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// =====================================
// ADMIN GET ALL REGISTRATIONS
// =====================================

export const getRegistrations = async(req,res)=>{


    try{


        const registrations =

        await Registration.find()

        .populate(

            "volunteer",

            "name email phone"

        )

        .populate(

            "event",

            "title date venue category"

        )

        .sort({

            createdAt:-1

        });





        res.json({

            success:true,

            data:registrations

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};




// Backward compatibility

export const getAllRegistrations = getRegistrations;









// =====================================
// ADMIN APPROVE / REJECT REGISTRATION
// =====================================

export const updateRegistrationStatus = async(req,res)=>{


    try{


        const {
            status
        } = req.body;




        if(
            !["approved","rejected"]
            .includes(status)
        ){

            return res.status(400).json({

                success:false,

                message:"Invalid status"

            });

        }






        const registration =

        await Registration.findById(

            req.params.id

        )

        .populate(

            "event"

        );





        if(!registration){


            return res.status(404).json({

                success:false,

                message:"Registration not found"

            });

        }






        registration.status=status;


        registration.reviewedBy=req.user._id;


        registration.reviewedAt=new Date();



        await registration.save();








        await createActivity({

            user:req.user._id,

            action:"UPDATE_REGISTRATION_STATUS",

            description:

            `${status} registration for ${registration.event.title}`,

            ipAddress:req.ip

        });








        res.json({

            success:true,

            message:
            `Registration ${status}`,

            data:registration

        });




    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};