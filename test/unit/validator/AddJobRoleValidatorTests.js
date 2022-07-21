var chai = require('chai');  
const expect = chai.expect;
const AddJobRoleValidator = require('../../../app/validator/AddJobRoleValidator.js');

describe('AddJobRoleValidator', function() {
    describe('validateUserInput', function () {
        it('should return true when role is valid', () => {
            let role = {
                role_name: "Software Engineer",
                role_description: "As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's lives ",
                sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                cap_id: 3,
                band_id: 5
            }
            expect(AddJobRoleValidator.validateUserInput(role)).to.be.true
        })

        it('should return true when role is valid (Role description allows special char)', () => {
            let role = {
                role_name: "Software Engineer",
                role_description: "make a real difference to people's lives!",
                sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                cap_id: 3,
                band_id: 5
            }
            expect(AddJobRoleValidator.validateUserInput(role)).to.be.true
        })

        it('should return error when role name is longer than 50 chars', () => {
            let role = {
                role_name: "Software Engineerasdfghjkjhgfdfghjhgfdfghjkjhgfdfghjkjhgfdfghrtyui",
                role_description: "As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's lives ",
                sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                cap_id: 3,
                band_id: 5
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Role name is too long")
        })

        it('should return error when role deescription is longer than 1500 chars', () => {
            let role = {
                role_name: "Software Engineer",
                role_description: "As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's lives - the lives of people you know. After taking part in our award-winning, seven-week Engineering Academy, you will then join one of our many project teams, to learn from our experienced developers, project managers and customer-facing staff. You'll have great support and mentoring, balanced with the experience of being given real, meaningful work to do, to help you truly develop both technically and professionally.  You will be responsible for:•Contribute to developing high quality solutions which impact the lives of users worldwide.   You'll work as part of a team to solve problems and produce innovative software solutions.  •Learn about new technologies and approaches, with talented colleagues who will help you learn, develop and grow.  Based in our Kainos office and often on our customer sites, you will work on a project teams to learn how to develop and unit test developing and unit testing straightforward or low complexity components, and then moving on to more complex elements as you increase your knowledge.  •Work with other developers in working through designs and user stories and to produce real development solutions   Will be fully supported by experienced colleagues in the team to follow designs,and then progress to assist in any other aspect of the project life-cycle under supervision   Develop excellent technical, team-working and Agile project experience   MINIMUM (ESSENTIAL) REQUIREMENTS ",
                sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                cap_id: 3,
                band_id: 5
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Role description is too long")
        })

        it('should return error when sharepoint url is longer than 1000 chars', () => {
            let role = {
                role_name: "Software Engineer",
                role_description: "As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's lives ",
                sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                cap_id: 3,
                band_id: 5
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "URL too long")
        })

        it('should return error when sharepoint doesnt match kainos URL', () => {
            let role = {
                role_name: "Software Engineer",
                role_description: "Writing code, testing code, fixing code.",
                sharepoint_url: "hello",
                cap_id: 3,
                band_id: 5
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Invalid URL")
        })

        it('should return error when role name contains numbers', () => {
            let role = {
                role_name: "1234",
                role_description: "As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's lives ",
                sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                cap_id: 3,
                band_id: 5
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Role name can only consist of letters")
        })

        it('should return error when role name contains special char', () => {
            let role = {
                role_name: "Role-Name",
                role_description: "As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's lives ",
                sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                cap_id: 3,
                band_id: 5
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Role name can only consist of letters")
        })

        it('should return error when role descrption contains numbers', () => {
            let role = {
                role_name: "Software Engineer",
                role_description: "1234",
                sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                cap_id: 3,
                band_id: 5
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Job role description can only consist of letters")
        })

        it('should return error when capability does not exist', () => {
            let role = {
                role_name: "Software Engineer",
                role_description: "Testing, writing and fixing code",
                sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                cap_id: 75,
                band_id: 5
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Invalid Capability")
        })

        it('should return error when band does not exist', () => {
            let role = {
                role_name: "Software Engineer",
                role_description: "Testing, writing and fixing code",
                sharepoint_url: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                cap_id: 3,
                band_id: 40
            }
            
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Invalid Band")
        })
    })
})