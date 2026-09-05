import {
    useEffect,
    useState
} from "react";


import {
    toast
} from "react-toastify";


import {
    getPendingCertificates,
    generateCertificate
} from "../../services/certificateService.js";





const Certificates = () => {



    const [
        certificates,
        setCertificates
    ] = useState([]);



    const [
        search,
        setSearch
    ] = useState("");







    const loadCertificates = async()=>{


        try{


            const response =
                await getPendingCertificates();



            setCertificates(

                response.data || []

            );



        }

        catch(error){


            console.log(error);


            toast.error(
                "Failed to load certificate list"
            );


        }


    };







    useEffect(()=>{


        loadCertificates();


    },[]);








    const handleGenerate = async(item)=>{


        try{


            await generateCertificate({


                volunteer:
                item.volunteer._id,



                event:
                item.event._id,



                hours:
                item.hours || 0



            });





            toast.success(

                "Certificate generated successfully"

            );





            loadCertificates();



        }

        catch(error){



            console.log(error);



            toast.error(

                error.response?.data?.message ||

                "Certificate generation failed"

            );



        }


    };








    const filteredCertificates =

    certificates.filter(item=>{


        const volunteer =

        item.volunteer?.name
        ?.toLowerCase() || "";



        const event =

        item.event?.title
        ?.toLowerCase() || "";



        return (

            volunteer.includes(
                search.toLowerCase()
            )

            ||

            event.includes(
                search.toLowerCase()
            )

        );


    });










    return(



        <div className="container-fluid">



            <h2 className="mb-4">

                Certificate Management

            </h2>






            <div className="card shadow p-3 mb-4">



                <input

                    type="text"

                    className="form-control"

                    placeholder="Search volunteer or event..."

                    value={search}

                    onChange={
                        e =>
                        setSearch(
                            e.target.value
                        )
                    }

                />



            </div>







            <div className="card shadow">



                <div className="card-body">





                <table className="table table-bordered table-hover">



                    <thead className="table-dark">



                        <tr>


                            <th>
                                Volunteer
                            </th>



                            <th>
                                Event
                            </th>



                            <th>
                                Attendance Date
                            </th>



                            <th>
                                Hours
                            </th>



                            <th>
                                Status
                            </th>



                            <th>
                                Action
                            </th>



                        </tr>



                    </thead>







                    <tbody>



                    {


                    filteredCertificates.length === 0 ?



                    (

                        <tr>


                            <td

                            colSpan="6"

                            className="text-center"

                            >


                                No pending certificates



                            </td>


                        </tr>


                    )



                    :





                    filteredCertificates.map(item=>(




                        <tr

                        key={
                            item._id
                        }

                        >




                            <td>


                                {
                                    item.volunteer?.name ||

                                    "Unknown"
                                }


                                <br/>


                                <small>

                                {
                                    item.volunteer?.email

                                }

                                </small>



                            </td>







                            <td>


                                {
                                    item.event?.title ||

                                    "Unknown"
                                }



                                <br/>


                                <small>

                                {
                                    item.event?.venue

                                }

                                </small>



                            </td>







                            <td>


                                {

                                item.event?.date

                                ?

                                new Date(
                                    item.event.date
                                )
                                .toLocaleDateString()

                                :

                                "N/A"


                                }


                            </td>







                            <td>


                                {
                                    item.hours || 0
                                }


                            </td>







                            <td>


                                <span

                                className="badge bg-warning"

                                >

                                    Pending


                                </span>



                            </td>








                            <td>



                                <button


                                className="btn btn-success btn-sm"



                                onClick={

                                    ()=>handleGenerate(item)

                                }



                                >


                                    Generate Certificate



                                </button>



                            </td>







                        </tr>




                    ))



                    }





                    </tbody>




                </table>




                </div>



            </div>





        </div>



    );



};






export default Certificates;