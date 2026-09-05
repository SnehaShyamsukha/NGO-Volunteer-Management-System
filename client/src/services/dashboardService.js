import api from "./api.js";


// ===============================
// Admin Dashboard
// ===============================

export const getAdminDashboard = async()=>{

    const response =
        await api.get(
            "/dashboard/admin"
        );

    return response.data;

};




// ===============================
// Volunteer Dashboard
// ===============================

export const getVolunteerDashboard = async()=>{

    const response =
        await api.get(
            "/dashboard/volunteer"
        );

    return response.data;

};




// ===============================
// Chart Data
// ===============================

export const getChartData = async()=>{

    const response =
        await api.get(
            "/dashboard/charts"
        );

    return response.data;

};

// ===============================
// Activity Logs
// ===============================


export const getActivityLogs = async()=>{


    const response =
        await api.get(

            "/activity"

        );


    return response.data;


};