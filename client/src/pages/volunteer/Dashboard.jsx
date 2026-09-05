const VolunteerDashboard = () => {


    const cards = [
        "Registered Events",
        "Completed Events",
        "Volunteer Hours",
        "Certificates"
    ];


    return (

        <div>

            <h2 className="mb-4">
                Volunteer Dashboard
            </h2>


            <div className="row">

                {
                    cards.map(
                        (item, index) => (

                            <div
                                className="col-md-3 mb-3"
                                key={index}
                            >

                                <div className="card shadow">

                                    <div className="card-body">

                                        <h5>
                                            {item}
                                        </h5>

                                        <h3>
                                            0
                                        </h3>

                                    </div>

                                </div>

                            </div>

                        )
                    )
                }

            </div>


        </div>

    );

};


export default VolunteerDashboard;