import {
    useEffect,
    useState
} from "react";


import {
    Card
} from "react-bootstrap";


import {
    toast
} from "react-toastify";


import api from "../../services/api.js";


import {
    registerEvent,
    getMyRegistrations
} from "../../services/registrationService.js";







const Events = ()=>{


    const [
        events,
        setEvents
    ] = useState([]);




    const [
        registrations,
        setRegistrations
    ] = useState([]);








    const loadData = async()=>{


        try{


            const eventResponse =

            await api.get(

                "/events"

            );




            const registrationResponse =

            await getMyRegistrations();





            setEvents(

                eventResponse.data.data || []

            );




            setRegistrations(

                registrationResponse.data || []

            );



        }


        catch(error){


            toast.error(

                "Failed loading events"

            );


        }


    };








    useEffect(()=>{


        loadData();


    },[]);









    const getStatus=(eventId)=>{


        const registration =

        registrations.find(

            item=>

            item.event?._id === eventId

        );



        return registration?.status || null;


    };









    const joinEvent = async(id)=>{


        try{


            await registerEvent(id);



            toast.success(

                "Registration submitted"

            );



            loadData();



        }


        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Registration failed"

            );


        }


    };









return(


<div className="container-fluid">






<h2 className="mb-4 fw-bold">

🌱 Available Volunteer Events

</h2>









<div className="row g-4">





{

events.length===0 ?



<div className="text-center mt-5">


<h4>

No events available

</h4>


</div>





:



events.map(event=>{



const status =

getStatus(event._id);






return(



<div

className="col-md-4"

key={event._id}

>





<Card


className="shadow border-0 h-100"


style={{


background:

"linear-gradient(135deg,#FADBD8,#D6EAF8)"


}}



>


<Card.Body>








<div className="d-flex justify-content-between mb-3">


<h4 className="fw-bold">


{event.title}


</h4>






<span

className="badge bg-dark"

>


{

event.category ||

"General"

}


</span>




</div>









<p>

{

event.description ||

"No description available"

}


</p>









<div className="mb-2">


<strong>

📍 Venue:

</strong>


{" "}

{

event.venue

}


</div>








<div className="mb-2">


<strong>

📅 Date:

</strong>


{" "}


{

new Date(

event.date

)

.toLocaleDateString()

}



</div>








<div className="mb-3">


<strong>

👥 Capacity:

</strong>


{" "}


{

event.maxVolunteers ||

"Unlimited"

}



</div>









{

status ?



<div>


{

status==="approved" ?



<span className="badge bg-success p-2">

Approved

</span>



:

status==="pending" ?



<span className="badge bg-warning text-dark p-2">

Pending Approval

</span>



:



<span className="badge bg-danger p-2">

Rejected

</span>



}



</div>





:



<button


className="btn btn-dark w-100"


onClick={()=>


joinEvent(

event._id

)


}


>


Register for Event


</button>




}







</Card.Body>


</Card>




</div>



);


})



}







</div>






</div>


);


};








export default Events;