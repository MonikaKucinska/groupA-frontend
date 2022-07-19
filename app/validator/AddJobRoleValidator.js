// const dropDownData = {
//     role : ["Employee", "Admin"],
//     location : ["Belfast", "Birmingham", "Gdansk", "London"]
// }


module.exports.validateUserInput = function (role) {
    if(Object.values(role).some(x => x === null || x === '')){
        throw new Error("Each field must be filled in")
    }
    if (role.role_name.length > 50) {
        throw new Error("Role name is too long")
    }
    if(!this.validateJobRoleName(role.role_name)){ 
        throw new Error("Job role name can only consist of letters")
    }
    if (role.role_description.length > 1500) {
        throw new Error("Role description is too long")
    }
    if(!this.validateJobRoleDescription(role.role_description)){ 
        throw new Error("Job role description can only consist of letters")
    }
    if (role.sharepoint_url.length > 1000) {
        throw new Error("URL too long")
    }
    if(!this.validateSharepointURL(role.sharepoint_url)){ 
        throw new Error("Invalid URL")
    }

   
    return true
}
//sharepoint url validation
module.exports.validateSharepointURL = function (sharepoint_url) {
    var reg = "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/";
    return sharepoint_url.match(reg)
};



module.exports.validateJobRoleName = function(role_name){
    var reg = "^[a-zA-Z]+$"
    return role_name.match(reg)
}


module.exports.validateJobRoleDescription = function(role_description){
    var reg = "^[a-zA-Z-']*$"
    return role_description.match(reg)
}

// module.exports.valdiatePhoneNumber = function(phoneNumber){
//     var reg = "^[0-9]+$"
//     return phoneNumber.match(reg)
// }

// module.exports.validateRole = function(role){
//     return dropDownData.role.includes(role)
// };

// module.exports.validateLocation = function(location){
//     return dropDownData.location.includes(location)
// };
     
    
 