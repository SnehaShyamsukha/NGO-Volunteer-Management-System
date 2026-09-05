import {
    useState,
    useContext
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    toast
} from "react-toastify";

import api from "../../services/api.js";

import AuthContext from "../../context/AuthContext.jsx";


const Login = () => {


    const navigate = useNavigate();


    const {
        login
    } = useContext(AuthContext);



    const [role,setRole] = useState("");

    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [loading,setLoading] = useState(false);

    const [error,setError] = useState("");




    const handleLogin = async(e)=>{


        e.preventDefault();


        setError("");



        if(!role){

            setError(
                "Please select your role"
            );

            return;

        }




        try{


            setLoading(true);



            const response =
                await api.post(
                    "/auth/login",
                    {
                        email,
                        password,
                        role
                    }
                );



            console.log(
                "LOGIN RESPONSE:",
                response.data
            );



            const {
                token,
                user
            } = response.data;



            if(!token || !user){

                throw new Error(
                    "Invalid server response"
                );

            }



            // save using AuthContext

            login(
                token,
                user
            );



            toast.success(
                "Login successful"
            );



            if(user.role === "admin"){

                navigate(
                    "/admin/dashboard"
                );

            }
            else{

                navigate(
                    "/volunteer/dashboard"
                );

            }



        }
        catch(err){


            console.log(
                "LOGIN ERROR:",
                err
            );


            setError(
                err.response?.data?.message ||
                "Login failed"
            );


            toast.error(
                err.response?.data?.message ||
                "Login failed"
            );


        }
        finally{


            setLoading(false);


        }


    };





    return (

        <div className="container mt-5">


            <div
                className="card shadow p-4 mx-auto"
                style={{
                    maxWidth:"450px"
                }}
            >


                <h2 className="text-center mb-4">
                    NGO Volunteer System
                </h2>




                {
                    error &&
                    <div className="alert alert-danger">
                        {error}
                    </div>
                }





                <h5>
                    Select Role
                </h5>




                <div className="d-flex gap-3 mb-4">


                    <button

                        type="button"

                        className={
                            role==="volunteer"
                            ?
                            "btn btn-success"
                            :
                            "btn btn-outline-success"
                        }

                        onClick={()=>
                            setRole("volunteer")
                        }

                    >

                        Volunteer

                    </button>





                    <button

                        type="button"

                        className={
                            role==="admin"
                            ?
                            "btn btn-danger"
                            :
                            "btn btn-outline-danger"
                        }

                        onClick={()=>
                            setRole("admin")
                        }

                    >

                        Admin

                    </button>



                </div>






                <form
                    onSubmit={handleLogin}
                >



                    <input

                        className="form-control mb-3"

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={
                            e =>
                            setEmail(
                                e.target.value
                            )
                        }

                        required

                    />






                    <input

                        className="form-control mb-3"

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={
                            e =>
                            setPassword(
                                e.target.value
                            )
                        }

                        required

                    />





                    <button

                        className="btn btn-primary w-100"

                        disabled={loading}

                    >

                        {
                            loading
                            ?
                            "Logging in..."
                            :
                            "Login"
                        }

                    </button>



                </form>





                <div className="text-center mt-3">


                    <a href="/register">
                        New User? Register
                    </a>


                    <br/>


                    <a href="/forgot-password">
                        Forgot Password?
                    </a>


                </div>




            </div>


        </div>

    );

};



export default Login;