// Функция для проверки длины строки.
const getStringCheck = (string, length) =>
  string.replaceAll(' ', '').length <= length;
getStringCheck('проверка', 8);

// // Функция для проверки, является ли строка палиндромом.
const getPolidrome = function (string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  let reversString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversString += normalizedString[i];
  }
  return reversString === normalizedString;
};
getPolidrome('довод');
// Дополнительное задание
// Функция для переработки строки в число
const extractNumber = (string) => {
  if (typeof string !== 'string') {
    string = string.toString();
  }

  let number = '';
  for (let i = 0; i < string.length; i++) {
    const num = parseInt(string[i], 10);
    if (!Number.isNaN(num)) {
      number += num;
    }
  }
  return number > 0 ? number : NaN;
};
extractNumber('123');
