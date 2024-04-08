const MAX_HASHTAG_LIMIT = 5;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
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

const getHashtags = (value) =>
  value
    .trim()
    .split(' ')
    .filter((i) => !!i.trim());

const isValidHashtagLength = (value) => getHashtags(value).length <= MAX_HASHTAG_LIMIT;
const isValidDescription = (value) => value.length <= LIMIT_DESCRIPTION_LENGTH;

const isValidHashtagFormat = (value) => {
  if (value === '') {
    return true;
  }

  return getHashtags(value).every((hashtag) => HASHTAG_PATTERN.test(hashtag));
};

const isUniqueHashtags = (value) => {
  const lowercaseTags = getHashtags(value.toLowerCase());
  return new Set(lowercaseTags).size === lowercaseTags.length;
};

pristine.addValidator(hashtagElement, isValidHashtagLength, `Хэштегов больше ${MAX_HASHTAG_LIMIT}`);
pristine.addValidator(hashtagElement, isValidHashtagFormat, 'введён невалидный хэштег');
pristine.addValidator(hashtagElement, isUniqueHashtags, 'Хэштеги повторяются');

pristine.addValidator(textDescriptionElement, isValidDescription, 'Комментарий слишком длинный');

hashtagElement.addEventListener('input', () => {
  pristine.validate();
});

export { pristine };
