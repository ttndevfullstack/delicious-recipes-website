import "../css/Header.css";
import Navbar from "../components/Navbar";
import Search from "./Search";

function Header() {
    return (
        <header className="header">
            <div className="header__left">
                <div className="header__logo">
                    <a href="/">R&C</a>
                </div>
                <div className="header__title">
                    <p>The Raw</p>
                    <p>& The Cooked</p>
                    <p className="header__title-italic">Vegan Recipe Blog</p>
                </div>
            </div>
            <div className="header__right">
                <Search />
                <Navbar />
            </div>
        </header>
    );
}

export default Header;
