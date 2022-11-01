const user=require('../models/users.models')
const ValidateUser =require('../validation/Users.validation')
const controller={
AddUser :async (req,res)=>{
    const {errors,isValid}=ValidateUser(req.body)
try {
    if (!isValid) {
        res.status(404).json(errors)

    }else{
     await   user.findOne({email:req.body.email}).then(async(exist)=>{
            if ((exist)) {
                errors.email="email already exist"
                res.status(404).json(errors)

            }else{

                 await user.create(req.body)
                 res.status(201).json({message:'user added'})

            }
        })
       
    }

   
} catch (error) {
    res.status(401).json({msg:error})
    
}

},


FindAllUsers :async (req,res)=>{
    try {
        const data =await user.find()
    res.status(201).json({data:data})

    } catch (error) {
        console.log(error.message);
        
    }

},
findSingleUser :async (req,res)=>{
    try {
        const data =await user.findOne({_id :req.params.id})
        console.log(data);
    res.status(201).json({data:data})

    } catch (error) {
        console.log(error.message);
        
    }

},
updateUser :async (req,res)=>{
    const {errors,isValid}=ValidateUser(req.body)

    try {
        if (!isValid) {
            res.status(404).json(errors)
    
        }else{
        const data =await user.findOneAndUpdate({_id :req.params.id},
            req.body,
            {new:true}
            
            )
    res.status(201).json({data:data})
        }

    } catch (error) {
        console.log(error.message);
        
    }


},
deleteUser :async (req,res)=>{
    try {
        const data =await user.findOneAndDelete({_id :req.params.id})

       res.status(201).json({message:"user deleted"})

    } catch (error) {
        console.log(error.message);
        
    }


},



}
module.exports=controller