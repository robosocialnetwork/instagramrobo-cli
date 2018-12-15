const InstagramPageBase = require('./InstagramPageBase');

class IndexPage extends InstagramPageBase{
    constructor() {
        super();
    }

    async typeSearchUsers(keywork){
        const page = this.getPage();

        await page.waitForSelector('.XTCLo');
        await page.type('.XTCLo', keywork);
        await page.waitForSelector('.Ap253');        
    }

    async getSearchUsers(keywork){
        const page = this.getPage();

        await typeSearchUsers();

        return await page.evaluate(() => {
            const elements = document.getElementsByClassName('Ap253');
            const array = Array.from(elements);
            return array.map(item => item.innerText)
        })
    }

    async selectUser(userName){
        await this.typeSearchUsers(userName);

        const page = this.getPage();
        
        await page.evaluate((_userName) => {
            const itens = Array.from(document.querySelectorAll('.yCE8d'));
            const link = itens.find(item => item.getElementsByTagName('span')[1].innerText === _userName);
            link.click();
        }, userName); 

        await page.waitForSelector('.XjzKX');
    }
}

module.exports = IndexPage;