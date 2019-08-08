exports.calculateTotalTime = task => {
  let entries = task.entries;

  let total_time = 0;

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].type === "start" && entries[i + 1]) {
      total_time += entries[i + 1].created_at - entries[i].created_at;
    } else if (entries[i].type === "start" && !entries[i + 1]) {
      total_time += Date.now() - entries[i].created_at;
    }
  }

  return total_time;
};

exports.millisecondToString = time => {
  let timer = new Date(time);
  return `${timer.getUTCHours()}:${timer.getMinutes()}:${timer.getSeconds()}`;
};
