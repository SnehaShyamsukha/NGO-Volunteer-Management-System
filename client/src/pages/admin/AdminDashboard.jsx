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
    Bar,
    Doughnut,
    Line
} from "react-chartjs-2";


import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    BarElement,

    PointElement,

    LineElement,

    ArcElement,

    Tooltip,

    Legend,

    Filler

} from "chart.js";


import api from "../../services/api.js";





ChartJS.register(

    CategoryScale,

    LinearScale,

    BarElement,

    PointElement,

    LineElement,

    ArcElement,

    Tooltip,

    Legend,

    Filler

);









const AdminDashboard =()=>{





const [
    stats,
    setStats
]=useState({

    volunteers:0,

    events:0,

    registrations:0,

    certificates:0,

    hours:0

});





const [
    activities,
    setActivities
]=useState([]);





const [
    loading,
    setLoading
]=useState(true);









const loadDashboard = async()=>{


    try{


        setLoading(true);



        const response =

        await api.get(

            "/dashboard/admin"

        );




        const dashboard =

        response.data.data;






        setStats({



            volunteers:

            dashboard.totalVolunteers || 0,




            events:

            (

                dashboard.upcomingEvents || 0

            )

            +

            (

                dashboard.completedEvents || 0

            ),





            registrations:

            dashboard.pendingRegistrations || 0,





            certificates:

            dashboard.certificatesGenerated || 0,





            hours:

            dashboard.totalVolunteerHours || 0



        });








        setActivities(


            dashboard.recentActivities || []


        );



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












// ===============================
// BAR CHART
// ===============================


const overviewChart={


labels:[

"Volunteers",

"Events",

"Registrations",

"Certificates"

],



datasets:[{


label:"Total",



data:[

stats.volunteers,

stats.events,

stats.registrations,

stats.certificates

],





backgroundColor:[

"#A8DADC",

"#FFD6A5",

"#BDB2FF",

"#FFC8DD"

],





borderRadius:12



}]

};












// ===============================
// CERTIFICATE DOUGHNUT
// ===============================


const certificateChart={



labels:[

"Generated",

"Remaining"

],




datasets:[{


data:[


stats.certificates,



Math.max(

stats.registrations -

stats.certificates,

0

)


],




backgroundColor:[

"#CDB4DB",

"#FFAFCC"

],




borderWidth:0



}]

};












// ===============================
// ACTIVITY LINE
// ===============================


const activityChart={



labels:[

"Jan",

"Feb",

"Mar",

"Apr",

"May",

"Jun"

],




datasets:[{


label:"Activities",




data:[

15,

30,

25,

45,

55,

70

],





borderColor:"#90DBF4",





backgroundColor:"#CAF0F8",





tension:0.4,



fill:true



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







{/* HEADER */}



<div

className="card shadow border-0 p-4 mb-4 text-white"

style={{

borderRadius:"22px",

background:

"linear-gradient(135deg,#198754,#20c997)"

}}

>


<h2 className="fw-bold">

Welcome Admin 👋

</h2>


<p className="mb-0">

Manage volunteers, events,
certificates and activities.

</p>


</div>









{/* QUICK ACTIONS */}



<div className="row g-4 mb-4">



{[

{

title:"Manage Volunteers",

icon:"👥",

link:"/admin/volunteers"

},


{

title:"Create Event",

icon:"📅",

link:"/admin/events/create"

},


{

title:"Certificates",

icon:"🏆",

link:"/admin/certificates"

},


{

title:"Activity Logs",

icon:"📋",

link:"/admin/activity"

}


].map(item=>(



<div

className="col-lg-3 col-md-6"

key={item.title}

>


<Link

to={item.link}

className="text-decoration-none"

>


<div

className="card shadow border-0 p-4 h-100"

style={{

borderRadius:"18px"

}}

>


<h3>

{item.icon}

</h3>


<h5 className="fw-bold text-dark">

{item.title}

</h5>


<p className="text-muted">

Open section

</p>


</div>


</Link>


</div>


))}


</div>









{/* STAT CARDS */}



<div className="row g-4 mb-4">



{[


["👥 Volunteers",stats.volunteers],


["📅 Events",stats.events],


["📝 Registrations",stats.registrations],


["🏆 Certificates",stats.certificates],


["⏱ Volunteer Hours",stats.hours]


].map(item=>(



<div

className="col-lg-3 col-md-6"

key={item[0]}

>


<div

className="card shadow border-0 p-4"

style={{

borderRadius:"18px"

}}

>


<h6 className="text-muted">

{item[0]}

</h6>


<h2 className="fw-bold">

{item[1]}

</h2>


</div>


</div>



))}


</div>









{/* CHARTS */}



<div className="row g-4 mb-4">



<div className="col-lg-6">


<div className="card shadow border-0 p-4">


<h5 className="fw-bold mb-3">

System Overview

</h5>


<Bar

data={overviewChart}

/>


</div>


</div>









<div className="col-lg-6">


<div className="card shadow border-0 p-4">


<h5 className="fw-bold mb-3">

Certificate Status

</h5>


<Doughnut

data={certificateChart}

/>


</div>


</div>


</div>









<div className="card shadow border-0 p-4 mb-4">


<h5 className="fw-bold mb-3">

Monthly Activity Trend

</h5>


<Line

data={activityChart}

/>


</div>









{/* ACTIVITY */}



<div className="card shadow border-0 p-4">


<h5 className="fw-bold mb-3">

Latest Activities

</h5>





{

activities.length===0 ?


<p className="text-muted">

No recent activities found.

</p>



:


activities.map(item=>(



<div

key={item._id}

className="border-bottom py-2"

>


<strong>

{item.action}

</strong>


<br/>


<small className="text-muted">

{item.description}

</small>


</div>


))


}



</div>









</div>


);


};



export default AdminDashboard;