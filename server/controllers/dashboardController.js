import User from "../models/User.js";
import Event from "../models/Event.js";
import Attendance from "../models/Attendance.js";
import Certificate from "../models/Certificate.js";
import Registration from "../models/Registration.js";
import ActivityLog from "../models/ActivityLog.js";



// =====================================
// ADMIN DASHBOARD
// =====================================

export const adminDashboard = async(req,res)=>{

    try{


        const totalVolunteers =
        await User.countDocuments({

            role:"volunteer"

        });



        const activeVolunteers =
        await User.countDocuments({

            role:"volunteer",

            status:"active"

        });



        const upcomingEvents =
        await Event.countDocuments({

            status:"upcoming"

        });



        const completedEvents =
        await Event.countDocuments({

            status:"completed"

        });



        const pendingRegistrations =
        await Registration.countDocuments({

            status:"pending"

        });



        const certificatesGenerated =
        await Certificate.countDocuments();



        const attendanceHours =
        await Attendance.aggregate([

            {
                $match:{

                    status:"present"

                }
            },


            {
                $group:{

                    _id:null,

                    total:{

                        $sum:"$hours"

                    }

                }

            }

        ]);




        const totalAttendance =
        await Attendance.countDocuments({

            status:"present"

        });





        const recentActivities =
        await ActivityLog.find()

        .populate(

            "user",

            "name email"

        )

        .sort({

            createdAt:-1

        })

        .limit(5);






        res.status(200).json({

            success:true,


            data:{


                totalVolunteers,


                activeVolunteers,


                upcomingEvents,


                completedEvents,


                pendingRegistrations,


                certificatesGenerated,


                totalVolunteerHours:

                Number(

                    attendanceHours[0]?.total || 0

                ),



                totalAttendance,


                recentActivities


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
// ADMIN CHART DATA
// =====================================


export const chartData = async(req,res)=>{


    try{


        const genderDistribution =

        await User.aggregate([


            {

                $match:{

                    role:"volunteer"

                }

            },


            {

                $group:{


                    _id:{

                        $ifNull:[

                            "$gender",

                            "Unknown"

                        ]

                    },


                    count:{

                        $sum:1

                    }


                }


            }


        ]);







        const eventCategories =

        await Event.aggregate([


            {

                $group:{


                    _id:{

                        $ifNull:[

                            "$category",

                            "Other"

                        ]

                    },


                    count:{

                        $sum:1

                    }


                }


            }


        ]);







        const eventParticipation =

        await Registration.aggregate([


            {

                $group:{


                    _id:"$event",


                    count:{

                        $sum:1

                    }


                }


            },


            {

                $sort:{

                    count:-1

                }

            },


            {

                $limit:10

            },


            {

                $lookup:{


                    from:"events",


                    localField:"_id",


                    foreignField:"_id",


                    as:"event"


                }


            },


            {

                $unwind:"$event"

            },


            {

                $project:{


                    _id:"$event.title",


                    count:1


                }


            }


        ]);







        const volunteerGrowth =

        await User.aggregate([


            {

                $match:{

                    role:"volunteer"

                }

            },


            {

                $group:{


                    _id:{


                        month:{

                            $month:"$createdAt"

                        },


                        year:{

                            $year:"$createdAt"

                        }


                    },


                    count:{

                        $sum:1

                    }


                }


            },


            {

                $sort:{


                    "_id.year":1,

                    "_id.month":1


                }

            }


        ]);







        const attendanceStatus =

        await Attendance.aggregate([


            {

                $group:{


                    _id:"$status",


                    count:{

                        $sum:1

                    }


                }


            }


        ]);







        const registrationStatus =

        await Registration.aggregate([


            {

                $group:{


                    _id:"$status",


                    count:{

                        $sum:1

                    }


                }


            }


        ]);







        const eventStatus =

        await Event.aggregate([


            {

                $group:{


                    _id:"$status",


                    count:{

                        $sum:1

                    }


                }


            }


        ]);







        const certificateTrend =

        await Certificate.aggregate([


            {

                $group:{


                    _id:{


                        month:{

                            $month:"$createdAt"

                        },


                        year:{

                            $year:"$createdAt"

                        }


                    },


                    count:{

                        $sum:1

                    }


                }


            },


            {

                $sort:{


                    "_id.year":1,

                    "_id.month":1


                }


            }


        ]);




        res.status(200).json({


            success:true,


            data:{


                genderDistribution,


                eventCategories,


                eventParticipation,


                volunteerGrowth,


                attendanceStatus,


                registrationStatus,


                eventStatus,


                certificateTrend


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
// VOLUNTEER DASHBOARD
// =====================================

export const volunteerDashboard = async(req,res)=>{

try{


const volunteerId=req.user._id;



// ===============================
// ATTENDANCE DATA
// ===============================


const attendanceRecords =
await Attendance.find({

volunteer:volunteerId,

status:"present"

});



const totalAttendance =
attendanceRecords.length;



const totalHours =
attendanceRecords.reduce(

(sum,item)=>{

return sum + Number(item.hours || 0);

},

0

);




// ===============================
// REGISTRATION DATA
// ===============================


const totalEvents =
await Registration.countDocuments({

volunteer:volunteerId,

status:"approved"

});



const pendingRegistrations =
await Registration.countDocuments({

volunteer:volunteerId,

status:"pending"

});





// ===============================
// CERTIFICATES
// ===============================


const certificates =
await Certificate.countDocuments({

volunteer:volunteerId

});



const certificatesList =

await Certificate.find({

volunteer:volunteerId

})

.populate(

"event",

"title date venue"

)

.sort({

createdAt:-1

})

.limit(5);





// ===============================
// UPCOMING EVENTS
// ===============================


const upcoming =

await Registration.find({

volunteer:volunteerId,

status:"approved"

})

.populate({

path:"event",

match:{

date:{
$gte:new Date()
}

}

});



const upcomingEvents =

upcoming

.filter(item=>item.event)

.map(item=>item.event);





// ===============================
// PROFILE COMPLETION
// ===============================


const user =

await User.findById(volunteerId);



const fields=[

"name",

"phone",

"address",

"city",

"state",

"education",

"occupation",

"profilePhoto"

];



let completed=0;


fields.forEach(field=>{

if(user[field] && user[field] !== "")

completed++;


});



const profileCompletion =

Math.round(

(completed/fields.length)*100

);





// ===============================
// RECENT ACTIVITY
// ===============================


const recentActivities =

await ActivityLog.find({

user:volunteerId

})

.sort({

createdAt:-1

})

.limit(5);







res.status(200).json({

success:true,


data:{


hours:Number(totalHours.toFixed(2)),


volunteerHours:Number(totalHours.toFixed(2)),


events:totalEvents,


attendance:totalAttendance,


certificates,


pendingRegistrations,


profileCompletion,


certificatesList,


upcomingEvents,


recentActivities



}


});




}

catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


};