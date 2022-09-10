import client from './client';

const getRandom = () => client.get("&diet=vegan");

export default {
    getRandom
};

