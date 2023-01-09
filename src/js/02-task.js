//import baguetteBox from 'baguettebox.js';

import '../css/styles.css';
import Notiflix from 'notiflix';
//import disableScroll from 'disable-scroll';
import * as API from './fetchAPI';
import { makeMarkup } from './renderMarkup';

const PAGE_SET = 40;
let page;
let searchQuery = '';
let max;
let gallery;  

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
  searchQuery = evt.currentTarget.elements.searchQuery.value
  console.log('searchQuery',searchQuery);
  page = 1;
  if (!searchQuery) {
    divEl.innerHTML = '';
    Notiflix.Notify.failure('Введіть будь ласка текст для пошуку!');   
    return;
  }  
  if (searchQuery) {
    fetchData(searchQuery);
  } 
  evt.currentTarget.reset();
}

function updateImg() {
 //console.dir (divEl.firstElementChild.getBoundingClientRect())
  const { height: cardHeight } = divEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight*2,
    behavior: "smooth",
  });
}


function onLoad (entries, observer){
  entries.forEach(entry => {
    console.log('entry.isIntersecting', entry.isIntersecting)
    console.log('page', page)
    if (!searchQuery) {
      return;
    }
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

    console.log('data',data);
    console.log('data.hits.length',data.hits.length);
    
    if (!data.hits.length) {
      
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      divEl.innerHTML = '';
      messageEl.classList.add('visually-hidden');
      return;
    }
    
    if (page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`); 
      divEl.innerHTML = makeMarkup(data.hits);
      gallery = new SimpleLightbox('.gallery a');
      observer.observe(targetEl);
      messageEl.classList.add('visually-hidden');
    } else {
      divEl.insertAdjacentHTML('beforeend', makeMarkup(data.hits));
      gallery.refresh();
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



  
