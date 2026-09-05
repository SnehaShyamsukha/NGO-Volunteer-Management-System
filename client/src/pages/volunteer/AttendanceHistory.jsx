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


import {
    getMyAttendance,
    checkOut
} from "../../services/attendanceService.js";







const AttendanceHistory = ()=>{


    const [
        attendance,
        setAttendance
    ] = useState([]);








    const loadAttendance = async()=>{


        try{


            const response =

            await getMyAttendance();




            setAttendance(

                response.data || []

            );


        }


        catch(error){


            toast.error(

                "Failed loading attendance"

            );


        }


    };








    useEffect(()=>{


        loadAttendance();


    },[]);









    const handleCheckout = async(eventId)=>{


        try{


            await checkOut(eventId);



            toast.success(

                "Checkout completed"

            );



            loadAttendance();



        }


        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Checkout failed"

            );


        }


    };









    const totalHours =

    attendance.reduce(

        (sum,item)=>

        sum + (item.hours || 0),

        0

    );





    const completed =

    attendance.filter(

        item=>item.checkOut

    ).length;









return(


<div className="container-fluid">






<h2 className="mb-4 fw-bold">

📋 Attendance History

</h2>









<div className="row g-4 mb-5">





<SummaryCard

title="Total Attendance"

value={attendance.length}

/>





<SummaryCard

title="Volunteer Hours"

value={`${totalHours} hrs`}

/>





<SummaryCard

title="Completed Sessions"

value={completed}

/>





</div>












<div className="card shadow border-0 p-4">





<h5 className="fw-bold mb-4">

Attendance Records

</h5>









<div className="table-responsive">


<table className="table table-hover align-middle">



<thead className="table-dark">


<tr>


<th>
Event
</th>


<th>
Check In
</th>


<th>
Check Out
</th>


<th>
Hours
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


attendance.length===0 ?



<tr>


<td

colSpan="6"

className="text-center"

>


No attendance records found


</td>


</tr>





:





attendance.map(item=>(



<tr

key={item._id}

>



<td className="fw-bold">


{

item.event?.title ||

"Unknown Event"

}


</td>








<td>


{

item.checkIn ?

new Date(

item.checkIn

)

.toLocaleString()

:

"-"

}


</td>









<td>


{

item.checkOut ?

new Date(

item.checkOut

)

.toLocaleString()

:

"Not checked out"

}


</td>









<td>


{

item.hours || 0

}

hrs


</td>









<td>



{

item.checkOut ?



<span className="badge bg-success">

Completed

</span>



:



<span className="badge bg-warning text-dark">

Active

</span>



}



</td>









<td>


{


!item.checkOut &&



<button


className="btn btn-dark btn-sm"


onClick={()=>


handleCheckout(

item.event._id

)


}


>


Checkout


</button>


}





</td>









</tr>



))



}



</tbody>



</table>



</div>








</div>









</div>


);


};









const SummaryCard = ({

title,

value

})=>{


return(


<div className="col-md-4">


<Card


className="shadow border-0 p-3 text-center"


style={{


background:

"linear-gradient(135deg,#FADBD8,#D6EAF8)"


}}



>


<h6 className="fw-bold">

{title}

</h6>



<h2 className="fw-bold">

{value}

</h2>



</Card>


</div>


);


};







export default AttendanceHistory;