const dataService = require("../services/data.service");

const dataCtrl ={
    handleData(req,res){
        const query = req.query;
        if(query?.q){
            const data = dataService?.getData(query?.q?.split(","));
            res.status(200).send({data,message:"available data"});

        }else{
            res.status(404).send({message:"data not available",error: null});
        }
    },
};
module.exports = dataCtrl;