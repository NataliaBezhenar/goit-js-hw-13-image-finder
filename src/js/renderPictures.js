import fetchApi from './apiService';
import getRefs from './refs';
import cardTmpl from '../templates/pictureCards.hbs';

const refs = getRefs();

refs.form.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  if (refs.inputQuery.value.length === 0) {
    return;
  }
  fetchApi
    .fetchPictures(refs.inputQuery.value)
    .then(renderCards)
    .catch(error => console.log('Error: +++++++++++++', error));

  refs.loadMoreBtn.classList.remove('is-hidden');
}

function renderCards(res) {
  if (res.status === 404) {
    onFetchError();
  }
  refs.gallery.innerHTML = cardTmpl(res);
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
