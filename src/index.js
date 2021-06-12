import './sass/main.scss';
import './js/.posthtmlrc.js';
import imgCardTpl from './templates/photo-card.hbs';
import ImagesApiService from './js/apiService';

const searchForm = document.querySelector('#search-form');
const imagesContainer = document.querySelector('.gallery');

const imagesApiService = new ImagesApiService();

const appendImagesMarkup = hits => {
  imagesContainer.insertAdjacentHTML('beforeend', imgCardTpl(hits));
};

const fetchImages = () => {
  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
  });
};

const clearImagesContainer = () => {
  imagesContainer.innerHTML = '';
};

const onSearch = e => {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;

  if (imagesApiService.query === '') {
    return;
  }

  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImages();
};

searchForm.addEventListener('submit', onSearch);

let observer = new IntersectionObserver(
  (e, observer) => {
    e.forEach(entry => {
      if (entry.isIntersecting) {
        createLi();
      }
      observer.unobserve(e.target);
      observer.observe(document.querySelector('li:last-child'));
    });
  },
  {
    threshold: 1,
  },
);

observer.observe(document.querySelector('li'));
