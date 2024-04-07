const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('.img-upload__start input[type=file]');
const previewElement = document.querySelector('.img-upload__preview img');
const previewEffectsElement = document.querySelectorAll('.effects__item span');

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const objectURL = URL.createObjectURL(file);
    previewElement.src = objectURL;
    previewEffectsElement.forEach((effect) => {
      effect.style.backgroundImage = `url(${objectURL})`;
    });
  }
});

