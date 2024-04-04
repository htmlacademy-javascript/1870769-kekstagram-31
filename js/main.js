import './form/form.js';
import { setDiscussedClick, setRandomClick, setDefaultClick } from './gallery/filter-thumbnails.js';
import { getRenderingThumbnail } from './gallery/rendering-thumbnail.js';
import { openBigPicture } from './gallery/rendering-big-picture.js';
import { getData } from './api.js';

const TIME_CLEAR = 5_000;

const picturesElement = document.querySelector('.pictures');
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

getData()
  .then((data) => {
    getRenderingThumbnail(data);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');

    setDiscussedClick(getRenderingThumbnail);
    setRandomClick(getRenderingThumbnail);
    setDefaultClick(getRenderingThumbnail);
    picturesElement.addEventListener('click', (evt) => {
      const targetElement = evt.target.closest('.picture');

      if (targetElement?.dataset?.id) {
        evt.preventDefault();
        const photo = data.find((item) => item.id.toString() === targetElement.dataset.id);

        if (photo) {
          openBigPicture(photo);
        }
      }
    });
  })
  .catch(() => {
    document.body.append(errorTemplate);
    setTimeout(() => {
      document.body.removeChild(document.querySelector('.data-error'));
    }, TIME_CLEAR);
  });
