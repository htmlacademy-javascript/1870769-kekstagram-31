import { openModal, closeModal, isEscapeKey } from '../util.js';
import { clickControllBigger, clickControllSmaller, resetScale} from './scale.js';
import { initializeImageEffects, closeSlider } from './effect-on-image.js';
import { pristine } from './validation-form.js';
import { sendData } from '../api.js';

const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadDescription = imgUploadOverlayElement.querySelector('.text__description');
const imgUploadHashtag = imgUploadOverlayElement.querySelector('.text__hashtags');
const imgUploadButton = imgUploadOverlayElement.querySelector('.img-upload__submit');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !imgUploadDescription.contains(document.activeElement) && !imgUploadHashtag.contains(document.activeElement)) {
    evt.preventDefault();
    closeUploadForm();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onBigPictureClose = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

const onSuccessTemplateClickClose = (evt) => {
  if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
    closeSuccessTemplate();
  }
};

const onSuccessTemplateKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessTemplate();
  }
};

const onErrorTemplateClickClose = (evt) => {
  if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
    closeErrorTemplate();
  }
};

const onErrorTemplateKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorTemplate();
  }
};

const resetFormData = () => {
  pristine.reset();
  resetScale();
  document.querySelector('.img-upload__form').reset();
};

function openUploadForm () {
  openModal(imgUploadOverlayElement);
  initializeImageEffects();

  document.addEventListener('keydown', onDocumentKeydown);
  document.querySelector('.img-upload__form').addEventListener('submit', handleSubmit);
  document.querySelector('.img-upload__cancel').addEventListener('click', onBigPictureClose);
  document.querySelector('.scale__control--bigger').addEventListener('click', clickControllBigger);
  document.querySelector('.scale__control--smaller').addEventListener('click', clickControllSmaller);
}

function closeUploadForm () {
  closeModal(imgUploadOverlayElement);
  closeSlider();
  resetFormData();

  document.querySelector('.img-upload__cancel').removeEventListener('click', onBigPictureClose);
  document.querySelector('.scale__control--bigger').removeEventListener('click', clickControllBigger);
  document.querySelector('.scale__control--smaller').removeEventListener('click', clickControllSmaller);
}

function closeSuccessTemplate () {
  closeModal(imgUploadOverlayElement);
  closeSlider();
  document.body.removeChild(successTemplate);
  document.removeEventListener('keydown', onSuccessTemplateKeydown);
  successTemplate.removeEventListener('click', onSuccessTemplateClickClose);
}

function closeErrorTemplate () {
  document.body.removeChild(errorTemplate);
  document.removeEventListener('keydown', onErrorTemplateKeydown);
  errorTemplate.removeEventListener('click', onErrorTemplateClickClose);
  document.addEventListener('keydown', onDocumentKeydown);
}

function handleSubmit(evt) {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }
  const formData = new FormData(evt.target);
  imgUploadButton.disabled = true;
  sendData(formData)
    .then(() => {
      document.body.append(successTemplate);
      document.addEventListener('keydown', onSuccessTemplateKeydown);
      successTemplate.addEventListener('click', onSuccessTemplateClickClose);
      resetFormData();
    })
    .catch(() => {
      document.body.append(errorTemplate);
      document.addEventListener('keydown', onErrorTemplateKeydown);
      errorTemplate.addEventListener('click', onErrorTemplateClickClose);
    })
    .finally(() => {
      document.querySelector('.img-upload__form').removeEventListener('submit', handleSubmit);
      document.removeEventListener('keydown', onDocumentKeydown);
      imgUploadButton.disabled = false;
    });
}

export { openUploadForm };
