import admin from 'firebase-admin';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./letmego.json', 'utf8'));


admin.initializeApp({
  credential: admin.credential.cert(config)
});


export default admin;