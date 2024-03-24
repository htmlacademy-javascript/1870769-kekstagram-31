const SCALE_STEP_PERCENTAGE = 25;
const SCALE_MIN_LENGTH_PERCENTAGE = 25;
const SCALE_MAX_LENGTH_PERCENTAGE = 100;
const SCALE_VALUE_DEFAULT_PERCENTAGE = 100;

const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

let currentValue = SCALE_VALUE_DEFAULT_PERCENTAGE;

const updateImageScale = () => {
  imgPreviewElement.style.transform = `scale(${currentValue / 100})`;
};

const clickControllSmaller = () => {
  if (currentValue > SCALE_MIN_LENGTH_PERCENTAGE) {
    currentValue -= SCALE_STEP_PERCENTAGE;
    scaleControlValueElement.value = `${currentValue}%`;
    updateImageScale();
  }
};

const clickControllBigger = () => {
  if (currentValue < SCALE_MAX_LENGTH_PERCENTAGE) {
    currentValue += SCALE_STEP_PERCENTAGE;
    scaleControlValueElement.value = `${currentValue}%`;
    updateImageScale();
  }
};

const handleScaleInputChange = () => {
  currentValue = parseFloat(scaleControlValueElement.value);
  updateImageScale();
};
scaleControlValueElement.addEventListener('input', handleScaleInputChange);

export { clickControllBigger, clickControllSmaller };
