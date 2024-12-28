const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function getRecipes() {
  const response = await fetch(
    `${BASE_URL}/random?apiKey=${API_KEY}&number=9`
  );
  const data = await response.json();
  return data.recipes;
}

export async function getRecipe(id: number) {
  const response = await fetch(
    `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data;
}

