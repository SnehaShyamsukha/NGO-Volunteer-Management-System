import Sidebar from "./Sidebar.jsx";

import Navbar from "./Navbar.jsx";



const Layout = ({
    children
}) => {


    return (

        <div>


            <Navbar />


            <div className="d-flex">


                <Sidebar />


                <main

                    className="flex-grow-1 p-4"

                >

                    {children}


                </main>


            </div>


        </div>

    );

};



export default Layout;