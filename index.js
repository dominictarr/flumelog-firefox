window.Buffer = Buffer
var hello = Buffer.from('hello', 'utf8')
var codec = require('flumecodec')
var RAMutableFile = require('random-access-idb-mutable-file')
var FlumeLogRaf = require('flumelog-random-access-storage/inject')
var toCompat = require('flumelog-random-access-storage/compat')

var _log = console.log 

console.log = function () {
  var pre = document.createElement('pre')
  pre.textContent = [].slice.call(arguments).map(JSON.stringify).join(' ')
  document.body.appendChild(pre)
}

RAMutableFile.mount().then(function (RAMF) {
  //var ramf = RAMF('test.txt')
//  console.log(MF=ramf)
  var FlumeLog = FlumeLogRaf(RAMF, require('lru_cache').LRUCache)

  require('bench-flumelog')(function () {
    var log = FlumeLog('/tmp/bench-flumelog-raf2', {
      block: 1024*64,
//      codec: codec.json
    })
    return toCompat(log)
  }, null, null, function (obj) {
    return obj
  })

})





