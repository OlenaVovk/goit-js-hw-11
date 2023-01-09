export function makeMarkup(data) {
  return data.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
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

export function addImages(data, elem) {
  elem.insertAdjacentHTML('beforeend', makeMarkup(data));
}

export function insertImages(data, elem) {
  elem.innerHTML = makeMarkup(data);
}