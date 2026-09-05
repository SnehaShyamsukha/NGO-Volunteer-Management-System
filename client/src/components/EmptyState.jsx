const EmptyState = ({
    message="No data found"
}) => {


    return (

        <div className="text-center my-5">


            <h5>

                {message}

            </h5>


        </div>

    );

};


export default EmptyState;