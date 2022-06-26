import { THOUSAND_SEPARATOR } from "./GlobalConstants";

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
