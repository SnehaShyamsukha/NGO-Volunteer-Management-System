import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import {
    toast
} from "react-toastify";


import {
    createEvent
} from "../../services/eventService.js";





const CreateEvent = ()=>{


    const navigate = useNavigate();




    const [form,setForm] = useState({

        title:"",

        description:"",

        category:"",

        date:"",

        time:"",

        venue:"",

        maxVolunteers:"",

        registrationDeadline:"",

        status:"upcoming"

    });





    const [loading,setLoading] = useState(false);







    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:

            e.target.value

        });


    };








    const handleSubmit = async(e)=>{


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
            new Date(form.registrationDeadline) > new Date(form.date)
        ){

            toast.error(
                "Registration deadline cannot be after event date"
            );

            return;

        }







        try{


            setLoading(true);




            const eventData = {


                ...form,


                maxVolunteers:
                Number(form.maxVolunteers) || 0


            };





            await createEvent(eventData);




            toast.success(
                "Event created successfully"
            );




            navigate(
                "/admin/events"
            );



        }

        catch(error){



            toast.error(

                error.response?.data?.message ||

                "Failed creating event"

            );


        }


        finally{


            setLoading(false);


        }


    };









    return(


        <div className="container-fluid">



            <h2 className="mb-4">

                Create New Event

            </h2>







            <div className="card shadow p-4">



                <form onSubmit={handleSubmit}>


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


                                <option value="">

                                    Select Category

                                </option>


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









                        <div className="col-md-12">


                            <label className="form-label">

                                Description

                            </label>


                            <textarea


                                className="form-control"


                                rows="3"


                                name="description"


                                value={form.description}


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


                                min={
                                    new Date()
                                    .toISOString()
                                    .split("T")[0]
                                }


                                value={form.date}


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


                                value={form.time}


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


                                value={form.maxVolunteers}


                                onChange={handleChange}


                                min="1"


                            />


                        </div>









                        <div className="col-md-6">


                            <label className="form-label">

                                Registration Deadline

                            </label>


                            <input


                                type="date"


                                className="form-control"


                                name="registrationDeadline"


                                value={form.registrationDeadline}


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


                            className="btn btn-success me-3"


                            disabled={loading}


                        >


                            {

                            loading

                            ?

                            "Creating..."

                            :

                            "Create Event"

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





export default CreateEvent;