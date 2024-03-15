import {isEscapeKey, getQuerySelector} from '../util.js';
import { createBigPictureComment } from './create-big-picture-comment.js';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const bigPictureContainerElement = getQuerySelector(document, '.big-picture');

const createBigPictureSocial = (profile) => {
  createBigPictureComment(profile);

  const commentList = bigPictureContainerElement.querySelectorAll('.social__comment');

  getQuerySelector(bigPictureContainerElement, '.social__comment-shown-count').textContent = commentList.length;
  getQuerySelector(bigPictureContainerElement, '.social__comment-total-count').textContent = profile.comments.length;
  getQuerySelector(bigPictureContainerElement, '.likes-count').textContent = profile.likes;
  getQuerySelector(bigPictureContainerElement, '.social__caption').textContent = profile.description;
};

const renderBigPicture = (photo) => {
  getQuerySelector(bigPictureContainerElement, '.big-picture__img > img').src = photo.url;

  createBigPictureSocial(photo);
};

function openBigPicture (photoProfile) {
  bigPictureContainerElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  renderBigPicture(photoProfile);
}

function closeBigPicture () {
  bigPictureContainerElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export { openBigPicture, closeBigPicture };
