import db from '../models/index';
const { Sequelize, Model, DataTypes } = require('sequelize');


let checkUserdiemXuatPhat = async (userdiemXuatPhat) => {
  try {
      let trip = await db.Trip.findAll({
          where: { diemXuatPhat: userdiemXuatPhat }
      });
      return trip;
  } catch (e) {
      throw e;
  }
};

const { Op } = require('sequelize');

let checkUserdiemDen = async (userdiemDen, userdiemXuatPhat) => {
  try {
    const currentTime = new Date();
    
    let trip = await db.Trip.findAll({
      where: {
        diemXuatPhat: userdiemXuatPhat,
        diemDen: userdiemDen,
        thoiGianDi: {
          [Op.gt]: currentTime
        }
      }
    });

    return trip;
  } catch (e) {
    throw e;
  }
};
// let checkUserngayKhoiHanh = async (userngayKhoiHanh) => {
//   try {
//       let trip = await db.Trip.findOne({
//           where: { ngayKhoiHanh: new Date(userngayKhoiHanh.split("-").reverse().join("-")) }
//       });
//       return trip ? true : false;
//   } catch (e) {
//       throw e;
//   }
// };

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
let tongsoveban = async () => {
  try {
    const count = await db.Ticket.count({
      where: {
        trangthai: 1
      }
    });

    return count;
  } catch (error) {
    throw error;
  }
};
const tongsovebantheodiemdi = async (diemDi) => {
  try {
    const result = await db.Ticket.findAll({
      where: {
        trangthai: 1,
        '$train.diemXuatPhat$': diemDi,
      },
      include: [
        {
          model: db.Trip,
          as: 'train',
          attributes: ["diemXuatPhat","thoiGianDi","tenTau"],
        }
      ]
    });

    return result;
  } catch (e) {
    throw e;
  }
};
const tongsovebantheodiemden = async (diemDen) => {
  try {
    const result = await db.Ticket.findAll({
      where: {
        trangthai: 1,
        '$train.diemDen$': diemDen,
      },
      include: [
        {
          model: db.Trip,
          as: 'train',
          attributes: ["diemDen","thoiGianDi","tenTau"],
        }
      ]
    });

    return result;
  } catch (e) {
    throw e;
  }
};
const alltongsovebantheodiemdi = async () => {
  try {
    const distinctDiemXuatPhat = await db.Trip.findAll({
      attributes: [
        [db.sequelize.fn('DISTINCT', db.sequelize.col('diemXuatPhat')), 'diemXuatPhat'],
      ],
      // raw: true,
    });
    console.log(distinctDiemXuatPhat)

    const result = {};
    for (const { diemXuatPhat } of distinctDiemXuatPhat) {
      const tongSoVe = await tongsovebantheodiemdi(diemXuatPhat);
      result[diemXuatPhat] = tongSoVe;
      console.log("tongSoVe",tongSoVe)
    }
    const sortedResult = {};
Object.keys(result).sort().forEach((key) => {
  sortedResult[key] = result[key];
});

    return sortedResult;
  } catch (e) {
    throw e;
  }
};
const findby2chieu = async (diemXuatPhat,diemDen) => {
  try {
    const result = await db.Ticket.findAll({
      where: {
        trangthai: 1,
        '$train.diemDen$': diemDen,
        '$train.diemXuatPhat$': diemXuatPhat,
      },
        include: [
          {
            model: db.Trip,
            as: 'train',
            attributes: ["diemXuatPhat","thoiGianDi","tenTau"],
          }
        ]
      });
  
      return result;
    } catch (e) {
      throw e;
    }
  };
const tongHopVeTautheothoigian = async (tuNgay, denNgay) => {
  try {
    const dateRange = getDateRange(tuNgay, denNgay);
    const result = [];
    let total =0 
    for (let i = 0; i < dateRange.length; i++) {
      const startDay = dateRange[i];
      const endDay = dateRange[i + 1] || denNgay;

      const count = await db.Ticket.count({
        where: {
          createdAt: {
            [Op.between]: [startDay, endDay],
          },
          trangThai: 1,
        },
      });
      total += count
      result.push({
        ngay: startDay,
        totalTickets: count,
      });
    }
    result.sort((a, b) => b.totalTickets - a.totalTickets);
    result.push({
      ngay : "Tổng",
      total :total
    })

    return result;
  } catch (error) {
    throw error;
  }
};
  
  const getDateRange = (startDate, endDate) => {
    const dateRange = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
  
    while (currentDate <= lastDate) {
      dateRange.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dateRange;
  };
let vetautheotrainid= async()=>{
  try {
    const trainIds = await db.Trip.findAll({
      attributes: ['id',"diemDen","diemXuatPhat"],
    });
    const result = {};

    for (let i = 0; i < trainIds.length; i++) {
      const trainId = trainIds[i].id;
      console.log("trainId",trainId)
      const count = await db.Ticket.count({
        where: {
          trainId: trainId,
          trangThai: 1,
        },
      });
      const diemDi = trainIds[i].diemXuatPhat;
      const diemDen = trainIds[i].diemDen;
      const key = `${diemDi}-${diemDen}`;

      if (result[key]) {
        result[key].totalTickets += count;
      } else {
        result[key] = {
          diemDi: diemDi,
          diemDen: diemDen,
          totalTickets: count,
        };
      }
    }
    // Sắp xếp giá trị theo thứ tự giảm dần dựa trên thuộc tính totalTickets
    const sortedResult = Object.values(result).sort((a, b) => b.totalTickets - a.totalTickets);

    return sortedResult;
  } catch (error) {
    throw error;
  }
}
const countTrain =async()=>{
  try {
    const count = await db.Trip.count();
    return count;
  } catch (error) {
    throw error;
  }
}  
let countAndTotalSalaryR2 = async () => {
  try {
    const users = await db.User.findAll({
      where: { roleID: "R2" },
      attributes: ['luong'],
    });

    const count = users.length;
    const totalSalary = users.reduce((sum, user) => sum + user.luong, 0);

    return { count, totalSalary };
  } catch (error) {
    throw error;
  }
};
const tinhTongTienBanVe = async (tuNgay, denNgay) => {
  try {
    const tickets = await db.Ticket.findAll({
      attributes: ['giaVe'],
      where: {
        createdAt: {
          [Op.between]: [tuNgay, denNgay],
        },
        trangThai: 1,
      },
    });

    let tongTien = 0;

    for (let i = 0; i < tickets.length; i++) {
      const giaVe = tickets[i].giaVe;
      tongTien += giaVe;
    }

    return tongTien;
  } catch (error) {
    throw error;
  }
};
module.exports = {
    handleSearchTripTrue: handleSearchTripTrue,
    tongsoveban:tongsoveban,
    tongsovebantheodiemdi:tongsovebantheodiemdi,
    alltongsovebantheodiemdi:alltongsovebantheodiemdi,
    findby2chieu:findby2chieu,
    getDateRange:getDateRange,
    tongHopVeTautheothoigian:tongHopVeTautheothoigian,
    vetautheotrainid:vetautheotrainid,
    tongsovebantheodiemden:tongsovebantheodiemden,
    countTrain:countTrain,
    countAndTotalSalaryR2:countAndTotalSalaryR2,
    tinhTongTienBanVe:tinhTongTienBanVe
}