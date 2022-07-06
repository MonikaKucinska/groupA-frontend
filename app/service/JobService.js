const axios = require('axios');
const { response } = require('express');
axios.defaults.baseURL = process.env.API_URL;

let roles = [{
    role_name: "name"
},
{
    role_name: "name 2"
}

]

module.exports.getJobRoles = async function () {
    // try{
    //     const response = await axios.get('/job-roles')
    // }catch(e){
    //     return new Error("Could not find job roles")
    // }

    return roles;
}