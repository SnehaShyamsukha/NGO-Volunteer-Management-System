import {
    useEffect,
    useState
} from "react";


import {
    toast
} from "react-toastify";


import {
    getActivityLogs
} from "../../services/dashboardService.js";




const ActivityLogs = ()=>{


    const [
        logs,
        setLogs
    ] = useState([]);



    useEffect(()=>{


        const loadLogs = async()=>{


            try{


                const response =
                    await getActivityLogs();



                setLogs(
                    response.data
                );


            }
            catch(error){


                toast.error(
                    "Failed loading activity logs"
                );


            }


        };



        loadLogs();



    },[]);




    return(


        <div className="container">


            <h2 className="mb-4">

                Activity Logs

            </h2>




            <table className="table table-bordered">


                <thead className="table-dark">


                    <tr>


                        <th>
                            User
                        </th>


                        <th>
                            Action
                        </th>


                        <th>
                            Description
                        </th>


                        <th>
                            Date
                        </th>


                    </tr>


                </thead>




                <tbody>


                {

                    logs.map(
                        log=>(


                        <tr key={log._id}>


                            <td>

                                {
                                    log.user?.name ||
                                    "System"
                                }

                            </td>



                            <td>

                                {
                                    log.action
                                }

                            </td>



                            <td>

                                {
                                    log.description ||
                                    "-"
                                }

                            </td>



                            <td>

                                {
                                    new Date(
                                        log.createdAt
                                    )
                                    .toLocaleString()
                                }

                            </td>



                        </tr>


                        )
                    )

                }


                </tbody>



            </table>



        </div>


    );


};


export default ActivityLogs;