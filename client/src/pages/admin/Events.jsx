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
    getEvents,
    deleteEvent,
    updateEventStatus
} from "../../services/eventService.js";





const Events = ()=>{


    const [events,setEvents] = useState([]);

    const [loading,setLoading] = useState(true);


    const [search,setSearch] = useState("");

    const [category,setCategory] = useState("All");

    const [status,setStatus] = useState("All");





    const fetchEvents = async()=>{


        try{


            setLoading(true);


            const response =
                await getEvents();


            setEvents(
                response.data || []
            );


        }

        catch(error){


            toast.error(
                "Failed to load events"
            );


        }

        finally{


            setLoading(false);


        }


    };







    useEffect(()=>{


        fetchEvents();


    },[]);










    const handleDelete = async(id)=>{


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this event?"
            );



        if(!confirmDelete)
            return;



        try{


            await deleteEvent(id);



            toast.success(
                "Event deleted successfully"
            );



            fetchEvents();


        }

        catch(error){


            toast.error(
                "Delete failed"
            );


        }


    };









    const handleStatusChange = async(

        id,

        newStatus

    )=>{


        try{


            await updateEventStatus(

                id,

                {
                    status:newStatus
                }

            );



            toast.success(
                "Status updated"
            );


            fetchEvents();



        }

        catch(error){


            toast.error(
                "Status update failed"
            );


        }


    };









    const filteredEvents =

        events.filter(event=>{


            const searchMatch =

                event.title
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )

                ||

                event.venue
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                );



            const categoryMatch =

                category==="All"

                ||

                event.category===category;




            const statusMatch =

                status==="All"

                ||

                event.status===status;



            return (

                searchMatch &&

                categoryMatch &&

                statusMatch

            );


        });









    const statusStyle=(status)=>{


        const styles={


            upcoming:
            "badge bg-primary-subtle text-primary-emphasis",


            ongoing:
            "badge bg-warning-subtle text-warning-emphasis",


            completed:
            "badge bg-success-subtle text-success-emphasis",


            closed:
            "badge bg-danger-subtle text-danger-emphasis"


        };


        return (

            styles[status]

            ||

            "badge bg-secondary"

        );


    };









    return(


        <div className="container-fluid">



            <div className="d-flex justify-content-between align-items-center mb-4">


                <h2>

                    Event Management

                </h2>



                <Link

                    to="/admin/events/create"

                    className="btn btn-success"

                >

                    + Create Event

                </Link>


            </div>








            <div className="card shadow p-3 mb-4">


                <div className="row g-3">



                    <div className="col-md-5">


                        <input

                            className="form-control"

                            placeholder="Search title or venue..."

                            value={search}

                            onChange={
                                e=>setSearch(
                                    e.target.value
                                )
                            }

                        />


                    </div>





                    <div className="col-md-3">


                        <select

                            className="form-select"

                            value={category}

                            onChange={
                                e=>setCategory(
                                    e.target.value
                                )
                            }

                        >


                            <option>
                                All
                            </option>


                            <option>
                                Education
                            </option>


                            <option>
                                Health
                            </option>


                            <option>
                                Environment
                            </option>


                            <option>
                                Donation
                            </option>


                            <option>
                                Other
                            </option>


                        </select>


                    </div>







                    <div className="col-md-3">


                        <select

                            className="form-select"

                            value={status}

                            onChange={
                                e=>setStatus(
                                    e.target.value
                                )
                            }

                        >


                            <option>
                                All
                            </option>


                            <option>
                                upcoming
                            </option>


                            <option>
                                ongoing
                            </option>


                            <option>
                                completed
                            </option>


                            <option>
                                closed
                            </option>


                        </select>


                    </div>




                </div>


            </div>









            <div className="card shadow">


                {
                    loading ?

                    (

                        <div className="text-center p-5">


                            <div className="spinner-border text-success"/>


                            <p className="mt-3">

                                Loading events...

                            </p>


                        </div>

                    )


                    :

                    filteredEvents.length===0

                    ?

                    (

                        <div className="text-center p-5">


                            <h5>

                                No events found

                            </h5>


                            <p className="text-muted">

                                Create a new event to get started.

                            </p>


                        </div>

                    )


                    :

                    (

                    <div className="table-responsive">


                    <table className="table table-hover align-middle">


                        <thead className="table-dark">


                            <tr>


                                <th>
                                    Title
                                </th>


                                <th>
                                    Category
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


                                <th>
                                    Actions
                                </th>


                            </tr>


                        </thead>





                        <tbody>


                        {

                        filteredEvents.map(event=>(


                            <tr key={event._id}>


                                <td>

                                    <strong>

                                        {event.title}

                                    </strong>

                                </td>




                                <td>

                                    <span className="badge bg-info-subtle text-info-emphasis">

                                        {
                                            event.category || "Other"
                                        }

                                    </span>

                                </td>




                                <td>

                                    {
                                        new Date(
                                            event.date
                                        )
                                        .toLocaleDateString()
                                    }

                                </td>




                                <td>

                                    {
                                        event.venue
                                    }

                                </td>




                                <td>


                                    <select

                                        className="form-select form-select-sm"

                                        value={
                                            event.status
                                        }

                                        onChange={
                                            e=>
                                            handleStatusChange(

                                                event._id,

                                                e.target.value

                                            )
                                        }

                                    >


                                        <option value="upcoming">
                                            Upcoming
                                        </option>


                                        <option value="ongoing">
                                            Ongoing
                                        </option>


                                        <option value="completed">
                                            Completed
                                        </option>


                                        <option value="closed">
                                            Closed
                                        </option>


                                    </select>


                                    <span

                                    className={
                                        statusStyle(
                                            event.status
                                        )
                                    }

                                    >

                                        {
                                            event.status
                                        }

                                    </span>


                                </td>





                                <td>


                                    <Link

                                        to={
                                            `/admin/events/edit/${event._id}`
                                        }

                                        className="btn btn-sm btn-warning me-2"

                                    >

                                        Edit

                                    </Link>





                                    <button

                                        className="btn btn-sm btn-danger"

                                        onClick={
                                            ()=>handleDelete(
                                                event._id
                                            )
                                        }

                                    >

                                        Delete

                                    </button>


                                </td>



                            </tr>


                        ))

                        }


                        </tbody>


                    </table>


                    </div>

                    )


                }



            </div>



        </div>


    );


};



export default Events;