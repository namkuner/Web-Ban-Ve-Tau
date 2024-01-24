import express from "express";
import db from '../models/index';
import dangNhapDangKyService from "../services/dangNhapDangKyService"
import nguoidatveService from "../services/nguoidatveService"
import tripCRUD from "../services/tripCRUD"
import searchtripService from "../services/searchtripService"



// import { strictRight } from "sequelize/types/lib/operators";
import { Console } from "console";
const ejs = require('ejs');
const path = require('path');
let idlogin = null
let homepage = (req, res) => {
    // res.cookie('idlogin', "null");
    // let idlogin = req.cookies.idlogin
    // console.log("idlogin",req.cookies.idlogin)
    return res.render("HomePage/ejs/main.ejs", { idlogin: idlogin })
}

let dangKy = (req, res) => {

    return res.render("dangky.ejs", { er: null })
}
let dangNhap = (req, res) => {

    return res.render("dangnhap.ejs", { er: null })

}
let loginn = async (req, res) => {

    let SDT_password = req.body;
    console.log(SDT_password)
    let result = await dangNhapDangKyService.checkdangnhap(SDT_password)
    console.log(result)
    if (result.message == "Bạn đã đăng nhập thành công") {
        idlogin = result.data.id;
        if (result.data.roleID != 3) {
            let data = await dangNhapDangKyService.dataAdmin();
            return res.render("AdminPage/ejs/admin", { idlogin: idlogin, user: data })
        }
        else {
            return res.render("HomePage/ejs/main.ejs", { idlogin: idlogin })
        }
    }
    else {
        res.render("dangnhap.ejs", { er: result.message })
    }

}

let dangxuat = (req, res) => {
    idlogin = null
    console.log(idlogin)
    return res.render("HomePage/ejs/main.ejs", { idlogin: idlogin })
}
let completeRegister = async (req, res) => {
    let data = req.body
    console.log("thong tin dăng kí", data)
    let checkSDT = await dangNhapDangKyService.infordangky(data)
    console.log("checkSDT", checkSDT)
    if (checkSDT != null) {
        return res.render("dangky.ejs", { er: "Số điện thoại này đã có người đăng ký" })
    }
    let message = await dangNhapDangKyService.createNewUser(req.body); // req.body la data nguoi nhap
    console.log(message);
    idlogin = message
    return res.render("HomePage/ejs/main.ejs", { idlogin: idlogin })
}
let insertUser = async (req, res) => {
    let data = await dangNhapDangKyService.dataUser();
    return res.render('dataUser.ejs', { user: data })
}

let thaydoithongtin = async (req, res) => {
    console.log(req.query.id)
    let userid = req.query.id
    let data = await dangNhapDangKyService.infomationUser(userid);
    return res.render("editUser.ejs", { user: data })
}
let capnhatthongtin = async (req, res) => {
    let user = req.body;
    console.log(user);
    let message = dangNhapDangKyService.updateUser(user);
    return res.render("HomePage/ejs/main.ejs", { idlogin: idlogin })
}
let xemtruocuser = async (req, res) => {
    console.log(req.query.id)
    let userid = req.query.id
    let data = await dangNhapDangKyService.infomationUser(userid);
    console.log(data)
    // let message = await dangNhapDangKyService.xoathongtinuser(userid)
    return res.render('xoaUser.ejs', { user: data })
}
let xoaiduser = async (req, res) => {
    let userid = req.body;
    console.log(userid)
    let message = await dangNhapDangKyService.xoathongtinuser(userid)
    // let data = await dangNhapDangKyService.dataUser();
    return res.redirect("/AdminPage/ejs/admin")
    // return res.render('dataUser.ejs',{user:data})
}
let thongtincanhan = async (req, res) => {
    let userid = req.body.userID
    console.log("user ID" + req.body.userID)
    let data = await dangNhapDangKyService.infomationUser(userid);
    console.log(data)
    return res.render("thongtincanhan.ejs", { user: data })
}
let themnhanvien = (req, res) => {
    res.render("themnhanvien.ejs", { er: null })
}
let completethemnhanvien = async (req, res) => {
    let data = req.body
    let checkSDT = await dangNhapDangKyService.infordangky(data)
    console.log(" checkSDT", checkSDT)
    if (checkSDT != null) {
        return res.render("themnhanvien.ejs", { er: "Số điện thoại này đã có người đăng ký" })
    }
    let message = await dangNhapDangKyService.themnhanvien(req.body); // req.body la data nguoi nhap
    console.log(message);
    return res.redirect("/AdminPage/ejs/admin")
}

/*------------------TRIP---------------*/

let formCreateTrip = (req, res) => {
    return res.render("nhapTrip.ejs")
}

let doneCreateTrip = async (req, res) => {
    let result = await tripCRUD.createNewTrip(req.body)
    console.log(result)
    if (result.message == "Tạo chuyến mới thành công") {
        let data = req.body
        res.redirect('/AdminPage/ejs/quanlilichtrinh')
        // return res.render("AdminPage/ejs/quanlilichtrinh.ejs", { trip: data })
    }
    let message = await tripCRUD.createNewTrip(req.body)

    return res.redirect('/AdminPage/ejs/quanlilichtrinh')
}

let xemTrip = async (req, res) => {
    let data = await tripCRUD.getAllDataTrip()
    return res.render('dataTrip.ejs', {
        trip: data //trip <-- data
    })
}

let getEditTripById = async (req, res) => {

    let tripId = req.query.id
    console.log(tripId)
    if (tripId) {
        let tripData = await tripCRUD.getTripInforById(tripId)
        return res.render('editTrip.ejs', {
            trip: tripData
        })
    }
    else return res.send('Trip not found!')
}

// let editTripsById = async (req, res) => {
//     let tripId = req.query.id
//     if (tripId) {
//         let data = await tripCRUD.getTripById(tripId);
//         return res.render("editTrip.ejs", { trip: data })
//     }
//     else return res.send('Trip not found!')
// }

let updateTrips = async (req, res) => {
    try {
        let trip = req.body;
        console.log(trip)
        let allTrips = await tripCRUD.updateTrip(trip);
        // return res.render('../views/AdminPage/ejs/quanlilichtrinh.ejs', {
        //     trip: allTrips
        // })
        return res.send('cap nhat thanh cong')

    } catch (e) {
        console.log(e)
    }
}

let deleteTrip = async (req, res) => {
    console.log(req.query.id)
    let trip = req.query.id
    if (trip) {
        await tripCRUD.deteleTripById(trip)
        // console.alert('Xóa thành công!')
        res.redirect('back')
    }
    else {
        return res.send("Chuyến không tìm thây!")
    }
}

let searchTrip = async (req, res) => {
    try {
        const keyword = req.query.keyword
        const searchResults = await tripCRUD.searchTrips(keyword)
        return res.render('../views/AdminPage/ejs/quanlilichtrinh.ejs',
            { trip: searchResults }
        )
    } catch (e) {
        console.log(e)
    }
}

/* --------------BOOKING ----------*/

let dataBooker = (req, res) => {
    const id = req.query.id;
    const giaVe = req.query.giaVe;
    const tenGhe = req.query.tenGhe;
    const tenTau = req.query.tenTau;
    const diemXuatPhat = req.query.diemXuatPhat;
    const diemDen = req.query.diemDen;
    const thoiGianDi = req.query.thoiGianDi;
    const Sove = req.query.Sove;
    const Tongtien = req.query.Tongtien;
    const trangThai = req.query.trangThai;
    const ticketIds = req.query.ticketIds;
    return res.render("HomePage/ejs/dataCustomer.ejs", {
        id: id,
        tenGhe: tenGhe,
        giaVe: giaVe,
        tenTau: tenTau,
        diemXuatPhat: diemXuatPhat,
        diemDen: diemDen,
        thoiGianDi: thoiGianDi,
        Sove: Sove,
        Tongtien: Tongtien,
        trangThai: trangThai,
        req: req,
        ticketIds: ticketIds
    });
}
let dataBooker1 = (req, res) => {
    const id = req.query.id;
    const giaVe = req.query.giaVe;
    const tenGhe = req.query.tenGhe;
    const tenTau = req.query.tenTau;
    const diemXuatPhat = req.query.diemXuatPhat;
    const diemDen = req.query.diemDen;
    const thoiGianDi = req.query.thoiGianDi;
    const Sove = req.query.Sove;
    const Tongtien = req.query.Tongtien;
    const trangThai = req.query.trangThai;
    const ticketIds = req.query.ticketIds;
    return res.render("HomePage/ejs/dataCustomer.ejs", {
        id: id,
        tenGhe: tenGhe,
        giaVe: giaVe,
        tenTau: tenTau,
        diemXuatPhat: diemXuatPhat,
        diemDen: diemDen,
        thoiGianDi: thoiGianDi,
        Sove: Sove,
        Tongtien: Tongtien,
        trangThai: trangThai,
        req: req,
        ticketIds: ticketIds
    });
    //return res.render('/HomePage/ejs/main');
}
/*
let completeDatabooker = async (req, res) => {

    let message = await nguoidatveService.createNewBooker(req.body);
    console.log(message)
    return res.redirect('/');
}

    const ids = req.body.ids; // Truy cập vào mảng ids gửi từ client
    console.log(ids);
    let message = await nguoidatveService.createNewBooker(req.body, ids);
    //console.log(message);
    return res.send('post crud from sever'); 
};*/
let completeDatabooker = async (req, res) => {
    const ids = req.body.ids; // Truy cập vào mảng ids gửi từ client
    console.log(ids);

    try {
        let message = await nguoidatveService.createNewBooker(req.body, ids);
        console.log(message);
        return res.send('post crud from server');
    } catch (error) {
        console.error(error);
        //return res.status(500).json({ error: "An error occurred while creating a new booker." });
        return res.redirect('/HomePage/ejs/main');
    }
};
/*
console.error(error);
res.render('HomePage/ejs/thongbao', { message: 'Đặt vé thành công' }); // Render trang thongbao.ejs với thông báo
setTimeout(() => {
  res.redirect('/HomePage/ejs/main'); // Chuyển hướng về trang chủ sau 5 giây
}, 5000);
}
*/
/* 
const url = require('url');
let completeDatabooker = async (req, res) => {
    const ids = [];
  
    const parsedUrl = url.parse(req.url, true);
    const urlParams = parsedUrl.query;
  
    if ('id' in urlParams) {
      const idValues = Array.isArray(urlParams.id) ? urlParams.id : [urlParams.id];
      ids.push(...idValues);
    }
  
    let message = await nguoidatveService.createNewBooker(req.body, ids);
    console.log(message);
    return res.send('post crud from sever');
}*/

let displaybooker = async (req, res) => {
    let data = await nguoidatveService.getAllBooker();
    console.log('------------------------')
    console.log(data)
    console.log('------------------------')
    return res.render('displaybooker.ejs', {
        dataTable: data
    });
}
/*nút sửa người đặt vé*/
let editbooker = async (req, res) => {
    let bookerId = req.query.id;
    if (bookerId) {
        let bookerData = await nguoidatveService.getBookerInforById(bookerId);
        console.log('-----------------------')
        console.log(bookerData)
        console.log('-----------------------')
        //let bookerData
        return res.render('editbooker.ejs', {
            booker: bookerData
        });
    } else {
        return res.send('Booker not found!');
    }
}
/*nút mô tả người đặt vé*/
let detailbooker = async (req, res) => {
    let bookerId = req.query.id;
    if (bookerId) {
        let ticketIds = await nguoidatveService.detailTicked(bookerId);
        let ticketDetails = await nguoidatveService.getTicketDetails(ticketIds);
        console.log('-----------------------');
        console.log(ticketIds);
        console.log(ticketDetails);
        console.log('-----------------------');
        return res.render('detailbooker.ejs', {
            ticketIds: ticketIds,
            ticketDetails: ticketDetails
        });
    } else {
        return res.send('Không tìm thấy Booker!');
    }
}


/*Sau khi sửa xong chuyển đến trang displaybooker2.ejs để xác nhận sửa thành công*/
let putbooker = async (req, res) => {
    let data = req.body;
    let allBookers = await nguoidatveService.updateBookerData(data);
    return res.render('displaybooker2.ejs', {
        dataTable: allBookers
    });
}
/**/

/*nút xoá người đặt vé*/
let deletebooker = async (req, res) => {
    let bookerId = req.query.id;
    if (bookerId) {
        let bookerData = await nguoidatveService.getBookerInforById(bookerId);
        console.log('-----------------------')
        console.log(bookerData)
        console.log('-----------------------')
        //let bookerData
        return res.render('deletebooker.ejs', {
            booker: bookerData
        });
    } else {
        return res.send('Booker not found!');
    }
}
/*Sau khi xoá xong chuyển đến trang displaybooker.ejs để xác nhận xoá thành công*/
let deletebooker1 = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await nguoidatveService.deleteBookerById(id);
        //return res.send('Xoá người đặt vé thành công!')
        return res.render('displaybooker.ejs');
    } else {
        return res.send('Người đặt vé không tồn tại!')
    }
}
/**/

/**********************************************************************
let putbooker = async (req, res) => {
    let data = req.body;
    let allBookers = await nguoidatveService.updateBookerData(data);
    return res.render('displaybooker.ejs', {
        dataTable: allBookers
    });
}*/

/*
let deletebooker = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await nguoidatveService.deleteBookerById(id);
        return res.send('Xoá người đặt vé thành công!')
    } else {
        return res.send('Người đặt vé không tồn tại!')
    }
}*/

/* --------------TRANG ADMIN ----------*/
let insertUser1 = async (req, res) => {
    let data = await dangNhapDangKyService.dataAdmin();
    /*return res.render('admin.ejs',{user:data})*/
    return res.render('../views/AdminPage/ejs/admin.ejs', { user: data })
}
let insertUser2 = async (req, res) => {
    let data = await dangNhapDangKyService.dataAdmin();
    return res.render('../views/AdminPage/ejs/danhsachve.ejs', { user: data })
}
let insertUser3 = async (req, res) => {
    let data = await nguoidatveService.getAllBooker();
    return res.render('../views/AdminPage/ejs/thongtindat.ejs', { dataTable: data })
}

let insertUser4 = async(req, res)=>{
    let data = await tripCRUD.getTrainInfoWithTicketCount();
    return res.render('../views/AdminPage/ejs/quanlilichtrinh.ejs',{trip:data})

}
let insertUser7 = async (req, res) => {
    let data = await nguoidatveService.getAllBooker();
    return res.render('../views/HomePage/ejs/quanlidatcho.ejs', { dataTable: data })
}
/*----------------------------------------------------------------------------------------*/


/* -------------Trang chủ----------*/
let insertUser6 = async (req, res) => {
    let idlogin = null
    return res.render("HomePage/ejs/main.ejs", { idlogin: idlogin })
}
/*---------------------------------*/

/* -------------Trang booking----------*/
let timkiemtau = async (req, res) => {
    let infotau = req.body
    console.log(infotau)
    console.log("infotau.from", infotau.from)
    let data = await searchtripService.handleSearchTripTrue(infotau.from, infotau.to, infotau.daygo)
    console.log(data)
    return res.render('HomePage/ejs/booking.ejs', {
        trip: data //trip <-- data
    })
}
/*                                                          new 20/5
let hienthivetau =async(req,res)=>{
    let  tauid = req.query.id
    console.log(tauid)
    let data = await tripCRUD.hienthive(tauid)
    console.log(data.length)
    res.render("ticketUser.ejs",{tickets:data})
}*/
let hienthivetau = async (req, res) => {
    const giaVe = req.query.giaVe;
    const tenTau = req.query.tenTau;
    const diemXuatPhat = req.query.diemXuatPhat;
    const diemDen = req.query.diemDen;
    const thoiGianDi = req.query.thoiGianDi;

    let tauid = req.query.id;
    console.log(tauid);
    let data = await tripCRUD.hienthive(tauid);
    console.log(data.length);
    res.render("ticketUser.ejs", {
        tickets: data,
        giaVe: giaVe,
        tenTau: tenTau,
        diemXuatPhat: diemXuatPhat,
        diemDen: diemDen,
        thoiGianDi: thoiGianDi,
    });
}
let vetau  = async (req, res) =>{
    let tauid = req.query.id
    console.log("tauid",tauid)
    let data = await tripCRUD.hienthive(tauid);
    res.render("hienthive.ejs",{ve:data})
}
/*---------------------------------*/
let tonghopthongtin = async (req, res) => {
    let isdata = null
    res.render("tonghopthongtin.ejs", { isdata: isdata })
}
let tonghoptauve = async (req, res) => {
    let data = req.body
    console.log(data)
    if (data.typeid == "1") {
        const theothoigian = await searchtripService.tongHopVeTautheothoigian(data.tuNgay, data.denNgay)
        console.log("type1 fromdaytoday", theothoigian.total)
        let isdata = data.typeid

        res.render("tonghopthongtin.ejs", { isdata: isdata, ticket: theothoigian, time: data })
    }
    else if (data.typeid == "2") {
        let diemDi = data.diemDi
        let isdata = data.typeid
        const theodiemdi = await searchtripService.tongsovebantheodiemdi(data.diemDi)
        // console.log("theodiemdi",theodiemdi[3].tenGhe)
        res.render("tonghopthongtin.ejs", { diemDi: diemDi, isdata: isdata, ticket: theodiemdi })
    }
    else if (data.typeid == "3") {
        let diemDen = data.diemDen
        let isdata = data.typeid
        const theodiemden = await searchtripService.tongsovebantheodiemden(data.diemDen)
        res.render("tonghopthongtin.ejs", { diemDen: diemDen, isdata: isdata, ticket: theodiemden })
    }
    else if (data.typeid == "4") {
        let diemDen = data.diemDen
        let diemDi = data.diemDi
        let isdata = data.typeid
        const theo2chieu = await searchtripService.findby2chieu(diemDi, diemDen)
        res.render("tonghopthongtin.ejs", { diemDi: diemDi, diemDen: diemDen, isdata: isdata, ticket: theo2chieu })

    }
    else if (data.typeid == "5") {

        let isdata = data.typeid
        const alltheo2chieu = await searchtripService.vetautheotrainid()
        console.log("alltheo2chieu", alltheo2chieu)
        res.render("tonghopthongtin.ejs", { isdata: isdata, ticket: alltheo2chieu })

    }
    else if (data.typeid == "6") {
        let data = req.body
        const tuNgay = new Date(data.tuNgay);
        const denNgay = new Date(data.denNgay);
        const diffInMilliseconds = denNgay - tuNgay;
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const thang = Math.floor(diffInDays / 30)
        let ct = await searchtripService.countTrain()

        let cu = await searchtripService.countAndTotalSalaryR2()
        let doanhthu = await searchtripService.tinhTongTienBanVe(data.tuNgay, data.denNgay)
        console.log("doanhthu", doanhthu)
        console.log("cu", cu.totalSalary)
        console.log("thang", thang)
        let loinhuan = doanhthu - ct * 500000 - cu.totalSalary * thang
        console.log(loinhuan)
        let isdata = data.typeid
        res.render("tonghopthongtin.ejs", { isdata: isdata, dt: doanhthu, ln: loinhuan, time: data, ct: ct, cu: cu })
    }


    // console.log("fromdaytoday",data.diemXuatPhat)
    // const tongSoVe = await searchtripService.tongsovebantheodiemdi(data.diemXuatPhat);
    // console.log(`Tổng số vé đã bán đi từ ${data.diemXuatPhat}: ${tongSoVe}`);
    // const allTongSoVe = await searchtripService.alltongsovebantheodiemdi()
    // console.log(`Tổng số vé đã bán đi từ ${data.diemXuatPhat}->${data.diemDen}: ${allTongSoVe}`);
    // res.render("allthongtin.ejs",{sortedResult:allTongSoVe})

}
module.exports = {
    //USER
    homepage: homepage,
    dangKy: dangKy,
    dangNhap: dangNhap,
    completeRegister: completeRegister,
    insertUser: insertUser,
    thaydoithongtin: thaydoithongtin,
    capnhatthongtin: capnhatthongtin,

    dangxuat :dangxuat,
    xoaiduser :xoaiduser,
    loginn :loginn,
    xemtruocuser :xemtruocuser ,
    thongtincanhan :thongtincanhan,
    hienthivetau:hienthivetau,
    tonghopthongtin:tonghopthongtin,
    tonghoptauve : tonghoptauve,
    themnhanvien:themnhanvien,
    completethemnhanvien:completethemnhanvien,
    vetau:vetau,

    //BOOKING
    dataBooker: dataBooker,
    completeDatabooker: completeDatabooker,
    displaybooker: displaybooker,
    editbooker: editbooker,
    detailbooker: detailbooker,
    putbooker: putbooker,
    deletebooker: deletebooker,


    //Trip
    formCreateTrip: formCreateTrip,
    doneCreateTrip: doneCreateTrip,
    xemTrip: xemTrip,
    getEditTripById: getEditTripById,
    updateTrips: updateTrips,
    deleteTrip: deleteTrip,
    searchTrip: searchTrip,


    //Lấy dữ liệu tài khoản người dùng
    insertUser1: insertUser1,
    insertUser2: insertUser2,
    insertUser3: insertUser3,
    insertUser4: insertUser4,
    //Trang chủ
    insertUser6: insertUser6,
    //Trang booking
    timkiemtau: timkiemtau,

    //nút xoá người đặt vé
    deletebooker1: deletebooker1,

    //thong báo đặt vé thành công
    dataBooker1: dataBooker1,

    insertUser7: insertUser7
}

