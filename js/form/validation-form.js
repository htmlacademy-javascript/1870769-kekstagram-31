const LIMIT_HASHTAG = 5;
const patternHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const LIMIT_DESCRIPTION_LENGTH = 140;

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const textDescriptionElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorClass: 'img-upload__field-wrapper--error'
});

const getHashtegs = (value) =>
  value
    .trim()
    .split(' ')
    .filter((i) => !!i.trim());

const isValidLengthHashtegs = (value) => getHashtegs(value).length <= LIMIT_HASHTAG;
const isValidDescription = (value) => value.length <= LIMIT_DESCRIPTION_LENGTH;

const isValidHashtags = (value) => {
  if (value === '') {
    return true;
  }

  return getHashtegs(value).every((hashtag) => patternHashtag.test(hashtag));
};

const isUniqueHashteg = (value) => {
  const lowercaseTags = getHashtegs(value.toLowerCase());
  return new Set(lowercaseTags).size === lowercaseTags.length;
};

pristine.addValidator(hashtagElement, isValidLengthHashtegs, `Хэштегов больше ${LIMIT_HASHTAG}`);
pristine.addValidator(hashtagElement, isValidHashtags, 'введён невалидный хэштег');
pristine.addValidator(hashtagElement, isUniqueHashteg, 'Хэштеги повторяются');

pristine.addValidator(textDescriptionElement, isValidDescription, 'Комментарий слишком длинный');

hashtagElement.addEventListener('input', () => {
  pristine.validate();
});

export { pristine };
