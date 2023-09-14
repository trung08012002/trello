const getBeginWordUppercase = (value: string) => {
  value = value.trim();
  let firstLetter = "";
  let lastLetter = "";
  const arrayValue = value.split(" ");
  if (arrayValue.length <= 1) {
    return value[0];
  }
  firstLetter = value[0];
  lastLetter = arrayValue.pop()!;
  return `${firstLetter.toUpperCase()}${lastLetter.toUpperCase()}`;
};
export default getBeginWordUppercase;
