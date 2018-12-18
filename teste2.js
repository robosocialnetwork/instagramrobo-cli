const URL = 'http://www.instagram.com.br/accounts/login/?source=auth_switcher';

const browser = require('./browser');
const loginPage = require('./pages/LoginPage');
const IndexPage = require('./pages/IndexPage');

// const UserPage = require('./pages/UserPage');


async function teste(){
    await browser.config(URL);

    const loginInst = new loginPage();
    const indexPage = await loginInst.login('victorjoaobarbosa2017@gmail.com', 'f3rr4r11');
    await loginInst.screenshot('login');

    const userPage = await indexPage.selectUser('saudavelemdobro');
    await userPage.screenshot('userpageScreenshot');

    // const postConts = await userPage.getLastPostCounts();
    // console.log(postConts)
    // await userPage.screenshot('post-mouseover');

    const items = await userPage.getFollowers(null, 100000);
    await userPage.screenshot('userPage-FollowersWindowOpen');
    console.log(items.length);
    // const valor = await userPage.getUser();
    // console.log(valor);
  //  try
  //  {
  //    await userPage.follow();
  //  }
  //  catch(e){
  //       console.log(e)
  //  }
}


teste().then(result => console.log(result));