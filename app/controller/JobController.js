const express = require('express')
const router = express.Router()

const JobService = require('../service/JobService.js')
const userValidator = require('../validator/UserValidator.js');

const bcrypt = require('bcrypt');
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
            data = await JobService.postRegistration(user) 
            res.redirect('/job-roles')
        }
    } catch (e) {
        res.locals.errormessage = e.message
        res.render('registration', req.body)
    }
});
module.exports = router