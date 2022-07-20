var chai = require('chai');  
const expect = chai.expect;
const UserValidator = require('../../../app/validator/UserValidator.js');

describe('UserValidator', function () {
    describe('validateUserInput', function () {
      it('should return true when user is valid', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(UserValidator.validateUserInput(user)).to.be.true
      })

      it('should return true when user is valid (last name uses allowed special char)', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "O'LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(UserValidator.validateUserInput(user)).to.be.true
      })

      it('should return error when any filed is empty', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "",
            first_name: "FirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Each field must be filled in")
      })

      it('should return error when email is longer than 50 char', () => {
        let user = {
            email: "patryk.kiszelewskipatryk.kiszelewskipatryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Email is too long")
      })

      it('should return error when email doesnt contain company domain', () => {
        let user = {
            email: "patryk.kiszelewski@gmail.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Must use Kainos email")
      })

      it('should return error when email has no @', () => {
        let user = {
            email: "patryk.kiszelewskigmail.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Must use Kainos email")
      })

      it('should return error when password less than 8 char', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Pa12!d",
            first_name: "FirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Password must between 8 and 20 characters")
      })

      it('should return error when password more than 20 char', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Pa12!dPa12!dPa12!dPa12!d",
            first_name: "FirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Password must between 8 and 20 characters")
      })

      it('should return error when password doesnt contain capital letter', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "password123!",
            first_name: "FirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Password must include at least one capital, small letter, number and special character")
      })

      it('should return error when password doesnt contain a number', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Passworddd@!",
            first_name: "FirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Password must include at least one capital, small letter, number and special character")
      })


      it('should return error when password doesnt contain a special char', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password12345",
            first_name: "FirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Password must include at least one capital, small letter, number and special character")
      })

      it('should return error when first name is longer than 50 char', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstNameFirstNameFirstNameFirstNameFirstNameFirstName",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "First name is too long")
      })

      it('should return error when first name contain numbers', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName123",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "First name can only consist of letters")
      })

      it('should return error when first name contain special char', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "First-Name",
            last_name: "LastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "First name can only consist of letters")
      })

      it('should return error when last name is longer than 50 char', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "LastNameLastNameLastNameLastNameLastNameLastNameLastNameLastName",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Last name is too long")
      })

      it('should return error when last name contain numbers', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "LastName123",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Last name can only consist of letters and - or '")
      })

      it('should return error when last name contain not allowed sepcial characters', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "Last@Name",
            phone_number: "1234567890",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Last name can only consist of letters and - or '")
      })

      it('should return error when phone number is longer than 15 char', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "Last-Name",
            phone_number: "1234567890123456",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Phone number is too long")
      })

      it('should return error when phone number contain letters', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "Last-Name",
            phone_number: "1234567890a",
            role: "Admin",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "Phone number must consist only of numbers")
      })

      it('should return error when role does not exist', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "Last-Name",
            phone_number: "1234567890",
            role: "Sales Employee",
            location: "Belfast"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "This role does not exist")
      })

      it('should return error when location does not exist', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
            first_name: "FirstName",
            last_name: "Last-Name",
            phone_number: "1234567890",
            role: "Employee",
            location: "Poznan"
        }

        expect(function(){UserValidator.validateUserInput(user)}).to.throw(Error, "This location can not be chosen")
      })

    
    })
    describe('validateLoginInput', function () {
      it('should return true when user is valid', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password123!",
        }

        expect(UserValidator.validateLoginInput(user)).to.be.true
      })

      it('should return error when any field is empty', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "",
        }

        expect(function(){UserValidator.validateLoginInput(user)}).to.throw(Error, "Each field must be filled in")
      })

      it('should return error when email is longer than 50 char', () => {
        let user = {
            email: "patryk.kiszelewskikiszelewskikiszelewskikiszelewskikiszelewskikiszelewskikiszelewski@kainos.com",
            password: "Password123!",
        }

        expect(function(){UserValidator.validateLoginInput(user)}).to.throw(Error, "Invalid Email or Password")
      })

      it('should return error when email email doesnt contain company domain', () => {
        let user = {
            email: "patryk.kiszelewski@gmail.com",
            password: "Password123!",
        }

        expect(function(){UserValidator.validateLoginInput(user)}).to.throw(Error, "Invalid Email or Password")
      })

      it('should return error when password less than 8 char', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Pa12!d",
        }

        expect(function(){UserValidator.validateLoginInput(user)}).to.throw(Error, "Invalid Email or Password")
      })

      it('should return error when password more than 20 char', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Pa12!dPa12!dPa12!dPa12!d",
        }

        expect(function(){UserValidator.validateLoginInput(user)}).to.throw(Error, "Invalid Email or Password")
      })

      it('should return error when password doesnt contain capital letter', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "password123!",
        }

        expect(function(){UserValidator.validateLoginInput(user)}).to.throw(Error, "Invalid Email or Password")
      })

      it('should return error when password doesnt contain a number', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Passworddd@!",
        }

        expect(function(){UserValidator.validateLoginInput(user)}).to.throw(Error, "Invalid Email or Password")
      })


      it('should return error when password doesnt contain a special char', () => {
        let user = {
            email: "patryk.kiszelewski@kainos.com",
            password: "Password12345",
        }

        expect(function(){UserValidator.validateLoginInput(user)}).to.throw(Error, "Invalid Email or Password")
      })

    })
})
