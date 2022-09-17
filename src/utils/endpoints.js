//const apiKey = '2ed50f18cc1446178f98816f679672f1';
const apiKey = 'cc1ef7f275ed420782a8c869acc377dd';

export const RANDOM_RECIPES_URL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;

export const FULL_RECIPE_URL = `https://api.spoonacular.com/recipes/information?includeNutrition=true&apiKey=${apiKey}`;