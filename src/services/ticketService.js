import db from "../models/index"
const { Op, where } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('webproject', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    charset: 'utf8mb4',
  collate: 'utf8mb4'
});
//Set flag ticket to false when delete ticket
let deleteTicket = async (id) => {
    try {
        const ticket = await db.Ticket.findOne({
            where: {
                MaVe: id
            }
        });
        if (ticket) {
            await ticket.update({
                flag: false
            });
        }
        return "Xóa vé thành công";
    } catch (e) {
        throw new Error(e);
    }
}
let restoreTicketData = async (MaTrip) => {
    try {
        const ticket = await db.Ticket.findAll({
            where: {
                MaTrip: MaTrip,
                flag: false
            }
        });

        return ticket;
    } catch (e) {
        throw new Error(e);
    }
}
let restoreTicket = async (id) => {
    try {
        const ticket = await db.Ticket.findOne({
            where: {
                MaVe: id
            }
        });
        if (ticket) {
            await ticket.update({
                flag: true
            });
        }
        return ticket;
    } catch (e) {
        throw new Error(e);
    }
}
let checkMaGheTicketTrip = async (MaGhe, MaTrip) => {
    try {
        const ticket = await db.Ticket.findOne({
            where: {
                MaGhe: MaGhe,
                MaTrip: MaTrip,
                flag: true
            }
        });
        return ticket;
    } catch (e) {
        throw new Error(e);
    }
}
let getTicketById = async (id) => {
    try {
        const ticket = await db.Ticket.findOne({
            where: {
                MaVe: id
            }
        });
        return ticket;
    } catch (e) {
        throw new Error(e);
    }
}

let getAvailableSeats =async(trainId, tripId)=> {
    try {
      const seats = await db.Ghe.findAll({
        include: [{
          model: db.Toa,
          as : 'Toa',
          include: [{
            model: db.Train,
            as: 'Train',
            where: { MaTau : trainId }
          }]
        }],
        where: {
          MaGhe: {
            [Sequelize.Op.notIn]: sequelize.literal(`(
              SELECT MaGhe FROM tickets
              JOIN trips ON tickets.MaTrip = trips.MaTrip
              WHERE trips.MaTau = ${trainId} AND trips.MaTrip = ${tripId} AND tickets.flag = 1
            )`)
          },
          flag: true
        }
      });
  
      return seats.map(seat => seat.MaGhe);
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
let allSeatFromSeatList = async (seatList) => {
    try {
        const seats = await db.Ghe.findAll({
            where: {
                MaGhe: {
                    [Op.in]: seatList
                }
            }
        });
        return seats;
    } catch (e) {
        throw new Error(e);
    }
}
let editTicket = async (data) => {
    try {
        const ticket = await db.Ticket.findOne({
            where: {
                MaVe: data.MaVe
            }
        });
        if (ticket) {
            await ticket.update({
                MaGhe: data.MaGhe,
                Gia : data.GiaVe,
                TrangThai: data.TrangThai,
                ThoiGianDatVe: data.ThoiGianDatVe,
                UserID: data.UserID
            });
        }
        return ticket;
    } catch (e) {
        throw new Error(e);
    }
}
let themTicket = async (data) => {
    try {
        const ticket = await db.Ticket.create({
            MaGhe: data.MaGhe,
            Gia : data.GiaVe,
            TrangThai: data.TrangThai,
            ThoiGianDatVe: data.ThoiGianDatVe,
            MaTrip: data.MaTrip,
            UserID: data.UserID
        });
        return ticket;
    } catch (e) {
        throw new Error(e);
    }
}
module.exports = {
    deleteTicket : deleteTicket,
    restoreTicket : restoreTicket,
    getTicketById : getTicketById,
    allSeatFromSeatList : allSeatFromSeatList,
    getAvailableSeats : getAvailableSeats,
    editTicket : editTicket,
    themTicket : themTicket,
    checkMaGheTicketTrip : checkMaGheTicketTrip,
    restoreTicketData : restoreTicketData
}