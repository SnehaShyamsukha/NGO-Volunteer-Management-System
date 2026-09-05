import {
    useForm
} from "react-hook-form";


import {
    useNavigate
} from "react-router-dom";


import {
    toast
} from "react-toastify";


import api from "../../services/api.js";



const Register = () => {


    const {
        register,
        handleSubmit,
        watch
    } = useForm();



    const navigate = useNavigate();




    const onSubmit = async(data)=>{


        try{


            const formattedData = {

                ...data,


                skills:
                    data.skills
                    ?
                    data.skills
                    .split(",")
                    .map(
                        skill=>skill.trim()
                    )
                    :
                    [],


                interests:
                    data.interests
                    ?
                    data.interests
                    .split(",")
                    .map(
                        item=>item.trim()
                    )
                    :
                    [],


                languages:
                    data.languages
                    ?
                    data.languages
                    .split(",")
                    .map(
                        item=>item.trim()
                    )
                    :
                    []

            };




            await api.post(

                "/auth/register",

                formattedData

            );



            toast.success(

                "Registration successful"

            );



            navigate(

                "/login"

            );



        }
        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Registration failed"

            );


        }


    };





    return (

        <div className="container mt-5">


            <div

                className="card shadow p-4 mx-auto"

                style={{

                    maxWidth:"600px"

                }}

            >



                <h3 className="text-center mb-4">

                    Volunteer Registration

                </h3>





                <form

                    onSubmit={
                        handleSubmit(onSubmit)
                    }

                >





                    <input

                        className="form-control mb-3"

                        placeholder="Full Name"

                        {...register(
                            "name",
                            {
                                required:true
                            }
                        )}

                    />







                    <input

                        className="form-control mb-3"

                        placeholder="Email"

                        type="email"

                        {...register(
                            "email",
                            {
                                required:true
                            }
                        )}

                    />







                    <input

                        className="form-control mb-3"

                        placeholder="Password"

                        type="password"

                        {...register(
                            "password",
                            {
                                required:true
                            }
                        )}

                    />







                    <input

                        className="form-control mb-3"

                        placeholder="Phone Number"

                        {...register(
                            "phone"
                        )}

                    />







                    <textarea

                        className="form-control mb-3"

                        placeholder="Address"

                        rows="2"

                        {...register(
                            "address"
                        )}

                    />







                    <input

                        className="form-control mb-3"

                        placeholder="City"

                        {...register(
                            "city"
                        )}

                    />







                    <input

                        className="form-control mb-3"

                        placeholder="State"

                        {...register(
                            "state"
                        )}

                    />







                    <input

                        className="form-control mb-3"

                        placeholder="Pincode"

                        {...register(
                            "pincode"
                        )}

                    />








                    <select

                        className="form-control mb-3"

                        {...register(
                            "gender"
                        )}

                    >

                        <option value="">

                            Select Gender

                        </option>


                        <option value="Male">

                            Male

                        </option>


                        <option value="Female">

                            Female

                        </option>


                        <option value="Other">

                            Other

                        </option>


                    </select>









                    <input

                        className="form-control mb-3"

                        type="date"

                        {...register(
                            "dob"
                        )}

                    />







                    <input

                        className="form-control mb-3"

                        placeholder="Blood Group"

                        {...register(
                            "bloodGroup"
                        )}

                    />







                    <input

                        className="form-control mb-3"

                        placeholder="Education"

                        {...register(
                            "education"
                        )}

                    />







                    <input

                        className="form-control mb-3"

                        placeholder="Occupation"

                        {...register(
                            "occupation"
                        )}

                    />







                    <input

                        className="form-control mb-3"

                        placeholder="Experience"

                        {...register(
                            "experience"
                        )}

                    />








                    <select

                        className="form-control mb-3"

                        {...register(
                            "availability"
                        )}

                    >


                        <option value="Both">

                            Availability

                        </option>


                        <option value="Weekdays">

                            Weekdays

                        </option>


                        <option value="Weekends">

                            Weekends

                        </option>


                        <option value="Both">

                            Both

                        </option>


                    </select>








                    <input

                        className="form-control mb-3"

                        placeholder="Skills (comma separated)"

                        {...register(
                            "skills"
                        )}

                    />








                    <input

                        className="form-control mb-3"

                        placeholder="Interests (comma separated)"

                        {...register(
                            "interests"
                        )}

                    />








                    <input

                        className="form-control mb-3"

                        placeholder="Languages (comma separated)"

                        {...register(
                            "languages"
                        )}

                    />








                    <input

                        className="form-control mb-3"

                        placeholder="Emergency Contact"

                        {...register(
                            "emergencyContact"
                        )}

                    />








                    <button

                        className="btn btn-success w-100"

                    >

                        Register

                    </button>





                </form>



            </div>



        </div>

    );

};


export default Register;