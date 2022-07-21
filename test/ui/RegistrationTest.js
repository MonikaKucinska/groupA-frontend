const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const By = webdriver.By
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
var chai = require('chai');  
const expect = chai.expect;

describe('Registration test', () => {
    it('should return a message when user was successfully registered', async() => {
        function makename(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * 
         charactersLength));
           }
           return result;
        }


        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys(makename(5)+'@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Registration was successful');
    })

    it('should return a message when email not from @kainos.com', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Must use Kainos email');
    })

    it('should return a message when email is too long', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('testasdasdasdadsadasdadsadasdasdasdsdadasdasdasdasdasdasdasd@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Email is too long');
    })

    it('should return a message when email has invalid character', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test!@#$%^&**@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Must use Kainos email');
    })

    it('should return a message when email is already used by another user', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Account with this email exists');
    })

    it('should return a message when password is too long', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!asdasdasdasdasdasdadadsasdadasdasdasdasdasdads');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Password must between 8 and 20 characters');
    })

    it('should return a message when password has invalid characters', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!^&*<>\'\";');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Password must include at least one capital, small letter, number and special character');
    })

    it('should return a message when password has no special characters', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Password must include at least one capital, small letter, number and special character');
    })

    it('should return a message when password has no lower case letter', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LETMEIN123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Password must include at least one capital, small letter, number and special character');
    })

    it('should return a message when password has no upper case letter', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('letmein123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Password must include at least one capital, small letter, number and special character');
    })

    it('should return a message when password is too short', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('Let123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Password must between 8 and 20 characters');
    })

    it('should return a message when first name is too long', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestNameToooooooooooooooooooooooooooooooooooooooooooooooooLong');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('First name is too long');
    })

    it('should return a message when first name has invalid characters', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName123!@#');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('First name can only consist of letters');
    })

    it('should return a message when last name is too long', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurnameIsTooooooooooooooooooooooooooooooooooooooooooooooooooLong');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Last name is too long');
    })

    it('should return a message when last name has invalid characters', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname123!@#');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Last name can only consist of letters and - or \'');
    })

    it('should return a message when phone number is too long', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123456789123456789');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Phone number is too long');
    })

    it('should return a message when phone number has invalid charcters', async() => {
        var driver = await new webdriver.Builder()
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/registration')

        await driver.findElement(By.id('email')).sendKeys('test@kainos.com');
        await driver.findElement(By.id('password')).sendKeys('LetMeIn123!^&*<>');
        await driver.findElement(By.id('first_name')).sendKeys('TestName');
        await driver.findElement(By.id('last_name')).sendKeys('TestSurname');
        await driver.findElement(By.id('phone_number')).sendKeys('123abc!@#');
        await driver.findElement(By.id('role')).click()
        await driver.findElement(By.xpath('//*[@id="role"]/option[1]')).click();
        await driver.findElement(By.id('location')).click();
        await driver.findElement(By.xpath('//*[@id="location"]/option[1]')).click();
        await driver.findElement(By.id('submit')).click();

        expect(await driver.findElement(By.id('regError')).getText()).to.equal('Phone number must consist only of numbers');
    })
})