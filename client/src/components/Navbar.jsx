import {
    Link,
    useNavigate
} from "react-router-dom";


import useAuth from "../hooks/useAuth.js";





const Navbar = () => {


    const {
        user,
        logout
    } = useAuth();




    const navigate =
        useNavigate();





    const handleLogout = () => {


        logout();


        navigate(
            "/login"
        );


    };






    return (


        <nav

            className="navbar navbar-dark bg-primary px-4 shadow"

        >



            {/* Brand Section */}

            <div className="d-flex align-items-center">


                <Link

                    className="navbar-brand fw-bold"

                    to="/"

                >

                    🌱 NGO Volunteer Management System


                </Link>




                <span

                    className="text-white ms-3 small"

                >

                    Digital Volunteer Portal


                </span>



            </div>







            {/* User Section */}

            {

                user && (


                    <div

                        className="d-flex align-items-center text-white"

                    >



                        <span

                            className="me-3"

                        >

                            {user.name}


                        </span>







                        <span

                            className="badge bg-light text-dark me-3 text-uppercase"

                        >

                            {user.role}


                        </span>







                        <button

                            className="btn btn-light btn-sm"

                            onClick={handleLogout}

                        >

                            Logout


                        </button>





                    </div>


                )


            }




        </nav>


    );



};





export default Navbar;