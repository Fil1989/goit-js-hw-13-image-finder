import refs from './refs';
import template from '../templates/gallery.hbs';

function renderThePictures(array) {
  const markup = template(array);
  refs.placeForPictures.insertAdjacentHTML('beforeend', markup);
}

export default renderThePictures;
