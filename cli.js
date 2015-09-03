#!/usr/bin/env node
var args = require('minimist')(process.argv.splice(2))
var ping = require('./')

var location = args._[0]

var opts = {
  bin: args.bin
}

ping(location, opts, function (err, status) {
  if (err) return console.error(err.message)
  console.log(JSON.stringify(status))
})
