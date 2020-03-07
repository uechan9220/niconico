'use strict'
function app(number) {
  let result = 0;
  for (let num of number) {
    result =+ num
  }
  return result
}
module: exports = {
  add: add
}