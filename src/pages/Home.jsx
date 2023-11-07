import Popular from "../components/Popular";
import Veggie from "../components/Veggie";
import Cuisine from "../components/Cuisine";
import Category from "../components/Category";
import Introduce from "../components/Introduce";
import Chocolate from "../components/Chocolate";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

function Home() {
  const { cuisineType } = useParams();

  return (
    <motion.div className="home">
      <Popular />
      <Category />
      {!cuisineType && <Veggie />}
      {cuisineType === "Italian" && <Cuisine type={cuisineType} />}
      {cuisineType === "American" && <Cuisine type={cuisineType} />}
      {cuisineType === "Thai" && <Cuisine type={cuisineType} />}
      {cuisineType === "Japanese" && <Cuisine type={cuisineType} />}
      <Introduce type="Subscribe" />
      <Chocolate />
    </motion.div>
  );
}

export default Home;
