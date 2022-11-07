export function getQueryString (link, key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const queryString = link.split('?').length > 1 ? link.split('?')[1] : '';
  console.log(queryString);
  const r = queryString.match(reg);
  console.log(r);
  if (r !== null) return decodeURIComponent(r[2]);
  return '';
}

// console.log(getQueryString('localhost:3000/?kw="北京"', 'kw'));
// 使用方法,
// const ticket = getQueryString(window.location.href, 'ticket');
// console.log(ticket);
