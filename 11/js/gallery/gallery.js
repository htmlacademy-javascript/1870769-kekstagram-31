// import { getRenderingThumbnail } from './rendering-thumbnail.js';
// import { openBigPicture } from './rendering-big-picture.js';
// import { getData } from '../api.js';

// const picteresElement = document.querySelector('.pictures');

// const TIME_CLEAR = 5000;

// getData()
//   .then((data) => {
//     getRenderingThumbnail(data);
//     picteresElement.addEventListener('click', (evt) => {
//       const targetElement = evt.target.closest('.picture');

//       if (targetElement?.dataset?.id) {
//         evt.preventDefault();
//         const photo = data.find((item) => item.id.toString() === targetElement.dataset.id);

//         if (photo) {
//           openBigPicture(photo);
//         }
//       }
//     });
//   })
//   .catch(() => {
//     const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
//     document.body.append(errorTemplate);
//     setTimeout(() => {
//       document.body.removeChild(document.querySelector('.data-error'));
//     }, TIME_CLEAR);
//   });
