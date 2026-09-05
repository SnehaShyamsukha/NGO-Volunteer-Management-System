import {
    useEffect,
    useState
} from "react";


import {
    toast
} from "react-toastify";


import {
    getRegistrations,
    approveRegistration,
    rejectRegistration
} from "../../services/registrationService.js";



const Registrations = () => {


    const [
        registrations,
        setRegistrations
    ] = useState([]);



    const loadData = async() => {

        try {

            const response =
                await getRegistrations();


            setRegistrations(
    response.data || []
);


        } catch(error) {

            toast.error(
                "Failed to load registrations"
            );

        }

    };



    useEffect(
        () => {

            loadData();

        },

        []

    );



    const handleApprove = async(id) => {

        try {

            await approveRegistration(
                id
            );


            toast.success(
                "Registration approved"
            );


            loadData();


        } catch(error) {

            toast.error(
                "Approval failed"
            );

        }

    };



    const handleReject = async(id) => {

        try {

            await rejectRegistration(
                id
            );


            toast.success(
                "Registration rejected"
            );


            loadData();


        } catch(error) {

            toast.error(
                "Reject failed"
            );

        }

    };



    return (

        <div>


            <h2 className="mb-4">
                Event Registrations
            </h2>



            <table className="table table-bordered">


                <thead className="table-dark">

                    <tr>

                        <th>
                            Volunteer
                        </th>

                        <th>
                            Event
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>



                <tbody>


                    {
                        registrations.map(
                            item => (

                                <tr
                                    key={
                                        item._id
                                    }
                                >

                                    <td>
                                        {
                                            item.volunteer?.name
                                        }
                                    </td>


                                    <td>
                                        {
                                            item.event?.title
                                        }
                                    </td>


                                    <td>
                                        {
                                            item.status
                                        }
                                    </td>


                                    <td>


{
item.status === "pending" ?


<>


<button

className="btn btn-success btn-sm me-2"

onClick={() =>
    handleApprove(item._id)
}

>

Approve

</button>




<button

className="btn btn-danger btn-sm"

onClick={() =>
    handleReject(item._id)
}

>

Reject

</button>


</>


:

<span
className={
item.status==="approved"
?
"badge bg-success"
:
"badge bg-danger"
}
>

{
item.status
}


</span>


}


</td>


                                </tr>

                            )
                        )
                    }


                </tbody>


            </table>


        </div>

    );

};


export default Registrations;