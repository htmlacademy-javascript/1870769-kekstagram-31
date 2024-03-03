import { getDataArrayProfiles } from './data';
import { getRandomInteger, getRandomArrayElement, getArrayFrom } from './util';

const {MESSAGES, DESCRIPTION, NAMES } = getDataArrayProfiles();

const SIMILAR_PROFILE_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_NUM = 1;
const MAX_AVATAR_NUM = 6;
const MIN_RANDOM_NUM_COMMENT = 0;
const MAX_RANDOM_NUM_COMMENT = 30;

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
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: getArrayFrom(randomNumForComment, createComment),
  };
};
const getArrayProfiles = () => getArrayFrom(SIMILAR_PROFILE_COUNT, createProfile);
console.log(getArrayProfiles());
export { getArrayProfiles };
