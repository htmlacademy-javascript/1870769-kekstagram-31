import '../form/form.js';
import { getRenderingThumbnail } from './rendering-thumbnail.js';
import { openBigPicture } from './rendering-big-picture.js';

const picturesElement = document.querySelector('.pictures');

const renderGallery = (data) => {
  getRenderingThumbnail(data);

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
};

export { renderGallery };
