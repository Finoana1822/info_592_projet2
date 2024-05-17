import api from ".";
import { Recipe } from "../../@types/recipe.type";

export const recipeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUserFavoriteRecipes: build.query<Recipe[], number>({
      query: (user_id) => ({
        url: `/userFavoris/get-by-id/${user_id}`,
      }),
    }),
  }),
});

export const { useGetAllUserFavoriteRecipesQuery } = recipeApi;
