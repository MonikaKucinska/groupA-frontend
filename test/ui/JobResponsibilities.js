const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const By = webdriver.By
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
var map = webdriver.promise.map;
var chai = require('chai');
var should = require('chai').should();
var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
const JobService = require('../../app/service/JobService');
const expect = chai.expect;

describe('Page job responsibility', () => {
    it('page job roles should display job responsibilities column', async () => {

        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        //launch job-roles page
        driver.get('http://localhost:3000/job-roles');

        //Job Responsibilities new column
        expect(await driver.findElement(By.xpath('//*[@id="main-content"]/table/thead/tr/th[6]')).getText()).to.equal('Responsibilities');

        await driver.quit();
    }).timeout(5000)

    it('link to responsibility should be active', async () => {

        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        //launch job-roles page
        driver.get('http://localhost:3000/job-roles');

        //Job Responsibilities new column
        await driver.findElement(By.id('getJobResponsibilityByID1')).click()

        await driver.quit();

    }).timeout(6000)

    it('page job-responsibility displays responsibilities of job role', async () => {

        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        //launch job-roles page
        driver.get('http://localhost:3000/job-roles');
       
        //get role name to assert it next step
        let jobRoleName = await driver.findElement(By.xpath('//*[@id="1"]')).getText().then(function (value) {
            return value
        })
        
        //Job Responsibilities new column
        await driver.findElement(By.id('getJobResponsibilityByID1')).click()

        //find header of job resposnsibilities page 
        var jobRespHead = await driver.findElement(By.xpath('//*[@id="main-content"]/h2')).getText().then(function (value) {
            return value
        });
        //assert header with job role
        jobRespHead.should.equal(jobRoleName + " Responsibilities");
       
        await driver.quit();

    
    }).timeout(6000)

    it('back button should be active', async () => {

        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        //launch job-roles page
        driver.get('http://localhost:3000/job-roles');

        //go to job responsibilities
        await driver.findElement(By.id('getJobResponsibilityByID1')).click()

        //come back to job roles page
        await driver.findElement(By.xpath('//*[@id="main-content"]/a')).click()
        
        //assert
        expect(await driver.findElement(By.xpath('//*[@id="main-content"]/table/caption')).getText()).to.equal('Job Roles');


        await driver.quit();

    })
})