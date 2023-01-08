import '../css/styles.css';
import Notiflix from 'notiflix';
import * as API from './fetchAPI';
import {addImages, insertImages} from './renderMarkup';


const PAGE_SET = 40;
let page = 1;
let searchQuery = '';
let max;

const form = document.querySelector('form');
const divEl = document.querySelector('.gallery');
const messageEl = document.querySelector('.message');
const targetEl = document.querySelector('.js-guard');

const options = {
  root: null,
  rootMargin: '600px',
  threshold: 1.0,
}
const observer = new IntersectionObserver(onLoad, options);

form.addEventListener('submit', onSubmit);
document.addEventListener('scroll', updateImg);

function onSubmit (evt) {
  evt.preventDefault();
  page = 1;
  searchQuery = evt.currentTarget.elements.searchQuery.value
  if (!searchQuery) {
    divEl.innerHTML = '';
    messageEl.classList.add('visually-hidden');
    Notiflix.Notify.failure('Введіть будь ласка текст для пошуку!'); 
    return;
  }
  fetchData(searchQuery);
  evt.currentTarget.reset();
}

function updateImg() {
  const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight*2,
    behavior: "smooth",
  });
}

function onLoad (entries, observer){
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page +=1;
      fetchData(searchQuery);
    } 
  });
}



async function fetchData (res) {
  try {
    const data = await API.fetchAPI(res, page);
    max = Math.ceil(data.totalHits/PAGE_SET);
    
    if (!data.hits.length) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      divEl.innerHTML = '';
      messageEl.classList.add('visually-hidden');
      return;
    }
    
    if (page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`); 
      insertImages(data.hits, divEl);
      observer.observe(targetEl);
      messageEl.classList.add('visually-hidden');
    } else {
      addImages(data.hits, divEl);
    }

    if (page === max) {
      messageEl.classList.remove('visually-hidden');
      observer.unobserve(targetEl);
    }
  } 
  
  catch (error) {
    console.log ('Oй помилочка: ', error.message);
    Notiflix.Notify.failure('Упсс щось пішло не так... Спробуйте пізніше!');
  }
}


