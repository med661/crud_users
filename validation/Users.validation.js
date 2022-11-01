const isEmpty=require('./isEmpty')
const validator=require('validator')


module.exports=function ValidateUser(data){
let errors={}
    data.email=!isEmpty(data.email) ? data.email: ""
    data.name=!isEmpty(data.name) ? data.name: ""
    data.mobile=!isEmpty(data.mobile) ? data.mobile: ""


    if (!validator.isEmail(data.email)) {
        errors.email="format email is required"
        
    }
    if (validator.isEmpty(data.email)) {
        errors.email="required email"
        
    }
    if (validator.isEmpty(data.name)) {
        errors.name="required name"
        
    }
    if (validator.isEmpty(data.mobile)) {
        errors.mobile="required mobile"
        
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }


}
