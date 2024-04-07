import { getData } from './api.js';
import { renderGallery } from './gallery/gallery.js';

const TIME_CLEAR = 5_000;
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

getData()
  .then((data) => renderGallery(data))
  .catch(() => {
    document.body.append(errorTemplate);
    setTimeout(() => {
      document.body.removeChild(document.querySelector('.data-error'));
    }, TIME_CLEAR);
  });
