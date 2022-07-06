const axios = require('axios');
const { response } = require('express');
axios.defaults.baseURL = process.env.API_URL;


module.exports.getJobRoles = async function () {
    const response = await axios.get('/job-roles')

    return response.data
}