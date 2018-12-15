const URL = 'http://www.instagram.com.br/accounts/login/?source=auth_switcher';

const browser = require('./browser');
const loginPage = require('./pages/LoginPage');
const IndexPage = require('./pages/IndexPage');

// const UserPage = require('./pages/UserPage');


async function teste(){
    await browser.config(URL);

    const loginInst = new loginPage();
    await loginInst.login('victorjoaobarbosa2017@gmail.com', 'f3rr4r11');
    loginInst.screenshot('algo');

    const indexPage = new IndexPage();
    await indexPage.selectUser('saudavelemdobro');
    await indexPage.screenshot('blabla');
    // const userPage = new UserPage(loginInst.page,'fernandinho');
    
    // return userPage.teste();

    // await loginInst2.teste();
}


teste().then(result => console.log(result));