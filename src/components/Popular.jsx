import "../css/Popular.css";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  // CHECK POPULAR IN LOCAL STORAGE
  const getPopular = async () => {
    const popularLocalStorage = localStorage.getItem("popular");
    if (popularLocalStorage) {
      setPopular(JSON.parse(popularLocalStorage));
    } else {
      // GET POPULAR BY API
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random/?apiKey=${process.env.REACT_APP_API_KEY}&number=9`,
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <motion.div
      className="popular"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Splide
        options={{
          perPage: 3,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: "2rem",
        }}
      >
        {popular.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <div className="popular__slide">
              <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} />
              </Link>
              <Link to={`/recipe/${recipe.id}`}>
                <p>{recipe.title}</p>
              </Link>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </motion.div>
  );
}

export default Popular;
