import {
    createContext,
    useEffect,
    useState
} from "react";


import {
    setToken,
    removeToken,
    getToken
} from "../utils/token.js";



const AuthContext = createContext();



export const AuthProvider = ({
    children
}) => {



    const [user,setUser] = useState(null);



    const [loading,setLoading] = useState(true);





    // Restore user after page refresh

    useEffect(()=>{


        const loadUser = ()=>{


            try{


                const token =
                    getToken();



                const storedUser =
                    localStorage.getItem(
                        "user"
                    );




                if(
                    token &&
                    storedUser
                ){


                    const parsedUser =
                        JSON.parse(
                            storedUser
                        );



                    setUser(
                        parsedUser
                    );


                }



            }
            catch(error){


                console.log(
                    "Auth restore error:",
                    error
                );



                removeToken();



                localStorage.removeItem(
                    "user"
                );


                setUser(
                    null
                );


            }
            finally{


                setLoading(false);


            }


        };



        loadUser();



    },[]);









    // Login function

    const login = (
        token,
        userData
    )=>{



        if(!token || !userData){

            console.log(
                "Invalid login data"
            );

            return;

        }




        setToken(
            token
        );




        localStorage.setItem(

            "user",

            JSON.stringify(
                userData
            )

        );




        setUser(
            userData
        );


    };









    // Logout function

    const logout = ()=>{


        removeToken();



        localStorage.removeItem(
            "user"
        );



        setUser(
            null
        );


    };









    return (

        <AuthContext.Provider

            value={{

                user,

                setUser,

                login,

                logout,

                loading,

                isAuthenticated:
                    Boolean(user)

            }}

        >

            {children}


        </AuthContext.Provider>

    );



};



export default AuthContext;