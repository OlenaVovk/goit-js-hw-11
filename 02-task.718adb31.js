!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=n.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,n){r[e]=n},n.parcelRequired7c6=a);var s=a("bpxeT"),o=a("2TvXO"),i=a("iU1Pc"),c=a("lbRHt");function l(e){return e.map((function(e){var n=e.webformatURL,t=e.largeImageURL,r=e.tags,a=e.likes,s=e.views,o=e.comments,i=e.downloads;return'<div class="photo-card">\n    <a class="gallery__item" href="'.concat(t,'"><img class="img" src="').concat(n,'" data-source="').concat(t,'" alt="').concat(r,'" loading="lazy"/></a>\n        <div class="info">\n          <p class="info-item"><span><b>Likes</b></span><span>').concat(a,'</span></p>\n          <p class="info-item"><span><b>Views</b></span><span>').concat(s,'</span></p>\n          <p class="info-item"><span><b>Comments</b></span><span>').concat(o,'</span></p>\n          <p class="info-item"><span><b>Downloads</b></span><span>').concat(i,"</span></p>\n        </div>\n    </div>")})).join("")}function u(e,n){n.insertAdjacentHTML("beforeend",l(e))}function d(e,n){n.innerHTML=l(e)}var f,p=1,m="",v=document.querySelector("form"),h=document.querySelector(".gallery"),g=document.querySelector(".message"),y=document.querySelector(".js-guard"),b=new IntersectionObserver((function(e,n){e.forEach((function(e){e.isIntersecting&&(p+=1,w(m))}))}),{root:null,rootMargin:"600px",threshold:1});function w(e){return L.apply(this,arguments)}function L(){return(L=e(s)(e(o).mark((function n(t){var r;return e(o).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,c.fetchAPI(t,p);case 3:if(r=n.sent,f=Math.ceil(r.totalHits/40),r.hits.length){n.next=10;break}return e(i).Notify.failure("Sorry, there are no images matching your search query. Please try again."),h.innerHTML="",g.classList.add("visually-hidden"),n.abrupt("return");case 10:1===p?(e(i).Notify.success("Hooray! We found ".concat(r.totalHits," images.")),d(r.hits,h),b.observe(y),g.classList.add("visually-hidden")):u(r.hits,h),p===f&&(g.classList.remove("visually-hidden"),b.unobserve(y)),n.next=18;break;case 14:n.prev=14,n.t0=n.catch(0),console.log("Oй помилочка: ",n.t0.message),e(i).Notify.failure("Упсс щось пішло не так... Спробуйте пізніше!");case 18:case"end":return n.stop()}}),n,null,[[0,14]])})))).apply(this,arguments)}v.addEventListener("submit",(function(n){if(n.preventDefault(),p=1,!(m=n.currentTarget.elements.searchQuery.value))return h.innerHTML="",g.classList.add("visually-hidden"),void e(i).Notify.failure("Введіть будь ласка текст для пошуку!");w(m),n.currentTarget.reset()})),document.addEventListener("scroll",(function(){var e=document.querySelector(".gallery").firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*e,behavior:"smooth"})}))}();
//# sourceMappingURL=02-task.718adb31.js.map