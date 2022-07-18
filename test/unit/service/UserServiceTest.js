var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const UserService = require('../../../app/service/UserService.js');

const user = {
    email: "patryk.kiszelewski@kainos.com",
    password: "Password123!",
    first_name: "FirstName",
    last_name: "LastName",
    phone_number: "1234567890",
    role: "Admin",
    location: "Belfast"
}

describe('UserService', function () {
  describe('postRegistration', function (){
    it('should return user id from response', async () => {
      var mock = new MockAdapter(axios);
  
      var id = 1

      mock.onPost('/api/user/register').reply(200, id)
      var results = await UserService.postRegistration(user)
      expect(results).to.deep.equal(id)
    })

    it('should return error message when error 500 occurres', async () => {
      var mock = new MockAdapter(axios)
      mock.onPost('/api/user/register').reply(500)
  
      try{
        var error = await UserService.postRegistration(user)
      }catch(e){
        expect(e.message).to.equal('An error occurred while executing this request')
      }
    })

    it('should return error message when error 500 occurres and email is duplicate', async () => {
      var mock = new MockAdapter(axios)
      var data = "Duplicate"
      mock.onPost('/api/user/register').reply(500, data)
  
      try{
        var error = await UserService.postRegistration(user)
      }catch(e){
        expect(e.message).to.equal('Account with this email exists')
      }
    })
  
    it('should return error message when error 400 occurres', async () => {
      var mock = new MockAdapter(axios);
      mock.onPost('/api/user/register').reply(400);
  
      try{
        var error = await UserService.postRegistration(user)
      }catch(e){
        expect(e.message).to.equal('Bad request')
      }
    })
  
    it('should return error message when error 404 occurres', async () => {
      var mock = new MockAdapter(axios);
  
      mock.onPost('/api/user/register').reply(404);
  
      try{
        var error = await UserService.postRegistration(user)
      }catch(e){
        expect(e.message).to.equal('Bad request')
      }
    })
  
    it('should return error message when error 503 occurres', async () => {
      var mock = new MockAdapter(axios);
      mock.onPost('/api/user/register').reply(503);

      try{
        var error = await UserService.postRegistration(user)
      }catch(e){
        expect(e.message).to.equal('Server is unavaliable')
      }
    })
    it('should return error message when unknown error occurres', async () => {
      var mock = new MockAdapter(axios);
      mock.onPost('/api/user/register').reply(403);

      try{
        var error = await UserService.postRegistration(user)
      }catch(e){
        expect(e.message).to.equal('Not handled error had occurred')
      }
    })
  
    it('should return undefined, when the response is undefined (API not working)', async () => {
      try{
        var res = await UserService.postRegistration(user)
      }catch(e){
        expect(res).to.equal(undefined)
      }
 })
})
})
