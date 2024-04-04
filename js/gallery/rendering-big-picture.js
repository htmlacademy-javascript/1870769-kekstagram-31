import { openModal,closeModal } from '../util.js';
import { createBigPictureComment, clearComments } from './create-big-picture-comment.js';

const bigPictureContainerElement = document.querySelector('.big-picture');

const onBigPictureClose = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const renderBigPicture = (photo) => {
  createBigPictureComment(photo);

  bigPictureContainerElement.querySelector('.big-picture__img > img').src = photo.url;
  bigPictureContainerElement.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  bigPictureContainerElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureContainerElement.querySelector('.social__caption').textContent = photo.description;
};

function openBigPicture (photoProfile) {
  document.querySelector('.big-picture__cancel').addEventListener('click', onBigPictureClose);

  openModal(bigPictureContainerElement);
  renderBigPicture(photoProfile);
}

function closeBigPicture () {
  document.removeEventListener('click', onBigPictureClose);

  closeModal(bigPictureContainerElement);
  clearComments();
}

export { openBigPicture };
