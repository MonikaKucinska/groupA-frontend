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

module.exports = router