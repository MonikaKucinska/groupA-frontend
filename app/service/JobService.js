const axios = require('axios');
const { response } = require('express');
axios.defaults.baseURL = process.env.API_URL;

URL = '/api'

module.exports.getJobRoles = async function () {
    try{
        const response = await axios.get('http://localhost:8080/api/job-roles')
        return response.data
    }catch(e){
        throw new Error("Could not find job roles")
    }
}