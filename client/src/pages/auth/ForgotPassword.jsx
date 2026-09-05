import {
    useForm
} from "react-hook-form";

import {
    toast
} from "react-toastify";

import api from "../../services/api.js";


const ForgotPassword = ()=>{


    const {
        register,
        handleSubmit
    } = useForm();



    const onSubmit = async(data)=>{


        try{

            await api.post(
                "/auth/forgot-password",
                data
            );


            toast.success(
                "Password reset link sent to your email"
            );


        }
        catch(error){

            toast.error(
                error.response?.data?.message ||
                "Failed to send reset link"
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
                    Forgot Password
                </h4>


                <form
                    onSubmit={
                        handleSubmit(onSubmit)
                    }
                >

                    <input
                        className="form-control mb-3"
                        placeholder="Enter Email"
                        {...register(
                            "email",
                            {
                                required:true
                            }
                        )}
                    />


                    <button
                        className="btn btn-primary w-100"
                    >
                        Send Reset Link
                    </button>


                </form>


            </div>


        </div>

    );

};


export default ForgotPassword;