import api from "./api.js";



// ======================================
// ADMIN GET VOLUNTEERS FOR CERTIFICATE
// ======================================

export const getPendingCertificates = async()=>{

    const response = await api.get(

        "/certificates/pending"

    );

    return response.data;

};






// ======================================
// ADMIN VIEW GENERATED CERTIFICATES
// ======================================

export const getCertificates = async()=>{

    const response = await api.get(

        "/certificates"

    );

    return response.data;

};






// ======================================
// ADMIN GENERATE CERTIFICATE
// ======================================

export const generateCertificate = async(data)=>{

    const response = await api.post(

        "/certificates/generate",

        data

    );

    return response.data;

};






// ======================================
// VOLUNTEER GET CERTIFICATES
// ======================================

export const getMyCertificates = async()=>{

    const response = await api.get(

        "/certificates/my"

    );

    return response.data;

};






// ======================================
// DOWNLOAD CERTIFICATE PDF
// ======================================

export const downloadCertificate = async(id)=>{

    const response = await api.get(

        `/certificates/download/${id}`,

        {

            responseType:"blob"

        }

    );

    return response.data;

};






// ======================================
// VERIFY CERTIFICATE
// ======================================

export const verifyCertificate = async(certificateNumber)=>{


    const response = await api.get(

        `/certificates/verify/${certificateNumber}`

    );


    return response.data;


};