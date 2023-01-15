import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './sass/styles.scss';
import { fetchImages } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
root: null,
rootMargin: '300px',
threshold: 1.0
}
const observer = new IntersectionObserver (onInfinityLoad, options);

let page = 1;

let gallery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250
});

const refs = {
   form: document.querySelector('.search-form'),
   input: document.querySelector('.search-input'),
   list: document.querySelector('.gallery'),
   guard: document.querySelector('.js-guard')
 };

refs.form.addEventListener('submit',onInputName);

function onInputName(evt) {
  evt.preventDefault();
  //  const name = evt.currentTarget.elements.searchQuery.value;
  const name = refs.input.value;
  if (!name) {
    // refs.list.innerHTML = '';
    return;
  }
  page = 1;
  fetchImages(name, page)
    .then(data => {
      if (!data.total) {
        Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      } else { Notify.success(`Hooray! We found ${data.totalHits} images.`);}
      
     const markup = createMarkup(data);
     newMarkup (markup);
      observer.observe(refs.guard);
    })
    .catch(createErrorMessage);
    // .catch(err=>console.error(err));
}

function createMarkup(data) {
  const markup = data.hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `   
    <div class="photo-card gallery__image">
    <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>${views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${downloads}
    </p>
  </div>
</div>`
  );
  return markup.join('');
}

function newMarkup(markup){
  refs.list.innerHTML = markup;
}

function addMarkup(markup){
 refs.list.insertAdjacentHTML('beforeend', markup);
}

function createErrorMessage(err) {
  // refs.list.innerHTML = '';
  // refs.info.innerHTML = '';
  // refs.input.value = ""
  Notify.failure(
    `${err}`
  );
}

function onInfinityLoad (entries){
// console.log(entries)
entries.forEach(entry => {
  if (entry.isIntersecting){
    page+=1
    fetchImages(refs.input.value, page)
    .then(data => {
           
     const markup = createMarkup(data);
     addMarkup (markup);
     console.log(data.totalHits/40,"-",page, '', data.totalHits/40 <= page);
     if(data.totalHits/40 <= page){
      observer.unobserve(refs.guard);
      Notify.success(`We're sorry, but you've reached the end of search results.`)
     }
     
    })
    .catch(createErrorMessage);
  }
});
}

