export const RANDOM_RECIPES_URL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}&number=10`;

export const FULL_RECIPE_URL = `https://api.spoonacular.com/recipes/information?includeNutrition=true&apiKey=${process.env.REACT_APP_RECIPE_API_KEY}`;