function foo(r: NginxHTTPRequest) {
  r.log('hello form foo() handler');
  return 'foo';
}

function summary(r: NginxHTTPRequest) {
  var a, s, h;

  s = 'JS summary\n\n';

  s += 'Method: ' + r.method + '\n';
  s += 'HTTP version: ' + r.httpVersion + '\n';
  s += 'Host: ' + r.headersIn.host + '\n';
  s += 'Remote Address: ' + r.remoteAddress + '\n';
  s += 'URI: ' + r.uri + '\n';

  s += 'Headers:\n';
  for (h in r.headersIn) {
    s += "  header '" + h + "' is '" + r.headersIn[h] + "'\n";
  }

  s += 'Args:\n';
  for (a in r.args) {
    s += "  arg '" + a + "' is '" + r.args[a] + "'\n";
  }

  return s;
}

function baz(r: NginxHTTPRequest) {
  r.status = 200;
  r.headersOut.foo = '1234';
  r.headersOut['Content-Type'] = 'text/plain; charset=utf-8';
  r.headersOut['Content-Length'] = '15';
  r.sendHeader();
  r.send('nginx');
  r.send('java');
  r.send('script');

  r.finish();
}

function hello(r: NginxHTTPRequest) {
  r.headersOut['Content-Type'] = 'text/plain; charset=utf-8';
  r.return(200, 'Hello world!');
}

// since 0.7.0
async function fetch(r: NginxHTTPRequest) {
  let results = await Promise.all([ngx.fetch('https://nginx.org/'), ngx.fetch('https://nginx.org/en/')]);

  r.return(200, JSON.stringify(results, undefined, 4));
}

// since 0.7.0
async function hash(r: NginxHTTPRequest) {
  let hash = await crypto.subtle.digest('SHA-512', r.headersIn.host || '');
  // r.setReturnValue(Buffer.from(hash).toString('hex'));
  r.headersOut['Content-Type'] = 'text/plain; charset=utf-8';
  r.return(200, Buffer.from(hash).toString('hex'));
}

export default { foo, summary, baz, hello, fetch, hash };
