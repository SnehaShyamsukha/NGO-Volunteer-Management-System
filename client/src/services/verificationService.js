import api from "./api.js";



export const verifyCertificate = async(certificateNumber)=>{


    const response = await api.get(

        `/verify/${certificateNumber}`

    );


    return response.data;


};