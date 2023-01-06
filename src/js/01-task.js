
import '../css/styles.css';
import Notiflix from 'notiflix';

import * as API from './fetchAPI'

console.log(API);

let page = 1;
let searchQuery = '';
let max;

const PAGE_SET = 40;

const form = document.querySelector('form');
const divEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const messageEl = document.querySelector('.message');

form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onClick);

function onSubmit (evt) {
  evt.preventDefault();
  page = 1;
  searchQuery = evt.currentTarget.elements.searchQuery.value
  if (searchQuery === '') {
    divEl.innerHTML = '';
    loadBtn.classList.add('visually-hidden');
    return Notiflix.Notify.failure('Введіть будь ласка текст для пошуку!');   
  }
  fetchData(searchQuery);
  evt.currentTarget.reset();
}

function onClick () {
  page +=1; 
  if (page === max) {
    loadBtn.classList.add('visually-hidden');
    messageEl.classList.remove('visually-hidden');
  }
  fetchData(searchQuery);
}

async function fetchData (res) {
  try {
    const data = await API.fetchAPI(res, page);
    max = Math.ceil(data.totalHits/PAGE_SET);
    
    if (data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      divEl.innerHTML = '';
      loadBtn.classList.add('visually-hidden');
      messageEl.classList.add('visually-hidden');
      return;
    }
    
    if (page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`); 
      insertImages(data.hits);
      loadBtn.classList.remove('visually-hidden');
      messageEl.classList.add('visually-hidden');
    } else {
      addImages(data.hits);
    }

    if (page === max) {
    loadBtn.classList.add('visually-hidden');
    messageEl.classList.remove('visually-hidden');
    }
  } 
  
  catch (error) {
    console.log ('Oй помилочка: ', error.message);
    Notiflix.Notify.failure('Упсс щось пішло не так... Спробуйте пізніше!');
  }
}

function makeMarkup(data) {
  return data.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
  `<div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}"><img class="img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item"><span><b>Likes</b></span><span>${likes}</span></p>
          <p class="info-item"><span><b>Views</b></span><span>${views}</span></p>
          <p class="info-item"><span><b>Comments</b></span><span>${comments}</span></p>
          <p class="info-item"><span><b>Downloads</b></span><span>${downloads}</span></p>
        </div>
    </div>`).join('');   
}

function addImages(data) {
  divEl.insertAdjacentHTML('beforeend', makeMarkup(data));
}

function insertImages(data) {
  divEl.innerHTML = makeMarkup(data);
}

//let gallery = new SimpleLightbox('.gallery a', {
//    widthRatio: 0.6,
//    heightRatio: 0.6,
//});


