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
    //1 train has many cars, 1 car has many seats, I want to know how many seats 1 train has
    return res.render('themTrip.ejs',{taus:taus})
}
let doneThemTrip = async(req, res)=>{
    let data = req.body;
    console.log("data",data);
    //I want to check whether the departure and arrival time of the train in the trip I just created is related to the time of another trip of that train or not.
    //If the time of the trip I just created is in the middle of the time of another trip of that train, then the trip I just created is not valid
    let check = await tripService.checkTime(data.MaTau, data.ThoiGianDi, data.ThoiGianDen);
    let taus = await trainService.getAllTrain();
    console.log("taus",taus);
    if (check) {
        return res.render('themTrip.ejs', { check: check ,taus:taus  });
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
module.exports = 
{
    quanlitrip:quanlitrip,
    doneThemTrip:doneThemTrip,
    timkiemtau:timkiemtau,
    themTrip:themTrip
}