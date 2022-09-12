import client from './client';
const apiKey = '2ed50f18cc1446178f98816f679672f1';
const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;

const getRandom = () => client.get(BASE_URL);

export default {
    getRandom
};

