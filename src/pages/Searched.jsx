import "../css/Searched.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";

function Searched() {
    const [recipesSearch, setRecipesSearch] = useState([]);
    let { search } = useParams();
    console.log(recipesSearch);

    useEffect(() => {
        const recipesSearchStorage = localStorage.getItem(`searched-${search}`);
        if (recipesSearchStorage) {
            setRecipesSearch(JSON.parse(recipesSearchStorage));
        } else {
            const getRecipesSearch = async () => {
                const api = await fetch(
                    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${search}&addRecipeInformation=true&includeNutrition=true&instructionsRequired=true&number=15`,
                );
                const data = await api.json();
                const recipesSearchAPI = data.results.map((recipe) => ({
                    ...recipe,
                    isLove: false,
                }));
                localStorage.setItem(
                    `searched-${search}`,
                    JSON.stringify(recipesSearchAPI),
                );
                setRecipesSearch(recipesSearchAPI);
            };
            getRecipesSearch();
        }
    }, [search]);

    const handleLoveIconClick = (id) => {
        const updateRecipesSearch = recipesSearch.map((recipe) => {
            if (recipe.id === id) {
                return {
                    ...recipe,
                    isLove: !recipe.isLove,
                };
            } else {
                return recipe;
            }
        });
        localStorage.setItem(
            `searched-${search}`,
            JSON.stringify(updateRecipesSearch),
        );
        setRecipesSearch(updateRecipesSearch);
    };

    return (
        <motion.main
            className="searched"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="searched__list">
                {recipesSearch?.map((recipe) => (
                    <div key={recipe.id} className="searched__item">
                        <Link to={`/recipe/${recipe.id}`}>
                            <div className="searched__top">
                                <img
                                    className="searched__top-image"
                                    src={recipe.image}
                                    alt={recipe.title}
                                />
                                <div className="searched__slide-gradient"></div>
                            </div>
                        </Link>
                        <div className="searched__bottom">
                            <Link to={`/recipe/${recipe.id}`}>
                                <p className="searched__bottom-title">
                                    {recipe.title}
                                </p>
                            </Link>
                            <p
                                className="searched__bottom-description"
                                dangerouslySetInnerHTML={{
                                    __html: recipe.summary,
                                }}
                            ></p>
                            <div className="searched__empty"></div>
                            <div className="searched__bottom-stats">
                                <div className="searched__bottom-feedback">
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
        </motion.main>
    );
}

export default Searched;
