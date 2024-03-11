import db from "../models/index"
const { Op, where } = require('sequelize');

let getAllDataTrip = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Trip.findAll(
                 //flag = true là chuyến đi còn vé
                {where : {flag: true}, 
                    include: [{
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
        const newTrip = await db.Trip.create({
            ThoiGianDi: data.ThoiGianDi,
            ThoiGianDen: data.ThoiGianDen,
            DiaDiemDi: data.DiaDiemDi,
            DiaDiemDen: data.DiaDiemDen,
            MaTau: data.MaTau
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
                await db.Ticket.create({
                    MaGhe: seat.MaGhe,
                    MaTrip: newTrip.MaTrip,
                    Gia: data.Gia, //Giá vé mặc định
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
            const check = await db.Trip.findOne({
                where: {
                    MaTau: MaTau,
                    flag: true,
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
            let trips = await db.Trip.findAll({
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
                trips = await db.Trip.findAll({
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
            let trips = await db.Trip.findAll({
                where: {
                    DiaDiemDi: data.DiaDiemDi,
                    DiaDiemDen: data.DiaDiemDen,
                    //Thời gian đi phải lớn hơn thời gian hiện tại
                    ThoiGianDi: {
                        [Op.gt]: new Date()
                    }

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
            resolve(trips);
        }
        catch (e) {
            reject(e);
        }
    })
} 
let getTicketByTripId = (tripId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Ticket.findAll({
                where: {
                    MaTrip: tripId,
                    flag: true
                }
            });
            resolve(data);
        }
        catch (e) {
            reject(e);
        }
    })
}
let getTripById = (tripId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Trip.findOne({
                where: {
                    MaTrip: tripId,
                    flag: true,

                },
                include: [{
                    model: db.Train,
                    as: 'Train'
                }]
            });
            resolve(data);
        }
        catch (e) {
            reject(e);
        }
    })
}
let bookTicket = async (ve, idlogin) => {
    //ve là 1 string  "96,98" nhưng dữ liệu của MaVe trong table database là interger
    try {
        console.log("ve",ve);
        console.log(typeof ve); 
        let date =  new Date();
        const ticket = await db.Ticket.update({
            TrangThai: 1,
            UserID: idlogin,
            ThoiGianDatVe: date
        }, {
            where: {
                MaVe: {
                    [Op.in]: ve.split(",")
                }
            }
        });
        return ticket;
    } catch (e) {
        throw new Error(e);
    }
}
//i don't want destroy it. i want to fix flag of trip to false and all ticket have MaTrip = tripId to false
let deleteTrip = async (tripId) => {
    try {
        const trip = await db.Trip.update({
            flag: false
        }, {
            where: {
                MaTrip: tripId
            }
        });
        const ticket = await db.Ticket.update({
            flag : false
        }, {
            where: {
                MaTrip: tripId
            }
        });
        return trip;
    } catch (e) {
        throw new Error(e);
    }
}
let restoreTripData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Trip.findAll({
                where: {
                    flag: false
                },
                include: [{
                    model: db.Train,
                    as: 'Train'
                }]
            });
            resolve(data);
        }
        catch (e) {
            reject(e);
        }
    })
}
let restoreTrip = async (tripId) => {
    try {
        const trip = await db.Trip.update({
            flag: true
        }, {
            where: {
                MaTrip: tripId
            }
        });
        const ticket = await db.Ticket.update({
            flag : true
        }, {
            where: {
                MaTrip: tripId
            }
        });
        return trip;
    } catch (e) {
        throw new Error(e);
    }
}
let getTripRestoreById = (tripId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Trip.findOne({
                where: {
                    MaTrip: tripId,
                    flag: false
                }
            });
            resolve(data);
        }
        catch (e) {
            reject(e);
        }
    })
}
let updateTrip = async (data) => {
    try {
        const trip = await db.Trip.update({
            ThoiGianDi: data.ThoiGianDi,
            ThoiGianDen: data.ThoiGianDen,
            DiaDiemDi: data.DiaDiemDi,
            DiaDiemDen: data.DiaDiemDen,
            MaTau: data.MaTau
        }, {
            where: {
                MaTrip: data.MaTrip
            }
        });
        return trip;
    } catch (e) {
        throw new Error(e);
    }
}   
module.exports = {
    getAllDataTrip:getAllDataTrip,
    checkTime:checkTime,
    createNewTrip:createNewTrip,
    getTicketByTripId:getTicketByTripId,
    getSeatCountByTrain:getSeatCountByTrain,
    searchTrip:searchTrip,
    getTripRestoreById:getTripRestoreById,
    deleteTrip:deleteTrip,
    restoreTripData:restoreTripData,
    restoreTrip:restoreTrip,
    getTripById:getTripById,
    updateTrip:updateTrip,
    bookTicket:bookTicket, 
    searchTripForUser:searchTripForUser
}