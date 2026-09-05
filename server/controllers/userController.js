import User from "../models/User.js";


import PDFDocument from "pdfkit";

// ===============================
// Get All Volunteers (Admin)
// Search + Filter + Pagination
// ===============================

export const getVolunteers = async(req,res)=>{

    try{


        const page =
            Number(req.query.page) || 1;


        const limit =
            Number(req.query.limit) || 10;


        const skip =
            (page - 1) * limit;



        const search =
            req.query.search || "";



        const status =
            req.query.status || "";




        const query = {

            role:"volunteer"

        };




        // Search filter

        if(search){


            query.$or = [

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





        // Status filter

        if(status){


            query.status = status;


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







        res.status(200).json({

            success:true,


            volunteers,


            pagination:{


                page,


                limit,


                total,


                totalPages:
                    Math.ceil(total / limit)


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











// ===============================
// Get Single Volunteer
// ===============================


export const getVolunteerById = async(req,res)=>{


    try{


        const volunteer =

            await User.findOne({

                _id:req.params.id,

                role:"volunteer"

            })

            .select("-password");





        if(!volunteer){


            return res.status(404).json({

                success:false,

                message:"Volunteer not found"

            });


        }






        res.status(200).json({

            success:true,

            data:volunteer

        });





    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};












// ===============================
// Update Volunteer Status
// ===============================


export const updateVolunteerStatus = async(req,res)=>{


    try{


        const {
            status
        } = req.body;





        if(
            !["active","inactive"].includes(status)
        ){


            return res.status(400).json({

                success:false,

                message:"Invalid status value"

            });


        }







        const volunteer =

            await User.findOneAndUpdate(

                {

                    _id:req.params.id,

                    role:"volunteer"

                },


                {

                    status

                },


                {

                    new:true

                }

            )

            .select("-password");








        if(!volunteer){


            return res.status(404).json({

                success:false,

                message:"Volunteer not found"

            });


        }








        res.status(200).json({

            success:true,

            message:"Volunteer status updated",

            data:volunteer

        });






    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};












// ===============================
// Delete Volunteer
// ===============================


export const deleteVolunteer = async(req,res)=>{


    try{


        const volunteer =

            await User.findOne({

                _id:req.params.id,

                role:"volunteer"

            });







        if(!volunteer){


            return res.status(404).json({

                success:false,

                message:"Volunteer not found"

            });


        }






        await volunteer.deleteOne();







        res.status(200).json({

            success:true,

            message:"Volunteer deleted successfully"

        });





    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};

// ===============================
// Export Volunteers PDF
// ===============================

export const exportVolunteerPDF = async(req,res)=>{


    try{


        const volunteers =

            await User.find({

                role:"volunteer"

            })

            .select("-password");





        const doc = new PDFDocument();




        res.setHeader(

            "Content-Type",

            "application/pdf"

        );



        res.setHeader(

            "Content-Disposition",

            "attachment; filename=volunteers.pdf"

        );




        doc.pipe(res);





        doc
        .fontSize(18)
        .text(

            "NGO Volunteer Management System",

            {

                align:"center"

            }

        );



        doc.moveDown();



        doc
        .fontSize(14)
        .text(

            "Volunteer Report"

        );



        doc.moveDown();





        volunteers.forEach(

            (volunteer,index)=>{


                doc
                .fontSize(12)
                .text(

`${index+1}. Name: ${volunteer.name}
Email: ${volunteer.email}
Phone: ${volunteer.phone || "-"}
Status: ${volunteer.status}
`

                );


                doc.moveDown();


            }

        );




        doc.end();



    }


    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};