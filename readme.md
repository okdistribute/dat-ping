# dat-ping

Ping a dat server (http or ssh) to get status information. Works with ssh, on an accessible filesystem, or through http. Basically, anyway you can imaginine getting access to a `dat.`

[![NPM](https://nodei.co/npm/dat-ping.png)](https://nodei.co/npm/dat-ping/)

[![Travis](http://img.shields.io/travis/karissa/dat-ping.svg?style=flat)](https://travis-ci.org/karissa/dat-ping)
```
npm install -g dat-ping
```

```
dat-ping <location> [--bin=path/to/dat/executable]
```

### HTTP, SSH, filesystem, and others
```
$ dat-ping http://localhost:6443
$ dat-ping ~/dev/dats/eukaryota.dathub.org/
```

Returns

```
{"transaction":false,"checkout":false,"heads":1,"modified":"2015-09-01T22:53:17.775Z","datasets":2,"rows":2686,"files":2,"versions":4,"size":1704743,"version":"a2c77bedfb59f2237825614b57109ef35e097f5b1bf9320e9a52ef90768d566a"}
```

```
$ dat-ping /there/is/no/dat/here
Could not find a dat there!
```

### javascript usage

```js
var datPing = require('dat-ping')

var mydat = 'http://localhost:6442'
var opts {
  bin: // path to dat executable (useful for ssh)
}
datPing(mydat, opts, function (err, status) {
  console.log(status)
})
```