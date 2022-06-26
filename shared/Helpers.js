import { THOUSAND_SEPARATOR } from "./GlobalConstants";
import { Names } from "../src/storage/Names";

export const capitalize = (str = '') => {
  if (!str || str.length === 0) return '';
  return str && str[0].toUpperCase() + str.toLowerCase().slice(1);
};

export const capitalizeEachWord = (str) => {
  if (!str || str.length === 0) return '';
  const splitStr = str.toLowerCase().split(' ');
  if (splitStr.length === 1) return capitalize(str);
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

export const isEmpty = (string) => {
  return !string || string.length === 0;
};

export const convertPrice = (price) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, THOUSAND_SEPARATOR);
};

export const customReplaceAll = (string, searchString, replaceString) => {
  let str = string.toString();
  str = str.split(searchString).join(replaceString);
  return str;
};

export const getUuidV4 = () => {
  // Timestamp
  let d = new Date().getTime();
  // Time in microseconds since page-load or 0 if unsupported
  let d2 = ((typeof performance !== "undefined") && performance.now && (performance.now() * 1000)) || 0;

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    // random number between 0 and 16
    let r = Math.random() * 16;

    if (d > 0) {
      // Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      // Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export const getRandomName = (isMale) => {
  console.log('isMale', isMale);
  if (!isMale) isMale = !!getRandomInt(0,2)

  let nameArr
  if (isMale) nameArr = Names.male
  else nameArr = Names.female

  return nameArr[getRandomInt(0, nameArr.length)].concat(' ').concat(Names.surname[getRandomInt(0, Names.surname.length)])
}

export const removeItemFromArray = (array, item) => {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
}
