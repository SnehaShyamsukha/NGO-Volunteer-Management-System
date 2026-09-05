import api from "./api.js";



export const getActivities = async()=>{


    const response =
        await api.get(

            "/activity"

        );


    return response.data;


};