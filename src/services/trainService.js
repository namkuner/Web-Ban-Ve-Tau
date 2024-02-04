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
let checkTau = async (TenTau) => {
    try {
        const check = await db.Train.findOne({
            where: {
                TenTau: TenTau
            }
        });
        return check;
    } catch (e) {
        throw new Error(e);
    }
}
let createNewTrain = async (data) => {
    try {
        const newTrain = await db.Train.create({
            TenTau: data.TenTau,
            TrangThai: data.TrangThai
        });
    //will automatically create a "SoToa" car with the car names A,B,C,... and the MaTau of the car is the train code just created. At the same time, create a SoGhe/SoToa seat for each carriage, with the MaToa of the corresponding Seat
    let GheMoiToa = Math.floor(data.SoGhe /data.SoToa) ;
    for (let i = 1; i <= data.SoToa; i++) {
            const newCar = await db.Toa.create({
                TenToa: String.fromCharCode(64 + i),
                MaTau: newTrain.MaTau
            });
            for (let j = 1; j <= GheMoiToa; j++) {
                await db.Ghe.create({
                    TenGhe: j,
                    MaToa: newCar.MaToa,
                });
            }
        }
        return newTrain;
    } catch (e) {
        throw new Error(e);
    }
}
let deleteTauById = async (MaTau) => {
    try {
        const train = await db.Train.findOne({
            where: {
                MaTau: MaTau
            }
        });
        if (train) {
            await train.destroy();
        }
    } catch (e) {
        throw new Error(e);
    }
}
let getToa = async (MaTau) => {
    try {
        const toa = await db.Toa.findAll({
            where: {
                MaTau: MaTau
            }
        });
        return toa;
    } catch (e) {
        throw new Error(e);
    }
}
let getTauById = async (MaTau) => {
    try {
        console.log("vao train service ")
        const train = await db.Train.findOne({
            where: {
                MaTau: MaTau
            }
        });
        console.log("vao train service ", train)
        return train;
    } catch (e) {
        throw new Error(e);
    }
}
let getToaById = async (MaToa) => {
    try {
        const toa = await db.Toa.findOne({
            where: {
                MaToa: MaToa
            }
        });
        return toa;
    } catch (e) {
        throw new Error(e);
    }
}

let getGhe = async (MaToa) => {
    try {
        const ghe = await db.Ghe.findAll({
            where: {
                MaToa: MaToa
            }
        });
        return ghe;
    } catch (e) {
        throw new Error(e);
    }
}
let getTauByToa = async (MaTau) => {
    try {
        const tau = await db.Train.findOne({
            where: {
                MaTau: MaTau
            }
        });
        return tau;
    } catch (e) {
        throw new Error(e);
    }
}
let checkTenGhe = async (TenGhe,MaToa) => {
    try {

        const check = await db.Ghe.findOne({
            where: {
                TenGhe: TenGhe,
                MaToa: MaToa
            }
        });
        return check;
    } catch (e) {
        throw new Error(e);
    }
}
let createNewGhe = async (data) => {
    try {
        const newGhe = await db.Ghe.create({
            TenGhe: data.TenGhe,
            MaToa: data.MaToa
        });
        return newGhe;
    } catch (e) {
        throw new Error(e);
    }
}
module.exports = {
    getAllTrain: getAllTrain,
    getTauById: getTauById,
    getToaById: getToaById,
    getTauByToa: getTauByToa,
    getGhe: getGhe,
    createNewGhe: createNewGhe,
    checkTau: checkTau,
    checkTenGhe: checkTenGhe,
    createNewTrain: createNewTrain,
    deleteTauById: deleteTauById,
    getToa: getToa
}