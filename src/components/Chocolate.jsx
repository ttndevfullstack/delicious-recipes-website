import "../css/Chocolate.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Chocolate() {
    const [chocolates, setChocolates] = useState([]);

    useEffect(() => {
        getChocolates();
    }, []);

    const getChocolates = async () => {
        const chocolatesLocalStorage = localStorage.getItem("chocolates");
        if (chocolatesLocalStorage) {
            setChocolates(JSON.parse(chocolatesLocalStorage));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${process.env.REACT_APP_API_KEY}&query="chocolate"&number=15`,
            );
            const response = await api;
            // CHECK API
            if (!response.ok) {
                throw new Error(
                    `API error: ${response.status} - ${response.statusText}`,
                );
            }
            // CHECK PARSING TO JSON
            const data = await response.json().catch((error) => {
                throw new Error("Error parsing response data:", error);
            });
            // SET LOCAL STORAGE
            if (data.results) {
                localStorage.setItem(
                    "chocolates",
                    JSON.stringify(data.results),
                );
            }
            setChocolates(data.results);
        }
    };

    return (
        <motion.section
            className="chocolate"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <header className="chocolate__header">
                <h1>#</h1>
                <h1>Chocolate</h1>
                <h1>& The Sweetness</h1>
                <div className="chocolate__header-follow">Follow</div>
            </header>
            <main className="chocolate__content">
                {chocolates.map((chocolate) => (
                    <Link key={chocolate.id} to={`/recipe/${chocolate.id}`}>
                        <div
                            className="chocolate__content-image"
                            key={chocolate.id}
                        >
                            <img src={chocolate.image} alt={chocolate.title} />
                            <div className="chocolate__gradient">
                                <span>
                                    #View<br></br>#more<br></br>#information
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </main>
        </motion.section>
    );
}

export default Chocolate;
