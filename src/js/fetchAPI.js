import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '32584793-3eb2bb36516e5beb26bc398d7';
const SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true';
const PAGE_SET = 40;

export async function fetchAPI (name, page = 1 ) {
    const response = await axios.get(`${BASE_URL}?key=${KEY_API}&q=${name}&${SETTINGS}&page=${page}&per_page=${PAGE_SET}`);
    return response.data;
}