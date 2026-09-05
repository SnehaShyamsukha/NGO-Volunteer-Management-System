import axios from "axios";

import {
    getToken,
    removeToken
} from "../utils/token.js";


const api = axios.create({

    baseURL:
        import.meta.env.VITE_API_URL,

    headers: {

        "Content-Type":
            "application/json"

    },

    timeout:30000

});



api.interceptors.request.use(

    (config) => {


        const token =
            getToken();



        if(token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }



        return config;


    },


    (error) => {

        return Promise.reject(
            error
        );

    }

);





api.interceptors.response.use(

    (response) => {

        return response;

    },


    (error) => {


        if(
            error.response &&
            error.response.status === 401
        ) {


            removeToken();


            localStorage.removeItem(
                "user"
            );


            window.location.href =
                "/login";


        }


        return Promise.reject(
            error
        );


    }

);



export default api;