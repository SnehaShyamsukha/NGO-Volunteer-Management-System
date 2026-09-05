import {
    useForm
} from "react-hook-form";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    toast
} from "react-toastify";

import api from "../../services/api.js";


const ResetPassword = ()=>{


    const {
        register,
        handleSubmit
    } = useForm();


    const {
        token
    } = useParams();


    const navigate =
        useNavigate();



    const onSubmit = async(data)=>{


        try{


            await api.post(
                `/auth/reset-password/${token}`,
                data
            );


            toast.success(
                "Password reset successful"
            );


            navigate(
                "/login"
            );


        }
        catch(error){

            toast.error(
                error.response?.data?.message ||
                "Password reset failed"
            );

        }


    };



    return(

        <div className="container mt-5">


            <div
                className="card shadow p-4 mx-auto"
                style={{
                    maxWidth:"400px"
                }}
            >


                <h4 className="text-center mb-4">
                    Reset Password
                </h4>



                <form
                    onSubmit={
                        handleSubmit(onSubmit)
                    }
                >

                    <input
                        className="form-control mb-3"
                        type="password"
                        placeholder="New Password"
                        {...register(
                            "password",
                            {
                                required:true
                            }
                        )}
                    />


                    <button
                        className="btn btn-success w-100"
                    >
                        Reset Password
                    </button>


                </form>


            </div>


        </div>

    );

};


export default ResetPassword;