import fetchApi from './apiService';
import getRefs from './refs';
import cardTmpl from '../templates/pictureCards.hbs';

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
    .then(renderCards)
    .catch(error => console.log('Error: +++++++++++++', error));
}

function renderCards(res) {
  if (res.status === 404) {
    onFetchError();
  } else if (res.total === 0) {
    console.log('No pictures on your query');
    throw new Error('Not 2xx response');
  }
  refs.gallery.innerHTML = cardTmpl(res);
  page++;
  if (res.total > 12) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

function onFetchError() {
  renderError('Something went wrong, try again!');
}

function renderError(errText) {
  refs.gallery.innerHTML = '';
  return error({
    text: errText,
    modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
  });
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

function onLoadMoreClick() {
  fetchApi
    .fetchPictures(refs.inputQuery.value, page)
    .then(res => cardTmpl(res))
    .then(data => {
      refs.gallery.insertAdjacentHTML('beforeend', data);
    })
    .catch(error => console.log('Error: +++++++++++++', error));
  easyScroll();
  page++;
}

function easyScroll() {
  setTimeout(() => {
    refs.loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, 500);
}
