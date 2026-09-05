import {
    useState
} from "react";


import {
    toast
} from "react-toastify";


import {
    markAttendanceWithCode
} from "../../services/attendanceService.js";





const ScanAttendance = ()=>{


    const [
        code,
        setCode
    ] = useState("");



    const [
        checkedIn,
        setCheckedIn
    ] = useState(false);







    const handleCheckIn = async()=>{


        if(!code){


            toast.error(
                "Please enter attendance code"
            );


            return;

        }






        try{


            await markAttendanceWithCode(
                code
            );



            toast.success(
                "Attendance marked successfully"
            );



            setCheckedIn(true);



        }

        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Attendance failed"

            );


        }


    };







    return(


        <div className="container">


            <h2 className="mb-4">

                Attendance Check-In

            </h2>





            <div

            className="card shadow p-4"

            style={{
                maxWidth:"450px"
            }}

            >




                {

                !checkedIn ?



                <>



                <h5 className="mb-3">

                    Enter Attendance Code

                </h5>




                <input

                className="form-control mb-3"

                placeholder="Enter 6 digit code"

                value={code}

                onChange={
                    e=>setCode(
                        e.target.value
                    )
                }

                />





                <button

                className="btn btn-success"

                onClick={handleCheckIn}

                >

                    Check In


                </button>



                </>



                :



                <div className="text-center">


                    <h4 className="text-success">

                        ✓ Checked In Successfully

                    </h4>



                    <p>

                        You can checkout after completing your work.

                    </p>


                </div>


                }



            </div>



        </div>


    );


};


export default ScanAttendance;