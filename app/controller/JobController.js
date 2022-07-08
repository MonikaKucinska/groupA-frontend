const express = require('express')
const router = express.Router()

const JobService = require('../service/JobService.js')


router.get('/job-roles', async (req, res) => {
    try {
        data = await JobService.getJobRoles()
        for (let i = 0; i < data.length; i++) {
            data[i].role_name = `<td id = 'name${i}' class="govuk-table__cell">${data[i].role_name}</td>`
        }
        res.render('jobRoleView', {roles: data}) 
    } catch (e) {
        res.locals.errormassege = e
        res.render('jobRoleView')
    }
    
});

module.exports = router