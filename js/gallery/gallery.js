import { getArrayPhotoProfiles } from '../create-array-photo-profiles.js';
import { getRenderingThumbnail } from './rendering-thumbnail.js';
import { openBigPicture, closeBigPicture } from './rendering-big-picture.js';

const data = getArrayPhotoProfiles();

getRenderingThumbnail(data);

document.querySelector('.pictures').addEventListener('click', (evt) => {
  evt.preventDefault();

  const parent = evt.target.parentNode;

  if(parent?.dataset?.id) {
    const profile = data.find((item) => item.id.toString() === parent.dataset.id);

    if(profile) {
      openBigPicture(profile);
    }
  }
  document.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);
});
