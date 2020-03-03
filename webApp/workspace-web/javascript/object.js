var game = {
  startTime: null,
  displayArea: document.getElementById('display-area')
}
function start() {
  startTime = Date.now()
  document.body.onkeypress = stop
}
function stop() {
  var currentTime = Date.now()
  var seconds = (currentTime - startTime) / 1000
  9.5 <= seconds && seconds <= 10.5
    ? (displayArea.innerText = seconds + '秒でした。すごい')
    : (displayArea.innerText = seconds + '残念。すごい')
}

if (confirm('OKを押して10秒だと思ったら何かキーを押してください')) {
  start()
}
