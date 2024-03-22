const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagElement = document.querySelector('.text__hashtags');

const LIMIT_HASHTAG = 5;
const patternHashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorClass: 'img-upload__field-wrapper--error'
});

const isValidLengthHashtags = (value) => value.split(' ').length <= LIMIT_HASHTAG;

const isValidHashtags = (value) => {
  if (value === '') {
    return true;
  }

  return value.trim().split(' ').every((hashtag) => patternHashtag.test(hashtag));
};

const isUniqueHashtag = (value) => new Set(value.split(' ')).size === value.split(' ').length;

pristine.addValidator(hashtagElement, isValidLengthHashtags, `Хэштегов больше ${LIMIT_HASHTAG}`);
pristine.addValidator(hashtagElement, isValidHashtags, 'Не валидный хэштег');
pristine.addValidator(hashtagElement, isUniqueHashtag, 'Хэштеги повторяются');

hashtagElement.addEventListener('input', () => {
  pristine.validate();
});

const formValidation = (evt) => {
  if (pristine.validate()) {
    evt.preventDefault();
    uploadFormElement.submit();
  }
};

export { formValidation };
