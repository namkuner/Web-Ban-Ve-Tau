import express from "express";
import homeControllers from "../controllers/homeControllers";
/*const nguoidatveService = require('../services/nguoidatveService');*/
let router = express.Router();

//const express = require('express');
//const router = express.Router();

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



///////////////////
let initWebRouters = (app) => {
    //USER
    router.get('/', homeControllers.homepage);
    router.get('/dangky', homeControllers.dangKy);
    router.post('/complete-register', homeControllers.completeRegister); 
    router.get('/themnhanvien',homeControllers.themnhanvien);
    router.post('/complete-themnhanvien', homeControllers.completethemnhanvien); 
    router.get('/dangnhap', homeControllers.dangNhap);
    router.post('/login',homeControllers.loginn)
    router.get('/dataUser', homeControllers.insertUser);
    router.get('/editUser',homeControllers.thaydoithongtin);
    router.post('/updatethongtinUser',homeControllers.capnhatthongtin);
    router.get('/xemtruockhixoa',homeControllers.xemtruocuser);
    router.post('/xoa-user',homeControllers.xoaiduser);
    router.post('/post-thongtincanhan', homeControllers.thongtincanhan)
    router.get('/dangxuat',homeControllers.dangxuat)

    router.get('/tonghopthongtin',homeControllers.tonghopthongtin)
    router.post('/tongsotauve',homeControllers.tonghoptauve)
    
    //TRIP
    router.get('/nhapTrip', homeControllers.formCreateTrip)
    router.post('/done-nhapTrip', homeControllers.doneCreateTrip);
    router.get('/display-trips', homeControllers.xemTrip)
    router.get('/edit-trip', homeControllers.getEditTripById)
    router.post('/update-trip', homeControllers.updateTrips)
    router.get('/delete-trip', homeControllers.deleteTrip)
    router.get('/search', homeControllers.searchTrip)
    router.get('/vetau',homeControllers.hienthivetau)
    router.get('/xemvetau',homeControllers.vetau)
    //BOOK
    router.get('/databooker', homeControllers.dataBooker);
    router.post('/complete-databooker', homeControllers.completeDatabooker);
    router.get('/get-databooker', homeControllers.displaybooker);
    router.get('/edit-databooker', homeControllers.editbooker);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.get('/detail-databooker', homeControllers.detailbooker);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //xoá người đặt vé
    router.get('/delete-databooker', homeControllers.deletebooker)
    //
    //sau khi xoá người đặt vé sẽ chạy tới cái này để thông báo ra người dùng
    router.get('/displaybooker', homeControllers.deletebooker1)
    //

    //sua
    //router.post('/capnhat-databooker', homeControllers.putbooker)
    router.post('/AdminPage/ejs/thongtindat', homeControllers.putbooker)
    //xoa
    //router.get('/delete-databooker', homeControllers.deletebooker)

    //LẤY DỮ LIỆU NGƯỜI DÙNG RA TRANG ADMIN
    router.get('/AdminPage/ejs/admin', homeControllers.insertUser1);
    router.get('/AdminPage/ejs/danhsachve', homeControllers.insertUser2);
    router.get('/AdminPage/ejs/thongtindat', homeControllers.insertUser3);
    router.get('/AdminPage/ejs/quanlitau', homeControllers.quanlitau);
    router.get('/AdminPage/ejs/quanlilichtrinh', homeControllers.insertUser4);

    //Trang chủ
    router.get('/HomePage/ejs/main', homeControllers.insertUser6);

    //Trang booking (Tìm kiếm)
    router.post('/HomePage/ejs/booking',homeControllers.timkiemtau)

    //Trang điền thông tin người đặt vé
    router.get('/HomePage/ejs/dataCustomer', homeControllers.dataBooker);
    //Hiện thông báo đặt thành công
    router.get('/HomePage/ejs/thongbao', homeControllers.dataBooker1);

    //Trang xem thông tin vé của khách hàng
    router.get('/HomePage/ejs/quanlidatcho',homeControllers.insertUser7)



    /*router.get('/admin', (req, res) => {
        connection.query('SELECT * FROM users', (error, results, fields) => {
          if (error) throw error;
          res.render('admin', {data: users});
        });
      });*/
    return app.use("/", router);

}

module.exports = initWebRouters;