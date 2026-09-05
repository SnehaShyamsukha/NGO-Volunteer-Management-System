const DataTable = ({
    columns,
    data,
    actions
}) => {


    return (

        <div className="table-responsive">


            <table className="table table-bordered table-hover">


                <thead className="table-dark">

                    <tr>

                        {
                            columns.map(
                                (
                                    column,
                                    index
                                ) => (

                                    <th
                                        key={index}
                                    >
                                        {
                                            column.label
                                        }
                                    </th>

                                )
                            )
                        }


                        {
                            actions &&
                            <th>
                                Actions
                            </th>
                        }


                    </tr>


                </thead>



                <tbody>


                    {
                        data.map(
                            (
                                item,
                                index
                            ) => (

                                <tr
                                    key={index}
                                >

                                    {
                                        columns.map(
                                            (
                                                column,
                                                index
                                            ) => (

                                                <td
                                                    key={index}
                                                >

                                                    {
                                                        item[
                                                            column.key
                                                        ]
                                                    }

                                                </td>

                                            )
                                        )
                                    }



                                    {
                                        actions &&

                                        <td>

                                            {actions(item)}

                                        </td>

                                    }


                                </tr>

                            )
                        )
                    }


                </tbody>


            </table>


        </div>

    );

};


export default DataTable;