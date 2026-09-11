import express from "express";

import cors from "cors";

import helmet from "helmet";

import morgan from "morgan";

import rateLimit from "express-rate-limit";

import path from "path";


// Routes

import authRoutes from "./routes/authRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import volunteerRoutes from "./routes/volunteerRoutes.js";

import eventRoutes from "./routes/eventRoutes.js";

import attendanceRoutes from "./routes/attendanceRoutes.js";

import verificationRoutes from "./routes/verificationRoutes.js";

import certificateRoutes from "./routes/certificateRoutes.js";

import profileRoutes from "./routes/profileRoutes.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";

import activityRoutes from "./routes/activityRoutes.js";

import registrationRoutes from "./routes/registrationRoutes.js";

import verifyRoutes from "./routes/verifyRoutes.js";


// Middleware

import errorHandler from "./middleware/errorMiddleware.js";





const app = express();







// ===============================
// CORS
// ===============================


app.use(

    cors({

        origin:process.env.CLIENT_URL,

        credentials:true,


        methods:[

            "GET",

            "POST",

            "PUT",

            "PATCH",

            "DELETE",

            "OPTIONS"

        ],


        allowedHeaders:[

            "Content-Type",

            "Authorization"

        ]

    })

);








// ===============================
// SECURITY
// ===============================


app.use(
    helmet()
);


app.use(
    morgan("dev")
);








// ===============================
// BODY PARSER
// ===============================


app.use(

    express.json({

        limit:"10mb"

    })

);



app.use(

    express.urlencoded({

        extended:true

    })

);








// ===============================
// RATE LIMIT
// ===============================


app.use(

    rateLimit({

        windowMs:
        15 * 60 * 1000,


        max:200


    })

);










// ===============================
// STATIC FILES
// ===============================


// Upload directory

const uploadPath =
path.join(
    process.cwd(),
    "uploads"
);



app.use(

    "/uploads",

    express.static(
        uploadPath
    )

);









// ===============================
// TEST API
// ===============================


app.get(

    "/",

    (req,res)=>{


        res.json({

            success:true,


            message:
            "NGO Volunteer Management API Running"


        });


    }

);










// ===============================
// API ROUTES
// ===============================



app.use(

    "/api/auth",

    authRoutes

);



app.use(

    "/api/users",

    userRoutes

);



app.use(

    "/api/volunteers",

    volunteerRoutes

);



app.use(

    "/api/events",

    eventRoutes

);



app.use(

    "/api/attendance",

    attendanceRoutes

);



app.use(

    "/api/verify",

    verificationRoutes

);



app.use(

    "/api/verify",

    verifyRoutes

);



app.use(

    "/api/certificates",

    certificateRoutes

);



app.use(

    "/api/profile",

    profileRoutes

);



app.use(

    "/api/dashboard",

    dashboardRoutes

);



app.use(

    "/api/activity",

    activityRoutes

);



app.use(

    "/api/registrations",

    registrationRoutes

);









// ===============================
// ERROR HANDLER
// MUST BE LAST
// ===============================


app.use(

    errorHandler

);






export default app;