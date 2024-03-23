const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectItemElements = document.querySelectorAll('.effects__item');

let sliderInitialized = false;

const initializeSlider = () => {
  if (sliderInitialized) {
    return;
  }
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
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
  sliderInitialized = true;

  return sliderElement;
};

const initializeEffects = (slidElem) => {
  function updateImageStyle(effect, value) {
    switch (effect) {
      case 'chrome':
        previewImage.style.filter = `grayscale(${value})`;
        break;
      case 'sepia':
        previewImage.style.filter = `sepia(${value})`;
        break;
      case 'marvin':
        previewImage.style.filter = `invert(${value}%)`;
        break;
      case 'phobos':
        previewImage.style.filter = `blur(${value}px)`;
        break;
      case 'heat':
        previewImage.style.filter = `brightness(${value})`;
        break;
      default:
        previewImage.style.filter = 'none';
        break;
    }
  }

  slidElem.noUiSlider.set(100);
  valueElement.value = 100;

  slidElem.noUiSlider.on('update', () => {
    const value = slidElem.noUiSlider.get();
    valueElement.value = value;
    const selectedEffectElement = document.querySelector('.effects__item:checked');
    const selectedEffect = selectedEffectElement ? selectedEffectElement.value : 'none';
    updateImageStyle(selectedEffect, value);
  });

  effectItemElements.forEach((effectItem) => {
    effectItem.addEventListener('click', () => {
      const selectedEffect = effectItem.value;
      if (selectedEffect === 'none') {
        effectLevelContainer.style.display = 'none';
        previewImage.style.filter = 'none';
      } else {
        effectLevelContainer.style.display = 'block';
        const currentValue = slidElem.noUiSlider.get();
        updateImageStyle(selectedEffect, currentValue);
        slidElem.noUiSlider.set(100);
        valueElement.value = 100;
      }
    });
  });
};

const initializeImageEffects = () => {
  const slider = initializeSlider();
  initializeEffects(slider);

  return slider;
};

const closeSlider = () => initializeImageEffects().noUiSlider.destroy();


export { initializeImageEffects, closeSlider };
