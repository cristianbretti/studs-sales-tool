export const dateStringFromTimestamp = timestamp => {
  const date = new Date(timestamp);
  return date.toISOString().substr(0, 10);
};

export const timeStringFromTimestamp = timestamp => {
  const date = new Date(timestamp);
  return (
    paddTimeNumber(date.getHours().toString()) +
    ':' +
    paddTimeNumber(date.getMinutes().toString())
  );
};

export const paddTimeNumber = number => {
  return number.length < 2 ? '0' + number : number;
};
