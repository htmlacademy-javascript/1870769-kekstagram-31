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
  }
};

const onBigPictureClose = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

const onSuccessTemplateClickClose = (evt) => {
  if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
    document.body.removeChild(successTemplate);
    closeModal(imgUploadOverlayElement);
    closeSlider();
  }
};
const onSuccessTemplateKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.body.removeChild(successTemplate);
    closeModal(imgUploadOverlayElement);
    closeSlider();
  }
};

const onErrorTemplateClickClose = (evt) => {
  if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
    document.body.removeChild(errorTemplate);
  }
};
const onErrorTemplateKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.body.removeChild(errorTemplate);
  }
};

const resetFormData = () => {
  pristine.reset();
  resetScale();
  document.querySelector('.img-upload__form').reset();
};

// errorTemplate.addEventListener('click', (evt) => {
//   if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
//     document.body.removeChild(errorTemplate);
//   }
// });
// errorTemplate.addEventListener('keydown', (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.stopPropagation();
//     document.body.removeChild(errorTemplate);
//   }
// });

function openUploadForm () {
  openModal(imgUploadOverlayElement);
  initializeImageEffects();

  document.querySelector('.img-upload__form').addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {
      return;
    }
    const formData = new FormData(evt.target);
    imgUploadButton.disabled = true;
    sendData(formData)
      .then(() => {
        document.body.append(successTemplate);
        successTemplate.addEventListener('keydown', onSuccessTemplateKeydown);
        successTemplate.addEventListener('click', onSuccessTemplateClickClose);

        resetFormData();
      })
      .catch(() => {
        document.body.append(errorTemplate);
        errorTemplate.addEventListener('keydown', onErrorTemplateKeydown);
        errorTemplate.addEventListener('click', onErrorTemplateClickClose);
      })
      .finally(() => {
        imgUploadButton.disabled = false;
      });
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.querySelector('.img-upload__cancel').addEventListener('click', onBigPictureClose);
  document.querySelector('.scale__control--bigger').addEventListener('click', clickControllBigger);
  document.querySelector('.scale__control--smaller').addEventListener('click', clickControllSmaller);
}

function closeUploadForm () {
  closeModal(imgUploadOverlayElement);
  closeSlider();
  resetFormData();
  document.removeEventListener('keydown', onDocumentKeydown);

  document.querySelector('.img-upload__cancel').removeEventListener('click', onBigPictureClose);
  document.querySelector('.scale__control--bigger').removeEventListener('click', clickControllBigger);
  document.querySelector('.scale__control--smaller').removeEventListener('click', clickControllSmaller);
}

export { openUploadForm };
