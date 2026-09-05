import {
    useEffect,
    useState
} from "react";


import {
    toast
} from "react-toastify";


import {
    getMyCertificates,
    downloadCertificate
} from "../../services/certificateService.js";





const Certificates = () => {


    const [
        certificates,
        setCertificates
    ] = useState([]);



    const [
        loading,
        setLoading
    ] = useState(true);







    // ==============================
    // LOAD CERTIFICATES
    // ==============================

    const loadCertificates = async()=>{


        try{


            setLoading(true);


            const response =

            await getMyCertificates();



            setCertificates(

                response.data || []

            );


        }
        catch(error){


            console.log(error);


            toast.error(
                "Failed to load certificates"
            );


        }
        finally{


            setLoading(false);


        }


    };







    useEffect(()=>{


        loadCertificates();


    },[]);









    // ==============================
    // DOWNLOAD CERTIFICATE
    // ==============================


    const handleDownload = async(id)=>{


        try{


            const pdf =

            await downloadCertificate(id);



            const blob = new Blob(

                [pdf],

                {
                    type:"application/pdf"
                }

            );



            const url =

            window.URL.createObjectURL(blob);



            const link =

            document.createElement("a");



            link.href=url;


            link.download =
            "volunteer-certificate.pdf";



            document.body.appendChild(link);



            link.click();



            link.remove();



            window.URL.revokeObjectURL(url);



            toast.success(
                "Certificate downloaded"
            );


        }
        catch(error){


            console.log(error);


            toast.error(
                "Download failed"
            );


        }


    };









    // ==============================
    // PRINT CERTIFICATE
    // ==============================


    const handlePrint = (id)=>{


        const printUrl =

        `${import.meta.env.VITE_API_URL}/certificates/download/${id}`;



        const windowPrint =

        window.open(
            printUrl,
            "_blank"
        );



        if(!windowPrint){

            toast.error(
                "Popup blocked. Allow popup and try again"
            );

        }


    };









    // ==============================
    // VERIFY LINK
    // ==============================


    const getVerificationLink=(number)=>{


        return (

            `${window.location.origin}/verify/${number}`

        );


    };








    const copyVerificationLink=(number)=>{


        navigator.clipboard.writeText(

            getVerificationLink(number)

        );


        toast.success(
            "Verification link copied"
        );


    };









    return (


        <div className="container-fluid">


            <div className="d-flex justify-content-between align-items-center mb-4">


                <h2 className="fw-bold">

                    🏆 My Certificates

                </h2>



            </div>









            {
                loading &&


                <div className="text-center py-5">


                    <div

                    className="spinner-border text-success"

                    >

                    </div>



                    <p className="mt-3">

                        Loading certificates...

                    </p>



                </div>


            }











            {
                !loading && certificates.length===0 &&


                <div className="card shadow border-0 p-5 text-center">


                    <div

                    style={{
                        fontSize:"60px"
                    }}

                    >

                        📜

                    </div>



                    <h4 className="mt-3">

                        No Certificates Yet

                    </h4>



                    <p className="text-muted">

                        Complete volunteer activities and attendance
                        to receive certificates.

                    </p>



                </div>


            }









            <div className="row g-4">



            {

            certificates.map((certificate)=>(



                <div

                className="col-lg-4 col-md-6"

                key={
                    certificate._id
                }

                >





                    <div

                    className="card shadow border-0 h-100"

                    style={{

                        borderRadius:"18px",

                        overflow:"hidden"

                    }}

                    >








                        {/* HEADER */}


                        <div

                        className="p-3 text-white"

                        style={{

                            background:
                            "linear-gradient(135deg,#198754,#0d6efd)"

                        }}

                        >


                            <div className="d-flex justify-content-between">


                                <h5 className="mb-0">

                                    🏅 Certificate

                                </h5>



                                <span

                                className="badge bg-light text-success"

                                >

                                    ✓ Verified

                                </span>



                            </div>


                        </div>









                        <div className="card-body">





                            <h5 className="fw-bold">


                                {
                                    certificate.event?.title ||

                                    "Volunteer Event"
                                }


                            </h5>






                            <p className="text-muted mb-2">


                                📅

                                {" "}

                                {

                                certificate.event?.date

                                ?

                                new Date(

                                    certificate.event.date

                                ).toLocaleDateString()

                                :

                                "N/A"

                                }


                            </p>







                            <p>

                                <strong>

                                    Volunteer Hours:

                                </strong>

                                {" "}

                                {

                                certificate.hours || 0

                                }

                                hrs


                            </p>







                            <p>

                                <strong>

                                    Certificate No:

                                </strong>


                                <br/>


                                <small>

                                {
                                    certificate.certificateNumber
                                }

                                </small>


                            </p>









                            {/* QR AREA */}


                            <div

                            className="bg-light rounded p-3 mb-3"

                            >


                                <strong>

                                    🔗 Verification

                                </strong>



                                <br/>


                                <small className="text-muted">


                                Scan or open:


                                </small>



                                <br/>



                                <button

                                className="btn btn-outline-success btn-sm mt-2"

                                onClick={()=>


                                    copyVerificationLink(

                                        certificate.certificateNumber

                                    )


                                }

                                >

                                    Copy QR Verification Link


                                </button>



                            </div>









                            <div className="d-grid gap-2">



                                <button

                                className="btn btn-success"

                                onClick={()=>


                                    handleDownload(

                                        certificate._id

                                    )


                                }

                                >

                                    ⬇ Download Certificate


                                </button>









                                <button

                                className="btn btn-outline-primary"

                                onClick={()=>


                                    handlePrint(

                                        certificate._id

                                    )


                                }

                                >

                                    🖨 Print Certificate


                                </button>





                                <a

                                className="btn btn-outline-dark"

                                target="_blank"

                                rel="noreferrer"

                                href={

                                getVerificationLink(

                                    certificate.certificateNumber

                                )

                                }

                                >

                                    🔍 Verify Certificate


                                </a>




                            </div>





                        </div>






                    </div>



                </div>



            ))

            }



            </div>





        </div>


    );



};



export default Certificates;