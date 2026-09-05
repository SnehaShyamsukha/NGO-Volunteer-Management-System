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
    getVolunteerById
} from "../../services/volunteerService.js";





const VolunteerDetails = () => {


    const {
        id
    } = useParams();



    const navigate =
        useNavigate();




    const [
        data,
        setData
    ] = useState(null);



    const [
        loading,
        setLoading
    ] = useState(true);






    const loadVolunteer = async()=>{


        try{


            const response =
                await getVolunteerById(id);



            setData(
                response
            );


        }


        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Unable to load volunteer"

            );


        }


        finally{


            setLoading(false);


        }


    };







    useEffect(()=>{


        loadVolunteer();


    },[]);







    if(loading){


        return (

            <div className="text-center mt-5">

                Loading volunteer details...

            </div>

        );


    }








    if(!data){


        return (

            <div className="alert alert-danger">

                Volunteer not found

            </div>

        );


    }






    const volunteer =
        data.volunteer;



    const statistics =
        data.statistics;







    return (



        <div className="container-fluid">





            <button

                className="btn btn-secondary mb-4"

                onClick={()=>navigate(
                    "/admin/volunteers"
                )}

            >

                ← Back to Volunteers

            </button>










            {/* PROFILE */}



            <div className="card shadow p-4 mb-4">


                <div className="row align-items-center">


                    <div className="col-md-3 text-center">


                        {

                        volunteer.profilePhoto

                        ?

                        <img

                            src={
                                volunteer.profilePhoto
                            }

                            alt="profile"

                            width="150"

                            height="150"

                            className="rounded-circle"

                        />

                        :

                        <div

                            className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center mx-auto"

                            style={{

                                width:"150px",

                                height:"150px",

                                fontSize:"50px"

                            }}

                        >

                            {
                                volunteer.name
                                ?.charAt(0)
                                .toUpperCase()
                            }


                        </div>


                        }


                    </div>







                    <div className="col-md-9">


                        <h2>

                            {
                                volunteer.name
                            }

                        </h2>



                        <p>

                            <b>Email:</b>{" "}

                            {
                                volunteer.email
                            }

                        </p>



                        <p>

                            <b>Status:</b>{" "}


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


                        </p>


                    </div>



                </div>


            </div>









            {/* STATISTICS */}



            <div className="row g-4 mb-4">


                <InfoCard

                    title="Events Joined"

                    value={
                        statistics.events
                    }

                />


                <InfoCard

                    title="Attendance"

                    value={
                        statistics.attendance
                    }

                />


                <InfoCard

                    title="Volunteer Hours"

                    value={
                        statistics.hours
                    }

                />


                <InfoCard

                    title="Certificates"

                    value={
                        statistics.certificates
                    }

                />


            </div>









            {/* PERSONAL DETAILS */}



            <div className="card shadow p-4 mb-4">


                <h4>

                    Personal Details

                </h4>



                <p>

                    <b>Phone:</b>{" "}

                    {
                        volunteer.phone || "-"
                    }

                </p>



                <p>

                    <b>Gender:</b>{" "}

                    {
                        volunteer.gender || "-"
                    }

                </p>



                <p>

                    <b>Education:</b>{" "}

                    {
                        volunteer.education || "-"
                    }

                </p>



                <p>

                    <b>Occupation:</b>{" "}

                    {
                        volunteer.occupation || "-"
                    }

                </p>



                <p>

                    <b>Address:</b>{" "}

                    {
                        volunteer.address || "-"
                    }

                </p>



            </div>









            {/* SKILLS */}



            <div className="card shadow p-4 mb-4">


                <h4>

                    Skills

                </h4>




                {

                volunteer.skills &&
                volunteer.skills.length > 0


                ?

                volunteer.skills.map(skill=>(


                    <span

                    key={skill}

                    className="badge bg-primary me-2"

                    >

                        {skill}

                    </span>


                ))


                :

                <p>

                    No skills added

                </p>


                }



            </div>









            {/* EVENTS */}



            <div className="card shadow p-4 mb-4">


                <h4>

                    Registered Events

                </h4>




                <table className="table table-bordered">


                    <thead className="table-dark">


                        <tr>


                            <th>
                                Event
                            </th>


                            <th>
                                Date
                            </th>


                            <th>
                                Venue
                            </th>


                        </tr>


                    </thead>




                    <tbody>



                    {

                    data.registrations.length===0

                    ?

                    <tr>

                        <td
                        colSpan="3"
                        className="text-center"
                        >

                            No events found

                        </td>


                    </tr>


                    :


                    data.registrations.map(item=>(


                        <tr

                        key={
                            item._id
                        }

                        >


                            <td>

                                {
                                    item.event?.title ||
                                    "-"
                                }

                            </td>



                            <td>

                                {
                                    item.event?.date

                                    ?

                                    new Date(
                                        item.event.date
                                    ).toLocaleDateString()

                                    :

                                    "-"

                                }

                            </td>



                            <td>

                                {
                                    item.event?.venue ||
                                    "-"
                                }

                            </td>


                        </tr>


                    ))

                    }



                    </tbody>



                </table>



            </div>









            {/* ATTENDANCE */}



            <div className="card shadow p-4 mb-4">


                <h4>

                    Attendance History

                </h4>




                <table className="table table-bordered">


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


                        </tr>


                    </thead>




                    <tbody>



                    {

                    data.attendance.length===0

                    ?

                    <tr>

                        <td

                        colSpan="4"

                        className="text-center"

                        >

                            No attendance found

                        </td>


                    </tr>


                    :


                    data.attendance.map(item=>(


                        <tr

                        key={
                            item._id
                        }

                        >


                            <td>

                                {
                                    item.event?.title ||
                                    "-"
                                }

                            </td>



                            <td>

                                {
                                    item.checkIn

                                    ?

                                    new Date(
                                        item.checkIn
                                    ).toLocaleString()

                                    :

                                    "-"

                                }

                            </td>



                            <td>

                                {
                                    item.checkOut

                                    ?

                                    new Date(
                                        item.checkOut
                                    ).toLocaleString()

                                    :

                                    "-"

                                }

                            </td>



                            <td>

                                {
                                    item.hours
                                }

                            </td>


                        </tr>


                    ))

                    }



                    </tbody>



                </table>



            </div>









            {/* CERTIFICATES */}



            <div className="card shadow p-4 mb-4">


                <h4>

                    Certificates

                </h4>




                {

                data.certificates.length===0


                ?


                <p>

                    No certificates generated

                </p>


                :


                <table className="table table-bordered">


                    <thead className="table-dark">

                        <tr>

                            <th>
                                Certificate Number
                            </th>

                            <th>
                                Hours
                            </th>

                        </tr>


                    </thead>



                    <tbody>


                    {

                    data.certificates.map(cert=>(


                        <tr key={cert._id}>


                            <td>

                                {
                                    cert.certificateNumber
                                }

                            </td>



                            <td>

                                {
                                    cert.hours
                                }

                            </td>


                        </tr>


                    ))

                    }



                    </tbody>



                </table>


                }



            </div>






        </div>


    );


};









const InfoCard = ({
    title,
    value
})=>{


    return(


        <div className="col-md-3">


            <div className="card shadow p-3 text-center">


                <h6>

                    {title}

                </h6>


                <h3>

                    {
                        value || 0
                    }

                </h3>


            </div>


        </div>


    );


};







export default VolunteerDetails;