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
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_NUM = 1;
const MAX_AVATAR_NUM = 6;
const MIN_RANDOM_NUM_COMMENT = 0;
const MAX_RANDOM_NUM_COMMENT = 30;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getArrayFrom = (length, fnc) => Array.from({ length: length }, (_, index) => fnc(index + 1));

let uniqueCommentIDCounter = 10;
const getUniqueCommentID = () => uniqueCommentIDCounter++;

const createComment = () => {
  const uniqueCommentID = getUniqueCommentID();

  const objComment = {
    id: uniqueCommentID,
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUM, MAX_AVATAR_NUM)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
  return objComment;
};

const createProfile = (_, index) => {

  const randomNumForComment = getRandomInteger(MIN_RANDOM_NUM_COMMENT, MAX_RANDOM_NUM_COMMENT);

  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: getArrayFrom(randomNumForComment, createComment),
  };
};
const res = getArrayFrom(SIMILAR_PROFILE_COUNT, createProfile);
res();
