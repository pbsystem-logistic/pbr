/**
 * PB SYSTEM - Standalone Local Area Network (LAN) Server
 * Built with ZERO external dependencies (pure Node.js http, fs, path).
 * 
 * How to run on Admin Machine:
 *   node server.js
 * 
 * Then all staff machines on the same WiFi/LAN can open:
 *   http://<ADMIN-IP>:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'pb_system_lan_database.json');

// MIME Types
const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function getLocalIpAddresses() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const k in interfaces) {
        for (const k2 in interfaces[k]) {
            const address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}

const server = http.createServer((req, res) => {
    // CORS headers for LAN sync
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 1. Sync API: GET /api/sync
    if (req.url === '/api/sync' && req.method === 'GET') {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "No database found on host yet" }));
        }
        return;
    }

    // 2. Sync API: POST /api/sync
    if (req.url === '/api/sync' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                if (!body || body.trim() === '') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Empty payload received" }));
                    return;
                }
                const incoming = JSON.parse(body);
                if (!incoming || typeof incoming !== 'object' || !Array.isArray(incoming.users)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Invalid data payload structure" }));
                    return;
                }

                // If existing database file exists, merge users and protect existing active accounts & passwords
                if (fs.existsSync(DATA_FILE)) {
                    try {
                        const existingRaw = fs.readFileSync(DATA_FILE, 'utf-8');
                        const existingData = JSON.parse(existingRaw);

                        if (existingData.users && Array.isArray(existingData.users)) {
                            const userMap = new Map();
                            // First load all existing users from disk
                            existingData.users.forEach(u => {
                                if (u && u.username) {
                                    userMap.set(u.username.toLowerCase(), u);
                                }
                            });

                            // Merge incoming users
                            incoming.users.forEach(u => {
                                if (u && u.username) {
                                    const key = u.username.toLowerCase();
                                    const exist = userMap.get(key);
                                    if (exist) {
                                        // If existing user already has a changed password, do not revert to default 123
                                        const finalPwd = (u.password && u.password !== '123' && u.password !== 'default') 
                                            ? u.password 
                                            : (exist.password || u.password);
                                        userMap.set(key, { ...exist, ...u, password: finalPwd });
                                    } else {
                                        userMap.set(key, u);
                                    }
                                }
                            });

                            incoming.users = Array.from(userMap.values());
                        }
                    } catch (e) {
                        console.error("[Server Sync Guard] Merge warning:", e);
                    }
                }

                fs.writeFileSync(DATA_FILE, JSON.stringify(incoming, null, 2), 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, timestamp: new Date().toISOString() }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // 3. Static File Server
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

    const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(__dirname, safePath);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end('404 Not Found - PB SYSTEM Server');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    const ips = getLocalIpAddresses();
    console.log("=============================================================");
    console.log("🚀 PB SYSTEM - Enterprise LAN Server Active");
    console.log(`Port: ${PORT}`);
    console.log(`Open on Admin machine: http://localhost:${PORT}`);
    if (ips.length > 0) {
        console.log("Staff machines can open on the same WiFi/Network:");
        ips.forEach(ip => console.log(`   👉 http://${ip}:${PORT}`));
    }
    console.log("=============================================================");
});
