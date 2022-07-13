const axios = require('axios');
const { response } = require('express');
axios.defaults.baseURL = process.env.API_URL;

URL = '/api/job-roles'
BAND_URL = '/api/band-comp/'

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
    try{
        if(isNaN(id)){
            throw new Error("Invalid ID")
        }
        const response = await axios.get(BAND_URL + id)
        return response.data
    }catch(e){
        if(e.message === "Invalid ID"){
            throw new Error("Invalid ID")
        }
        else if(e.response === undefined){
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
