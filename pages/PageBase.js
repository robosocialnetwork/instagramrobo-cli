const browser = require('../browser');

class PageBase{

    constructor(){
        
    }

    getPage() {
        return browser.getPage();
    }

    async screenshot(name){
        return this.getPage().screenshot({path: `./screenshots/${name}.jpg`})
    }
}

module.exports = PageBase;