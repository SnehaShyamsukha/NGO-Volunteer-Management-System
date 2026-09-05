import express from "express";
import Certificate from "../models/Certificate.js";


const router = express.Router();



router.get("/:code",async(req,res)=>{


try{


const certificate =
await Certificate.findOne({

verificationCode:req.params.code

})
.populate(
"volunteer",
"name"
)
.populate(
"event",
"title date"
);



if(!certificate){

return res.status(404).json({

success:false,

message:"Invalid certificate"

});

}



res.json({

success:true,

data:certificate

});


}

catch(error){

res.status(500).json({

message:error.message

});

}


});


export default router;