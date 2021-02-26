import './sass/style.scss';
import 'basiclightbox/dist/basicLightbox.min.css';
require('intersection-observer');

import './js/intersection-observer';
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

const numSteps = 20.0;

let boxElement;
let prevRatio = 0.0;
let increasingColor = 'rgba(40, 40, 190, ratio)';
let decreasingColor = 'rgba(190, 40, 40, ratio)';

// Set things up
window.addEventListener(
  'load',
  event => {
    boxElement = document.querySelector('.gallery:nth-child(12n+12))');

    createObserver();
  },
  false,
);

function createObserver() {
  let observer;

  let options = {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList(),
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}
function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}
function handleIntersect(entries, observer) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor.replace(
        'ratio',
        entry.intersectionRatio,
      );
    } else {
      entry.target.style.backgroundColor = decreasingColor.replace(
        'ratio',
        entry.intersectionRatio,
      );
    }

    prevRatio = entry.intersectionRatio;
  });
}
