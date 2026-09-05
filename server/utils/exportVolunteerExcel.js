import ExcelJS from "exceljs";

import Attendance from "../models/Attendance.js";
import Certificate from "../models/Certificate.js";
import Registration from "../models/Registration.js";

export const exportVolunteerExcel = async(volunteers)=>{

    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("Volunteers");

    sheet.columns = [

        {
            header:"Name",
            key:"name",
            width:25
        },

        {
            header:"Email",
            key:"email",
            width:30
        },

        {
            header:"Phone",
            key:"phone",
            width:18
        },

        {
            header:"Status",
            key:"status",
            width:15
        },

        {
            header:"Events",
            key:"events",
            width:12
        },

        {
            header:"Volunteer Hours",
            key:"hours",
            width:18
        },

        {
            header:"Certificates",
            key:"certificates",
            width:15
        }

    ];

    for(const volunteer of volunteers){

        const attendance = await Attendance.find({

            volunteer:volunteer._id

        });

        const registrations = await Registration.countDocuments({

            volunteer:volunteer._id

        });

        const certificates = await Certificate.countDocuments({

            volunteer:volunteer._id

        });

        const hours = attendance.reduce(

            (sum,item)=>sum + item.hours,

            0

        );

        sheet.addRow({

            name:volunteer.name,

            email:volunteer.email,

            phone:volunteer.phone || "-",

            status:volunteer.status,

            events:registrations,

            hours,

            certificates

        });

    }

    sheet.getRow(1).font = {

        bold:true

    };

    return workbook;

};