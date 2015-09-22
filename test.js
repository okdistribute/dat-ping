var test = require('tape')
var datPing = require('./')
var initDat = require('dat/lib/util/init-dat.js')
var tmp = require('os').tmpdir()
var datServer = require('dat-rest-server')

test('http server is reachable', function (t) {
  var args = {
    path: tmp,
    prompt: false,
    createIfMissing: true
  }

  initDat(args, function (err, db) {
    t.ifError(err)
    datServer(args, function (server, port) {
      server.listen(port, function () {
        var mydat = 'http://localhost:' + port
        datPing(mydat, function (err, status) {
          t.ifError(err)
          t.ok(status.version)
          t.end()
          server.close()
        })
      })
    })
  })
})
