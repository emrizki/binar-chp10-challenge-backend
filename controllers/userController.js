const {User} = require('../models');


const findOne = (req,res)=>{
    User.findAll({
        where:{
            id:req.params.id
        }
    })
    .then(data =>{
        res.status(200).json({
            result:"success",
            data: data
        });
    })
    .catch(err =>{
        res.status(500).json({
            result:"failed",
            message: err.message || "some error occured while retrieving game"
        })
    })
}

module.exports ={
    findOne
}