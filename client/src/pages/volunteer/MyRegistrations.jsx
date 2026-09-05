import {
    useEffect,
    useState
} from "react";


import {
    toast
} from "react-toastify";


import {
    getMyRegistrations
} from "../../services/registrationService.js";





const MyRegistrations = () => {


    const [
        registrations,
        setRegistrations
    ] = useState([]);




    const loadRegistrations = async()=>{


        try{


            const response =
                await getMyRegistrations();



            setRegistrations(
                response.data
            );


        }
        catch(error){


            toast.error(
                "Failed loading registrations"
            );


        }


    };





    useEffect(()=>{


        loadRegistrations();


    },[]);








    const statusBadge = (status)=>{


        if(status==="approved"){

            return "success";

        }


        if(status==="rejected"){

            return "danger";

        }


        return "warning";


    };






    return (

        <div className="container">


            <h2 className="mb-4">
                My Event Registrations
            </h2>




            {
                registrations.length===0 && (

                    <div className="alert alert-info">

                        No registrations found

                    </div>

                )
            }






            <div className="table-responsive">


                <table className="table table-bordered">


                    <thead className="table-dark">

                        <tr>

                            <th>
                                Event
                            </th>


                            <th>
                                Date
                            </th>


                            <th>
                                Venue
                            </th>


                            <th>
                                Status
                            </th>


                        </tr>

                    </thead>





                    <tbody>


                        {
                            registrations.map(
                                item=>(

                                    <tr
                                        key={
                                            item._id
                                        }
                                    >


                                        <td>

                                            {
                                                item.event?.title
                                            }

                                        </td>



                                        <td>

                                            {
                                                item.event?.date
                                                ?
                                                new Date(
                                                    item.event.date
                                                ).toLocaleDateString()
                                                :
                                                "N/A"
                                            }

                                        </td>




                                        <td>

                                            {
                                                item.event?.venue ||
                                                "N/A"
                                            }

                                        </td>




                                        <td>


                                            <span

                                                className={
                                                    `badge bg-${statusBadge(item.status)}`
                                                }

                                            >

                                                {
                                                    item.status
                                                }

                                            </span>


                                        </td>


                                    </tr>

                                )
                            )
                        }


                    </tbody>


                </table>


            </div>


        </div>

    );

};



export default MyRegistrations;