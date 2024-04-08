import { openModal, closeModal, isEscapeKey } from '../util.js';
import { clickControllBigger, clickControllSmaller, resetScale} from './scale.js';
import { initializeImageEffects, closeSlider } from './effect-on-image.js';
import { pristine } from './validation-form.js';
import { sendData } from '../api.js';

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');
const imgUploadButtonElement = imgUploadOverlayElement.querySelector('.img-upload__submit');
const imgUploadCancelElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');

const imgUploadDescriptionElement = imgUploadOverlayElement.querySelector('.text__description');
const imgUploadHashtagElement = imgUploadOverlayElement.querySelector('.text__hashtags');

const imgUploadControlBiggerElement = imgUploadOverlayElement.querySelector('.scale__control--bigger');
const imgUploadControlSmallerElement = imgUploadOverlayElement.querySelector('.scale__control--smaller');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (
    isEscapeKey(evt)
      && !imgUploadDescriptionElement.contains(document.activeElement)
      && !imgUploadHashtagElement.contains(document.activeElement)
  ) {
    evt.preventDefault();
    closeUploadForm();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onBigPictureClickClose = (evt) => {
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
  imgUploadFormElement.reset();
};

function openUploadForm () {
  openModal(imgUploadOverlayElement);
  initializeImageEffects();

  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadFormElement.addEventListener('submit', handleSubmit);
  imgUploadCancelElement.addEventListener('click', onBigPictureClickClose);
  imgUploadControlBiggerElement.addEventListener('click', clickControllBigger);
  imgUploadControlSmallerElement.addEventListener('click', clickControllSmaller);
}

function closeUploadForm () {
  closeModal(imgUploadOverlayElement);
  closeSlider();
  resetFormData();

  imgUploadCancelElement.removeEventListener('click', onBigPictureClickClose);
  imgUploadControlBiggerElement.removeEventListener('click', clickControllBigger);
  imgUploadControlSmallerElement.removeEventListener('click', clickControllSmaller);
}

function closeSuccessTemplate () {
  closeModal(imgUploadOverlayElement);
  closeSlider();
  successTemplate.parentElement.removeChild(successTemplate);
}

function closeErrorTemplate () {
  errorTemplate.parentElement.removeChild(errorTemplate);
  document.removeEventListener('keydown', onErrorTemplateKeydown);
  errorTemplate.removeEventListener('click', onErrorTemplateClickClose);
  imgUploadOverlayElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function handleSubmit(evt) {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }
  imgUploadOverlayElement.classList.add('hidden');

  const formData = new FormData(evt.target);
  imgUploadButtonElement.disabled = true;
  sendData(formData)
    .then(() => {
      document.body.append(successTemplate);
      closeUploadForm();
      document.addEventListener('keydown', onSuccessTemplateKeydown);
      successTemplate.addEventListener('click', onSuccessTemplateClickClose);
      resetFormData();
    })
    .catch(() => {
      document.body.append(errorTemplate);
      document.addEventListener('keydown', onErrorTemplateKeydown);
      errorTemplate.addEventListener('click', onErrorTemplateClickClose);
      document.removeEventListener('keydown', onDocumentKeydown);
    })
    .finally(() => {
      imgUploadButtonElement.disabled = false;
    });
}

export { openUploadForm };
