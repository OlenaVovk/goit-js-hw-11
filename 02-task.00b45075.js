function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},s={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in s){var n=s[e];delete s[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){s[e]=n},n.parcelRequired7c6=i);var a=i("eWCmQ"),o=i("cqGDw");function r(e){return e.map((({webformatURL:e,largeImageURL:n,tags:t,likes:s,views:i,comments:a,downloads:o})=>`<div class="photo-card">\n    <a class="gallery__item" href="${n}"><img class="img" src="${e}" data-source="${n}" alt="${t}" loading="lazy"/></a>\n        <div class="info">\n          <p class="info-item"><span><b>Likes</b></span><span>${s}</span></p>\n          <p class="info-item"><span><b>Views</b></span><span>${i}</span></p>\n          <p class="info-item"><span><b>Comments</b></span><span>${a}</span></p>\n          <p class="info-item"><span><b>Downloads</b></span><span>${o}</span></p>\n        </div>\n    </div>`)).join("")}function l(e,n){n.insertAdjacentHTML("beforeend",r(e))}function c(e,n){n.innerHTML=r(e)}let d,u=1,f="";const p=document.querySelector("form"),m=document.querySelector(".gallery"),g=document.querySelector(".message"),y=document.querySelector(".js-guard"),h=new IntersectionObserver((function(e,n){e.forEach((e=>{e.isIntersecting&&(u+=1,v(f))}))}),{root:null,rootMargin:"600px",threshold:1});async function v(n){try{const t=await o.fetchAPI(n,u);if(d=Math.ceil(t.totalHits/40),!t.hits.length)return e(a).Notify.failure("Sorry, there are no images matching your search query. Please try again."),m.innerHTML="",void g.classList.add("visually-hidden");1===u?(e(a).Notify.success(`Hooray! We found ${t.totalHits} images.`),c(t.hits,m),h.observe(y),g.classList.add("visually-hidden")):l(t.hits,m),u===d&&(g.classList.remove("visually-hidden"),h.unobserve(y))}catch(n){console.log("Oй помилочка: ",n.message),e(a).Notify.failure("Упсс щось пішло не так... Спробуйте пізніше!")}}p.addEventListener("submit",(function(n){if(n.preventDefault(),u=1,f=n.currentTarget.elements.searchQuery.value,!f)return m.innerHTML="",g.classList.add("visually-hidden"),void e(a).Notify.failure("Введіть будь ласка текст для пошуку!");v(f),n.currentTarget.reset()})),document.addEventListener("scroll",(function(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:2*e,behavior:"smooth"})}));
//# sourceMappingURL=02-task.00b45075.js.map
