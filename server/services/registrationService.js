import api from "./api.js";

export const registerEvent = async(eventId)=>{
    const res =
        await api.post(

            "/registrations",

            {
                eventId
            }

        );

    return res.data;

};


export const getMyRegistrations = async()=>{


    const res =
        await api.get(

            "/registrations/my"

        );


    return res.data;

};





export const getAllRegistrations = async()=>{


    const res =
        await api.get(

            "/registrations"

        );


    return res.data;

};





export const updateRegistration =
async(id,status)=>{


    const res =
        await api.put(

            `/registrations/${id}/status`,

            {
                status
            }

        );


    return res.data;

};