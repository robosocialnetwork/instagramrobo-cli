const InstagramPageBase = require('./InstagramPageBase');

class UserPage extends InstagramPageBase{
    constructor() {
        super();
    }

    async teste(){
        const page = this.getPage();
        await page.waitForSelector('._6q-tv');
        await super.screenshot('UserPage01');
    }

    async getName(){
        const page = this.getPage();
        return page.evaluate(() => document.querySelector('._7UhW9').innerText, null);        
    }

    async getRootCounts(){
        const page = this.getPage();
        
        return page.evaluate(() => {
            function getCounts() {
                const VALUES_INDEX = {
                    fowllersCount: 1,
                    followingCount: 2,
                    postsCount: 0
                }

                const itens = Array.from(document.querySelectorAll('.g47SY'))
                    .map(item => {
                        let value = item.innerText;
                        value = value.replace('.', '');
                        value = value.replace(',', '');
                        value = value.replace('k', '000');
                        value = value.replace('mil', '000');

                        return value;
                    });
                
                return {
                    fowllers: +itens[VALUES_INDEX.fowllersCount],
                    followings: +itens[VALUES_INDEX.followingCount],
                    posts: +itens[VALUES_INDEX.postsCount]
                }
            }

            return getCounts();

        }, null);
    }

    async getLastPost(){
        const page = this.getPage();
        await page.waitForSelector('.v1Nh3');
        const postId = await page.$eval('.v1Nh3 a',element => {
            let values = element.href.split('/');
            values.splice(-1);
            return values.slice(-1)[0];            
        });
        const postPosition = await page.$eval('.v1Nh3', div => {
            const position =  div.getBoundingClientRect();
            return {
                x: ++position.x,
                y: ++position.y
            }
            });
        
        await page.mouse.move(postPosition.x, postPosition.y);
        await page.waitForSelector('.qn-0x');
        const counts = await page.$eval('.qn-0x', element => 
            Array.from(element.getElementsByTagName('span'))
                .map(item => item.innerText.replace(',',''))
                .filter(item => item !== '')
        );

        return {
            postId,
            likesCount: +counts[0],
            commentsCount: +counts[1]
        }
    }

    async getUser(){    
        const rootCounts = await this.getRootCounts();
        const lastPost = await this.getLastPost();
        const name = await this.getName();

        return {
            lastPost,
            rootCounts,
            name
        }
    }

    async isBeingFollowed(){
        const page = this.getPage();

        return page.evaluate(() => {
            const buttons = Array.from(document.getElementsByTagName('button'));
            const followButton = buttons.find(item => item.innerText === 'Following' || item.innerText === 'Seguindo');    
            return followButton !== undefined && followButton !== null;
        }, null);             
    }

    async getFollowers(startAfterUserId, itemsCount = 1000){
        const page = this.getPage();       

        let countToLongWait = 1;
        const checkIfLongWait = async (ActualItemsCount) => {           

            if(ActualItemsCount > countToLongWait * 80)
             {
                console.log('items: ', ActualItemsCount, ' long wait ...')                
                await this.delay(10);
                console.log('long wait end ...')
                
                countToLongWait++;

                if(countToLongWait % 12 === 0)
                {
                   console.log('super long wait ...')
                   await this.delay(120);
                   console.log('super long wait end...')
                }                  
             }
        }

        const openPage = async () => {
            await page.evaluate(() => Array.from(document.querySelectorAll('.-nal3'))[1].click(), null); 
            await page.waitForSelector('.isgrP a');
        }

        const scrollingPage = async (size = 300) => {
            const result = page.evaluate((_size) => document.querySelector('.isgrP').scrollTo(0,_size), size); 
            await this.delay(3);
            await page.waitFor(() => !document.querySelector(".W1Bne"));
            return result;
        }

        const getItems = async (afterUser) => {

            await scrollingPage(10000000);

            return page.evaluate((afterUser) => {
                const getAll = () => {
                    return Array.from(document.querySelectorAll('.isgrP a'))
                        .map(item => item.innerText)
                        .filter(item => item !== '');
                }
    
                const getAllAfter = (_userId) => {
                    const allItems = getAll();
                    const indexUser = allItems.findIndex(item => item === _userId)
                    return allItems.slice(indexUser + 1);
                }
                
                if(!afterUser)
                    return getAll();
                else
                    return getAllAfter(afterUser);
            }, afterUser)
        }

        await openPage();
        await scrollingPage();     
        await scrollingPage();
        await scrollingPage();
        // await this.delay(3000);  
        // await page.evaluate(() => document.querySelector('.isgrP').scrollTo(0,10000), null); 
        let items = await getItems();

        while(items.length > 0 && items.length < itemsCount){
            let novosItems = await getItems(items.slice(-1)[0]);

            if(novosItems.length === 0) break;

            items = [...items, ...novosItems];

            await checkIfLongWait(items.length)
        }

        return items.slice(0, itemsCount -1);
    }

    async follow() {
        const page = this.getPage();

        const result = await this.isBeingFollowed();

        if(result === true)
            throw new Error('BEING_FOLLOWED');

        await page.evaluate(() => {
            const buttons = Array.from(document.getElementsByTagName('button'));
            const followButton = buttons.find(item => item.innerText === 'Seguir' || item.innerText === 'Follow');    
            followButton.click();
        }, null);      
    }
}

module.exports = UserPage;