import api from "./api.js";



// ======================================
// GET ALL VOLUNTEERS
// Search + Filter + Pagination
// ======================================

export const getVolunteers = async(params)=>{

    const response =
        await api.get(

            "/users/volunteers",

            {
                params
            }

        );


    return response.data;

};





// ======================================
// GET SINGLE VOLUNTEER DETAILS
// ======================================

export const getVolunteerById = async(id)=>{


    const response =
        await api.get(

            `/users/volunteers/${id}`

        );


    return response.data;

};






// ======================================
// UPDATE VOLUNTEER
// ======================================

export const updateVolunteer = async(
    id,
    data
)=>{


    const response =
        await api.put(

            `/users/volunteers/${id}`,

            data

        );


    return response.data;

};







// ======================================
// CHANGE ACTIVE / INACTIVE STATUS
// ======================================

export const changeVolunteerStatus = async(id)=>{


    const response =
        await api.patch(

            `/users/volunteers/${id}/status`

        );


    return response.data;

};







// ======================================
// DELETE VOLUNTEER
// ======================================

export const deleteVolunteer = async(id)=>{


    const response =
        await api.delete(

            `/users/volunteers/${id}`

        );


    return response.data;

};








// ======================================
// VOLUNTEER STATISTICS
// ======================================

export const getVolunteerStatistics =
async()=>{


    const response =
        await api.get(

            "/users/volunteers/statistics"

        );


    return response.data;

};








// ======================================
// EXPORT VOLUNTEER PDF
// ======================================

export const exportVolunteerPDF =
async()=>{


    const response =
        await api.get(

            "/users/volunteers/export/pdf",

            {
                responseType:"blob"
            }

        );


    return response;

};