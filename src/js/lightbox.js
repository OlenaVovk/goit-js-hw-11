

export function clickOpenModalHendler (evt){
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG"){
    return;
  }
  
  const images = document.querySelectorAll('img');
  images.forEach(() => {
    lightbox.classList.add('active');
    const img = document.createElement('img');
    img.src = evt.target.dataset.source;
    while(lightbox.firstChild){
      lightbox.removeChild(lightbox.firstChild);
    }
  lightbox.append(img);
  })
  document.addEventListener('keydown', onEscPress);   
};

export function clickCloseModalHendler (evt) {
  if (evt.target.nodeName !== "IMG"){
    return
  }
  lightbox.classList.remove('active'); 
  document.removeEventListener('keydown', onEscPress);
};

function onEscPress (evt) {
  if (evt.code === 'Escape'){
    lightbox.classList.remove('active');  
  };  
}