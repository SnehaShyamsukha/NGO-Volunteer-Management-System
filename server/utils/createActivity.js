import ActivityLog from "../models/ActivityLog.js";


const createActivity = async({

    user,

    action,

    description,

    ipAddress

}) => {


    try{


        await ActivityLog.create({

            user,

            action,

            description,

            ipAddress

        });


    }
    catch(error){


        console.log(
            "Activity Log Error:",
            error.message
        );


    }


};


export default createActivity;