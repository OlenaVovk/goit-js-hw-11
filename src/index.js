import './css/styles.css';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '32584793-3eb2bb36516e5beb26bc398d7';
const SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

function onSubmit (evt) {
    evt.preventDefault();
    fetchAPI(evt.currentTarget.elements[0].value)
        .then(data => {
            console.log('data', data);
            if (data.length === 0) {
                console.log('Sorry, there are no images matching your search query. Please try again.');
            }

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
    return newImg.hits;
}




//(evt) => {
 //   evt.preventDefault();
 //   console.log(evt.currentTarget.elements[0].value)
//})

