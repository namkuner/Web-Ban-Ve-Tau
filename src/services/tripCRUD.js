import db from "../models/index"
const { Op } = require('sequelize');


let createNewTrip = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tau = await db.Trip.create({
                diemXuatPhat: data.diemXuatPhat,
                diemDen: data.diemDen,
                thoiGianDi: data.thoiGianDi,
                thoiGianDen: data.thoiGianDen,
                giaVe: data.giaVe,
                tenTau: data.tenTau,
                soToa: data.soToa,
                soGhe: data.soGhe,
            });

            let toa = Math.ceil(tau.soGhe/tau.soToa) + 1

            const ves = [];
            for (let i = 1; i <= data.soGhe; i++) {
                ves.push({
                    trangThai: 0,
                    tenGhe : 'SG'+i,
                    giaVe : tau.giaVe,
                    toa: Math.ceil(i / toa).toString(),
                    trainId: tau.id // Kiểm tra tên trường dữ liệu `id` của `tau`
                });
            }

            await db.Ticket.bulkCreate(ves);
            resolve("Tạo chuyến mới thành công");
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDataTrip = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.Trip.findAll();
            resolve(data)
        }
        catch (e) {
            reject(e);
        }
    })
}
const getTrainInfoWithTicketCount = async () => {
    try {
      // Lấy tất cả thông tin của các chuyến tàu
      const trains = await db.Trip.findAll();
  
      // Duyệt qua từng chuyến tàu và lấy số vé bán được
      const result = [];
      for (let i = 0; i < trains.length; i++) {
        const train = trains[i];
        const trainId = train.id;
  
        // Đếm số vé bán được cho chuyến tàu hiện tại
        const count = await db.Ticket.count({
          where: {
            trainId: trainId,
            trangThai: 1,
          },
        });
  
        // Thêm thông tin vào kết quả
        result.push({
          train: train,
          totalTickets: count,
        });
      }
  
      return result;
    } catch (error) {
      throw error;
    }
  };

let getTripInforById = (tripId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let trip = await db.Trip.findOne({
                where: { id: tripId },
                raw: true
            })
            if (trip) {
                console.log(trip)
                resolve(trip)
            }
            else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}


let updateTrip = async (trip) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Trip.findOne({
                where: { id: trip.id }
            });
            if (data) {
                data.diemXuatPhat = trip.diemXuatPhat;
                data.diemDen = trip.diemDen;
                data.thoiGianDi = trip.thoiGianDi;
                data.thoiGianDen = trip.thoiGianDen;
                data.giaVe = trip.giaVe;
                data.tenTau = trip.tenTau;
                data.soToa = trip.soToa;
                data.soGhe = trip.soGhe;
                await data.save();
                let allTrip = await db.Trip.findAll()
                resolve(allTrip)
            }
        } catch (error) {
            reject(error)
        }
    })

}

let deteleTripById = (tripId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let trip = await db.Trip.findOne({
                where: { id: tripId }
            })
            if (trip) {
                await trip.destroy()
            }
            resolve() //=return
        } catch (e) {
            reject(e)
        }
    })
}
let hienthive =(tauid)=>{
    return new Promise(async (resolve, reject) => {
       try{
        let data = await db.Ticket.findAll({
            where :{trainId :tauid}          
        }   
        )
       
        resolve(data)
       }
       catch(e)
       {
        reject(e)
       }
    })
}

let searchTrips = async (keyword) => {
    try {
        const searchResults = await db.Trip.findAll({
            where: {
                [Op.or]: [
                    { diemXuatPhat: { [Op.like]: `%${keyword}%` } },
                    { diemDen: { [Op.like]: `%${keyword}%` } },
                ]
            },
        });
        
        console.log(searchResults)
        return searchResults;
    } catch (e) {
        // throw new Error('Lỗi khi tìm kiếm lịch trình');\
        console.log(e)
    }
}


module.exports = {
    getAllDataTrip: getAllDataTrip,
    createNewTrip: createNewTrip,
    updateTrip: updateTrip,
    getTripInforById: getTripInforById,
    deteleTripById: deteleTripById,
    searchTrips: searchTrips,
    hienthive:hienthive,
    getTrainInfoWithTicketCount:getTrainInfoWithTicketCount
}