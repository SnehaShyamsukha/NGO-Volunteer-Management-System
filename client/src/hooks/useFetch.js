import {
    useEffect,
    useState
} from "react";



const useFetch = (apiFunction) => {


    const [
        data,
        setData
    ] = useState([]);



    const [
        loading,
        setLoading
    ] = useState(true);



    const [
        error,
        setError
    ] = useState(null);



    const fetchData = async() => {

        try {

            setLoading(true);


            const response =
                await apiFunction();


            setData(
                response.data
            );


        } catch(error) {

            setError(
                error.message
            );


        } finally {

            setLoading(false);

        }

    };



    useEffect(
        () => {

            fetchData();

        },

        []

    );



    return {

        data,

        loading,

        error,

        refetch:fetchData

    };

};


export default useFetch;