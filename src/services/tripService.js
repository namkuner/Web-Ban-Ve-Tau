import db from "../models/index"
const { Op } = require('sequelize');

let getAllDataTrip = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Tripp.findAll(
                {include: [{
                    model: db.Train,
                    as: 'Train'
                }]}
            );
            resolve(data)
        }
        catch (e) {
            reject(e);
        }
    })
}
let createNewTrip = async (data) => {
    try {
        const newTrip = await db.Tripp.create({
            ThoiGianDi: data.ThoiGianDi,
            ThoiGianDen: data.ThoiGianDen,
            DiaDiemDi: data.DiaDiemDi,
            DiaDiemDen: data.DiaDiemDen,
            Gia: data.Gia, 
            MaTau: data.MaTau
        });
        db.Train.update({TrangThai: 1}, {
            where: {
                MaTau: data.MaTau
            }
        });
        //Với từng mã ghế trong từng toá của tàu trong chuyến đi, sẽ tạo ra 1 mã vé mới
        let cars = await db.Toa.findAll({
            where: {
                MaTau: data.MaTau
            }
        });
        cars.forEach(async car => {
            let seats = await db.Ghe.findAll({
                where: {
                    MaToa: car.MaToa
                }
            });
            seats.forEach(async seat => {
                await db.Tickett.create({
                    MaGhe: seat.MaGhe,
                    MaTrip: newTrip.MaTrip,
                    TrangThai: 0
                });
            });
        });

            
        return newTrip;
    } catch (e) {
        throw new Error(e);
    }
}
let checkTime = (MaTau, ThoiGianDi,ThoiGianDen) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await db.Tripp.findOne({
                where: {
                    MaTau: MaTau,
                    [Op.or]: [
                        {
                            ThoiGianDi: {
                                [Op.between]: [ThoiGianDi, ThoiGianDen]
                            }
                        },
                        {
                            ThoiGianDen: {
                                [Op.between]: [ThoiGianDi, ThoiGianDen]
                            }
                        }
                    ]
                }
            });
            resolve(check);
        } catch (e) {
            reject(e);
        }
    })
};
//1 train has many cars, 1 car has many seats, I want to know how many seats 1 train has

let getSeatCountByTrain= (MaTau) => {
    console.log("vao getSeatCountByTrain");
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Train.findOne({
                where: {MaTau: MaTau},
                include: [{
                    model: db.Toa,
                    as: 'Toa',
                    include: [{
                        model: db.Ghe,
                        as: 'Ghe'
                    }]
                }]
            });
        //i have error here "Ghe is not associated to Toa!" Why?
        //I want to know how many seats 1 train has
        //many ghe has one toa, many toa has one train

            console.log("data", data);
            if(data && data.Toa){
                let count = 0;
                data.Toa.forEach(toa => {
                    count += toa.Ghe.length;
                });
                resolve(count);
            }
            else{
                resolve(0);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let searchTrip = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let trips = await db.Tripp.findAll({
                where: {
                    DiaDiemDi: data.DiaDiemDi,
                    DiaDiemDen: data.DiaDiemDen,
                    ThoiGianDi: {
                        [Op.between]: [data.ThoiGianDi, data.ThoiGianDen]
                    }
                }
            });
            if (trips === null)
            {
                trips = await db.Tripp.findAll({
                    where: {
                        DiaDiemDi: data.DiaDiemDi,
                        DiaDiemDen: data.DiaDiemDen,
                    }
                });
            } 
            resolve(trips);
        }
        catch (e) {
            reject(e);
        }
    })
}
let handleSearchTripTrue = async (diemXuatPhat, diemDen, ngayKhoiHanh) => {
    try {
      let tripData= {};
      console.log("diemXuatPhat",diemXuatPhat)
      let KTdiemXuatPhat = await checkUserdiemXuatPhat(diemXuatPhat);
      
      if (KTdiemXuatPhat != null) {
        // Nơi xuất phát tồn tại
        let tripDen = await checkUserdiemDen(diemDen,diemXuatPhat)
  
        
          if (tripDen != null) {
              
            return tripDen;

          } else {
           
            tripData.errCode = 2;
            tripData.errMessage = 'Hiện tại đã hết vé ĐẾN ' + diemDen;
            return tripData;
          }
        } 

      else {
        tripData.errCode = 1;
        tripData.errMessage = 'Hiện tại đã hết vé ĐI từ ' +diemXuatPhat;
        return tripData;
      }
      
    } catch (e) {
      throw e;
    }
  };
let searchTripForUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let trips = await db.Tripp.findAll({
                where: {
                    DiaDiemDi: data.DiaDiemDi,
                    DiaDiemDen: data.DiaDiemDen,
                    // ThoiGianDi: {
                    //     [Op.between]: [data.ThoiGianDi, data.ThoiGianDen]
                    // }
                },
                include: [{
                    model: db.Train,
                    as: 'Train'
                }]
            });
            console.log("trips",trips); 
            console.log("data",data);
            if (trips === null)
            {
                trips = await db.Tripp.findAll({
                    where: {
                        DiaDiemDi: data.DiaDiemDi,
                        DiaDiemDen: data.DiaDiemDen,
                    },
                    include: [{
                        model: db.Train,
                        as: 'Train'
                    }]
                });
            } 
            resolve(trips);
        }
        catch (e) {
            reject(e);
        }
    })
} 
module.exports = {
    getAllDataTrip:getAllDataTrip,
    checkTime:checkTime,
    createNewTrip:createNewTrip,
    getSeatCountByTrain:getSeatCountByTrain,
    searchTrip:searchTrip,
    searchTripForUser:searchTripForUser
}