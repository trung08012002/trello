const getBeginWordUppercase = (value: string) => {
  value = value.trim();
  let firstLetter = "";
  let lastLetter = "";
  for (let i = 0; i < value.length; i++) {
    if (value[i] === " ") {
      if (firstLetter != "") {
        lastLetter = value[i + 1];
      } else {
        firstLetter = value[i];
      }
    }
  }
  return `${firstLetter.toUpperCase()} ${lastLetter.toUpperCase()}`;
};
export default getBeginWordUppercase;
