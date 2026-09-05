import Event from "../models/Event.js";

import Registration from "../models/Registration.js";

import Attendance from "../models/Attendance.js";

import createActivity from "../utils/createActivity.js";

import crypto from "crypto";




// =====================================
// CREATE EVENT (ADMIN)
// =====================================

export const createEvent = async(req,res)=>{

    try{


        const event =
        await Event.create({

            ...req.body,

            coordinator:req.user._id

        });



        await createActivity({

            user:req.user._id,

            action:"CREATE_EVENT",

            description:
            `Created event ${event.title}`,

            ipAddress:req.ip

        });



        res.status(201).json({

            success:true,

            message:"Event created successfully",

            data:event

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
// GET ALL EVENTS
// Search + Filter + Pagination
// =====================================

export const getEvents = async(req,res)=>{


    try{


        const {

            page = 1,

            limit = 10,

            search = "",

            status = ""

        } = req.query;




        const query = {};





        if(search){


            query.$or=[


                {

                    title:{
                        $regex:search,
                        $options:"i"
                    }

                },


                {

                    category:{
                        $regex:search,
                        $options:"i"
                    }

                },


                {

                    venue:{
                        $regex:search,
                        $options:"i"
                    }

                }


            ];


        }







        if(status){


            query.status=status;


        }







        const skip =
        (page-1)*limit;






        const events =
        await Event.find(query)


        .populate(

            "coordinator",

            "name email"

        )


        .sort({

            date:1

        })


        .skip(skip)


        .limit(Number(limit));







        const total =
        await Event.countDocuments(query);






        res.status(200).json({


            success:true,


            data:events,


            pagination:{


                page:Number(page),


                totalPages:

                Math.ceil(
                    total/limit
                ),


                total



            }


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
// GET SINGLE EVENT
// =====================================

export const getEventById = async(req,res)=>{


    try{


        const event =

        await Event.findById(

            req.params.id

        )

        .populate(

            "coordinator",

            "name email"

        );





        if(!event){


            return res.status(404).json({

                success:false,

                message:"Event not found"

            });


        }





        res.status(200).json({

            success:true,

            data:event

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
// UPDATE EVENT
// =====================================

export const updateEvent = async(req,res)=>{


    try{


        const event =

        await Event.findByIdAndUpdate(


            req.params.id,


            req.body,


            {

                new:true,

                runValidators:true

            }


        );





        if(!event){


            return res.status(404).json({

                success:false,

                message:"Event not found"

            });


        }







        await createActivity({

            user:req.user._id,

            action:"UPDATE_EVENT",

            description:
            `Updated event ${event.title}`,

            ipAddress:req.ip

        });







        res.json({

            success:true,

            message:"Event updated",

            data:event

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
// UPDATE EVENT STATUS
// =====================================

export const updateEventStatus = async(req,res)=>{


    try{


        const {

            status

        } = req.body;





        const allowed=[

            "upcoming",

            "ongoing",

            "completed",

            "closed"

        ];






        if(!allowed.includes(status)){


            return res.status(400).json({

                success:false,

                message:"Invalid event status"

            });


        }







        const event =

        await Event.findByIdAndUpdate(


            req.params.id,


            {

                status

            },


            {

                new:true

            }


        );







        if(!event){


            return res.status(404).json({

                success:false,

                message:"Event not found"

            });


        }







        await createActivity({

            user:req.user._id,

            action:"UPDATE_EVENT_STATUS",

            description:
            `Changed ${event.title} status to ${status}`,

            ipAddress:req.ip

        });







        res.json({

            success:true,

            data:event

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
// GENERATE QR ATTENDANCE CODE
// =====================================

export const generateAttendanceQR = async(req,res)=>{


    try{


        const code =

        crypto.randomBytes(4)

        .toString("hex");





        const event =

        await Event.findByIdAndUpdate(


            req.params.id,


            {

                attendanceCode:code

            },


            {

                new:true

            }


        );






        if(!event){


            return res.status(404).json({

                success:false,

                message:"Event not found"

            });


        }







        res.json({

            success:true,

            message:"QR attendance code generated",

            attendanceCode:
            code

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
// DELETE EVENT
// =====================================

export const deleteEvent = async(req,res)=>{


    try{


        const event =

        await Event.findById(

            req.params.id

        );





        if(!event){


            return res.status(404).json({

                success:false,

                message:"Event not found"

            });


        }







        await Registration.deleteMany({

            event:event._id

        });






        await Attendance.deleteMany({

            event:event._id

        });






        await event.deleteOne();







        await createActivity({

            user:req.user._id,

            action:"DELETE_EVENT",

            description:
            `Deleted event ${event.title}`,

            ipAddress:req.ip

        });







        res.json({

            success:true,

            message:"Event deleted successfully"

        });





    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};