const dropDownData = {
    band: [1, 2, 3, 4, 5, 6, 7, 8],
    capability : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
}

module.exports.validateUserInput = function (role) {
    if(Object.values(role).some(x => x === null || x === '')){
        throw new Error("Each field must be filled in")
    }
    if (role.role_name.length > 50) {
        throw new Error("Role name is too long")
    }
    if(!this.valdateRoleName(role.role_name)){
        throw new Error("Role name can only consist of letters")
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
    if(!this.validateCapability(role.cap_id)) {
        throw new Error("Invalid Capability")
    }
    if(!this.validateBand(role.band_id)) {
        throw new Error("Invalid Band")
    }

    return true
}

//sharepoint url validation
module.exports.validateSharepointURL = function (sharepoint_url) {
    var reg = "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/";
    return sharepoint_url.match(reg)
};



module.exports.valdateRoleName = function (role_name) {
    var reg = /^[A-Za-z\s]*$/;
    return role_name.match(reg)
}


module.exports.validateJobRoleDescription = function (role_description) {
    var reg = /^[A-Za-z\s-',()!.]*$/;
    return role_description.match(reg)
}


module.exports.validateCapability = function(capability){
    return dropDownData.capability.includes(capability)
};

module.exports.validateBand = function(band){
    return dropDownData.band.includes(band)
};
