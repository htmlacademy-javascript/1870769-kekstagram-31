import { getRenderingThumbnail } from '../rendering-thumbnail.js';
import { openBigPicture } from './rendering-big-picture.js';
import { getData } from '../api.js';

getData()
  .then((data) => {
    getRenderingThumbnail(data);

    document.querySelector('.pictures').addEventListener('click', (evt) => {
      const parent = evt.target.parentNode;

      if (parent?.dataset?.id) {
        evt.preventDefault();
        const profile = data.find((item) => item.id.toString() === parent.dataset.id);

        if (profile) {
          openBigPicture(profile);
        }
      }
    });
  });
