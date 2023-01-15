import './css/styles.css';
import { fetchImages } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

 const refs = {
   form: document.querySelector('.search-form'),
   input: document.querySelector('.search-input'),
   list: document.querySelector('.gallery'),
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

  fetchImages(name)
    .then(data => {
      if (!data.total) {
        Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      } else { Notify.success(`Hooray! We found ${data.totalHits} images.`);}
     createMarkup(data);
      
    })
    .catch(createErrorMessage);
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
    }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`
  );
//   refs.info.innerHTML = '';
  refs.list.innerHTML = markup.join('');
}

function createErrorMessage(err) {
  refs.list.innerHTML = '';
//   refs.info.innerHTML = '';
  // refs.input.value = ""
  Notify.failure(
    `Errore.`
  );
}
