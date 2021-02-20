import './sass/style.scss';
import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './js/refs';
import renderThePictures from './js/render-function';
import serviceObj from './js/apiService';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import './js/lightbox-usage';

refs.inputForm.addEventListener('submit', searchingForPictures);

function searchingForPictures(event) {
  event.preventDefault();
  serviceObj.resetPage();
  serviceObj.setquery = event.currentTarget.elements.query.value;
  refreshingOfPicturesList();

  if (serviceObj.getquery !== '') {
    fetchAndBtnChange();
    return;
  }
  error({
    title: 'No symbols for search',
    text: 'Please try again!',
  });
}
refs.btnShowMore.addEventListener('click', forMorePictures);

function forMorePictures() {
  serviceObj.incrementOfPage();
  fetchAndBtnChange();
}

function fetchAndBtnChange() {
  serviceObj.btnBeforePicturesLoaded();

  serviceObj.setscrollOneScreenHeigth = document.documentElement.scrollHeight;

  serviceObj.fetchPictures().then(({ hits }) => {
    if (hits.length === 0) {
      error({
        title: 'No results',
        text: 'Please try enother request!',
      });

      serviceObj.hideBtnShowMore();
      return;
    }
    renderThePictures(hits);
    serviceObj.btnAfterPicturesLoaded();
  });
}
function refreshingOfPicturesList() {
  refs.placeForPictures.innerHTML = '';
}
