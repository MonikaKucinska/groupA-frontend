const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const By = webdriver.By
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
var map = webdriver.promise.map;
var chai = require('chai');  
var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
const JobService = require('../../app/service/JobService');
const expect = chai.expect;

describe('Job Roles test', () => {
    it('should return job roles list', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        
        //Home
        driver.get('http://localhost:3000/index');
        await driver.findElement(By.id('view-job-roles')).click('#view-job-roles');

        //Job Roles
        expect(await driver.findElement(By.className('govuk-table__header')).getText()).to.equal('ROLE');

        await driver.quit();
    }).timeout(4000)

    it('should return band level for every job role', async() => {

        // webdriver with headless mode
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        // Job roles page
        await driver.get('http://localhost:3000/job-roles');

        //
        var bands = await driver.findElements(By.xpath('//tbody/tr[*]/td[5]'));
        var jobRoles = await driver.findElement(By.xpath('//tbody/tr[*]/td[1]'));

        var notNullBands =0;

        map(bands, b => b.getText())
            .then(function(values) {
                for(let i=0;i<values.length;i++){
                    if(values[i].length > 0){
                        notNullBands++;
                    }
                }
                expect(notNullBands).to.equal(jobRoles.length);
        });
        

        
    })
})