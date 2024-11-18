import admin from 'firebase-admin';
import serviceAccount from './letmego.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
