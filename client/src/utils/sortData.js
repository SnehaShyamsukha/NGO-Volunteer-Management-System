export const sortData = (
    data,
    key,
    order="asc"
)=>{


    return [...data].sort(
        (a,b)=>{


            if(order==="asc"){

                return a[key]
                >
                b[key]
                ?
                1
                :
                -1;

            }


            return a[key]
            <
            b[key]
            ?
            1
            :
            -1;


        }
    );


};