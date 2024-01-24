//import { Promise } from 'sequelize';
import db from '../models/index';
const { Ticket } = require('../models'); // Đường dẫn và tên file mô hình có thể khác tùy thuộc vào cấu trúc của dự án

// Tiếp tục sử dụng biến `Tickets` trong code của bạn



let createNewBooker = (data, ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newBooker = await db.Inforbooker.create({
        Hoten: data.Hoten,
        Phone: data.Phone,
        Email: data.Email,
        CCCD: data.CCCD,
        Ngaydi: data.Ngaydi,
        Sove: data.Sove,
        Tongtien: data.Tongtien,
      });
      const bookerId = newBooker.id;
      //console.log(ids);
      console.log('IDs:', ids);

      for (const ticketId of ids) { // Sử dụng trực tiếp mảng `ids`
        const bookingData = {
          customerId: bookerId,
          ticketId: ticketId,
        };
        await db.Bookingg.create(bookingData);

        await db.Ticket.update(
          { trangThai: 1 },
          { where: { id: ticketId } }
        );
      }

      resolve('ok! create a new user succeed!');
    } catch (e) {
      reject(e);
    } 
  });
};
/*
let createNewBooker = (data, ids) => { // Thêm tham số `ids` vào hàm
  return new Promise(async (resolve, reject) => {
    try {
      const newBooker = await db.Inforbooker.create({
        Hoten: data.Hoten,
        Phone: data.Phone,
        Email: data.Email,
        CCCD: data.CCCD,
        Ngaydi: data.Ngaydi,
        Sove: data.Sove,
        Tongtien: data.Tongtien,
      });
      const bookerId = newBooker.id;
      console.log(ids);
      const ticketIds = ids; // Gán mảng `ids` cho `ticketIds`

      for (const ticketId of ticketIds) {
        const bookingData = {
          customerId: bookerId,
          ticketId: ticketId,
        };
        await db.Bookingg.create(bookingData);

        await db.Ticket.update(
          { trangThai: 0 },
          { where: { id: ticketId } }
        );
      }

      resolve('ok! create a new user succeed!');
    } catch (e) {
      reject(e);
    }
  });
};

*/


//createNewBooker(data); // Thay data bằng dữ liệu thích hợp của bạn


/*
let createNewBooker = (data,ticketIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newBooker = await db.Inforbooker.create({
        Hoten: data.Hoten,
        Phone: data.Phone,
        Email: data.Email,
        CCCD: data.CCCD,
        Ngaydi: data.Ngaydi,
        Sove: data.Sove,
        Tongtien: data.Tongtien,
      });
      const bookerId = newBooker.id; 
      //const ticketIds = ['219', '220', '221']; 

      for (const ticketId of ticketIds) {
        const bookingData = {
          customerId: bookerId, 
          ticketId: ticketId, 
        };
        await db.Bookingg.create(bookingData);

        await db.Ticket.update(
          { trangThai: 0 }, // Dữ liệu cần cập nhật
          { where: { id: ticketId } } // Điều kiện để xác định vé cần cập nhật
        );
      }

      resolve('ok! create a new user succeed!');
    } catch (e) {
      reject(e);
    }
  });
};
  */





/*

let createNewBooker = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newBooker = await db.Inforbooker.create({
        Hoten: data.Hoten,
        Phone: data.Phone,
        Email: data.Email,
        CCCD: data.CCCD,
        Ngaydi: data.Ngaydi,
        Sove: data.Sove,
        Tongtien: data.Tongtien,
      });

      const bookerId = newBooker.id; // Lưu ID người đặt vé


      // Sử dụng vòng lặp để lặp qua từng giá trị ID vé và tạo các bản ghi Bookingg tương ứng
      const ticketIds = ['219', '220', '221']; // Các giá trị ID vé từ URL

// Lặp qua danh sách các ID vé
for (const ticketId of ticketIds) {
  const bookingData = {
    customerId: bookerId, // Lưu ID người đặt vé
    ticketId: ticketId, // Lưu ID vé
  };

        await db.Bookingg.create(bookingData);
      }

      resolve('ok! create a new user succeed!');
    } catch (e) {
      reject(e);
    }
  });
};
*/

  


let getAllBooker = () => {
    return new Promise (async(resolve, reject) => {
        try{
            let bookers = db.Inforbooker.findAll({
                raw: true,
            });
            resolve(bookers)
        }catch(e) {
            reject(e)
        }
    })
}
let getBookerInforById = (bookerId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let booker = await db.Inforbooker.findOne({
                where: { id: bookerId},
                raw: true,
            }) 
            if(booker){
                resolve(booker)
            }else{
                resolve({})
            }
        }catch(e){
            reject(e);  
        }
    })
}
/*************************************************************************************2/6*/ 
let detailTicked = (bookerId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let bookings = await db.Bookingg.findAll({
          where: { customerId: bookerId - 1 },
          attributes: ['ticketId'], // Chỉ lấy trường ticketId
          raw: true,
        });
  
        let ticketIds = bookings.map((booking) => booking.ticketId); // Lấy các giá trị ticketId từ kết quả truy vấn
  
        let ticketDetails = await db.Ticket.findAll({
          where: { id: ticketIds },
          attributes: ['id', 'toa', 'tenGhe', 'giaVe', 'trainId'],
          include: [
            {
              model: db.Trip,
              as: 'train',
              attributes: ['diemXuatPhat', 'thoiGianDi', 'tenTau','diemDen']
            }
          ],
          raw: true,
        });
  
        resolve(ticketDetails);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const getTicketDetails = async (ticketIds) => {
    try {
      let ticketDetails = await db.Ticket.findAll({
        where: {
          id: ticketIds
        },
        attributes: ['id', 'toa', 'tenGhe', 'giaVe', 'trainId'],
        include: [
          {
            model: db.Trip,
            as: 'train',
            attributes: ['diemXuatPhat', 'thoiGianDi', 'tenTau']
          }
        ],
        raw: true
      });
  
      return ticketDetails;
    } catch (error) {
      throw error;
    }
  };
  

/*************************************************************************************2/6*/ 
let updateBookerData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let booker = await db.Inforbooker.findOne({
                where: { id: data.id }
            })
            if(booker){
                booker.Hoten = data.Hoten;
                booker.CCCD = data.CCCD;
                booker.Email = data.Email;
                booker.Phone = data.Phone;

                await booker.save();
                let allBookers = await db.Inforbooker.findAll();
                resolve(allBookers);
            }else{
                resolve();
            }
        }catch(e) {
            console.log(e); // Sửa từ console(e) thành console.log(e)
            reject(e);
        }
    })
}
let deleteBookerById = (bookerId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let booker = await db.Inforbooker.findOne({
                where: {id: bookerId }
            })
            if(booker){
                await booker.destroy();
            }
            resolve();
        }catch(e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewBooker: createNewBooker,
    getAllBooker: getAllBooker,
    getBookerInforById: getBookerInforById,
    updateBookerData: updateBookerData,
    deleteBookerById: deleteBookerById,
    detailTicked: detailTicked,
    getTicketDetails: getTicketDetails
}  