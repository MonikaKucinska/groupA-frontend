const express = require('express')
const router = express.Router()

const JobService = require('../service/JobService.js')
const UserService = require('../service/UserService.js')
const userValidator = require('../validator/UserValidator.js');
const cookieParser = require('cookie-parser');

const crypto = require('crypto');
require('dotenv').config({path: '.env'});

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
            const hashedStr = crypto.createHmac('sha256', process.env.SECRET_KEY)
                        .update(req.body.password)
                        .digest('hex');
            const user = JSON.parse(JSON.stringify(req.body))
            user.password = hashedStr
            data = await UserService.postRegistration(user)
            let success = "Registration was successful" 
            res.locals.success = success 

            res.render('registration')
        }
    } catch (e) {
        res.locals.errormessage = e.message
        res.render('registration', req.body)
    }
});

router.post('/user/login', async (req, res) => {
    try {
        if(userValidator.validateLoginInput(req.body)){
            const hashedStr = crypto.createHmac('sha256', process.env.SECRET_KEY)
                        .update(req.body.password)
                        .digest('hex');

            const user = JSON.parse(JSON.stringify(req.body))
            user.password = hashedStr

            data = await UserService.postLogin(user)
            res.cookie("JWT", data)

            res.redirect('/index')
        }
    } catch (e) { 
        res.locals.errormessage = e.message
        res.render('login', req.body)
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

module.exports = router

