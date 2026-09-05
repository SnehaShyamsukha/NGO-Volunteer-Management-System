import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


// Authentication

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";



// Layout

import Layout from "../components/Layout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";



// Admin Pages

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import Volunteers from "../pages/admin/Volunteers.jsx";
import VolunteerDetails from "../pages/admin/VolunteerDetails.jsx";

import Events from "../pages/admin/Events.jsx";
import CreateEvent from "../pages/admin/CreateEvent.jsx";
import EditEvent from "../pages/admin/EditEvent.jsx";

import Registrations from "../pages/admin/Registrations.jsx";
import Attendance from "../pages/admin/Attendance.jsx";

import AdminCertificates from "../pages/admin/CERTIFICATES.jsx";
import ActivityLogs from "../pages/admin/ActivityLogs.jsx";



// Volunteer Pages

import VolunteerDashboard from "../pages/volunteer/VolunteerDashboard.jsx";
import VolunteerEvents from "../pages/volunteer/Events.jsx";
import MyRegistrations from "../pages/volunteer/MyRegistrations.jsx";
import ScanAttendance from "../pages/volunteer/ScanAttendance.jsx";
import AttendanceHistory from "../pages/volunteer/AttendanceHistory.jsx";
import VolunteerCertificates from "../pages/volunteer/Certificates.jsx";
import Profile from "../pages/volunteer/Profile.jsx";



// Certificate Verification

import VerifyCertificate from "../pages/VerifyCertificate.jsx";





const AppRoutes = () => {


    return (

        <BrowserRouter>


            <Routes>


                {/* AUTH */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />


                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />


                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />





                {/* ADMIN */}


                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <Layout>
                                <AdminDashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/admin/volunteers"
                    element={
                        <ProtectedRoute role="admin">
                            <Layout>
                                <Volunteers />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/admin/volunteers/:id"
                    element={
                        <ProtectedRoute role="admin">
                            <Layout>
                                <VolunteerDetails />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/admin/events"
                    element={
                        <ProtectedRoute role="admin">
                            <Layout>
                                <Events />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/admin/events/create"
                    element={
                        <ProtectedRoute role="admin">
                            <Layout>
                                <CreateEvent />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/admin/events/edit/:id"
                    element={
                        <ProtectedRoute role="admin">
                            <Layout>
                                <EditEvent />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/admin/registrations"
                    element={
                        <ProtectedRoute role="admin">
                            <Layout>
                                <Registrations />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/admin/attendance"
                    element={
                        <ProtectedRoute role="admin">
                            <Layout>
                                <Attendance />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/admin/certificates"
                    element={
                        <ProtectedRoute role="admin">
                            <Layout>
                                <AdminCertificates />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/admin/activity-logs"
                    element={
                        <ProtectedRoute role="admin">
                            <Layout>
                                <ActivityLogs />
                            </Layout>
                        </ProtectedRoute>
                    }
                />





                {/* VOLUNTEER */}


                <Route
                    path="/volunteer/dashboard"
                    element={
                        <ProtectedRoute role="volunteer">
                            <Layout>
                                <VolunteerDashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/volunteer/events"
                    element={
                        <ProtectedRoute role="volunteer">
                            <Layout>
                                <VolunteerEvents />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/volunteer/registrations"
                    element={
                        <ProtectedRoute role="volunteer">
                            <Layout>
                                <MyRegistrations />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/volunteer/scan"
                    element={
                        <ProtectedRoute role="volunteer">
                            <Layout>
                                <ScanAttendance />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/volunteer/attendance"
                    element={
                        <ProtectedRoute role="volunteer">
                            <Layout>
                                <AttendanceHistory />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/volunteer/certificates"
                    element={
                        <ProtectedRoute role="volunteer">
                            <Layout>
                                <VolunteerCertificates />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/volunteer/profile"
                    element={
                        <ProtectedRoute role="volunteer">
                            <Layout>
                                <Profile />
                            </Layout>
                        </ProtectedRoute>
                    }
                />





                {/* PUBLIC CERTIFICATE VERIFICATION */}


                <Route
                    path="/verify/:certificateNumber"
                    element={<VerifyCertificate />}
                />





                {/* DEFAULT */}


                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />


                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />


            </Routes>


        </BrowserRouter>

    );

};


export default AppRoutes;