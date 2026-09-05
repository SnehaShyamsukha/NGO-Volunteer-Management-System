import api from "./api.js";




// =====================================
// ADMIN GET ALL ATTENDANCE
// =====================================

export const getAttendance = async(params)=>{


    const response = await api.get(

        "/attendance",

        {
            params
        }

    );


    return response.data;

};









// =====================================
// ADMIN MANUAL ATTENDANCE
// =====================================

export const markAttendance = async(data)=>{


    const response = await api.post(

        "/attendance/manual",

        data

    );


    return response.data;

};









// =====================================
// ADMIN GENERATE ATTENDANCE CODE
// =====================================

export const generateAttendanceCode = async(eventId)=>{


    const response = await api.get(

        `/attendance/generate-code/${eventId}`

    );


    return response.data;

};









// =====================================
// VOLUNTEER CHECK-IN USING CODE
// =====================================

export const markAttendanceWithCode = async(code)=>{


    const response = await api.post(

        "/attendance/check-in",

        {
            code
        }

    );


    return response.data;

};









// =====================================
// VOLUNTEER CHECKOUT
// =====================================

export const checkOut = async(eventId)=>{


    const response = await api.put(

        `/attendance/checkout/${eventId}`

    );


    return response.data;

};









// =====================================
// VOLUNTEER HISTORY
// =====================================

export const getMyAttendance = async()=>{


    const response = await api.get(

        "/attendance/my"

    );


    return response.data;

};