var url = require('url')
var hyperquest = require('hyperquest')
var transportStream = require('transport-stream')
var concat = require('concat-stream')
var debug = require('debug')('dat-ping')
var prettyBytes = require('pretty-bytes')
var relativeDate = require('relative-date')

module.exports = function ping (source, opts, cb) {
  if (typeof opts === 'function') return ping(source, {}, opts)

  var u = url.parse(source)

  // figure out if we're doing http or ssh
  if (u.protocol === 'http:') {
    debug('creating http request to', source)
    var stream = hyperquest(source)
  } else {
    debug('creating general transport to', source)
    var transportOpts = {
      command: (opts.bin || 'dat') + ' status --json'
    }
    var transport = transportStream(transportOpts)
    try {
      var stream = transport(source)
    } catch (err) {
      return cb(new Error('Could not figure out transport type for ' + source))
    }
  }

  stream.pipe(concat(function (buf) {
    try {
      var status = JSON.parse(buf.toString())
    } catch (err) {
      return cb(err)
    }
    if (status.error) return cb(new Error(status.message))
    if (opts.pretty) {
      if (typeof status.size === 'number') status.size = prettyBytes(status.size)
      status.modified = relativeDate(status.modified)
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
