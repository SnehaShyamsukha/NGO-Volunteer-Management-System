const Pagination = ({
    currentPage,
    totalPages,
    setCurrentPage
}) => {


    return (

        <nav>


            <ul className="pagination">


                <li className="page-item">


                    <button

                        className="page-link"

                        disabled={
                            currentPage === 1
                        }

                        onClick={
                            () =>
                                setCurrentPage(
                                    currentPage - 1
                                )
                        }

                    >

                        Previous

                    </button>


                </li>



                {

                    Array.from(
                        {
                            length: totalPages
                        },

                        (_,index)=>(

                            <li

                                key={index}

                                className={
                                    `page-item ${
                                        currentPage === index+1
                                        ?
                                        "active"
                                        :
                                        ""
                                    }`
                                }

                            >

                                <button

                                    className="page-link"

                                    onClick={
                                        () =>
                                            setCurrentPage(
                                                index+1
                                            )
                                    }

                                >

                                    {
                                        index+1
                                    }

                                </button>


                            </li>

                        )

                    )

                }



                <li className="page-item">


                    <button

                        className="page-link"

                        disabled={
                            currentPage === totalPages
                        }

                        onClick={
                            () =>
                                setCurrentPage(
                                    currentPage + 1
                                )
                        }

                    >

                        Next

                    </button>


                </li>


            </ul>


        </nav>

    );

};


export default Pagination;