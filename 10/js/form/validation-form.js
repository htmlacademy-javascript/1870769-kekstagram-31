const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const textDescriptionElement = uploadFormElement.querySelector('.text__description');

const LIMIT_HASHTAG = 5;
const patternHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const LIMIT_DESCRIPTION_LENGTH = 140;

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorClass: 'img-upload__field-wrapper--error'
});

const isValidLengthHashtags = (value) => value.split(' ').length <= LIMIT_HASHTAG;
const isValidDescription = (value) => value.length <= LIMIT_DESCRIPTION_LENGTH;

const isValidHashtags = (value) => {
  if (value === '') {
    return true;
  }

  return value.trim().split(' ').every((hashtag) => patternHashtag.test(hashtag));
};

const isUniqueHashtag = (value) => new Set(value.split(' ')).size === value.split(' ').length;

pristine.addValidator(hashtagElement, isValidLengthHashtags, `Хэштегов больше ${LIMIT_HASHTAG}`);
pristine.addValidator(hashtagElement, isValidHashtags, 'введён невалидный хэштег');
pristine.addValidator(hashtagElement, isUniqueHashtag, 'Хэштеги повторяются');

pristine.addValidator(textDescriptionElement, isValidDescription, 'Комментарий слишком длинный');

hashtagElement.addEventListener('input', () => {
  pristine.validate();
});

export { pristine };
