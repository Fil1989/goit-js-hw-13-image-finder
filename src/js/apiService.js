import refs from './refs';

const key = '20277592-c9806cff80bff398502402406';
export default {
  page: 1,
  scrollOneScreenHeigth: 0,
  query: '',

  set setquery(a) {
    this.query = a;
  },

  get getquery() {
    return this.query;
  },

  set setscrollOneScreenHeigth(b) {
    this.scrollOneScreenHeigth = b;
  },

  resetPage() {
    this.page = 1;
  },

  fetchPictures() {
    const url = `https://pixabay.com/api/?key=${key}&q=${this.getquery}&image_type=photo&per_page=12&page=${this.page}`;
    return fetch(url)
      .then(res => res.json())
      .catch(error => console.log(error));
  },
  incrementOfPage() {
    this.page += 1;
  },
  btnBeforePicturesLoaded() {
    refs.spinner.classList.remove('is-hidden');
    refs.btnLabel.textContent = 'Loading...';
    refs.btnShowMore.disabled = true;
    refs.btnShowMore.classList.remove('is-hidden');
  },
  btnAfterPicturesLoaded() {
    refs.spinner.classList.add('is-hidden');
    refs.btnLabel.textContent = 'Show more...';
    refs.btnShowMore.disabled = false;
    if (this.page !== 1) {
      window.scrollTo({
        top: this.scrollOneScreenHeigth,
        behavior: 'smooth',
      });
    }
  },
  hideBtnShowMore() {
    refs.btnShowMore.classList.add('is-hidden');
  },
};
