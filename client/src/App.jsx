import AppRoutes from "./routes/AppRoutes.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";

import {
    ToastContainer
} from "react-toastify";


function App() {

    return (
        <AuthProvider>

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />

            <AppRoutes />

        </AuthProvider>
    );
}


export default App;