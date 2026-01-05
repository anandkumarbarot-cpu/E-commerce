import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    
    useEffect(() => {
        
        
        onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearch]);

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            onSearch(keyword);
        } else {
            onSearch("");
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                placeholder="Search a Product ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
    );
};

export default SearchBar;
