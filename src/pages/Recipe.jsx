import "../css/Recipe.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Recipe() {
    const [details, setDetails] = useState({});
    const [activeButton, setActiveButton] = useState("Instructions");
    const { id } = useParams();

    useEffect(() => {
        const getRecipe = async () => {
            const detailStorage = localStorage.getItem(`recipe_${id}`);
            if (detailStorage) {
                setDetails(JSON.parse(detailStorage));
            } else {
                const api = fetch(
                    `https://api.spoonacular.com/recipes/${id}/information/?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`,
                );
                const response = await api;
                if (!response.ok) {
                    throw new Error(
                        `API error: ${response.status} - ${response.statusText}`,
                    );
                }
                const detailData = await response.json().catch((error) => {
                    throw new Error("Error parsing response data:", error);
                });
                localStorage.setItem(
                    `recipe_${id}`,
                    JSON.stringify(detailData),
                );
                setDetails(detailData);
            }
        };
        getRecipe();
    }, [id]);

    return (
        <motion.div
            className="recipe"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="recipe__left">
                <a href="/">Popular</a>
                <h3>{details.title}</h3>
                <img src={details.image} alt={details.title} />
            </div>
            <div className="recipe__right">
                <button
                    className={activeButton === "Instructions" ? "active" : ""}
                    onClick={() => setActiveButton("Instructions")}
                >
                    Instructions
                </button>
                <button
                    className={activeButton === "Ingredients" ? "active" : ""}
                    onClick={(Ingredients) => setActiveButton("Ingredients")}
                >
                    Ingredients
                </button>
                <div className="recipe__right-content">
                    {activeButton === "Instructions" && (
                        <div className="recipe__right-description">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: details.summary,
                                }}
                            ></p>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: details.instructions,
                                }}
                            ></p>
                        </div>
                    )}
                    {activeButton === "Ingredients" && (
                        <ul>
                            {details.extendedIngredients?.map((ingredient) => (
                                <li key={ingredient.id}>
                                    {ingredient.original}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default Recipe;
