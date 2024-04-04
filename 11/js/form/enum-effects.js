const EffectsSetting = {
  CHROME: {
    filter: 'grayscale',
    minLimit: 0,
    maxLimit: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  SEPIA: {
    filter: 'sepia',
    minLimit: 0,
    maxLimit: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  MARVIN: {
    filter: 'invert',
    minLimit: 0,
    maxLimit: 100,
    step: 1,
    start: 100,
    unit: '%'
  },
  PHOBOS: {
    filter: 'blur',
    minLimit: 0,
    maxLimit: 3,
    step: 0.1,
    start: 3,
    unit: 'px'
  },
  HEAT: {
    filter: 'brightness',
    minLimit: 1,
    maxLimit: 3,
    step: 0.1,
    start: 3,
    unit: ''
  },
};

export { EffectsSetting };
