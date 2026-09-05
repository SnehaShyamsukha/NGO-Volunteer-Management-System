const StatCard = ({
    title,
    value,
    icon
}) => {


    return (

        <div className="col-md-3 mb-3">


            <div className="card shadow">


                <div className="card-body text-center">


                    <h3>
                        {icon}
                    </h3>


                    <h5>
                        {title}
                    </h5>


                    <h2 className="fw-bold">

                        {value}

                    </h2>


                </div>


            </div>


        </div>

    );

};


export default StatCard;