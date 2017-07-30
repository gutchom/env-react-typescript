const colors = require('colors')
const http = require('http')
const httpProxy = require('http-proxy')
const os = require('os')
const ifaces = os.networkInterfaces()
const ipAddress = []

const proxy = httpProxy.createProxyServer({})

const server = http.createServer((req, res) => {
  proxy.web(req, res, {target: 'http://localhost:3000/'})

  const time = new Date()
  const hour = `0${time.getHours()}`.slice(-2)
  const minute = `0${time.getMinutes()}`.slice(-2)
  const second = `0${time.getSeconds()}`.slice(-2)
  console.log(`[${`${hour}:${minute}:${second}`.gray}] Proxy receives a request`)
})

Object.keys(ifaces).forEach((ifname) => {
  ifaces[ifname].forEach((iface) => {

    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    // en0 192.168.1.NNN
    ipAddress.push({ ifname, address: iface.address })

  })
})
const localIp = ipAddress.find(address => address.ifname === 'en0').address

console.log(`

---- ---- ---- ----  [${'Proxy'.cyan}]  ---- ---- ---- ----
 Now, running proxy server with Node.js.

 Visit `+`http://${localIp}:3333`.magenta+` through the LAN
          to access your Vagrant guest server.
---- ---- ---- ---- ---- ---- ---- ---- ---- ----

`)

server.listen(3333)
