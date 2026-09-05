import User from "../models/User.js";
import Attendance from "../models/Attendance.js";
import Registration from "../models/Registration.js";
import Certificate from "../models/Certificate.js";

import PDFDocument from "pdfkit";

import { exportVolunteerExcel } from "../utils/exportVolunteerExcel.js";

// ==========================================
// GET ALL VOLUNTEERS
// Search + Filter + Pagination
// ==========================================

export const getVolunteers = async(req,res)=>{

    try{

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 10;

        const skip =
            (page-1)*limit;


        const search =
            req.query.search || "";


        const status =
            req.query.status || "";



        const query = {

            role:"volunteer"

        };



        if(search){

            query.$or=[

                {
                    name:{
                        $regex:search,
                        $options:"i"
                    }
                },

                {
                    email:{
                        $regex:search,
                        $options:"i"
                    }
                },

                {
                    phone:{
                        $regex:search,
                        $options:"i"
                    }
                }

            ];

        }



        if(status){

            query.status=status;

        }



        const volunteers =
            await User.find(query)

            .select("-password")

            .sort({
                createdAt:-1
            })

            .skip(skip)

            .limit(limit);



        const total =
            await User.countDocuments(query);



        res.json({

            success:true,

            volunteers,

            pagination:{

                page,

                limit,

                total,

                totalPages:
                Math.ceil(total/limit)

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




// ==========================================
// GET SINGLE VOLUNTEER PROFILE
// ==========================================


export const getVolunteerById = async(req,res)=>{

    try{


        const volunteer =
            await User.findById(req.params.id)

            .select("-password");



        if(!volunteer){

            return res.status(404).json({

                success:false,

                message:"Volunteer not found"

            });

        }



        const registrations =
            await Registration.find({

                volunteer:volunteer._id

            })

            .populate("event");



        const attendance =
            await Attendance.find({

                volunteer:volunteer._id

            })

            .populate("event");



        const certificates =
            await Certificate.find({

                volunteer:volunteer._id

            });



        const hours =
            attendance.reduce(

                (sum,item)=>

                sum + item.hours,

                0

            );



        res.json({

            success:true,

            volunteer,

            statistics:{

                events:
                registrations.length,

                attendance:
                attendance.length,

                hours,

                certificates:
                certificates.length

            },

            registrations,

            attendance,

            certificates

        });



    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// ==========================================
// UPDATE VOLUNTEER
// ==========================================


export const updateVolunteer = async(req,res)=>{


    try{


        const volunteer =
            await User.findById(
                req.params.id
            );


        if(!volunteer){

            return res.status(404).json({

                success:false,

                message:"Volunteer not found"

            });

        }



        Object.assign(

            volunteer,

            req.body

        );



        await volunteer.save();



        res.json({

            success:true,

            message:"Volunteer updated",

            volunteer

        });



    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// ==========================================
// CHANGE STATUS
// ==========================================


export const changeVolunteerStatus =
async(req,res)=>{


    try{


        const volunteer =
            await User.findById(
                req.params.id
            );



        if(!volunteer){

            return res.status(404).json({

                success:false,

                message:"Volunteer not found"

            });

        }



        volunteer.status =
        volunteer.status==="active"
        ?
        "inactive"
        :
        "active";



        await volunteer.save();



        res.json({

            success:true,

            message:
            "Status updated",

            status:
            volunteer.status

        });



    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// ==========================================
// DELETE VOLUNTEER
// ==========================================


export const deleteVolunteer =
async(req,res)=>{


    try{


        const volunteer =
            await User.findById(
                req.params.id
            );



        if(!volunteer){

            return res.status(404).json({

                success:false,

                message:"Volunteer not found"

            });

        }



        await Registration.deleteMany({

            volunteer:volunteer._id

        });


        await Attendance.deleteMany({

            volunteer:volunteer._id

        });



        await Certificate.deleteMany({

            volunteer:volunteer._id

        });



        await volunteer.deleteOne();



        res.json({

            success:true,

            message:"Volunteer deleted"

        });



    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// ==========================================
// VOLUNTEER STATISTICS
// ==========================================


export const volunteerStatistics =
async(req,res)=>{


    try{


        const total =
        await User.countDocuments({

            role:"volunteer"

        });



        const active =
        await User.countDocuments({

            role:"volunteer",

            status:"active"

        });



        const inactive =
        await User.countDocuments({

            role:"volunteer",

            status:"inactive"

        });



        const hours =
        await Attendance.aggregate([

            {

                $group:{

                    _id:null,

                    total:{

                        $sum:"$hours"

                    }

                }

            }

        ]);



        const certificates =
        await Certificate.countDocuments();



        res.json({

            success:true,

            data:{

                total,

                active,

                inactive,

                hours:
                hours[0]?.total || 0,

                certificates

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





// ==========================================
// EXPORT PDF
// ==========================================


export const exportVolunteerPDF =
async(req,res)=>{


    try{


        const volunteers =
        await User.find({

            role:"volunteer"

        });



        const doc =
        new PDFDocument();



        res.setHeader(

            "Content-Type",

            "application/pdf"

        );


        res.setHeader(

            "Content-Disposition",

            "attachment; filename=volunteers.pdf"

        );



        doc.pipe(res);



        doc.fontSize(18)

        .text(
            "NGO Volunteer Report",
            {
                align:"center"
            }
        );



        doc.moveDown();



        volunteers.forEach((v,index)=>{


            doc.fontSize(12)

            .text(

            `${index+1}. ${v.name}
Email: ${v.email}
Phone: ${v.phone || "-"}
Status: ${v.status}
`

            );


            doc.moveDown();


        });



        doc.end();



    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const exportVolunteerExcelFile = async(req,res)=>{

    try{

        const volunteers = await User.find({

            role:"volunteer"

        });

        const workbook = await exportVolunteerExcel(

            volunteers

        );

        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );

        res.setHeader(

            "Content-Disposition",

            "attachment; filename=volunteers.xlsx"

        );

        await workbook.xlsx.write(res);

        res.end();

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};