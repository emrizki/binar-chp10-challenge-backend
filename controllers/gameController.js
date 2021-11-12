const {Game} = require('../models');

const findAll = (req,res)=>{
    Game.findAll()
    .then(data =>{
        res.status(200).json({
            result:"success",
            data: data
        });
    })
    .catch(err=>{
        res.status(500).json({
            result: "failed",
            message: err.message || "some eror occured while retrieving game."
        });
    })
}

const findOne = (req,res)=>{
    Game.findAll({
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

module.exports={
    findAll,
    findOne
}