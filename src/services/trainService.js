import db from "../models/index"
const { Op } = require('sequelize');

let getAllTrain = () => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("vao service train")
            let data = await db.Train.findAll();
            resolve(data)
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllTrain: getAllTrain
}