import axios from "axios";

const BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}&number=10&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`;

const client = axios.create({
  // Later read this URL from an environment variable
  baseURL: BASE_URL,
  withCredentials: false
});

export default client;