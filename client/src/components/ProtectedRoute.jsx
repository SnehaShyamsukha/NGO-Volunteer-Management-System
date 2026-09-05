import {
    Navigate
} from "react-router-dom";


import useAuth from "../hooks/useAuth.js";



const ProtectedRoute = ({
    children,
    role
}) => {


    const {
        user,
        loading
    } = useAuth();





    if(loading) {


        return (

            <div className="text-center mt-5">

                Loading...

            </div>

        );


    }





    if(!user) {


        return (

            <Navigate
                to="/login"
                replace
            />

        );


    }





    if(
        role &&
        user.role !== role
    ) {


        return (

            <Navigate
                to="/login"
                replace
            />

        );


    }





    return children;



};



export default ProtectedRoute;