import '../form/load-img.js';
import { openModal,closeModal, isEscapeKey } from '../util.js';
import { createBigPictureComment, clearComments } from './create-big-picture-comment.js';

const bigPictureContainerElement = document.querySelector('.big-picture');

const onBigPictureClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const onBigPictureKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderBigPicture = (photo) => {
  createBigPictureComment(photo);

  bigPictureContainerElement.querySelector('.big-picture__img > img').src = photo.url;
  bigPictureContainerElement.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  bigPictureContainerElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureContainerElement.querySelector('.social__caption').textContent = photo.description;
};

function openBigPicture (photoProfile) {
  bigPictureContainerElement.querySelector('.big-picture__cancel').addEventListener('click', onBigPictureClick);

  document.addEventListener('keydown', onBigPictureKeydown);

  openModal(bigPictureContainerElement);
  renderBigPicture(photoProfile);
}

function closeBigPicture () {
  document.removeEventListener('click', onBigPictureClick);
  document.removeEventListener('keydown', onBigPictureKeydown);

  closeModal(bigPictureContainerElement);
  clearComments();
}

export { openBigPicture };
