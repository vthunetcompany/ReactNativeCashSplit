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
