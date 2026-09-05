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
    Line,
    Doughnut,
    Bar
} from "react-chartjs-2";


import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    PointElement,

    LineElement,

    BarElement,

    ArcElement,

    Tooltip,

    Legend

} from "chart.js";


import api from "../../services/api.js";





ChartJS.register(

    CategoryScale,

    LinearScale,

    PointElement,

    LineElement,

    BarElement,

    ArcElement,

    Tooltip,

    Legend

);







const VolunteerDashboard = ()=>{





const [data,setData] = useState({

    hours:0,

    events:0,

    certificates:0,

    attendance:0,

    profileCompletion:0,

    certificatesList:[],

    upcomingEvents:[],

    recentActivities:[],

    volunteerName:"Volunteer"

});





const [loading,setLoading] = useState(true);









// =================================
// LOAD DASHBOARD DATA
// =================================


const loadDashboard = async()=>{


    try{


        setLoading(true);



        const response = await api.get(

            "/dashboard/volunteer"

        );



        const dashboard = response.data.data;





        setData({


            hours:

            Number(

                dashboard.hours ||

                dashboard.volunteerHours ||

                0

            ).toFixed(2),



            events:

            dashboard.events ||

            dashboard.registrations ||

            0,



            certificates:

            dashboard.certificates ||

            0,



            attendance:

            dashboard.attendance ||

            0,



            profileCompletion:

            dashboard.profileCompletion ||

            0,



            certificatesList:

            dashboard.certificatesList ||

            [],



            upcomingEvents:

            dashboard.upcomingEvents ||

            [],



            recentActivities:

            dashboard.recentActivities ||

            [],



            volunteerName:

            dashboard.user?.name ||

            "Volunteer"


        });



    }


    catch(error){


        console.log(error);


        toast.error(

            "Failed to load dashboard"

        );


    }


    finally{


        setLoading(false);


    }


};









useEffect(()=>{


    loadDashboard();


},[]);









// =================================
// BADGE SYSTEM
// =================================


const getBadge = ()=>{


    const hours = Number(data.hours);



    if(hours >= 100)

        return {

            title:"Gold Volunteer",

            icon:"🥇"

        };





    if(hours >= 50)

        return {

            title:"Silver Volunteer",

            icon:"🥈"

        };





    if(hours >= 20)

        return {

            title:"Bronze Volunteer",

            icon:"🥉"

        };





    return {

        title:"New Volunteer",

        icon:"🌱"

    };


};







const badge = getBadge();









// =================================
// PROFILE COMPLETION CHART
// =================================


const profileChart = {


    labels:[

        "Completed",

        "Remaining"

    ],


    datasets:[{


        data:[

            data.profileCompletion,

            100 - data.profileCompletion

        ],



        backgroundColor:[

            "#198754",

            "#e9ecef"

        ],



        borderWidth:0


    }]


};









// =================================
// HOURS ACTIVITY CHART
// =================================


const activityChart = {


    labels:[

        "Jan",

        "Feb",

        "Mar",

        "Apr",

        "May",

        "Jun"

    ],



    datasets:[{


        label:"Volunteer Hours",



        data:[

            0,

            0,

            0,

            0,

            0,

            Number(data.hours)

        ],



        tension:0.4,

        fill:true,


        borderColor:"#198754",


        backgroundColor:

        "rgba(25,135,84,0.15)"


    }]


};









// =================================
// EVENT PARTICIPATION CHART
// =================================


const eventChart = {


    labels:[

        "Events"

    ],



    datasets:[{


        label:"Participated",



        data:[

            data.events

        ],



        backgroundColor:[

            "#20c997"

        ]


    }]


};









if(loading){


    return(

        <div className="text-center py-5">


            <div

            className="spinner-border text-success"

            />


            <p className="mt-3">

                Loading dashboard...

            </p>


        </div>

    );


}

return(


<div className="container-fluid">





{/* ===============================
    HEADER
================================ */}


<div

className="card shadow border-0 p-4 mb-4 text-white"

style={{

borderRadius:"22px",

background:

"linear-gradient(135deg,#198754,#20c997)"

}}

>


<h2 className="fw-bold">

Hello {data.volunteerName} 👋

</h2>


<p>

Thank you for your valuable contribution towards community service.

</p>


</div>









{/* ===============================
    PROFILE + BADGE SECTION
================================ */}



<div className="row g-4 mb-4">





<div className="col-lg-8">



<div

className="card shadow border-0 p-4 h-100"

style={{

borderRadius:"22px"

}}

>


<div className="d-flex justify-content-between">


<div>


<h5 className="fw-bold">

Volunteer Level

</h5>


<h2>

{badge.icon}

{badge.title}

</h2>


<p className="text-muted">

Keep contributing to unlock higher levels.

</p>


</div>




<div className="text-center">


<h6 className="text-muted">

Profile Completion

</h6>


<h2 className="fw-bold text-success">

{data.profileCompletion}%

</h2>


</div>



</div>








<div className="progress mt-3"

style={{

height:"12px"

}}

>


<div

className="progress-bar bg-success"

style={{

width:`${data.profileCompletion}%`

}}


/>


</div>



</div>



</div>









<div className="col-lg-4">



<div

className="card shadow border-0 p-4 text-center h-100"

style={{

borderRadius:"22px"

}}

>


<Doughnut

data={profileChart}

/>



<h6 className="mt-3 fw-bold">

Profile Status

</h6>



</div>



</div>




</div>









{/* ===============================
    CONTRIBUTION SUMMARY
================================ */}



<div className="row g-4 mb-4">



<div className="col-md-4">


<div

className="card shadow border-0 p-4 text-center"

style={{

borderRadius:"20px"

}}

>


<h6 className="text-muted">

⏱ Total Hours

</h6>



<h2 className="fw-bold text-success">

{Number(data.hours).toFixed(2)}

</h2>



<p className="mb-0">

Volunteer Hours

</p>



</div>


</div>









<div className="col-md-4">


<div

className="card shadow border-0 p-4 text-center"

style={{

borderRadius:"20px"

}}

>


<h6 className="text-muted">

📅 Events Participated

</h6>



<h2 className="fw-bold text-primary">

{data.events}

</h2>



<p className="mb-0">

Completed Events

</p>



</div>


</div>









<div className="col-md-4">


<div

className="card shadow border-0 p-4 text-center"

style={{

borderRadius:"20px"

}}

>


<h6 className="text-muted">

🏆 Certificates

</h6>



<h2 className="fw-bold text-warning">

{data.certificates}

</h2>



<p className="mb-0">

Earned Certificates

</p>



</div>


</div>




</div>









{/* ===============================
    CHART SECTION
================================ */}



<div className="row g-4 mb-4">





<div className="col-lg-8">


<div

className="card shadow border-0 p-4"

style={{

borderRadius:"22px"

}}

>


<h5 className="fw-bold mb-3">

📈 Volunteer Growth

</h5>



<Line

data={activityChart}

/>



</div>


</div>









<div className="col-lg-4">


<div

className="card shadow border-0 p-4"

style={{

borderRadius:"22px"

}}

>


<h5 className="fw-bold mb-3">

📊 Event Participation

</h5>



<Bar

data={eventChart}

/>



</div>


</div>




</div>

{/* ===============================
    CERTIFICATES + UPCOMING EVENTS
================================ */}



<div className="row g-4 mb-4">





{/* CERTIFICATES */}


<div className="col-lg-6">


<div

className="card shadow border-0 p-4 h-100"

style={{

borderRadius:"22px"

}}

>


<div className="d-flex justify-content-between align-items-center mb-3">


<h5 className="fw-bold">

🏆 Recent Certificates

</h5>



<Link

to="/volunteer/certificates"

className="btn btn-sm btn-outline-success"

>

View All

</Link>


</div>






{

data.certificatesList.length === 0 ?


<p className="text-muted">

No certificates available yet.

</p>



:


data.certificatesList.map(certificate=>(


<div

key={certificate._id}

className="p-3 mb-3 rounded"

style={{

background:"#f8f9fa"

}}

>


<h6 className="fw-bold">

{

certificate.event?.title ||

"Volunteer Activity"

}

</h6>



<p className="mb-2 text-muted">

Issued :

{

new Date(

certificate.issuedDate

).toLocaleDateString()

}

</p>





<Link

to={`/verify-certificate/${certificate.verificationCode}`}

className="btn btn-sm btn-outline-success"

>

Verify Certificate

</Link>



</div>


))


}




</div>


</div>









{/* UPCOMING EVENTS */}



<div className="col-lg-6">



<div

className="card shadow border-0 p-4 h-100"

style={{

borderRadius:"22px"

}}

>


<div className="d-flex justify-content-between align-items-center mb-3">


<h5 className="fw-bold">

📅 Upcoming Events

</h5>



<Link

to="/volunteer/events"

className="btn btn-sm btn-outline-success"

>

Explore

</Link>


</div>






{

data.upcomingEvents.length === 0 ?


<p className="text-muted">

No upcoming events.

</p>



:


data.upcomingEvents.map(event=>(


<div

key={event._id}

className="p-3 mb-3 rounded"

style={{

background:"#f8f9fa"

}}

>


<h6 className="fw-bold">

{event.title}

</h6>



<p className="mb-1">

📍 {event.venue || "Venue not available"}

</p>



<p className="text-muted">

📅

{

new Date(

event.date

).toLocaleDateString()

}

</p>



</div>


))


}




</div>


</div>





</div>









{/* ===============================
    RECENT ACTIVITY
================================ */}



<div

className="card shadow border-0 p-4 mb-4"

style={{

borderRadius:"22px"

}}

>


<h5 className="fw-bold mb-4">

📝 Recent Activity

</h5>





{

data.recentActivities.length === 0 ?


<p className="text-muted">

No recent activity found.

</p>



:


data.recentActivities.map(activity=>(


<div

key={activity._id}

className="d-flex align-items-center mb-3"

>


<div

className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"

style={{

width:"40px",

height:"40px"

}}

>

✓

</div>



<div className="ms-3">


<h6 className="mb-1 fw-bold">

{activity.action}

</h6>



<small className="text-muted">

{

new Date(

activity.createdAt

).toLocaleString()

}

</small>


</div>



</div>


))


}




</div>









{/* ===============================
    QUICK ACTIONS
================================ */}



<div className="row g-4 mb-5">





<div className="col-md-4">


<Link

to="/volunteer/events"

className="text-decoration-none"

>


<div

className="card shadow border-0 p-4 text-center"

style={{

borderRadius:"20px"

}}

>


<h3>

📅

</h3>


<h6 className="fw-bold text-dark">

Find Events

</h6>


<p className="text-muted small">

Participate in new activities

</p>


</div>


</Link>


</div>









<div className="col-md-4">


<Link

to="/volunteer/certificates"

className="text-decoration-none"

>


<div

className="card shadow border-0 p-4 text-center"

style={{

borderRadius:"20px"

}}

>


<h3>

🏆

</h3>


<h6 className="fw-bold text-dark">

My Certificates

</h6>


<p className="text-muted small">

Download achievement certificates

</p>


</div>


</Link>


</div>









<div className="col-md-4">


<Link

to="/volunteer/profile"

className="text-decoration-none"

>


<div

className="card shadow border-0 p-4 text-center"

style={{

borderRadius:"20px"

}}

>


<h3>

👤

</h3>


<h6 className="fw-bold text-dark">

Update Profile

</h6>


<p className="text-muted small">

Complete profile details

</p>


</div>


</Link>


</div>






</div>









</div>


);


};





export default VolunteerDashboard;