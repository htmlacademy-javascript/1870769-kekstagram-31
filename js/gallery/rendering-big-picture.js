import {isEscapeKey, getQuerySelector} from '../util.js';
import { createBigPictureComment, clearComments } from './create-big-picture-comment.js';

const bigPictureContainer = getQuerySelector(document, '.big-picture');

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

  getQuerySelector(bigPictureContainer, '.big-picture__img > img').src = photo.url;
  getQuerySelector(bigPictureContainer, '.social__comment-total-count').textContent = photo.comments.length;
  getQuerySelector(bigPictureContainer, '.likes-count').textContent = photo.likes;
  getQuerySelector(bigPictureContainer, '.social__caption').textContent = photo.description;
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
