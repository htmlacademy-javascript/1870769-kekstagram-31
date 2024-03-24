import { openModal, closeModal, isEscapeKey } from '../util.js';
import { clickControllBigger, clickControllSmaller } from './scale.js';
import { initializeImageEffects, closeSlider } from './effect-on-image.js';

const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadDescription = imgUploadOverlayElement.querySelector('.text__description');
const imgUploadHashtag = imgUploadOverlayElement.querySelector('.text__hashtags');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !imgUploadDescription.contains(document.activeElement) && !imgUploadHashtag.contains(document.activeElement)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onBigPictureClose = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

function openUploadForm () {
  openModal(imgUploadOverlayElement);
  initializeImageEffects();

  document.addEventListener('keydown', onDocumentKeydown);

  document.querySelector('.img-upload__cancel').addEventListener('click', onBigPictureClose);
  document.querySelector('.scale__control--bigger').addEventListener('click', clickControllBigger);
  document.querySelector('.scale__control--smaller').addEventListener('click', clickControllSmaller);
}

function closeUploadForm () {
  closeModal(imgUploadOverlayElement);
  closeSlider();

  document.removeEventListener('keydown', onDocumentKeydown);

  document.querySelector('.img-upload__cancel').removeEventListener('click', onBigPictureClose);
  document.querySelector('.scale__control--bigger').removeEventListener('click', clickControllBigger);
  document.querySelector('.scale__control--smaller').removeEventListener('click', clickControllSmaller);
}

export { openUploadForm, closeUploadForm };
