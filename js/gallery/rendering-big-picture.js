import { isEscapeKey } from '../util.js';
import { createBigPictureComment, clearComments } from './create-big-picture-comment.js';

const bigPictureContainer = document.querySelector('.big-picture');

const onBigPictureClose = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderBigPicture = (photo) => {
  createBigPictureComment(photo);

  bigPictureContainer.querySelector('.big-picture__img > img').src = photo.url;
  bigPictureContainer.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  bigPictureContainer.querySelector('.likes-count').textContent = photo.likes;
  bigPictureContainer.querySelector('.social__caption').textContent = photo.description;
};

function openBigPicture (photoProfile) {
  bigPictureContainer.classList.remove('hidden');

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  document.querySelector('.big-picture__cancel').addEventListener('click', onBigPictureClose);

  renderBigPicture(photoProfile);
}

function closeBigPicture () {
  bigPictureContainer.classList.add('hidden');

  document.body.classList.remove('modal-open');
  document.removeEventListener('click', onBigPictureClose);
  document.removeEventListener('keydown', onDocumentKeydown);
  clearComments();
}

export { openBigPicture, closeBigPicture };
