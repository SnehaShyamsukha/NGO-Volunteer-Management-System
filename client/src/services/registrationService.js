import api from "./api.js";



// =====================================
// ADMIN GET ALL REGISTRATIONS
// =====================================

export const getRegistrations = async(params)=>{


    const response =

    await api.get(

        "/registrations",

        {
            params
        }

    );


    return response.data;


};







// =====================================
// VOLUNTEER REGISTER EVENT
// =====================================

export const registerEvent = async(eventId)=>{


    const response =

    await api.post(

        `/registrations/${eventId}`

    );


    return response.data;


};







// =====================================
// VOLUNTEER GET MY REGISTRATIONS
// =====================================

export const getMyRegistrations = async()=>{


    const response =

    await api.get(

        "/registrations/my"

    );


    return response.data;


};







// =====================================
// VOLUNTEER CANCEL REGISTRATION
// =====================================

export const cancelRegistration = async(id)=>{


    const response =

    await api.delete(

        `/registrations/${id}`

    );


    return response.data;


};







// =====================================
// ADMIN APPROVE REGISTRATION
// =====================================

export const approveRegistration = async(id)=>{


    const response =

    await api.put(

        `/registrations/${id}/status`,

        {

            status:"approved"

        }

    );


    return response.data;


};







// =====================================
// ADMIN REJECT REGISTRATION
// =====================================

export const rejectRegistration = async(id)=>{


    const response =

    await api.put(

        `/registrations/${id}/status`,

        {

            status:"rejected"

        }

    );


    return response.data;


};