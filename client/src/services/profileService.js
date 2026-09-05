import api from "./api.js";


// ======================================
// GET PROFILE
// ======================================

export const getProfile = async()=>{

    const response = await api.get(
        "/profile"
    );

    return response.data;

};




// ======================================
// UPDATE PROFILE
// ======================================

export const updateProfile = async(data)=>{

    const response = await api.put(
        "/profile",
        data
    );

    return response.data;

};




// ======================================
// UPLOAD PROFILE PHOTO
// ======================================

export const uploadProfilePhoto = async(file)=>{

    const formData = new FormData();

    formData.append(
        "profilePhoto",
        file
    );


    const response = await api.put(

        "/profile/photo",

        formData,

        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

    );


    return response.data;

};




// ======================================
// CHANGE PASSWORD
// ======================================

export const changePassword = async(data)=>{

    const response = await api.put(

        "/profile/change-password",

        data

    );

    return response.data;

};