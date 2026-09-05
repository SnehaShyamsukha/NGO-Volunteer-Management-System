import {
    useEffect,
    useState
} from "react";


import {
    useParams,
    useNavigate
} from "react-router-dom";


import {
    toast
} from "react-toastify";


import {
    getEventById,
    updateEvent
} from "../../services/eventService.js";





const EditEvent = ()=>{


    const {
        id
    } = useParams();



    const navigate = useNavigate();




    const [form,setForm] = useState(null);



    const [loading,setLoading] = useState(false);







    useEffect(()=>{


        const loadEvent = async()=>{


            try{


                const response =
                    await getEventById(id);



                setForm(
                    response.data
                );


            }

            catch(error){


                toast.error(
                    "Failed to load event"
                );


                navigate(
                    "/admin/events"
                );


            }


        };



        loadEvent();



    },[id,navigate]);










    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:

            e.target.value

        });


    };









    const submit = async(e)=>{


        e.preventDefault();




        if(
            !form.title ||
            !form.date ||
            !form.venue
        ){

            toast.error(
                "Title, date and venue are required"
            );

            return;

        }







        if(
            form.registrationDeadline &&
            new Date(form.registrationDeadline)
            >
            new Date(form.date)
        ){

            toast.error(
                "Registration deadline cannot be after event date"
            );

            return;

        }







        try{


            setLoading(true);



            const updatedData={


                ...form,


                maxVolunteers:
                Number(form.maxVolunteers) || 0


            };





            await updateEvent(

                id,

                updatedData

            );





            toast.success(
                "Event updated successfully"
            );




            navigate(
                "/admin/events"
            );



        }

        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Update failed"

            );


        }

        finally{


            setLoading(false);


        }


    };









    if(!form){


        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary"></div>

                <p>
                    Loading event...
                </p>

            </div>

        );

    }









    return(


        <div className="container-fluid">


            <h2 className="mb-4">

                Edit Event

            </h2>





            <div className="card shadow p-4">



                <form onSubmit={submit}>


                    <div className="row g-3">





                        <div className="col-md-6">

                            <label className="form-label">
                                Event Title
                            </label>


                            <input

                                className="form-control"

                                name="title"

                                value={form.title}

                                onChange={handleChange}

                                required

                            />


                        </div>







                        <div className="col-md-6">

                            <label className="form-label">
                                Category
                            </label>


                            <select

                                className="form-select"

                                name="category"

                                value={form.category}

                                onChange={handleChange}

                            >

                                <option value="Education">
                                    Education
                                </option>

                                <option value="Health">
                                    Health
                                </option>

                                <option value="Environment">
                                    Environment
                                </option>

                                <option value="Donation">
                                    Donation
                                </option>

                                <option value="Other">
                                    Other
                                </option>


                            </select>


                        </div>









                        <div className="col-12">


                            <label className="form-label">
                                Description
                            </label>


                            <textarea

                                className="form-control"

                                rows="3"

                                name="description"

                                value={form.description || ""}

                                onChange={handleChange}

                            />


                        </div>









                        <div className="col-md-4">


                            <label className="form-label">
                                Date
                            </label>


                            <input

                                type="date"

                                className="form-control"

                                name="date"

                                value={
                                    form.date
                                    ?
                                    form.date.substring(0,10)
                                    :
                                    ""
                                }

                                onChange={handleChange}

                                required

                            />


                        </div>









                        <div className="col-md-4">


                            <label className="form-label">
                                Time
                            </label>


                            <input

                                type="time"

                                className="form-control"

                                name="time"

                                value={form.time || ""}

                                onChange={handleChange}

                            />


                        </div>









                        <div className="col-md-4">


                            <label className="form-label">
                                Venue
                            </label>


                            <input

                                className="form-control"

                                name="venue"

                                value={form.venue}

                                onChange={handleChange}

                                required

                            />


                        </div>









                        <div className="col-md-6">


                            <label className="form-label">
                                Maximum Volunteers
                            </label>


                            <input

                                type="number"

                                className="form-control"

                                name="maxVolunteers"

                                value={form.maxVolunteers || ""}

                                onChange={handleChange}

                            />


                        </div>









                        <div className="col-md-6">


                            <label className="form-label">
                                Status
                            </label>


                            <select

                                className="form-select"

                                name="status"

                                value={form.status}

                                onChange={handleChange}

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


                        </div>






                    </div>







                    <div className="mt-4">


                        <button

                            className="btn btn-primary me-3"

                            disabled={loading}

                        >

                            {
                                loading
                                ?
                                "Updating..."
                                :
                                "Update Event"
                            }


                        </button>





                        <button

                            type="button"

                            className="btn btn-secondary"

                            onClick={()=>navigate("/admin/events")}

                        >

                            Cancel

                        </button>


                    </div>






                </form>



            </div>


        </div>


    );


};





export default EditEvent;