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

describe('Page band-comp should include competency and competency information', () => {
    it('should return band competencies', async () => {

        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        //launch job-roles page
        driver.get('http://localhost:3000/job-roles');

        //find band name link and click it

        let bandName = await driver.findElement(By.id("compByBandID1")).getText().then(function (value) {
            return value
        })

        await driver.findElement(By.id("compByBandID1")).click("#compByBandID1");


        // find page description and assert it with expected result

        var bandComp = await driver.findElement(By.xpath("//*[@id=\"main-content\"]/table/caption")).getText().then(function (value) {
            return value
        });

        //assert with chai should

        bandComp.should.equal(bandName + " band competencies");
        await driver.quit();

    }).timedOut(4000)

    it('page band competencies should include competencies name and information', async () => {

        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        //launch band-comp page
        driver.get('http://localhost:3000/band-comp/1');

        //find competency name header and assert it.

        var jobComp = await driver.findElement(By.xpath("//*[@id=\"main-content\"]/table/thead/tr/th[1]")).getText().then(function (value) {
            return value
        });

        jobComp.should.equal("Competency");


        // find competency information header and assert it with expected result:
        var compInfo = await driver.findElement(By.xpath("//*[@id=\"main-content\"]/table/thead/tr/th[2]")).getText().then(function (value) {
            return value
        });

        compInfo.should.equal("Competency Information");

        await driver.quit();

    }).timeOut(4000)
    it('page should always display 6 competencies for eachband', async () => {

        // webdriver 
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        //launch band comp page
        await driver.get('http://localhost:3000/band-comp/1');

        //find and assert each competency
        //1
        var comp1 = await driver.findElement(By.id("comp1")).getText().then(function (value) {
            return value
        });

        comp1.should.equal("Personal Performance");

        //2
        var comp2 = await driver.findElement(By.id("comp2")).getText().then(function (value) {
            return value
        });

        comp2.should.equal("Working with Others");
        //3
        var comp3 = await driver.findElement(By.id("comp3")).getText().then(function (value) {
            return value
        });

        comp3.should.equal("Setting Direction, Development and Accountability");

        //4
        var comp4 = await driver.findElement(By.id("comp4")).getText().then(function (value) {
            return value
        });

        comp4.should.equal("Supporting and Delivering the Strategy");
        //5
        var comp5 = await driver.findElement(By.id("comp5")).getText().then(function (value) {
            return value
        });

        comp5.should.equal("Commerciality and Risk");
        //6
        var comp6 = await driver.findElement(By.id("comp6")).getText().then(function (value) {
            return value
        });

        comp6.should.equal("Communicating and Influence");


        await driver.quit();
    })

})