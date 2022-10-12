import axios from "axios";

const apiKey = '2ed50f18cc1446178f98816f679672f1';
// const apiKey = 'cc1ef7f275ed420782a8c869acc377dd';
// const apiKey = 'a3577636ccd3420a92a088027e661830';
// const apiKey = 'b44514ae9c644024a55ec4e856cf0fd2';
const BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=10&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`;

const client = axios.create({
  // Later read this URL from an environment variable
  baseURL: BASE_URL,
  withCredentials: false
});

export default client;