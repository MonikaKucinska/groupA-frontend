const axios = require('axios');
const { response } = require('express');
axios.defaults.baseURL = process.env.API_URL;

URL = '/api/job-roles'

module.exports.getJobRoles = async function () {
    try{
        const response = await axios.get(URL)
        return response.data
    }catch(e){
        return new Error("Could not get job roles")
    }
}