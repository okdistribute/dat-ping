# dat-ping

Ping a dat server (http or ssh) to get status information.

[![NPM](https://nodei.co/npm/dat-ping.png)](https://nodei.co/npm/dat-ping/)

```
npm install dat-ping
```

```js
var datPing = require('dat-ping')

var mydat = 'http://localhost:6442'

datPing(mydat, function (err, status) {
  console.log(status)
})
```

