const crypto = require('crypto');
const config = require('../config');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { username, plan } = req.body;

    if (!username || !plan) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username dan plan harus diisi!' 
      });
    }

    // Plan configurations
    const planConfigs = {
      '1gb': { ram: 1000, disk: 1000, cpu: 40 },
      '2gb': { ram: 2000, disk: 1000, cpu: 60 },
      '3gb': { ram: 3000, disk: 2000, cpu: 80 },
      '4gb': { ram: 4000, disk: 2000, cpu: 100 },
      '5gb': { ram: 5000, disk: 3000, cpu: 120 },
      '6gb': { ram: 6000, disk: 3000, cpu: 140 },
      '7gb': { ram: 7000, disk: 4000, cpu: 160 },
      '8gb': { ram: 8000, disk: 4000, cpu: 180 },
      '9gb': { ram: 9000, disk: 5000, cpu: 200 },
      '10gb': { ram: 10000, disk: 5000, cpu: 220 },
      'unlimited': { ram: 0, disk: 0, cpu: 0 }
    };

    const planConfig = planConfigs[plan];
    if (!planConfig) {
      return res.status(400).json({ 
        success: false, 
        error: 'Plan tidak valid!' 
      });
    }

    // Generate password
    const password = username + crypto.randomBytes(2).toString('hex');
    const email = username + "@gmail.com";

    // Create user
    const userResponse = await fetch(config.domain + "/api/application/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + config.apikey
      },
      body: JSON.stringify({
        "email": email,
        "username": username,
        "first_name": username,
        "last_name": "Server",
        "language": "en",
        "password": password
      })
    });

    const userData = await userResponse.json();
    
    if (userData.errors) {
      return res.status(400).json({ 
        success: false, 
        error: userData.errors[0].detail || 'Gagal membuat user' 
      });
    }

    const user = userData.attributes;
    const userId = user.id;

    // Get egg data
    const eggResponse = await fetch(
      `${config.domain}/api/application/nests/${config.nestid}/eggs/${config.egg}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + config.apikey
        }
      }
    );

    const eggData = await eggResponse.json();
    const startupCmd = eggData.attributes.startup;

    // Create server
    const currentDate = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const serverResponse = await fetch(config.domain + "/api/application/servers", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + config.apikey
      },
      body: JSON.stringify({
        "name": username,
        "description": `DIBUAT TANGGAL: ${currentDate}\nOleh: ${config.storename}`,
        "user": userId,
        "egg": parseInt(config.egg),
        "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
        "startup": startupCmd,
        "environment": {
          "INST": "npm",
          "USER_UPLOAD": "0",
          "AUTO_UPDATE": "0",
          "JS_FILE": "index.js",
          "CMD_RUN": "npm start"
        },
        "limits": {
          "memory": planConfig.ram,
          "swap": 0,
          "disk": planConfig.disk,
          "io": 500,
          "cpu": planConfig.cpu
        },
        "feature_limits": {
          "databases": 5,
          "backups": 5,
          "allocations": 5
        },
        "deploy": {
          "locations": [parseInt(config.loc)],
          "dedicated_ip": false,
          "port_range": []
        }
      })
    });

    const serverData = await serverResponse.json();
    
    if (serverData.errors) {
      return res.status(400).json({ 
        success: false, 
        error: serverData.errors[0].detail || 'Gagal membuat server' 
      });
    }

    const server = serverData.attributes;

    // Format response
    const responseData = {
      username: user.username,
      password: password,
      serverId: server.id,
      ram: planConfig.ram === 0 ? 'Unlimited' : `${planConfig.ram / 1000} GB`,
      cpu: planConfig.cpu === 0 ? 'Unlimited' : `${planConfig.cpu}%`,
      disk: planConfig.disk === 0 ? 'Unlimited' : `${planConfig.disk / 1000} GB`,
      date: currentDate,
      domain: config.domain
    };

    return res.status(200).json({ 
      success: true, 
      data: responseData 
    });

  } catch (error) {
    console.error('Error creating panel:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Terjadi kesalahan server' 
    });
  }
};