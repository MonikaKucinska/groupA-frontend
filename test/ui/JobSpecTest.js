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


describe('Job Specification test', () => {
    it('should return job description list', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        
        //Home
        driver.get('http://localhost:3000/job-roles');

        // find job description header and assert it with expected result
       var jobDesc = await driver.findElement(By.xpath("//*[@id=\"main-content\"]/table/thead/tr/th[2]")).getText().then(function(value){
        return value
       });

       //assert with chai should
       jobDesc.should.equal("Role Description");
       
       await driver.quit();
    
 }).timeout(4000)

    it('should return capability list', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

            //Job-roles page
        driver.get('http://localhost:3000/job-roles');

        //find capability and assert it.
        var jobCap = await driver.findElement(By.xpath("//*[@id=\"main-content\"]/table/thead/tr/th[3]")).getText().then(function (value) {
            return value;
        });

        jobCap.should.equal("Capability");
        await driver.quit();

  }).timeout(4000)

       it('should return sharepoint link list', async() => {
         var driver = await new webdriver.Builder()
        .setChromeOptions(new chrome.Options().headless())
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();

          //Job-roles page
          driver.get('http://localhost:3000/job-roles');

           // find sharepoint table header and assert it with expected result:
           var sharePointLink = await driver.findElement(By.xpath("//*[@id=\"main-content\"]/table/thead/tr/th[4]")).getText().then(function (value) {
            return value;
        });

        sharePointLink.should.equal("Sharepoint Link");

        await driver.quit();
   }).timeout(4000)
   
   it('sharepoint link should be active', async() => {
    var driver = await new webdriver.Builder()
   .setChromeOptions(new chrome.Options().headless())
   .withCapabilities(webdriver.Capabilities.chrome())
   .build();

     //Job-roles page
     driver.get('http://localhost:3000/job-roles');

     //find sharpoint link and click it
     await driver.findElement(By.xpath('//*[@id="main-content"]/table/tbody/tr[1]/td[4]/a')).click();

     await driver.quit();
})
})