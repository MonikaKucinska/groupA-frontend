const express = require('express')
const router = express.Router()

const JobService = require('../service/JobService.js')

//take request body and response body
//await for data from api, 
//render job roles in separate rows if not error
//if error occurres, render error message
router.get('/job-roles', async (req, res) => {
    try {
        data = await JobService.getJobRoles() 
        res.render('jobRoleView', {roles: data})
    } catch (e) {
        res.locals.errormassege = e
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
        res.locals.errormassege = e
        res.render('bandCompView')
    }
});

//take request body and response body
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