const data = "1113222113";
const packData = (data) => {
  const encodedMessage = [];
  let current = data[0];
  let count = 1;
  for (let index = 1; index < data.length; index++) {
    if (current === data[index]) {
      count++;
    } else {
      encodedMessage.push(count, current);
      count = 1;
      current = data[index];
    }
  }
  encodedMessage.push(count, current);
  return encodedMessage.join("");
};

const packNTimes = (data, count) => {
  let packingData = data;
  for (let index = 0; index < count; index++) {
    packingData = packData(packingData);
  }
  return packingData;
};
console.log(packData(data));
console.log(packNTimes(data, 50).length);
