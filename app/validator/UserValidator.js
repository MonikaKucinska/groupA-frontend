module.exports.validateUserInput = function (user) {
    if(Object.values(user).some(x => x === null || x === '')){
        throw new Error("Each field must be filled in")
    }
    else{
        if(!this.validateUserEmail(user.email)){
            throw new Error("Email or password is not valid")
        }
    }
    
    return null
}

module.exports.validateUserEmail = function (email) {
    var possibleEmailServices = ["kainos.com"]
 
    var splitEmail = email.split("@")
    if(splitEmail.length != 2){
        return false;
    }
    if(!possibleEmailServices.includes(splitEmail[1])){
        return false;
    }

    return true
};
     
    
 