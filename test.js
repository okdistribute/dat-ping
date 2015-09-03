var test = require('tape')
var datPing = require('./')
var dat = require('dat')
var tmp = require('os').tmpdir()
var datServer = require('dat-rest-server')

test('http server is reachable', function (t) {
  var args = {
    path: tmp,
    createIfMissing: true
  }

  datServer(args, function (server, port) {
    var mydat = 'http://localhost:' + port
    datPing(mydat, function (err, status) {
      t.ifError(err)
      t.ok(status.head)
      t.end()
      server.close()
    })
  })
})