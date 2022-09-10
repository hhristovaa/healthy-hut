import axios from "axios";

const apiKey = '2ed50f18cc1446178f98816f679672f1';
const BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=30&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`;

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: BASE_URL
});

export default apiClient;