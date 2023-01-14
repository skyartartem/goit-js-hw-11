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
      
     createMarkupCountries(data);
      
    })
    .catch(createErrorMessage);
}

function createMarkupCountries(data) {
  const markup = data.map(
    ({ flags: { svg }, name }) => `<li>
    <img src="${svg}" alt="${name}" width="30">
    <span>${name}</span>    
    </li>`
  );
//   refs.info.innerHTML = '';
  refs.list.innerHTML = markup.join('');
}

function createErrorMessage(err) {
  refs.list.innerHTML = '';
//   refs.info.innerHTML = '';
  // refs.input.value = ""
  Notify.failure(`Oops, there is no country with that name`);
}

// `<div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>`