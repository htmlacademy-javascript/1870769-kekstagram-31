import { openModal, closeModal, isEscapeKey } from '../util.js';
import { formValidation } from './validation-form.js';

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
  formValidation();

  document.addEventListener('keydown', onDocumentKeydown);
  document.querySelector('.img-upload__cancel').addEventListener('click', onBigPictureClose);
}

function closeUploadForm () {
  closeModal(imgUploadOverlayElement);
  document.removeEventListener('click', onBigPictureClose);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.querySelector('.img-upload__cancel').removeEventListener('click', onBigPictureClose);
}

export { openUploadForm, closeUploadForm };
