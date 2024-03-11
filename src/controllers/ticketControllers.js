import express from "express";
import db from '../models/index';
import dangNhapDangKyService from "../services/dangNhapDangKyService"
import nguoidatveService from "../services/nguoidatveService"
import tripCRUD from "../services/tripCRUD"
import searchtripService from "../services/searchtripService"
import trainService from "../services/trainService"
import tripService from "../services/tripService"
import ticketService from "../services/ticketService"
import homeControllers from "../controllers/homeControllers";
let deleteTicket = async (req, res) => {
    let id = req.query.id;
    let maTrip = req.query.MaTrip;
    console.log("id", req.query);
    let data = await ticketService.deleteTicket(id);
    return res.redirect('/ticket?id=' + maTrip);
}
let restoreTicketPage = async (req, res) => {
    let maTrip = req.query.MaTrip;
    console.log("maTrip", maTrip);
    let trip = await tripService.getTripById(maTrip);
    let data = await ticketService.restoreTicketData(maTrip);
    return res.render('restoreTicket.ejs', {trip :trip, ticket: data,mess:null})
}
let restoreTicket = async (req, res) => {
    let id = req.query.id;
    let maTrip = req.query.MaTrip;
    
    console.log("id", req.query);
    let ticket = await ticketService.getTicketById(id); 
    let trip = await tripService.getTripById(maTrip);
    let checkMaGheTicketTrip = await ticketService.checkMaGheTicketTrip(ticket.MaGhe, ticket.MaTrip);
    if (checkMaGheTicketTrip) {
        let data = await ticketService.restoreTicketData(ticket.MaTrip);
        return res.render('restoreTicket.ejs', { mess: "Không thể Restore Ticket này vì ghế đã được sử dụng", ticket: data, trip: trip});
    }
    let data = await ticketService.restoreTicket(id);
    return res.redirect('/restoreTicketPage?MaTrip=' + maTrip);
}
let displayEditTicket = async (req, res) => {
    let id = req.query.id;
    console.log("id", req.query);
    let MaTrip = req.query.MaTrip;
    let ticket = await ticketService.getTicketById(id);
    let trip = await tripService.getTripById(MaTrip);
    let listGhe = await ticketService.getAvailableSeats(trip.MaTau,trip.MaTrip);
    let dataGhe = await ticketService.allSeatFromSeatList(listGhe);
    console.log("dataGhe",dataGhe);
    
    if(ticket.ThoiGianDatVe == null){
        var ThoiGianDatVe = null;
    }
    else{
        var ThoiGianDatVe = ticket.ThoiGianDatVe.toISOString().slice(0, 16);
    }
    
    return res.render('editTicket.ejs', {ticket: ticket, ThoiGianDatVe: ThoiGianDatVe,dataGhe:dataGhe,mess:null})
} 
let editTicket = async (req, res) => {
    let data = req.body;
    console.log("data", data);
    let ticket = await ticketService.getTicketById(data.MaVe);
    if(ticket.ThoiGianDatVe == null){
        var ThoiGianDatVe = null;
    }
    else{
        var ThoiGianDatVe = ticket.ThoiGianDatVe.toISOString().slice(0, 16);
    }
    let trip = await tripService.getTripById(ticket.MaTrip);
    if ((data.TrangThai == 1) && (data.UserID == '' || data.ThoiGianDatVe == '') )
    {
        let listGhe = await ticketService.getAvailableSeats(trip.MaTau,trip.MaTrip);
        let dataGhe = await ticketService.allSeatFromSeatList(listGhe);
        return res.render('editTicket.ejs', {ticket: ticket, ThoiGianDatVe: ThoiGianDatVe,dataGhe:dataGhe,mess:"Vui lòng chọn User và thời gian đặt vé"})
    }
    if (data.TrangThai == 0)
    {
        data.UserID = null;
        data.ThoiGianDatVe = null;
    }
    let checkUser = await dangNhapDangKyService.infomationUser(data.UserID);
    if(checkUser == null && data.UserID !== '' && data.TrangThai == 1)
    {
        let listGhe = await ticketService.getAvailableSeats(trip.MaTau,trip.MaTrip);
        let dataGhe = await ticketService.allSeatFromSeatList(listGhe);
        return res.render('editTicket.ejs', {ticket: ticket, ThoiGianDatVe: ThoiGianDatVe,dataGhe:dataGhe,mess:"User không tồn tại"})
    }
    
    let ticketData = await ticketService.editTicket(data);
    return res.redirect('/ticket?id=' + ticket.MaTrip);
}
let themTicketForm = async (req, res) => {
    let maTrip = req.query.MaTrip;
    let trip = await tripService.getTripById(maTrip);
    let listGhe = await ticketService.getAvailableSeats(trip.MaTau,trip.MaTrip);
    let dataGhe = await ticketService.allSeatFromSeatList(listGhe);
    return res.render('themTicket.ejs', {trip: trip, dataGhe: dataGhe, mess: null});
}
let doneThemTicket = async (req, res) => {
    let data = req.body;
    let trip = await tripService.getTripById(data.MaTrip);
    let listGhe = await ticketService.getAvailableSeats(trip.MaTau,trip.MaTrip);
    let dataGhe = await ticketService.allSeatFromSeatList(listGhe);

    let checkUser = await dangNhapDangKyService.infomationUser(data.UserID);
    if ((data.TrangThai == 1) && (data.UserID == '' || data.ThoiGianDatVe == '') )
    {
        return res.render('themTicket.ejs', {trip: trip, dataGhe: dataGhe, mess: "Vui lòng chọn User và thời gian đặt vé"})
    }
    if (data.TrangThai == 0)
    {
        data.UserID = null;
        data.ThoiGianDatVe = null;
    }
    if(checkUser == null && data.UserID !== '' && data.TrangThai == 1)
    {
        return res.render('themTicket.ejs', {trip: trip, dataGhe: dataGhe, mess: "User không tồn tại"})
    }
    let ticket = await ticketService.themTicket(data);
    return res.redirect('/ticket?id=' + data.MaTrip);
}
module.exports = {
    deleteTicket: deleteTicket,
    restoreTicket: restoreTicket,
    editTicket: editTicket,
    restoreTicketPage: restoreTicketPage,
    themTicketForm: themTicketForm,
    doneThemTicket: doneThemTicket,
    displayEditTicket: displayEditTicket
}