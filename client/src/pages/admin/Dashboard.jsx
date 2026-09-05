import {
    useEffect,
    useState
} from "react";


import {
    toast
} from "react-toastify";


import api from "../../services/api.js";



const AdminDashboard = () => {


    const [
        stats,
        setStats
    ] = useState({});





    const loadDashboard = async()=>{


        try{


            const response =

            await api.get(
                "/dashboard/admin"
            );



            setStats(

                response.data.data

            );



        }

        catch(error){


            console.log(error);


            toast.error(
                "Failed to load dashboard"
            );


        }


    };






    useEffect(()=>{


        loadDashboard();


    },[]);








    const cards = [


        {

            title:"Total Volunteers",

            value:stats.volunteers || 0

        },


        {

            title:"Total Events",

            value:stats.events || 0

        },


        {

            title:"Attendance",

            value:stats.attendance || 0

        },


        {

            title:"Registrations",

            value:stats.registrations || 0

        },


        {

            title:"Certificates",

            value:stats.certificates || 0

        },


        {

            title:"Active Volunteers",

            value:stats.volunteers || 0

        }


    ];








    return (


        <div className="container">


            <h2 className="mb-4">

                Admin Dashboard

            </h2>





            <div className="row">


            {

                cards.map(

                    (item,index)=>(


                    <div

                    className="col-md-4 mb-3"

                    key={index}

                    >



                        <div

                        className="card shadow"

                        >



                            <div

                            className="card-body"

                            >


                                <h5>

                                    {item.title}

                                </h5>



                                <h2>

                                    {item.value}

                                </h2>



                            </div>


                        </div>



                    </div>


                    )

                )

            }



            </div>



        </div>


    );

};



export default AdminDashboard;