import "../css/Cuisine.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Cuisine({ type }) {
    const [cuisine, setCuisine] = useState([]);

    useEffect(() => {
        const getCuisine = async () => {
            const checkCuisine = localStorage.getItem(`cuisine${type}`);
            if (checkCuisine) {
                setCuisine(JSON.parse(checkCuisine));
            } else {
                const api = await fetch(
                    `https://api.spoonacular.com/recipes/random/?apiKey=${process.env.REACT_APP_API_KEY}&number=5&cuisine=${type}`,
                );
                const data = await api.json();
                console.log(data);
                const cuisineAPI = data.recipes.map((recipe) => ({
                    ...recipe,
                    isLove: false,
                }));
                localStorage.setItem(
                    `cuisine${type}`,
                    JSON.stringify(cuisineAPI),
                );
                setCuisine(cuisineAPI);
            }
        };
        getCuisine();
    }, [type]);

    const handleLoveIconClick = (id) => {
        const updateCuisine = cuisine.map((recipe) => {
            if (recipe.id === id) {
                return {
                    ...recipe,
                    isLove: !recipe.isLove,
                };
            } else {
                return recipe;
            }
        });
        localStorage.setItem(`cuisine${type}`, JSON.stringify(updateCuisine));
        setCuisine(updateCuisine);
    };

    return (
        <motion.div
            className="cuisine"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="cuisine__list">
                {cuisine.map((recipe) => (
                    <div className="cuisine__item">
                        <Link to={`/recipe/${recipe.id}`}>
                            <div className="cuisine__left">
                                <img
                                    className="cuisine__left-image"
                                    src={recipe.image}
                                    alt={recipe.title}
                                />
                                <div className="cuisine__slide-gradient"></div>
                            </div>
                        </Link>
                        <div className="cuisine__right">
                            <Link to={`/recipe/${recipe.id}`}>
                                <p className="cuisine__right-title">
                                    {recipe.title}
                                </p>
                            </Link>
                            <p
                                className="cuisine__right-description"
                                dangerouslySetInnerHTML={
                                    recipe.instructions
                                        ? { __html: recipe.instructions }
                                        : { __html: recipe.summary }
                                }
                            ></p>
                            <div className="cuisine__empty"></div>
                            <div className="cuisine__right-bottom">
                                <div className="cuisine__right-feedback">
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

export default Cuisine;
