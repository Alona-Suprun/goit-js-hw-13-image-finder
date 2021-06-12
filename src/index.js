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
    return alert('Введи что-то нормальное');
  }

  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImages();
};

searchForm.addEventListener('submit', onSearch);
