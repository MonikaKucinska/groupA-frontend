const express = require('express')
const router = express.Router()

const JobService = require('../service/JobService.js')
const UserService = require('../service/UserService.js')
const userValidator = require('../validator/UserValidator.js');
const AddJobRoleValidator = require ('../validator/AddJobRoleValidator.js'); 
const bcrypt = require('bcryptjs')

const saltRounds = 10;

//take request body and response body
//await for data from api, 
//render job roles in separate rows if not error
//if error occurres, render error message
router.get('/job-roles', async (req, res) => {
    try {
        data = await JobService.getJobRoles() 
        res.render('jobRoleView', {roles: data})
    } catch (e) {
        res.locals.errormessage = e
        res.render('jobRoleView')
    }
});

//take request body and response body
//await for data from api with sended band id, 
//render bandCompView with data and band name if not error
//if error occurres, render error message
router.get('/band-comp/:id', async (req, res) => {
    try {
        data = await JobService.getCompByBandID(req.params.id) 
        res.render('bandCompView', {competencies: data})
    } catch (e) {
        res.locals.errormessage = e
        res.render('bandCompView')
    }
});

//take request body and response body
//check if passed user is valid, if not, throw exception, and render error message
//if ok, hash password, and await for id form post user
//redirect to /job-roles if not error
//if error occurres, render error message
router.post('/user/register', async (req, res) => {
    try {
        if(userValidator.validateUserInput(req.body)){
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
            const user = JSON.parse(JSON.stringify(req.body))
            user.password = hash
            data = await UserService.postRegistration(user)
            let success = "Registration was successful" 
            res.locals.success = success 
            res.render('registation')
        }
    } catch (e) {
        res.locals.errormessage = e.message
        res.render('registration', req.body)
    }
});

//await for data from api with sended role id, 
//render jobRespView with data and role name if not error
//if error occurs, render error message
router.get('/job-responsibility/:id', async (req, res) => {
    try {
        data = await JobService.getJobResponsibilityByID(req.params.id) 
        res.render('jobRespView', {responsibilities: data})
    } catch (e) {
        res.locals.errormassege = e
        res.render('jobRespView')
    }
});


//take request body and response body
//check if passed job role is valid, if not, throw exception, and render error message
//if ok await for id form post user
//redirect to /job-roles if not error
//if error occurres, render error message
router.post('/job-roles', async (req, res) => {
    try {
        if(AddJobRoleValidator.validateUserInput(req.body)){
            const jobRole = JSON.parse(JSON.stringify(req.body))
            data = await JobService.addJobRole(jobRole) 
            res.redirect('/job-roles')
            //res.render('addJobRoleView')
        }
    } catch (e) {
        res.locals.errormessage = e.message
        res.render('addJobRoleView', req.body)
    }
});

module.exports = router

