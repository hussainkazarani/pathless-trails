import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { serveStaticFile } from './utils.js';

dotenv.config({ path: '../.env' });
const PORT = process.env.PORT;
console.log(`Port for Node.js is: ${PORT}`);

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const basePath = path.dirname(__dirname);

const server = http.createServer(async (req, res) => {
    // Static files
    let filePath = '';
    if (req.url === '/' && req.method === 'GET') {
        filePath = path.join(basePath, 'frontend', 'src', 'pages', 'home.html');
    } else {
        filePath = path.join(basePath, req.url);
    }

    await serveStaticFile(res, filePath);
});

server.listen(PORT, '0.0.0.0', async () => {});
