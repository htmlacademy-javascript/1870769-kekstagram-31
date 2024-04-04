const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const openModal = (element) => {
  element.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeModal = (element) => {
  element.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomInteger,
  isEscapeKey,
  openModal,
  closeModal,
  debounce
};
