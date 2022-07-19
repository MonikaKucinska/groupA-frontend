const axios = require('axios');
const { response } = require('express');
axios.defaults.baseURL = process.env.API_URL;

REGISTRATION_URL = '/api/user/register'
LOGIN_URL = '/api/user/login'

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


module.exports.postLogin = async function (user) {
    try{
        const response = await axios.post(LOGIN_URL, user)
        return response.data
    }catch(e){
        throw new Error("Not handled error had occurred")
    }
}