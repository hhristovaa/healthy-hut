import axios from 'axios';
const apiKey = '2ed50f18cc1446178f98816f679672f1';
const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;
// const BASE_URL = 'https://api.spoonacular.com/recipes/';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'

    }
});