const axios = require('axios');
const { response } = require('express');
axios.defaults.baseURL = process.env.API_URL;

URL = '/api/job-roles'
BAND_URL = '/api/band-comp/'
REGISTRATION_URL = '/api/user/register'

module.exports.getJobRoles = async function () {
    try{
        const response = await axios.get(URL)
        return response.data
    }catch(e){
        if(e.response === undefined){
            throw new Error("Undefined error has occurred")
        }
        else if(e.response.status === 500){
            throw new Error("An error occurred while executing this request")
        }
        else if(e.response.status === 404){
            throw new Error("Bad request")
        }
        else if(e.response.status === 503){
            throw new Error("Server is unavaliable")
        }
        else{
            throw new Error("Not handled error had occurred")
        }
    }
}

module.exports.getCompByBandID = async function (id) {
    if(isNaN(id)){
        throw new Error("Invalid ID")
    }
    try{
       
        const response = await axios.get(BAND_URL + id)
        return response.data
    }catch(e){
        if(e.response === undefined){
            throw new Error("Undefined error has occurred")
        }
        else if(e.response.status === 500){
            throw new Error("An error occurred while executing this request")
        }
        else if(e.response.status === 404 || e.response.status === 400){
            throw new Error("Bad request")
        }
        else if(e.response.status === 503){
            throw new Error("Server is unavaliable")
        }
        else{
            throw new Error("Not handled error had occurred")
        }
    }
}

module.exports.postRegistration = async function (user) {
    try{
        const response = await axios.post(REGISTRATION_URL, user)
        return response.data
    }catch(e){
        if(e.response === undefined){
            throw new Error("Undefined error has occurred")
        }
        else if(e.response.status === 500){
            if(e.response.data === undefined){
                throw new Error("An error occurred while executing this request")
            }
            //looking for word duplicate can be used cause only email need to be unique in this case
            if(e.response.data.includes("Duplicate")){
                throw new Error("Account with this email exists")
            }
        }
        else if(e.response.status === 404 || e.response.status === 400){
            throw new Error("Bad request")
        }
        else if(e.response.status === 503){
            throw new Error("Server is unavaliable")
        }
        else{
            throw new Error("Not handled error had occurred")
        }
    }
}
