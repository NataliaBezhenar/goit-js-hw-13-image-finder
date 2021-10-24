import fetchApi from './apiService';
import getRefs from './refs';
import cardTmpl from '../templates/pictureCards.hbs';
import { renderError } from './notifications';

const refs = getRefs();
let page = 1;
refs.form.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  if (refs.inputQuery.value.length === 0) {
    return;
  }
  fetchApi
    .fetchPictures(refs.inputQuery.value, page)
    .then(renderCards);
}

function renderCards(res) {
  if (res.status === 404) {
    renderError('Error 404 occured. Cannot implement query');
  } else if (res.total === 0) {
    renderError('No results were found. Try to change your query');
    return;
  }
  refs.gallery.innerHTML = cardTmpl(res);
  page++;
  if (res.total > 12) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

function onLoadMoreClick() {
  fetchApi
    .fetchPictures(refs.inputQuery.value, page)
    .then(res => cardTmpl(res))
    .then(data => {
      refs.gallery.insertAdjacentHTML('beforeend', data);
    })
    .catch(renderError('Error occured. Something went wrong'));
  easyScroll();
  page++;
}

function easyScroll() {
  setTimeout(() => {
    refs.loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, 500);
}
