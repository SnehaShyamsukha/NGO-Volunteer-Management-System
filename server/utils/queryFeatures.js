class QueryFeatures {

    constructor(query,queryString) {
        this.query = query;
        this.queryString = queryString;
    }


    search(fields) {

        const search =
            this.queryString.search;


        if(search) {

            this.query = this.query.find({

                $or:fields.map(field=>({

                    [field]:{
                        $regex:search,
                        $options:"i"
                    }

                }))

            });

        }

        return this;
    }


    filter() {

        const queryObj = {
            ...this.queryString
        };


        [
            "search",
            "page",
            "limit"
        ]
        .forEach(
            field=>delete queryObj[field]
        );


        this.query =
            this.query.find(queryObj);


        return this;
    }


    pagination() {

        const page =
            Number(this.queryString.page) || 1;


        const limit =
            Number(this.queryString.limit) || 10;


        const skip =
            (page-1)*limit;


        this.query =
            this.query
            .skip(skip)
            .limit(limit);


        return this;
    }
}


export default QueryFeatures;