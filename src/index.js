import './sass/main.scss';
import './js/.posthtmlrc.js';
import imgCardTpl from './templates/photo-card.hbs';
import imgLiteboxTpl from './templates/litebox.hbs';
import * as basicLightbox from 'basiclightbox';
import ImagesApiService from './js/apiService';

const searchForm = document.querySelector('#search-form');
const imagesContainer = document.querySelector('.gallery');
const photoCards = document.querySelector('#photos');

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

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imagesApiService.query !== '') {
      imagesApiService.fetchImages().then(images => {
        appendImagesMarkup(images);
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '200px',
});
observer.observe(photoCards);

const createLightbox = e => {
  const imageTarget = e.target.dataset;
  if (e.target.dataset.src === undefined) {
    return;
  }
  const instance = basicLightbox.create(imgLiteboxTpl(imageTarget));
  instance.show();
};

imagesContainer.addEventListener('click', createLightbox);
