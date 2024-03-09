// // Функция для проверки длины строки.
// export const getStringCheck = (string, length) =>
//   string.replaceAll(' ', '').length <= length;

// // // Функция для проверки, является ли строка палиндромом.
// export const getPolidrome = function (string) {
//   string = string.toLowerCase().replaceAll(' ', '');

//   return string === string.split('').reverse().join('');
// };

// // Дополнительное задание
// // Функция для переработки строки в число
// export const extractNumber = (string) => {
//   if (typeof string !== 'string') {
//     string = string.toString();
//   }

//   let number = '';
//   for (let i = 0; i < string.length; i++) {
//     const num = parseInt(string[i], 10);
//     if (!Number.isNaN(num)) {
//       number += num;
//     }
//   }
//   return number > 0 ? number : NaN;
// };

// // задание от наставника
// export const padStartRecursive = (source, size, additional) => {
//   if (source.length >= size) {
//     return source;
//   }
//   if (additional.length + source.length >= size) {
//     return additional.slice(0, size - source.length) + source;
//   }

//   return padStartRecursive(additional + source, size, additional);
// };

// export const padStartLoop = (source, size, additional) => {
//   if (source.length >= size) {
//     return source;
//   }
//   if (additional.length + source.length > size) {
//     return additional.slice(0, size - source.length) + source;
//   }

//   let result = additional + source;
//   while (result.length < size) {
//     result = additional.slice(0, size - result.length) + result;
//   }  
//   return result;
// };
