const {Game,Detail,User} = require('../models');

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

const getLeaderboard = (req,res)=>{
    Detail.findAll({
        where:{
            gameId: req.params.id
        },
        attributes:[
            'gameId','userId','score'
        ],
        order: [["score", "DESC"]],
        include:{
            model: User,
            as:'detail_user',
            attributes:[
                'first_name','last_name','username','email'
            ],
        }
    })
    .then(detail=>{
        res.status(200).json({
            result:"success",
            data: detail
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
    findOne,
    getLeaderboard
}