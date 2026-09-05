import {
    NavLink
} from "react-router-dom";


import useAuth from "../hooks/useAuth.js";





const Sidebar = () => {


    const {
        user
    } = useAuth();






    const linkClass = ({isActive}) => {


        return `d-block mb-3 text-decoration-none px-2 py-1 rounded ${
            
            isActive

            ? "bg-warning text-dark fw-bold"

            : "text-white"

        }`;


    };






    return (



        <div

            className="bg-dark text-white min-vh-100 p-3 sidebar"

        >



            <h5 className="mb-4 text-center">


                🌱 NGO Portal


            </h5>







            {
                user?.role === "admin" && (



                    <>


                        <NavLink

                            to="/admin/dashboard"

                            className={linkClass}

                        >

                            📊 Dashboard

                        </NavLink>





                        <NavLink

                            to="/admin/volunteers"

                            className={linkClass}

                        >

                            👥 Manage Volunteers

                        </NavLink>







                        <NavLink

                            to="/admin/events"

                            className={linkClass}

                        >

                            📅 Manage Events

                        </NavLink>







                        <NavLink

                            to="/admin/registrations"

                            className={linkClass}

                        >

                            📝 Registrations

                        </NavLink>







                        <NavLink

                            to="/admin/attendance"

                            className={linkClass}

                        >

                            ✅ Attendance

                        </NavLink>







                        <NavLink

                            to="/admin/certificates"

                            className={linkClass}

                        >

                            🏆 Certificates

                        </NavLink>







                        <NavLink

                            to="/admin/activity-logs"

                            className={linkClass}

                        >

                            📜 Activity Logs

                        </NavLink>





                    </>


                )

            }









            {
                user?.role === "volunteer" && (



                    <>



                        <NavLink

                            to="/volunteer/dashboard"

                            className={linkClass}

                        >

                            📊 Dashboard

                        </NavLink>







                        <NavLink

                            to="/volunteer/events"

                            className={linkClass}

                        >

                            🔍 Browse Events

                        </NavLink>







                        <NavLink

                            to="/volunteer/registrations"

                            className={linkClass}

                        >

                            📝 My Registrations

                        </NavLink>







                        <NavLink

                            to="/volunteer/scan"

                            className={linkClass}

                        >

                            📷 Scan Attendance

                        </NavLink>







                        <NavLink

                            to="/volunteer/attendance"

                            className={linkClass}

                        >

                            ✅ Attendance History

                        </NavLink>







                        <NavLink

                            to="/volunteer/certificates"

                            className={linkClass}

                        >

                            🏆 My Certificates

                        </NavLink>







                        <NavLink

                            to="/volunteer/profile"

                            className={linkClass}

                        >

                            👤 My Profile

                        </NavLink>





                    </>


                )

            }






        </div>



    );



};






export default Sidebar;