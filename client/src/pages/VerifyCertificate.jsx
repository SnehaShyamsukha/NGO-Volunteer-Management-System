import {
    useEffect,
    useState
} from "react";


import {
    useParams
} from "react-router-dom";


import {
    toast
} from "react-toastify";


import api from "../services/api.js";





const VerifyCertificate = () => {


    const {
        certificateNumber
    } = useParams();




    const [
        certificate,
        setCertificate
    ] = useState(null);




    const [
        loading,
        setLoading
    ] = useState(true);









    // ==================================
    // VERIFY CERTIFICATE
    // ==================================


    const verifyCertificate = async()=>{


        try{


            setLoading(true);



            const response =

            await api.get(

                `/certificates/verify/${certificateNumber}`

            );



            setCertificate(

                response.data.data

            );



        }
        catch(error){


            console.log(error);


            setCertificate(null);


        }
        finally{


            setLoading(false);


        }


    };









    useEffect(()=>{


        verifyCertificate();


    },[certificateNumber]);











    // ==================================
    // DOWNLOAD
    // ==================================


    const handleDownload = ()=>{


        const url =

        `${import.meta.env.VITE_API_URL}/certificates/download/${certificate._id}`;



        window.open(

            url,

            "_blank"

        );


    };









    // ==================================
    // PRINT
    // ==================================


    const handlePrint = ()=>{


        window.print();


    };









    return (


        <div

        className="container py-5"

        >






        {

        loading &&


        <div className="text-center py-5">


            <div

            className="spinner-border text-success"

            >

            </div>



            <p className="mt-3">

                Verifying certificate...

            </p>



        </div>

        }









        {

        !loading && !certificate &&



        <div

        className="card shadow border-0 p-5 text-center"

        style={{

            borderRadius:"20px"

        }}

        >


            <div

            style={{

                fontSize:"70px"

            }}

            >

                ❌

            </div>



            <h2 className="text-danger mt-3">

                Invalid Certificate

            </h2>



            <p className="text-muted">

                The certificate number is invalid or
                does not exist in our verification system.

            </p>



        </div>


        }









        {

        !loading && certificate &&



        <div

        className="card shadow border-0"

        style={{

            borderRadius:"25px",

            overflow:"hidden"

        }}

        >







            {/* HEADER */}



            <div

            className="text-center text-white p-5"

            style={{

                background:
                "linear-gradient(135deg,#198754,#0d6efd)"

            }}

            >



                <div

                style={{

                    fontSize:"70px"

                }}

                >

                    🏆

                </div>




                <h1 className="fw-bold">

                    Certificate Verified

                </h1>




                <span

                className="badge bg-light text-success fs-6 px-4 py-2"

                >

                    ✓ VALID CERTIFICATE

                </span>



            </div>









            <div className="card-body p-5">







                <div className="text-center mb-5">


                    <h3 className="fw-bold">

                        SITA DEVI TOSHNIWAL

                    </h3>


                    <h5 className="text-success">

                        CHARITABLE TRUST

                    </h5>



                    <p className="text-muted">

                        Volunteer Service Recognition Certificate

                    </p>


                </div>









                <div className="row g-4">







                    <div className="col-md-6">



                        <div

                        className="p-4 bg-light rounded"

                        >



                            <h5 className="fw-bold mb-3">

                                👤 Volunteer Details

                            </h5>




                            <p>

                                <strong>

                                Name:

                                </strong>

                                {" "}

                                {
                                    certificate.volunteer?.name
                                }

                            </p>





                            <p>

                                <strong>

                                Email:

                                </strong>

                                {" "}

                                {
                                    certificate.volunteer?.email
                                }

                            </p>



                        </div>


                    </div>









                    <div className="col-md-6">



                        <div

                        className="p-4 bg-light rounded"

                        >



                            <h5 className="fw-bold mb-3">

                                🎯 Event Details

                            </h5>




                            <p>

                                <strong>

                                Event:

                                </strong>


                                {" "}

                                {
                                    certificate.event?.title
                                }


                            </p>





                            <p>

                                <strong>

                                Venue:

                                </strong>


                                {" "}

                                {
                                    certificate.event?.venue ||
                                    "-"
                                }


                            </p>






                            <p>

                                <strong>

                                Hours:

                                </strong>


                                {" "}

                                {

                                certificate.hours || 0

                                }

                                hrs


                            </p>




                        </div>


                    </div>







                </div>









                {/* CERTIFICATE INFORMATION */}



                <div

                className="mt-4 p-4 border rounded"

                >



                    <h5 className="fw-bold">

                        📜 Certificate Information

                    </h5>




                    <p>

                        <strong>

                        Certificate Number:

                        </strong>


                        <br/>


                        {
                            certificate.certificateNumber
                        }


                    </p>





                    <p>

                        <strong>

                        Issued Date:

                        </strong>


                        {" "}


                        {

                        new Date(

                            certificate.issuedDate

                        )

                        .toLocaleDateString()

                        }


                    </p>





                    <p>

                        <strong>

                        Verification Code:

                        </strong>


                        {" "}

                        {

                        certificate.verificationCode

                        }


                    </p>




                </div>









                {/* QR */}



                <div

                className="text-center mt-5"

                >



                    <h5 className="fw-bold">

                        🔗 QR Verification

                    </h5>




                    <div

                    className="border rounded p-4 d-inline-block"

                    >

                        <div

                        style={{

                            fontSize:"80px"

                        }}

                        >

                            ▣

                        </div>



                        <small className="text-muted">

                            Scan to verify certificate

                        </small>


                    </div>



                </div>









                {/* ACTION BUTTONS */}



                <div

                className="d-flex justify-content-center gap-3 mt-5 flex-wrap"

                >



                    <button

                    className="btn btn-success px-4"

                    onClick={handleDownload}

                    >

                        ⬇ Download Certificate

                    </button>





                    <button

                    className="btn btn-outline-primary px-4"

                    onClick={handlePrint}

                    >

                        🖨 Print Certificate

                    </button>




                </div>








            </div>





        </div>


        }



        </div>


    );



};


export default VerifyCertificate;