const InstagramPageBase = require('./InstagramPageBase');
const IndexPage = require('./IndexPage');

class LoginPage extends InstagramPageBase{
    constructor(){
        super();
    }

    async login(login, senha){
        const page = super.getPage();

        await page.waitForSelector('input[name="username"]');

        await page.screenshot({path: './teste01.jpg'});        

        await page.type('input[name="username"]', login);
        await page.type('input[name="password"]', senha);
        await page.click('button[type="submit"]');        

        return new IndexPage();;
    }
}

module.exports = LoginPage;