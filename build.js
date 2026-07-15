const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'firebase-config.template.js');
const outputPath = path.join(__dirname, 'firebase-config.js');

try {
  let template = fs.readFileSync(templatePath, 'utf8');

  template = template
    .replace('__FIREBASE_API_KEY__', process.env.FIREBASE_API_KEY || '')
    .replace('__FIREBASE_AUTH_DOMAIN__', process.env.FIREBASE_AUTH_DOMAIN || '')
    .replace('__FIREBASE_PROJECT_ID__', process.env.FIREBASE_PROJECT_ID || '')
    .replace('__FIREBASE_STORAGE_BUCKET__', process.env.FIREBASE_STORAGE_BUCKET || '')
    .replace('__FIREBASE_MESSAGING_SENDER_ID__', process.env.FIREBASE_MESSAGING_SENDER_ID || '')
    .replace('__FIREBASE_APP_ID__', process.env.FIREBASE_APP_ID || '')
    .replace('__FIREBASE_MEASUREMENT_ID__', process.env.FIREBASE_MEASUREMENT_ID || '');

  fs.writeFileSync(outputPath, template);
  console.log('firebase-config.js generated successfully from environment variables.');
} catch (error) {
  console.error('Error generating firebase-config.js:', error);
  process.exit(1);
}
