import "../css/Search.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handlerSubmit = (e) => {
        e.preventDefault();
        navigate(`/searched/${input}`);
    };

    return (
        <div className="search">
            <form className="search__form" onSubmit={handlerSubmit}>
                <div className="search__form-trick"></div>
                <input
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What are you looking for?"
                />
                <AiOutlineSearch />
                <span className="search__form-line"></span>
            </form>
        </div>
    );
}

export default Search;
