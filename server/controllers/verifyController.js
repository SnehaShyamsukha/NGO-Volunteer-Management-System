import Certificate from "../models/Certificate.js";


export const verifyCertificate=async(req,res)=>{


try{


const certificate=

await Certificate.findOne({

certificateNumber:
req.params.number

})

.populate(
"volunteer",
"name email"
)

.populate(
"event",
"title"
);



if(!certificate){

return res.status(404).json({

success:false,

message:
"Certificate not found"

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