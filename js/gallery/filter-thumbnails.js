import { getData } from '../api.js';
import { getRandomInteger, debounce } from '../util.js';

const MAX_COUNT_SHOW_THUBNAILS = 10;
const RERENDER_DELAY = 500;

const buttonDefaultElement = document.querySelector('#filter-default');
const buttonRandomElement = document.querySelector('#filter-random');
const buttonDiscussedElement = document.querySelector('#filter-discussed');

const imgFilterButtonsElements = document.querySelectorAll('.img-filters__button');

const updateActiveFilterButtonStyles = (evt) => {
  imgFilterButtonsElements.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
};

const getUniqueRandomIndex = (min, max, count) => {
  const index = new Set();
  while (index.size < count) {
    index.add(getRandomInteger(min, max));
  }
  return Array.from(index);
};

const renderDiscussed = debounce((renderFunction) => {
  getData()
    .then((data) => {
      const sortedData = data.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);
      renderFunction(sortedData);
    });
}, RERENDER_DELAY);

const renderRandom = debounce((renderFunction) => {
  getData()
    .then((data) => {
      const randomIndex = getUniqueRandomIndex(0, data.length - 1, MAX_COUNT_SHOW_THUBNAILS);
      const randomData = randomIndex.map((index) => data[index]);
      renderFunction(randomData);
    });
}, RERENDER_DELAY);

const renderDefault = debounce((renderFunction) => {
  getData().then((data) => renderFunction(data));
}, RERENDER_DELAY);

const setDiscussedClick = (renderFunction) => {
  buttonDiscussedElement.addEventListener('click', (evt) => {
    updateActiveFilterButtonStyles(evt);
    renderDiscussed(renderFunction);
  });
};

const setRandomClick = (renderFunction) => {
  buttonRandomElement.addEventListener('click', (evt) => {
    updateActiveFilterButtonStyles(evt);
    renderRandom(renderFunction);
  });
};

const setDefaultClick = (renderFunction) => {
  buttonDefaultElement.addEventListener('click', (evt) => {
    updateActiveFilterButtonStyles(evt);
    renderDefault(renderFunction);
  });
};

export { setDiscussedClick, setRandomClick, setDefaultClick };
