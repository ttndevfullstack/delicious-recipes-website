import "../css/Veggie.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";

function Veggie() {
    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        // CHECK Veggie IN LOCAL STORAGE
        const getVeggie = async () => {
            const veggieLocalStorage = localStorage.getItem("veggie");
            if (veggieLocalStorage) {
                setVeggie(JSON.parse(veggieLocalStorage));
            } else {
                // GET Veggie BY API
                const api = await fetch(
                    `https://api.spoonacular.com/recipes/random/?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`,
                );
                const data = await api.json();
                const veggieAPI = data.recipes.map((recipe) => ({
                    ...recipe,
                    isLove: false,
                }));
                localStorage.setItem("veggie", JSON.stringify(veggieAPI));
                setVeggie(veggieAPI);
            }
        };
        getVeggie();
    }, []);

    const handleLoveIconClick = (id) => {
        const updateVeggie = veggie.map((recipe) => {
            if (recipe.id === id) {
                return {
                    ...recipe,
                    isLove: !recipe.isLove,
                };
            } else {
                return recipe;
            }
        });
        localStorage.setItem("veggie", JSON.stringify(updateVeggie));
        setVeggie(updateVeggie);
    };

    return (
        <motion.div
            className="veggie"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="veggie__list">
                {veggie.map((recipe) => (
                    <div key={recipe.id} className="veggie__item">
                        <Link to={`/recipe/${recipe.id}`}>
                            <div className="veggie__left">
                                <img
                                    className="veggie__left-image"
                                    src={recipe.image}
                                    alt={recipe.title}
                                />
                                <div className="veggie__slide-gradient"></div>
                            </div>
                        </Link>
                        <div className="veggie__right">
                            <Link to={`/recipe/${recipe.id}`}>
                                <p className="veggie__right-title">
                                    {recipe.title}
                                </p>
                            </Link>
                            <p
                                className="veggie__right-description"
                                dangerouslySetInnerHTML={{
                                    __html: recipe.instructions,
                                }}
                            ></p>
                            <div className="veggie__empty"></div>
                            <div className="veggie__right-bottom">
                                <div className="veggie__right-feedback">
                                    <span>0 views</span>
                                    <span>0 comments</span>
                                </div>
                                {!recipe.isLove && (
                                    <AiOutlineHeart
                                        onClick={() =>
                                            handleLoveIconClick(recipe.id)
                                        }
                                    />
                                )}
                                {recipe.isLove && (
                                    <BsFillHeartFill
                                        onClick={() =>
                                            handleLoveIconClick(recipe.id)
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default Veggie;
