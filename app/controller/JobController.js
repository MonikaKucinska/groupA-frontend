const express = require('express')
const router = express.Router()

const JobService = require('../service/JobService.js')


router.get('/job-roles', async (req, res) => {   
    try {
        data = await JobService.getJobRoles()
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            data[i].role_name = `<td id = 'name${data[i].role_id}' class="govuk-table__cell">${data[i].role_name}</td>`
        }
    } catch (e) {
        res.locals.errormassege = e
        res.render('jobRoleView')
    }
    res.render('jobRoleView', {roles: data}) 
    
});

module.exports = router