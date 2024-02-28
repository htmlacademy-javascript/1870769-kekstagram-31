const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра',
  'В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Александр',
  'Анна',
  'Максим',
  'Екатерина',
  'Дмитрий',
  'Ольга',
  'Иван',
  'Мария',
  'Сергей',
  'Елена',
  'Андрей',
  'Наталья',
  'Константин',
  'Татьяна',
  'Павел',
  'Юлия',
  'Артем',
  'Алиса',
  'Владимир',
  'Евгения',
];

const DESCRIPTION = [
  'Красивый закат',
  'Веселая компания на пляже',
  'Горы в тумане',
  'Уютный домик в лесу',
  'Вкусный завтрак с кофе',
  'Романтический вечер у камина',
  'Цветущие вишни в парке',
  'Дружеская прогулка в парке',
  'Загадочный лесной тропинка',
  'Счастливая семья на пикнике',
  'Портрет милой собачки',
  'Симпатичные кошки на окне',
  'Оживленная городская улица',
  'Природный бассейн с водопадом',
  'Дикое побережье океана',
  'Архитектурные достопримечательности города',
  'Живописный вид с горы',
  'Мистический замок в горах',
  'Адреналин на горной тропе',
  'Вечерний костер под звездами',
  'Счастливые дети на качелях',
  'Поле цветов на закате',
  'Волшебный заколдованный лес',
  'Красивые подводные кораллы',
  'Бодрящий утренний бег',
];

const SIMILAR_PROFILE_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const usedIds = new Set();
const usedPhotoIds = new Set();
const usedCommentIds = new Set();

const getUniqueID = (values) => {
  let value;
  do {
    value = getRandomInteger(1, SIMILAR_PROFILE_COUNT);
  } while (values.has(value));

  values.add(value);

  return value;
};

const createProfile = () => {
  const uniqueID = getUniqueID(usedIds);
  const uniquePhotoID = getUniqueID(usedPhotoIds);
  const uniqueCommentID = getUniqueID(usedCommentIds);

  return {
    id: uniqueID,
    url: `photos/${uniquePhotoID}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(15, 200),
    comments: {
      id: uniqueCommentID,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    },
  };
};

const res = Array.from({ length: SIMILAR_PROFILE_COUNT }, createProfile);

res();
