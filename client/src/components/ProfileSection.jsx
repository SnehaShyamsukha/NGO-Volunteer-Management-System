import { Card } from "react-bootstrap";



// ======================================
// PROFILE SECTION CARD
// ======================================


const ProfileSection = ({
    title,
    icon,
    children
}) => {


    return (

        <Card

            className="shadow border-0 p-4 mb-4"

            style={{

                borderRadius:"18px",

                background:
                "linear-gradient(145deg,#ffffff,#f8f9fa)"

            }}

        >


            <h5 className="fw-bold mb-4">


                {icon}

                {" "}

                {title}


            </h5>



            {children}


        </Card>

    );


};








// ======================================
// INFORMATION ROW
// ======================================


export const InfoRow = ({
    label,
    value
})=>{


    return (

        <div

            className="d-flex justify-content-between mb-3"

        >


            <strong>

                {label}

            </strong>



            <span className="text-muted">


                {value || "Not Provided"}


            </span>



        </div>

    );


};








// ======================================
// TAG LIST
// ======================================


export const TagList = ({
    items=[]
})=>{


    if(
        !items ||
        items.length===0
    ){

        return (

            <span className="text-muted">

                No information available

            </span>

        );

    }




    return (

        <div>


            {

                items.map(
                    (item,index)=>(


                        <span

                            key={index}

                            className="badge rounded-pill bg-success me-2 mb-2"

                        >

                            {item}

                        </span>


                    )

                )

            }


        </div>

    );


};







export default ProfileSection;