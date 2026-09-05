import {
    useEffect,
    useState
} from "react";


import {
    Link
} from "react-router-dom";


import {
    toast
} from "react-toastify";


import {

    getVolunteers,

    changeVolunteerStatus,

    deleteVolunteer,

    exportVolunteerPDF

} from "../../services/volunteerService.js";





const Volunteers = ()=>{


    const [
        volunteers,
        setVolunteers
    ] = useState([]);



    const [
        search,
        setSearch
    ] = useState("");



    const [
        status,
        setStatus
    ] = useState("");



    const [
        page,
        setPage
    ] = useState(1);



    const [
        pagination,
        setPagination
    ] = useState({

        page:1,

        totalPages:1

    });



    const [
        loading,
        setLoading
    ] = useState(true);






    const loadVolunteers = async()=>{


        try{


            const response =

            await getVolunteers({

                page,

                limit:10,

                search,

                status

            });




            setVolunteers(

                response.volunteers || []

            );




            setPagination(

                response.pagination || {

                    page:1,

                    totalPages:1

                }

            );



        }


        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Failed loading volunteers"

            );


            setVolunteers([]);


        }


        finally{


            setLoading(false);


        }


    };









    useEffect(()=>{


        loadVolunteers();


    },[

        page,

        search,

        status

    ]);









    const toggleStatus = async(id)=>{


        try{


            await changeVolunteerStatus(id);



            toast.success(

                "Status updated"

            );



            loadVolunteers();



        }


        catch(error){


            toast.error(

                "Unable to update status"

            );


        }


    };









    const removeVolunteer = async(id)=>{


        const confirm =

        window.confirm(

            "Delete this volunteer?"

        );



        if(!confirm)

            return;







        try{


            await deleteVolunteer(id);



            toast.success(

                "Volunteer deleted"

            );



            loadVolunteers();



        }


        catch(error){


            toast.error(

                "Delete failed"

            );


        }


    };









    const downloadPDF = async()=>{


        try{


            const response =

            await exportVolunteerPDF();




            const url =

            window.URL.createObjectURL(

                response.data

            );




            const link =

            document.createElement(

                "a"

            );



            link.href=url;



            link.download=

            "volunteers.pdf";



            link.click();



            window.URL.revokeObjectURL(url);



        }


        catch(error){


            toast.error(

                "PDF export failed"

            );


        }


    };









    if(loading){


        return(

            <div className="text-center mt-5">

                Loading volunteers...

            </div>

        );


    }









    return(


        <div className="container-fluid">



            <div className="d-flex justify-content-between align-items-center mb-4">


                <h2>

                    Volunteer Management

                </h2>



                <button

                className="btn btn-success"

                onClick={downloadPDF}

                >

                    Export PDF

                </button>



            </div>









            <div className="card shadow p-3 mb-4">


                <div className="row g-3">


                    <div className="col-md-8">


                        <input

                        className="form-control"

                        placeholder="Search name, email or phone"

                        value={search}

                        onChange={

                            e=>{

                                setPage(1);

                                setSearch(

                                    e.target.value

                                );

                            }

                        }

                        />


                    </div>






                    <div className="col-md-4">


                        <select

                        className="form-select"

                        value={status}

                        onChange={

                            e=>{

                                setPage(1);

                                setStatus(

                                    e.target.value

                                );

                            }

                        }

                        >


                            <option value="">

                                All Status

                            </option>



                            <option value="active">

                                Active

                            </option>



                            <option value="inactive">

                                Inactive

                            </option>



                        </select>


                    </div>



                </div>


            </div>









            <div className="card shadow">


                <div className="table-responsive">


                    <table className="table table-hover">


                        <thead className="table-dark">


                            <tr>


                                <th>
                                    Name
                                </th>


                                <th>
                                    Email
                                </th>


                                <th>
                                    Phone
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

                        (volunteers || []).length===0


                        ?


                        <tr>


                            <td

                            colSpan="5"

                            className="text-center"

                            >

                                No volunteers found


                            </td>


                        </tr>


                        :



                        (volunteers || []).map(

                            volunteer=>(


                            <tr

                            key={volunteer._id}

                            >



                                <td>

                                    {volunteer.name}

                                </td>



                                <td>

                                    {volunteer.email}

                                </td>



                                <td>

                                    {

                                    volunteer.phone ||

                                    "-"

                                    }

                                </td>




                                <td>


                                    <span

                                    className={

                                    volunteer.status==="active"

                                    ?

                                    "badge bg-success"

                                    :

                                    "badge bg-secondary"

                                    }

                                    >

                                        {

                                        volunteer.status

                                        }

                                    </span>


                                </td>






                                <td>



                                    <Link

                                    to={

                                    `/admin/volunteers/${volunteer._id}`

                                    }

                                    className="btn btn-sm btn-primary me-2"

                                    >

                                        View

                                    </Link>







                                    <button

                                    className="btn btn-sm btn-warning me-2"

                                    onClick={

                                    ()=>toggleStatus(

                                        volunteer._id

                                    )

                                    }

                                    >

                                        {

                                        volunteer.status==="active"

                                        ?

                                        "Deactivate"

                                        :

                                        "Activate"

                                        }


                                    </button>








                                    <button

                                    className="btn btn-sm btn-danger"

                                    onClick={

                                    ()=>removeVolunteer(

                                        volunteer._id

                                    )

                                    }

                                    >

                                        Delete

                                    </button>



                                </td>



                            </tr>


                            )

                        )


                        }



                        </tbody>



                    </table>



                </div>


            </div>









            <div className="d-flex justify-content-center mt-4 gap-3">



                <button

                className="btn btn-secondary"

                disabled={page===1}

                onClick={

                    ()=>setPage(

                        page-1

                    )

                }

                >

                    Previous

                </button>







                <span className="mt-2">


                    Page {pagination.page || 1}

                    {" "}

                    of

                    {" "}

                    {pagination.totalPages || 1}


                </span>







                <button

                className="btn btn-secondary"

                disabled={

                    page >=

                    (pagination.totalPages || 1)

                }

                onClick={

                    ()=>setPage(

                        page+1

                    )

                }

                >

                    Next

                </button>




            </div>





        </div>


    );


};





export default Volunteers;