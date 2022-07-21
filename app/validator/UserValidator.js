const dropDownData = {
    role : ["Employee", "Admin"],
    location : ["Belfast", "Birmingham", "Gdansk", "London"]
}

module.exports.validateLoginInput = function(user){
    if(Object.values(user).some(x => x === null || x === '')){
        throw new Error("Each field must be filled in")
    }
    if (user.email.length > 50) {
        throw new Error("Invalid Email or Password")
    }
    if(!this.validateUserEmail(user.email)){
        throw new Error("Invalid Email or Password")
    }
    if (user.password.length < 8 || user.password.length > 20) {
        throw new Error("Invalid Email or Password")
    }
    if (!this.validatePassword(user.password)) {
        throw new Error("Invalid Email or Password")
    }
    return true
}

module.exports.validateUserInput = function (user) {
    if(Object.values(user).some(x => x === null || x === '')){
        throw new Error("Each field must be filled in")
    }
    if (user.email.length > 50) {
        throw new Error("Email is too long")
    }
    if(!this.validateUserEmail(user.email)){
        throw new Error("Must use Kainos email")
    }
    if (user.password.length <8 || user.password.length >20) {
        throw  new Error("Password must between 8 and 20 characters")
    }
    if (!this.validatePassword(user.password)) {
        throw new Error("Password must include at least one capital, small letter, number and special character")
    }
    if(user.first_name.length > 50) {
        throw new Error("First name is too long")
    }
    if(!this.valdateFirstName(user.first_name)){
        throw new Error("First name can only consist of letters")
    }
    if (user.last_name.length > 50) {
        throw new Error("Last name is too long")
    }
    if(!this.valdateLastName(user.last_name)){
        throw new Error("Last name can only consist of letters and - or '")
    }
    if (user.phone_number.length > 15) {
        throw new Error("Phone number is too long")
    }
    if(!this.valdiatePhoneNumber(user.phone_number)){
        throw new Error("Phone number must consist only of numbers")
    }
    if(!this.validateRole(user.role)){
        throw new Error("This role does not exist")
    }
    if(!this.validateLocation(user.location)){
        throw new Error("This location can not be chosen")
    }
    return true
}

module.exports.validateUserEmail = function (email) {
    var possibleEmailServices = "kainos.com"
    var reg = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
        possibleEmailServices + "$"
    return email.match(reg)
};

module.exports.validatePassword = function(password){
    var upperCaseChars = new RegExp("(.*[A-Z].*)");
    var lowerCaseChars = new RegExp("(.*[a-z].*)");
    var numbers =new RegExp("(.*[0-9].*)");
    var specialChars =new RegExp("(.*[@,#,$,%,!,?].*$)");
    var unAvaliableSpecialChar = new RegExp(/[`^&*()_+\-=\[\]{};':"\\|,.<>\/~]/)

    return upperCaseChars.test(password) && lowerCaseChars.test(password) && numbers.test(password) && specialChars.test(password) && !unAvaliableSpecialChar.test(password)
};

module.exports.valdateFirstName = function(firstName){
    var reg = "^[a-zA-Z]+$"
    return firstName.match(reg)
}
module.exports.valdateLastName = function(lastName){
    var reg = "^[a-zA-Z-']*$"
    return lastName.match(reg)
}

module.exports.valdiatePhoneNumber = function(phoneNumber){
    var reg = "^[0-9]+$"
    return phoneNumber.match(reg)
}

module.exports.validateRole = function(role){
    return dropDownData.role.includes(role)
};

module.exports.validateLocation = function(location){
    return dropDownData.location.includes(location)
};
     
    
 