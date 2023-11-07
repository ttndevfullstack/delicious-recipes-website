import Home from "./Home";
import Searched from "./Searched";
import Recipe from "./Recipe";
import Contact from "./Contact";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function Pages() {
    const location = useLocation();

    return (
        <AnimatePresence initial={false} mode="wait" className="pages">
            <Routes location={location} key={location.key}>
                <Route path="/" element={<Home />} />
                <Route path="/:cuisineType" element={<Home />} />
                <Route path="/searched/:search" element={<Searched />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </AnimatePresence>
    );
}

export default Pages;
