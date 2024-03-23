const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

const SCALE_STEP_PERCENTAGE = 25 / 100;
const SCALE_MIN_LENGTH_PERCENTAGE = 25 / 100;
const SCALE_MAX_LENGTH_PERCENTAGE = 100 / 100;
const SCALE_VALUE_DEFAULT_PERCENTAGE = 100 / 100;

let currentValue = SCALE_VALUE_DEFAULT_PERCENTAGE;

const updateImageScale = () => {
  imgPreviewElement.style.transform = `scale(${currentValue})`;
};

const clickControllSmaller = () => {
  if (currentValue > SCALE_MIN_LENGTH_PERCENTAGE) {
    currentValue -= SCALE_STEP_PERCENTAGE;
    scaleControlValueElement.value = `${currentValue * 100}%`;
    updateImageScale();
  }
};

const clickControllBigger = () => {
  if (currentValue < SCALE_MAX_LENGTH_PERCENTAGE) {
    currentValue += SCALE_STEP_PERCENTAGE;
    scaleControlValueElement.value = `${currentValue * 100}%`;
    updateImageScale();
  }
};

const handleScaleInputChange = () => {
  currentValue = parseFloat(scaleControlValueElement.value) / 100;
  updateImageScale();
};
scaleControlValueElement.addEventListener('input', handleScaleInputChange);

export { clickControllBigger, clickControllSmaller };
