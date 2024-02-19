// Функция для проверки длины строки.
const getStringCheck = (string, length) =>
  string.replaceAll(' ', '').length <= length;
// Функция для проверки, является ли строка палиндромом.
const isPolidrome = function (string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  let reversString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversString += normalizedString[i];
  }
  return reversString === normalizedString;
};


