
function timestampToLocaleString(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}
function getTimeFromTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');

  return `${hour}:${minute}:${second}`;
}


export {timestampToLocaleString,getTimeFromTimestamp};
