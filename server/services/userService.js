import api from "./api.js";



export const getVolunteers = async(params)=>{


    const res = await api.get(

        "/users/volunteers",

        {
            params
        }

    );


    return res.data;


};





export const getVolunteerById = async(id)=>{


    const res = await api.get(

        `/users/volunteers/${id}`

    );


    return res.data;


};






export const updateVolunteerStatus = async(

    id,

    status

)=>{


    const res = await api.put(

        `/users/volunteers/${id}/status`,

        {
            status
        }

    );


    return res.data;


};





export const deleteVolunteer = async(id)=>{


    const res = await api.delete(

        `/users/volunteers/${id}`

    );


    return res.data;


};