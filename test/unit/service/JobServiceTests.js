var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const JobService = require('../../../app/service/JobService');
const role = {
  role_name: "Innovation Lead",
  role_description: "As an Innovation Lead (Consultant) in Kainos, youll be responsible will lead the team, working with the Innovation Lead in a dynamic and hands-on role which will involve managing and developing the team, implementing and shaping Kainos innovation strategy and effectively communicating the exciting work we undertake both internally and within the wider technology community.",
  sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Innovation%20Lead%20%28Consultant%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
  cap_id: 1,
  band_id: 4,
  band_name: 'Consultant'
}

const competency = {
  band_name: "Leaders",
  comp_name: "Supporting and Delivering the Strategy",
  comp_description: "Sets, maintains, and ensures a clear direction for Kainos with highly focused priorities and results by articulating short, medium-and long-term strategies focused on adding real value to Kainos and our customers Creates joined up strategies and plans which help put into practice and support Kainos vision and long-term direction which are challenging yet achievable. Based upon external economic, social, technology and environmental trends. Enables the whole company to remain focused on business priorities, irrespective of challenges. Swiftly refocuses Kainos on new priorities as changing situations dictate. Models personal resilience and accountability for achieving strategic priorities and results. Balances challenging operational and strategic priorities. Establishes transparency and trust where results are discussed openly. Encourages and inspires the organisation to energise delivery, while driving a performance culture across Kainos and achieve results through others. Monitors and evaluates strategic outcomes, adjusting to ensure sustainability of the strategy and ongoing communication and engagement."
}

const responsibility = {
  resp_desc: 'You will work within a multi-skilled agile team to develop large-scale data processing software to meet user needs in demanding production environments.'
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

    it('should return error message when error 500 occurres', async () => {
      var mock = new MockAdapter(axios);

      mock.onGet(JobService.URL).reply(500);

      try{
        var error = await JobService.getJobRoles()
      }catch(e){
        expect(e.message).to.equal('An error occurred while executing this request')
      }
    })

    it('should return error message when error 404 occurres', async () => {
      var mock = new MockAdapter(axios);

      mock.onGet(JobService.URL).reply(404);

      try{
        var error = await JobService.getJobRoles()
      }catch(e){
        expect(e.message).to.equal('Bad request')
      }
    })

    it('should return error message when error 503 occurres', async () => {
      var mock = new MockAdapter(axios);

      mock.onGet(JobService.URL).reply(503);
      try{
        var error = await JobService.getJobRoles()
      }catch(e){
        expect(e.message).to.equal('Server is unavaliable')
      }
    })
    it('should return error message when unknown error occurres', async () => {
      var mock = new MockAdapter(axios);

      mock.onGet(JobService.URL).reply(403);
      try{
        var error = await JobService.getJobRoles()
      }catch(e){
        expect(e.message).to.equal('Not handled error had occurred')
      }
    })
    it('should return undefined, when the response is undefined (API not working)', async () => {
      try{
        var res = await JobService.getJobRoles()
      }catch(e){
        expect(res).to.equal(undefined)
      }
    })
    it('should return not null if band name is not null', async () => {
      var mock = new MockAdapter(axios);

      const data = [role];
      mock.onGet(JobService.URL).reply(200, data);
      var results = await JobService.getJobRoles();
      expect(results[0].band_name).to.not.equal(null);
    })
 })

 describe('getCompByBand', function (){
  it('should return competencies from response', async () => {
    var mock = new MockAdapter(axios);

    var id = 1

    const data = [competency];
    mock.onGet('/api/band-comp/' + id).reply(200, data)
    var results = await JobService.getCompByBandID(id)
    expect(results[0]).to.deep.equal(competency)
  })

  it('should return error message when id is not a number', async () => {
    var id = 'string'

    try{
      var error = await JobService.getCompByBandID(id)
    }catch(e){
      expect(e.message).to.equal("Invalid ID")
    }
  })

  it('should return error message when error 500 occurres', async () => {
    var mock = new MockAdapter(axios)
    var id = 1
    mock.onGet('/api/band-comp/' + id).reply(500)

    try{
      var error = await JobService.getCompByBandID(id)
    }catch(e){
      expect(e.message).to.equal('An error occurred while executing this request')
    }
  })

  it('should return error message when error 400 occurres', async () => {
    var mock = new MockAdapter(axios);

    var id = 1;

    mock.onGet('/api/band-comp/' + id).reply(400);

    try{
      var error = await JobService.getCompByBandID(id)
    }catch(e){
      expect(e.message).to.equal('Bad request')
    }
  })

  it('should return error message when error 404 occurres', async () => {
    var mock = new MockAdapter(axios);

    var id = 1;

    mock.onGet('/api/band-comp/' + id).reply(404);

    try{
      var error = await JobService.getCompByBandID(id)
    }catch(e){
      expect(e.message).to.equal('Bad request')
    }
  })

  it('should return error message when error 503 occurres', async () => {
    var mock = new MockAdapter(axios);

    var id = 1

    mock.onGet('/api/band-comp/' + id).reply(503);
    try{
      var error = await JobService.getCompByBandID(id)
    }catch(e){
      expect(e.message).to.equal('Server is unavaliable')
    }
  })
  it('should return error message when unknown error occurres', async () => {
    var mock = new MockAdapter(axios);

    var id = 1

    mock.onGet('/api/band-comp/' + id).reply(403);
    try{
      var error = await JobService.getCompByBandID(id)
    }catch(e){
      expect(e.message).to.equal('Not handled error had occurred')
    }
  })

  it('should return undefined, when the response is undefined (API not working)', async () => {
    var id = 1

    try{
      var res = await JobService.getCompByBandID(id)
    }catch(e){
      expect(res).to.equal(undefined)
    }
  })
 })
  
  describe('getRespByRoleId', function (){
    it('should return respinsibilities from response', async () => {
      var mock = new MockAdapter(axios);
  
      var id = 1
  
      const data = [responsibility];
      mock.onGet('/api/job-responsibility/' + id).reply(200, data)
      var results = await JobService.getJobResponsibilityByID(id)
      expect(results[0]).to.deep.equal(responsibility)
    })
  
    it('should return error message when id is not a number', async () => {
      var id = 'text'
  
      try{
        var error = await JobService.getJobResponsibilityByID(id)
      }catch(e){
        expect(e.message).to.equal("Invalid ID")
      }
    })
  
    it('should return error message when error 500 occurres', async () => {
      var mock = new MockAdapter(axios)
      var id = 1
      mock.onGet('/api/job-responsibility/' + id).reply(500)
  
      try{
        var error = await JobService.getJobResponsibilityByID(id)
      }catch(e){
        expect(e.message).to.equal('An error occurred while executing this request')
      }
    })
  
    it('should return error message when error 400 occurres', async () => {
      var mock = new MockAdapter(axios);
  
      var id = 1;
  
      mock.onGet('/api/job-responsibility/' + id).reply(400);
  
      try{
        var error = await JobService.getJobResponsibilityByID(id)
      }catch(e){
        expect(e.message).to.equal('Bad request')
      }
    })
  
    it('should return error message when error 404 occurres', async () => {
      var mock = new MockAdapter(axios);
  
      var id = 1;
  
      mock.onGet('/api/job-responsibility/' + id).reply(404);
  
      try{
        var error = await JobService.getJobResponsibilityByID(id)
      }catch(e){
        expect(e.message).to.equal('Bad request')
      }
    })
  
    it('should return error message when error 503 occurres', async () => {
      var mock = new MockAdapter(axios);
  
      var id = 1
  
      mock.onGet('/api/job-responsibility/' + id).reply(503);
      try{
        var error = await JobService.getJobResponsibilityByID(id)
      }catch(e){
        expect(e.message).to.equal('Server is unavaliable')
      }
    })
    it('should return error message when unknown error occurres', async () => {
      var mock = new MockAdapter(axios);
  
      var id = 1
  
      mock.onGet('/api/job-responsibility/' + id).reply(403);
      try{
        var error = await JobService.getJobResponsibilityByID(id)
      }catch(e){
        expect(e.message).to.equal('Not handled error had occurred')
      }
    })
  
   
  
    it('should return undefined, when the response is undefined (API not working)', async () => {
      var id = 1
  
      try{
        var res = await JobService.getJobResponsibilityByID(id)
      }catch(e){
        expect(res).to.equal(undefined)
      }
    })
  })
  
  
})
