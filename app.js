const URL = 'http://www.instagram.com.br/accounts/login/?source=auth_switcher';

const browser = require('./browser');

browser.config(URL);

//do something when app is closing
process.on('exit', browser.close());
//catches ctrl+c event
process.on('SIGINT', browser.close());
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', browser.close());
process.on('SIGUSR2', browser.close());
//catches uncaught exceptions
process.on('uncaughtException', browser.close());