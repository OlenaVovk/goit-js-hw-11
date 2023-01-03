import './css/styles.css';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '32584793-3eb2bb36516e5beb26bc398d7';
const SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true';

const form = document.querySelector('form');
const divEl = document.querySelector('.gallery');
form.addEventListener('submit', onSubmit);

function onSubmit (evt) {
    evt.preventDefault();
    fetchAPI(evt.currentTarget.elements[0].value)
        .then(data => {
            console.log('data', data);
            if (data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                divEl.innerHTML = '';
                return;
            } 
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            renderImages(data.hits);
            console.log (data.hits.length);
        
            

        })
        .catch(error => console.log ('Упсс щось пішло не так: ', error.message))
    evt.currentTarget.reset();
}



async function fetchAPI (name) {
    const response = await fetch(`${BASE_URL}?key=${KEY_API}&q=${name}&${SETTINGS}`);
    console.log('response', response);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const newImg = await response.json();
    return newImg;
}

function renderImages(data) {
    const markup = data.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
    </div>
    </div>`).join('');
    divEl.innerHTML = markup;
}




