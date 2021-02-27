import * as basicLightbox from 'basiclightbox';

document.addEventListener('click', function (e) {
  if (!e.target.classList.contains('picture-scale')) {
    document.querySelector('body').classList.remove('stop-scroll');
  }
});

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('picture-scale')) {
    basicLightbox
      .create(`<img src=${e.target.dataset.origin} class="large-picture">`)
      .show();
    document.querySelector('body').classList.add('stop-scroll');
  }
});
