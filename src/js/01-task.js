
import '../css/styles.css';
import Notiflix from 'notiflix';
import OnlyScroll from 'only-scrollbar';
import * as API from './fetchAPI';
import {addImages, insertImages} from './renderMarkup';
import {clickOpenModalHendler, clickCloseModalHendler} from './lightbox';

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
  if (!searchQuery) {
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
    
    if (!data.hits.length) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      divEl.innerHTML = '';
      loadBtn.classList.add('visually-hidden');
      messageEl.classList.add('visually-hidden');
      return;
    }
    
    if (page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`); 
      insertImages(data.hits, divEl);
      divEl.addEventListener('click', clickOpenModalHendler);
      loadBtn.classList.remove('visually-hidden');
      messageEl.classList.add('visually-hidden');
    } else {
      addImages(data.hits, divEl);
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

//lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);
lightbox.addEventListener('click', clickCloseModalHendler);
 
//smooth scrolling
const scroll = new OnlyScroll(document.scrollingElement, {
    damping: 0.8,
    eventContainer: window,
});
