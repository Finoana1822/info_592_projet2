import React, { useEffect } from "react";
import { useGetAllUserFavoriteRecipesQuery } from "../../redux/api/recipeApiForTest";

const Home: React.FC = () => {
  const { data } = useGetAllUserFavoriteRecipesQuery(20);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return <div>Home</div>;
};

export default Home;
