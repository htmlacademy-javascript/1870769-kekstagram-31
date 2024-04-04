import { getData } from '../api.js';
import { getRandomInteger, debounce } from '../util.js';

const MAX_COUNT_SHOW_THUBNAILS = 10;

const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

const imgFilterButtons = document.querySelectorAll('.img-filters__button');

const updateActiveFilterButtonStyles = (evt) => {
  imgFilterButtons.forEach((button) => {
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

const setDiscussedClick = (renderFunction) => {
  buttonDiscussed.addEventListener('click', (evt) => {
    updateActiveFilterButtonStyles(evt);
    const debouncedRender = debounce(() => getData().then((data) => {
      const sortedData = data.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);
      renderFunction(sortedData);
    }));

    debouncedRender();
  });
};

const setRandomClick = (renderFunction) => {
  buttonRandom.addEventListener('click', (evt) => {
    updateActiveFilterButtonStyles(evt);
    const debouncedRender = debounce(() => getData()
      .then((data) => {
        const randomIndex = getUniqueRandomIndex(0, data.length - 1, MAX_COUNT_SHOW_THUBNAILS);
        const randomData = randomIndex.map((index) => data[index]);
        renderFunction(randomData);
      }));

    debouncedRender();
  });

};

const setDefaultClick = (renderFunction) => {
  buttonDefault.addEventListener('click', (evt) => {
    updateActiveFilterButtonStyles(evt);
    const debouncedRender = debounce(() => getData().then((data) => renderFunction(data)));

    debouncedRender();
  });
};

export { setDiscussedClick, setRandomClick, setDefaultClick };
