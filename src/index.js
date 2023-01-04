
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";

import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '32584793-3eb2bb36516e5beb26bc398d7';
const SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true';

let page = 1;
let searchQuery = '';


const form = document.querySelector('form');
const divEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onClick);

function onSubmit (evt) {
  evt.preventDefault();
  searchQuery = evt.currentTarget.elements.searchQuery.value
  console.log('search', searchQuery);
  if (searchQuery === '') {
    //divEl.innerHTML = '';
    return Notiflix.Notify.failure('Введіть будь ласка текст для пошуку!');  
  }
  fetchData(searchQuery);
  //evt.currentTarget.reset();
}

function onClick () {
  page +=1;
  console.log('page',page);
  console.log('searchQuery', searchQuery);
  
  fetchData(searchQuery);

}

async function fetchAPI (name, page = 1 ) {
    const response = await axios.get(`${BASE_URL}?key=${KEY_API}&q=${name}&${SETTINGS}&page=${page}&per_page=40`);
    console.log('response', response);
    return response.data;
}

async function fetchData (res) {
  try {
    const data = await fetchAPI(res, page);
    //console.log('data', data);
    if (data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        divEl.innerHTML = '';
        return;
      }
    if (page === 1) {
     Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`); 
    }  
    renderImages(data.hits);
    loadBtn.classList.remove('visually-hidden');
    console.log(page);
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
    divEl.insertAdjacentHTML('beforeend', markup);
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



