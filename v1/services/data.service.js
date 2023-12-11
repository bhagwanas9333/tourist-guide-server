const data = require("../helpers/data.json")
const _ = require("lodash");
const dataService = {
    getData(fields){
        return _.pick(data,fields);
        console.log("field",data,fields);

    },
};
module.exports = dataService;