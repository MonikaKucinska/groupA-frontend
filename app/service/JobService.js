const axios = require('axios');
const { response } = require('express');
axios.defaults.baseURL = process.env.API_URL;


module.exports.getJobRoles = async function () {
    try{
        const response = await axios.get('/job-roles')
    }catch(e){
        throw new Error("Could not find job roles")
    }

}