import '../css/styles.css';
import Notiflix from 'notiflix';
import baguetteBox from 'baguettebox.js';
import * as API from './fetchAPI';
//import {addImages, insertImages} from './renderMarkup';


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
//document.addEventListener('scroll', updateImg);

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

//function updateImg() {
//  const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
//  window.scrollBy({
//    top: cardHeight*2,
//    behavior: "smooth",
//  });
// }

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
      divEl.innerHTML = '';
      insertImages(data.hits, divEl);
      observer.observe(targetEl);
      messageEl.classList.add('visually-hidden');
    } else {
      insertImages(data, elem)
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

function makeMarkup(data) {

  return  data.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
  `<div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}"><img class="img" src="${webformatURL}" data-source="${largeImageURL}" alt="${tags}" loading="lazy"/></a>
        <div class="info">
          <p class="info-item"><span><b>Likes</b></span><span>${likes}</span></p>
          <p class="info-item"><span><b>Views</b></span><span>${views}</span></p>
          <p class="info-item"><span><b>Comments</b></span><span>${comments}</span></p>
          <p class="info-item"><span><b>Downloads</b></span><span>${downloads}</span></p>
        </div>
    </div>`).join('');  
}


  let gallery = new SimpleLightbox('.gallery a');
  console.log(gallery);
  



function insertImages(data, elem) {
  elem.insertAdjacentHTML('beforeend', makeMarkup(data));
  
  gallery.refresh();
  

}

   

