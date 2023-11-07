import "../css/Category.css";
import Introduce from "./Introduce";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import { NavLink } from "react-router-dom";

function Category() {
    return (
        <div className="category">
            <Introduce type="About" />
            <div className="category__content">
                <div className="category__nav">
                    <NavLink to={"/Italian"} className="category__nav-item">
                        <FaPizzaSlice />
                        <h4>Italian</h4>
                    </NavLink>
                    <NavLink to={"/American"} className="category__nav-item">
                        <FaHamburger />
                        <h4>American</h4>
                    </NavLink>
                    <NavLink to={"/Thai"} className="category__nav-item">
                        <GiNoodles />
                        <h4>Thai</h4>
                    </NavLink>
                    <NavLink to={"/Japanese"} className="category__nav-item">
                        <GiChopsticks />
                        <h4>Japanese</h4>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Category;
