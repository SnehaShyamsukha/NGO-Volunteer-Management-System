import {
    useEffect,
    useState
} from "react";


import {
    toast
} from "react-toastify";


import {
    generateAttendanceCode
} from "../../services/attendanceService.js";


import {
    getEvents
} from "../../services/eventService.js";





const Attendance = ()=>{


    const [
        events,
        setEvents
    ] = useState([]);



    const [
        eventId,
        setEventId
    ] = useState("");



    const [
        code,
        setCode
    ] = useState("");








    const loadEvents = async()=>{


        try{


            const response =
                await getEvents();



            setEvents(

                response.data

            );


        }

        catch(error){


            toast.error(
                "Failed loading events"
            );


        }


    };








    useEffect(()=>{


        loadEvents();


    },[]);









    const handleGenerate = async()=>{


        if(!eventId){


            toast.error(
                "Select an event first"
            );


            return;


        }






        try{


            const response =

            await generateAttendanceCode(

                eventId

            );




            setCode(

                response.code

            );



            toast.success(

                "Attendance code generated"

            );


        }


        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Failed generating code"

            );


        }


    };









    return(


        <div className="container">


            <h2 className="mb-4">

                Attendance Code Generator

            </h2>





            <div className="card shadow p-4"

            style={{
                maxWidth:"500px"
            }}

            >



                <select

                className="form-select mb-3"

                value={eventId}

                onChange={

                    e=>setEventId(

                        e.target.value

                    )

                }

                >


                    <option value="">

                        -- Select Event --

                    </option>



                    {

                    events.map(event=>(


                        <option

                        key={event._id}

                        value={event._id}

                        >

                            {event.title}


                        </option>


                    ))

                    }



                </select>







                <button

                className="btn btn-primary"

                onClick={handleGenerate}

                >

                    Generate Attendance Code


                </button>







                {

                code &&


                <div className="text-center mt-4">


                    <h5>

                    Share this code with volunteers

                    </h5>



                    <h1 className="fw-bold">

                        {code}

                    </h1>


                </div>


                }



            </div>



        </div>


    );


};


export default Attendance;