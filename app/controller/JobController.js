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
        for (let i = 0; i < data.length; i++) {
            //id for each row is 'name{i+1}' where i go from 0 to length of fetched data 
            data[i].role_name = `<td id = 'name${i+1}' class="govuk-table__cell">${data[i].role_name}</td>` 
        }
        res.render('jobRoleView', {roles: data})
    } catch (e) {
        res.locals.errormassege = e
        res.render('jobRoleView')
    }
    
});

module.exports = router