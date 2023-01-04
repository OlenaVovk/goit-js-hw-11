
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";

import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '32584793-3eb2bb36516e5beb26bc398d7';
const SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true';

const form = document.querySelector('form');
const divEl = document.querySelector('.gallery');
form.addEventListener('submit', onSubmit);

function onSubmit (evt) {
  evt.preventDefault();
  //console.log('search', evt.currentTarget.elements[0].value);
  fetchData(evt.currentTarget.elements[0].value);
  evt.currentTarget.reset();
}

async function fetchAPI (name) {
    const response = await axios.get(`${BASE_URL}?key=${KEY_API}&q=${name}&${SETTINGS}`);
    //console.log('response', response);
    return response.data;
}

async function fetchData (res) {
  try {
    const data = await fetchAPI(res);
    //console.log('data', data);
    if (data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        divEl.innerHTML = '';
        return;
      }
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    renderImages(data.hits);
  } catch (error) {
    console.log ('Oй помилочка: ', error.message);
    Notiflix.Notify.failure('Упсс щось пішло не так... Спробуйте пізніше!');
  }
}

function renderImages(data) {
    const markup = data.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
      <div class="info">
        <p class="info-item"><span><b>Likes</b></span><span>${likes}</span></p>
        <p class="info-item"><span><b>Views</b></span><span>${views}</span></p>
        <p class="info-item"><span><b>Comments</b></span><span>${comments}</span></p>
        <p class="info-item"><span><b>Downloads</b></span><span>${downloads}</span></p>
      </div>
    </div>`).join('');
    divEl.innerHTML = markup;
}















//fetchAPI(evt.currentTarget.elements[0].value)
//    .then(data => {
//      if (data.hits.length === 0) {
//        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//        divEl.innerHTML = '';
//        return;
//      }
//      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//      renderImages(data.hits);
//      })
//    .catch(error => {
//      console.log ('Oй помилочка: ', error.message);
//      Notiflix.Notify.failure('Упсс щось пішло не так... Спробуйте пізніше!')
//    })



