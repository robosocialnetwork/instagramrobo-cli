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

    async delay(seconds) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, seconds * 1000)
        });
     }
}

module.exports = PageBase;