import Attendance from "../models/Attendance.js";
import Event from "../models/Event.js";
import createActivity from "../utils/createActivity.js";




// =====================================
// ADMIN MANUAL ATTENDANCE
// =====================================

export const markAttendance = async(req,res)=>{

try{


const {
    volunteer,
    event
}=req.body;



const existing =
await Attendance.findOne({
    volunteer,
    event
});


if(existing){

return res.status(400).json({

success:false,
message:"Attendance already exists"

});

}




const attendance =
await Attendance.create({

volunteer,
event,

checkIn:new Date(),

method:"manual",

status:"present"

});



res.status(201).json({

success:true,
data:attendance

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
// ADMIN GENERATE ATTENDANCE CODE
// =====================================


export const generateAttendanceCode = async(req,res)=>{


try{


const {
eventId
}=req.params;



const event =
await Event.findById(eventId);



if(!event){

return res.status(404).json({

success:false,
message:"Event not found"

});

}




const code =
Math.floor(
100000+
Math.random()*900000
).toString();




event.attendanceCode=code;

await event.save();




res.json({

success:true,

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
// VOLUNTEER CHECK IN USING CODE
// =====================================


export const markAttendanceWithCode = async(req,res)=>{


try{


const {
code
}=req.body;




const event =
await Event.findOne({

attendanceCode:code

});




if(!event){


return res.status(404).json({

success:false,

message:"Invalid attendance code"

});

}





const existing =
await Attendance.findOne({

volunteer:req.user._id,

event:event._id

});




if(existing){


return res.status(400).json({

success:false,

message:"Already checked in"

});

}





const attendance =
await Attendance.create({

volunteer:req.user._id,

event:event._id,

checkIn:new Date(),

method:"manual",

status:"present"

});





await createActivity({

user:req.user._id,

action:"CHECK_IN",

description:
"Volunteer checked in",

ipAddress:req.ip

});




res.status(201).json({

success:true,

message:"Check-in successful",

data:attendance

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
// VOLUNTEER CHECK OUT
// =====================================


export const checkOut = async(req,res)=>{


try{


const attendance =
await Attendance.findOne({

volunteer:req.user._id,

event:req.params.eventId

});




if(!attendance){

return res.status(404).json({

success:false,

message:"Check-in not found"

});

}





if(attendance.checkOut){

return res.status(400).json({

success:false,

message:"Already checked out"

});

}




const checkoutTime =
new Date();





const totalHours =

(
checkoutTime -
attendance.checkIn
)

/
(1000*60*60);





attendance.checkOut =
checkoutTime;


attendance.hours =
Number(
totalHours.toFixed(2)
);



await attendance.save();





await createActivity({

user:req.user._id,

action:"CHECK_OUT",

description:
"Volunteer checked out",

ipAddress:req.ip

});





res.json({

success:true,

message:"Checkout successful",

data:attendance

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
// VOLUNTEER ATTENDANCE HISTORY
// =====================================


export const getMyAttendance = async(req,res)=>{


try{


const attendance =
await Attendance.find({

volunteer:req.user._id

})

.populate(
"event",
"title date venue"
)

.sort({

createdAt:-1

});




res.json({

success:true,

data:attendance

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
// ADMIN VIEW ATTENDANCE
// =====================================


export const getAttendance = async(req,res)=>{


try{


const attendance =
await Attendance.find()

.populate(
"volunteer",
"name email"
)

.populate(
"event",
"title date"
)

.sort({

createdAt:-1

});




res.json({

success:true,

data:attendance

});



}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};