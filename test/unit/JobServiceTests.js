var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const JobService = require('../../app/service/JobService');
const role = {
  role_name: "Innovation Lead",
  role_description: "As an Innovation Lead (Consultant) in Kainos, youll be responsible will lead the team, working with the Innovation Lead in a dynamic and hands-on role which will involve managing and developing the team, implementing and shaping Kainos innovation strategy and effectively communicating the exciting work we undertake both internally and within the wider technology community.",
  sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Innovation%20Lead%20%28Consultant%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
  cap_id: 1
}

describe('JobService', function () {
  describe('getJobRoles', function (){
    it('should return job roles from response', async () => {
      var mock = new MockAdapter(axios);

      const data = [role];
      mock.onGet(JobService.URL).reply(200, data);
      var results = await JobService.getJobRoles();
      expect(results[0]).to.deep.equal(role);
    })

    // test may be changed depending on how api deals with errors
    it('should return error message when error 500 occurs', async () => {
      var mock = new MockAdapter(axios);

      mock.onGet(JobService.URL).reply(500);

      var error = await JobService.getJobRoles()
      
      expect(error.message).to.equal('An error occurred while executing this request')
    })

    it('should return error message when error 404 occurs', async () => {
      var mock = new MockAdapter(axios);

      mock.onGet(JobService.URL).reply(404);

      var error = await JobService.getJobRoles()
      
      expect(error.message).to.equal('Bad request')
    })

    it('should return error message when error 503 occurs', async () => {
      var mock = new MockAdapter(axios);

      mock.onGet(JobService.URL).reply(503);

      var error = await JobService.getJobRoles()
      
      expect(error.message).to.equal('Server is unavaliable')
    })
  })
})