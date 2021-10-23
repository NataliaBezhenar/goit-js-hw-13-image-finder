import fetchApi from './apiService';
import getRefs from './refs'
import cardTmpl from '../templates/pictureCards.hbs'

const debounce = require('lodash.debounce');
const refs = getRefs();





const onInputValue = debounce(() => {
  if (refs.inputQuery.value.length === 0) {
    return;
  }
  fetchApi.fetchPictures(refs.inputQuery.value)
  //.then(res => console.log(res))
  .then(renderCards)
  .catch(error => console.log("Error: +++++++++++++", error));

}, 2000);


refs.inputQuery.addEventListener('input', onInputValue);

function renderCards(res) {
  if (res.status === 404) {
    onFetchError();
  } 
  console.log(cardTmpl(res))
  refs.gallery.innerHTML = cardTmpl(res)
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