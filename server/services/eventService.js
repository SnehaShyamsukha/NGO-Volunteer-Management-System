import api from "./api.js";



export const getEvents = async()=>{

    const res =
        await api.get(
            "/events"
        );

    return res.data;

};




export const createEvent = async(data)=>{

    const res =
        await api.post(
            "/events",
            data
        );

    return res.data;

};




export const updateEvent = async(
    id,
    data
)=>{


    const res =
        await api.put(

            `/events/${id}`,

            data

        );


    return res.data;

};





export const deleteEvent = async(id)=>{


    const res =
        await api.delete(

            `/events/${id}`

        );


    return res.data;

};