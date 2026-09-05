import ActivityLog from "../models/ActivityLog.js";

export const logActivity = async(
    user,
    action,
    description,
    req
) => {
    try {
        await ActivityLog.create({
            user,
            action,
            description,
            ipAddress: req?.ip || null
        });
    } catch(error) {
        console.log(
            "Activity Log Error:",
            error.message
        );
    }
};