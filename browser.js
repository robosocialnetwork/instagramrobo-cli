const puppeteer = require('puppeteer');

const browserPuppeteerInstance = {
    instance: null,
    page: null
}

function browserFunction() {
    this.close = () => {
        browserInstance.close();
    }

    this.getPage = () => {
        return browserPuppeteerInstance.page;
    }

    this.config = async (url) => {
        browserPuppeteerInstance.instance = browserPuppeteerInstance.instance || await puppeteer.launch();

        const {instance} = browserPuppeteerInstance;            
        const page = await instance.newPage({context: 'default'});
        
        await page.goto(url);

        await page.setViewport({ width: 1366, height: 768});  

        browserPuppeteerInstance.page = page;

        return browserPuppeteerInstance;
    }
}

const browserInstance = new browserFunction();

module.exports	= browserInstance;