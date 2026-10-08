const next = require('next');
const { createServer } = require('node:http');
const app = next({ dev: false, dir: process.cwd(), conf: { distDir: 'reports/about-production-next', poweredByHeader: false } });
const handler = app.getRequestHandler();
app.prepare().then(() => createServer((req, res) => handler(req, res)).listen(3001, '127.0.0.1', () => console.log('Stable production preview: http://127.0.0.1:3001/about')));
