exports.millisecondToString = time => {
  let diff = time;
  diff = diff / 1000;
  let seconds = Math.floor(diff % 60);
  diff = diff / 60;
  let minutes = Math.floor(diff % 60);
  diff = diff / 60;
  let hours = Math.floor(diff % 24);
  let days = Math.floor(diff / 24);

  return `${days > 0 ? days + " Days " : ""}${hours}:${minutes}:${seconds}`;
};
