const SearchBar = ({
    search,
    setSearch,
    placeholder="Search..."
}) => {


    return (

        <input

            type="text"

            className="form-control mb-3"

            placeholder={placeholder}

            value={search}

            onChange={
                e =>
                    setSearch(
                        e.target.value
                    )
            }

        />

    );

};


export default SearchBar;