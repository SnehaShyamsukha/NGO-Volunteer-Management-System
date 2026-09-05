import api from "./api.js";




// =====================================
// GET ALL EVENTS
// Search + Filter + Pagination
// =====================================

export const getEvents = async(params)=>{


    const response =

    await api.get(

        "/events",

        {

            params

        }

    );


    return response.data;


};









// =====================================
// GET SINGLE EVENT
// =====================================

export const getEventById = async(id)=>{


    const response =

    await api.get(

        `/events/${id}`

    );


    return response.data;


};









// =====================================
// CREATE EVENT
// =====================================

export const createEvent = async(data)=>{


    const response =

    await api.post(

        "/events",

        data

    );


    return response.data;


};









// =====================================
// UPDATE EVENT
// =====================================

export const updateEvent = async(

    id,

    data

)=>{


    const response =

    await api.put(

        `/events/${id}`,

        data

    );


    return response.data;


};









// =====================================
// UPDATE EVENT STATUS
// =====================================

export const updateEventStatus = async(

    id,

    data

)=>{


    const response =

    await api.put(

        `/events/${id}/status`,

        data

    );


    return response.data;


};









// =====================================
// DELETE EVENT
// =====================================

export const deleteEvent = async(id)=>{


    const response =

    await api.delete(

        `/events/${id}`

    );


    return response.data;


};









// =====================================
// GENERATE ATTENDANCE QR
// =====================================

export const generateAttendanceQR = async(id)=>{


    const response =

    await api.post(

        `/events/${id}/generate-qr`

    );


    return response.data;


};