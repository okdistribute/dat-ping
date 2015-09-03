var hyperquest = require('hyperquest')
var transportStream = require('transport-stream')
var debug = require('debug')('dat-ping')

module.exports = function (source, cb) {
  // clean the url
  var u = url.parse(source)

  // figure out if we're doing http or ssh
  if (u.protocol === 'http:') {
    debug('creating http request to', source)
    var stream = hyperquest(source)
  } else {
    debug('creating general transport to', source)
    var transportOpts = {
      command: (args.bin || 'dat') + ' replicate -'
    }
    var transport = transportStream(transportOpts)
    try {
      var stream = transport(source)
    } catch (err) {
      cb(new Error('Could not figure out transport type for ' + source))
      return
    }
  }

  stream.pipe(concat(function (buf) {
    var status = JSON.parse(buf.toString())
    if (status.status) status = status.status

    if (status.error) {
      return console.error(status.message)
    }
    cb(null, status)
  }))

  stream.on('error', function (err) {
    if (err.level === 'client-authentication') {
      return cb(new Error('Username or password is incorrect.'))
    }
    if (err.message.indexOf('ENOENT') > -1) {
      return cb(new Error('Could not find a dat there!'))
    }
    return cb(err)
  })
}
