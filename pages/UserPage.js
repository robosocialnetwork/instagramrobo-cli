const InstagramPageBase = require('./InstagramPageBase');

class UserPage extends InstagramPageBase{
    constructor(loginPage, userName) {
        super();
        this.userName = userName;
    }

    async teste(){
        const page = this.getPage();
        await page.waitForSelector('._6q-tv');
        await super.screenshot('UserPage01');
    }
}

module.exports = UserPage;