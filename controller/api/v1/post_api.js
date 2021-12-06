module.exports.post=function(req,res){
    return res.json(200,{
        message:"Lists of Post",
        post:[]
    })
}