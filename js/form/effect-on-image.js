import { EffectsSetting } from './enum-effects.js';

const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = effectLevelContainerElement.querySelector('.effect-level__slider');
const valueElement = effectLevelContainerElement.querySelector('.effect-level__value');

const previewImageElement = document.querySelector('.img-upload__preview img');
const effectListElements = document.querySelector('.effects__list');

let sliderInitialized = false;

const initializeSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  return sliderElement;
};

const initializeEffects = (slidElem) => {
  slidElem.noUiSlider.on('update', () => {
    const value = slidElem.noUiSlider.get();
    const selectedEffectElement = effectListElements.querySelector('.effects__radio:checked');
    const selectedEffect = selectedEffectElement ? selectedEffectElement.value : 'none';
    valueElement.value = value;

    if (selectedEffect === 'none') {
      previewImageElement.style.filter = 'none';
      effectLevelContainerElement.style.display = 'none';
    } else {
      const { filter, unit } = EffectsSetting[selectedEffect.toUpperCase()];
      previewImageElement.style.filter = `${filter}(${value}${unit})`;
    }
  });

  effectListElements.addEventListener('change', (evt) => {
    const selectedEffect = evt.target.value;

    if (selectedEffect === 'none') {
      effectLevelContainerElement.style.display = 'none';
      previewImageElement.style.filter = '';
      sliderElement.noUiSlider.set(100);
      valueElement.value = 100;
    } else {
      effectLevelContainerElement.style.display = 'block';
      const { maxLimit, minLimit, start, step } = EffectsSetting[selectedEffect.toUpperCase()];
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: minLimit,
          max: maxLimit,
        },
        start: start,
        step: step,
      }
      );
      slidElem.noUiSlider.set(100);
    }
  });
};

const initializeImageEffects = () => {
  if (!sliderInitialized) {
    const slider = initializeSlider();
    initializeEffects(slider);
    sliderInitialized = true;
  }
};

const closeSlider = () => {
  if (sliderInitialized) {
    sliderElement.noUiSlider.destroy();
    sliderInitialized = false;
  }
};

export { initializeImageEffects, closeSlider };
