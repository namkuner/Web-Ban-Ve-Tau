import express from "express";
import db from '../models/index';
import dangNhapDangKyService from "../services/dangNhapDangKyService"
import nguoidatveService from "../services/nguoidatveService"
import tripCRUD from "../services/tripCRUD"
import searchtripService from "../services/searchtripService"
import trainService from "../services/trainService"
import tripService from "../services/tripService"

let quanlitrip = async(req, res)=>{
    let data = await tripService.getAllDataTrip();
    return res.render('../views/AdminPage/ejs/quanlitrip.ejs',{trip:data})
}
let themTrip = async(req, res)=>{
    let taus = await trainService.getAllTrain();
    res.locals.taus = taus;
    let mess =null;
    //1 train has many cars, 1 car has many seats, I want to know how many seats 1 train has
    return res.render('themTrip.ejs',{taus:taus, mess:mess})
}
let doneThemTrip = async(req, res)=>{
    let data = req.body;
    console.log("data",data);
    let taus = await trainService.getAllTrain();
    //I want to check whether the departure and arrival time of the train in the trip I just created is related to the time of another trip of that train or not.
    //If the time of the trip I just created is in the middle of the time of another trip of that train, then the trip I just created is not valid
    if (data.DiaDiemDi === data.DiaDiemDen) {
        return res.render('themTrip.ejs', { mess: "Điểm đến và điểm đi không thể trùng nhau",taus:taus});
    }

    
    console.log("taus",taus);
    if (data.ThoiGianDi > data.ThoiGianDen) {
        return res.render('themTrip.ejs', { mess: "Thời gian đi không thể sau thời gian đến" ,taus:taus });
    }
    let date = new Date();
    date = date.toISOString().slice(0, 19)
    console.log("data.ThoiGianDi",data.ThoiGianDi);
    console.log("date",date);
    if (data.ThoiGianDi < date) {

        return res.render('themTrip.ejs', { mess: "Thời gian đi không thể trước thời gian hiện tại" ,taus:taus });
    }
    let check = await tripService.checkTime(data.MaTau, data.ThoiGianDi, data.ThoiGianDen);
    if (check) {
        return res.render('themTrip.ejs', { mess: "Trong thời gian này Tàu đang bận " ,taus:taus  });
    }
    
    let trip = await tripService.createNewTrip(data);
    return res.redirect('/AdminPage/ejs/quanlitrip')
}
let timkiemtau = async (req, res) => {
    let infotau = req.body
    console.log("idlogin", req.session.idlogin)
    let data = await tripService.searchTripForUser(infotau)
    console.log(data)
    return res.render('HomePage/ejs/booking.ejs', {
        trip: data //trip <-- data
    })
}
let xemve = async (req, res) => {
    let id = req.query.id;
    let data = await tripService.getTicketByTripId(id);
    console.log("data",data);
    let trip = await tripService.getTripById(id);
    console.log("data",id);
    return res.render('xemve.ejs', { ticket: data ,trip :trip})
}
let donebook = async (req, res) => {
    let ve =  req.body;
    console.log("ve",ve);
    let idlogin = req.session.idlogin;
    let ticket = await tripService.bookTicket(ve.ids, idlogin);
    return res.redirect('/HomePage/ejs/main')
}
let deleteTrip = async(req, res)=>{
    let id = req.query.id;
    let data = await tripService.deleteTrip(id);
    return res.redirect('/AdminPage/ejs/quanlitrip')
}


module.exports = 
{
    quanlitrip:quanlitrip,
    doneThemTrip:doneThemTrip,
    xemve : xemve,
    donebook:donebook,
    deleteTrip:deleteTrip,
    timkiemtau:timkiemtau,
    themTrip:themTrip
}