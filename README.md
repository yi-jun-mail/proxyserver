proxy server

This is a Proxy Server for Node.js submitted as the [pre-work](http://courses.codepath.com/snippets/intro_to_nodejs/prework) requirement for CodePath.

Time spent: 4 hours

Completed:

* [X] Required: Requests to port `8000` are echoed back with the same HTTP headers and body
* [X] Required: Requests/reponses are proxied (via port 9000) to/from the destination server
* [X] Required: The destination server is configurable via the `--host`, `--port`  or `--url` arguments
* [X] Required: The destination server is configurable via the `x-destination-url` header
* [X] Required: Client requests and respones are printed to stdout
* [X] Required: The `--log` argument outputs all logs to the file specified instead of stdout
* [] Optional: The `--exec` argument proxies stdin/stdout to/from the destination program
* [] Optional: The `--loglevel` argument sets the logging chattiness
* [] Optional: Supports HTTPS
* [] Optional: `-h` argument prints CLI API

Walkthrough Gif:
![Video Walkthrough](walkthrough.gif)

Note: to embed the gif file, just check your gif file into your repo and update the name of the file above.

## Starting the Server

```bash
npm start
nodemon -- index.js --host=www.google.com --port=80
nodemon -- index.js --host=www.google.com --port=80 --log=/tmlog.log
```

## Features

### Echo Server:

```bash
L-SB831NTFD5-M:proxyserver jyi$ curl -X POST -v http://127.0.0.1:8000 -H "x-destination-url: www.google.com" -d "hello self"
* About to connect() to 127.0.0.1 port 8000 (#0)
*   Trying 127.0.0.1...
* Adding handle: conn: 0x7ff282003a00
* Adding handle: send: 0
* Adding handle: recv: 0
* Curl_addHandleToPipeline: length: 1
* - Conn 0 (0x7ff282003a00) send_pipe: 1, recv_pipe: 0
* Connected to 127.0.0.1 (127.0.0.1) port 8000 (#0)
> POST / HTTP/1.1
> User-Agent: curl/7.30.0
> Host: 127.0.0.1:8000
> Accept: */*
> x-destination-url: www.google.com
> Content-Length: 10
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 10 out of 10 bytes
< HTTP/1.1 200 OK
< user-agent: curl/7.30.0
< host: 127.0.0.1:8000
< accept: */*
< x-destination-url: www.google.com
< content-length: 10
< content-type: application/x-www-form-urlencoded
< Date: Wed, 28 Sep 2016 03:46:48 GMT
< Connection: keep-alive
< 
* Connection #0 to host 127.0.0.1 left intact
hello selfL-SB831NTFD5-M:proxyserver jyi$ 
```

### Proxy Server:

Port 9000 will proxy to the echo server on www.google.com via command line configuration.  
```bash
L-SB831NTFD5-M:proxyserver jyi$ nodemon -- index.js --host=www.google.com --port=80 
L-SB831NTFD5-M:proxyserver jyi$ curl -v http://127.0.0.1:9000 
* About to connect() to 127.0.0.1 port 9000 (#0)
*   Trying 127.0.0.1...
* Adding handle: conn: 0x7fd912803a00
* Adding handle: send: 0
* Adding handle: recv: 0
* Curl_addHandleToPipeline: length: 1
* - Conn 0 (0x7fd912803a00) send_pipe: 1, recv_pipe: 0
* Connected to 127.0.0.1 (127.0.0.1) port 9000 (#0)
> GET / HTTP/1.1
> User-Agent: curl/7.30.0
> Host: 127.0.0.1:9000
> Accept: */*
> 
< HTTP/1.1 200 OK
< date: Wed, 28 Sep 2016 03:49:19 GMT
< expires: -1
< cache-control: private, max-age=0
< content-type: text/html; charset=ISO-8859-1
< p3p: CP="This is not a P3P policy! See https://www.google.com/support/accounts/answer/151657?hl=en for more info."
* Server gws is not blacklisted
< server: gws
< x-xss-protection: 1; mode=block
< x-frame-options: SAMEORIGIN
< accept-ranges: none
< vary: Accept-Encoding
< connection: close
< Transfer-Encoding: chunked
* Closing connection 0
```

Port 9000 will proxy to the echo server to www.google.com.

```bash
L-SB831NTFD5-M:proxyserver jyi$ curl -v http://127.0.0.1:9000 -H "x-destination-url: www.google.com"
* About to connect() to 127.0.0.1 port 9000 (#0)
*   Trying 127.0.0.1...
* Adding handle: conn: 0x7f8b7100d000
* Adding handle: send: 0
* Adding handle: recv: 0
* Curl_addHandleToPipeline: length: 1
* - Conn 0 (0x7f8b7100d000) send_pipe: 1, recv_pipe: 0
* Connected to 127.0.0.1 (127.0.0.1) port 9000 (#0)
> GET / HTTP/1.1
> User-Agent: curl/7.30.0
> Host: 127.0.0.1:9000
> Accept: */*
> x-destination-url: www.google.com
> 
< HTTP/1.1 200 OK
< date: Wed, 28 Sep 2016 03:51:23 GMT
< expires: -1
< cache-control: private, max-age=0
< content-type: text/html; charset=ISO-8859-1
< p3p: CP="This is not a P3P policy! See https://www.google.com/support/accounts/answer/151657?hl=en for more info."
* Server gws is not blacklisted
< server: gws
< x-xss-protection: 1; mode=block
< x-frame-options: SAMEORIGIN
< set-cookie: NID=87=ecHiC1tv1cer5IbVa696Kvm2qYu0NqFXDpRX1m9KgvE-Jtfp7s_OBvxXx_6PkdTEzzgjGf5BGkrDlsovMx-Nbb20fNfkf3TTseoX2xNPQL2o9-47aSDKbUySrYElYPs8X0FkKqE3ZuJt-g; expires=Thu, 30-Mar-2017 03:51:23 GMT; path=/; domain=.google.com; HttpOnly
< accept-ranges: none
< vary: Accept-Encoding
< connection: close
< Transfer-Encoding: chunked
```

### Configuration:

#### CLI Arguments:

The following CLI arguments are supported:

##### `--host`

The host of the destination server. Defaults to `127.0.0.1`.

##### `--port`

The port of the destination server. Defaults to `80` or `8000` when a host is not specified.

##### `--url`

A single url that overrides the above. E.g., `http://www.google.com`

##### `--log`

Specify a file path to redirect logging to.

#### Headers

The follow http header(s) are supported:

##### `x-destination-url`

Specify the destination url on a per request basis. Overrides and follows the same format as the `--url` argument.

