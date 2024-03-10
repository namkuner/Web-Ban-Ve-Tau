import db from "../models/index"
let createNewUser = (data) =>{
    console.log(data)
    return new Promise(async(reslove, reject)=>{
        try{
            let user = await db.User.create({
                Ten: data.Ten,
                Ho: data.Ho,
                SDT: data.SDT,
                PassWord : data.PassWord,
                NgaySinh:data.NgaySinh,
                CMND :  data.CMND,
                DiaChi :data.DiaChi,
                Role : data.Role,
            })
            reslove(user.id);
        }
        catch(e)
        {
            reject(e);
        }
    })
}
let themnhanvien = (data) =>{
    console.log(data)
    return new Promise(async(reslove, reject)=>{
        try{
            let user = await db.User.create({
                Ten: data.Ten,
                Ho: data.Ho,
                SDT: data.SDT,
                PassWord : data.PassWord,
                NgaySinh:data.NgaySinh,
                CMND :  data.CMND,
                DiaChi :data.DiaChi,
                Role : data.Role,
            })
            reslove(user.id);
        }
        catch(e)
        {
            reject(e);
        }
    })
}
let dataUser =()=>{
    return new Promise(async(reslove,reject)=>{
        try{
            let data = await db.User.findAll();
            reslove(data);
        }
        catch(e)
        {
            reject(e);
        }
    })
}

let infomationUser=(userid)=>{
    return new Promise(async(reslove, reject)=>{
        try{
            let data = await db.User.findOne({where:{id: userid}})
            reslove(data);
        }
        catch(e){
            reject(e);
        }
    })
}
let checkdangnhap = (user_PassWord)=>{
    return new Promise(async(reslove,reject)=>{
        try{
            let data =await db.User.findOne({where :{SDT: user_PassWord.SDT}})
            if(data)
            {
                if(data.PassWord ==user_PassWord.PassWord)
                {
                    reslove({ message: "Bạn đã đăng nhập thành công", data: data })
                }
                else{
                    reslove({ message: "Mật khẩu bạn bị sai mời nhập lại" })
                }
                
            }
            else {
                reslove({message:"tài khoản của bạn không chính xác! xin mời nhập lại"})
            }
        }catch(e)
        {reject(e)}
    })
}
let updateUser = async (user) => {
    try {
        let data = await db.User.findOne({where:{id: user.id}});
        console.log(user);
        console.log("data", data);
        if (data) {
            data.Ten = user.Ten;
            data.Ho = user.Ho;
            data.SDT = user.SDT;
            data.PassWord = user.PassWord;
            data.NgaySinh = user.NgaySinh;
            data.CMND = user.CMND;
            data.DiaChi = user.DiaChi;
            data.Role = user.Role;
        }
        await data.save();
    } catch (error) {
        console.log(error);
    }
}

let xoathongtinuser = (dataid)=>
{
    return new Promise(async(reslove,rejcet)=>{
        try{
            let data = await db.User.findOne({where:{id: dataid.id}})
            if(data)
            {data.destroy();
            }
            reslove("bạn đã xóa thông tin thành công ")
        }catch(e)
        {
            rejcet(e)
        }
    })
}
let inforSDT=(userinfo)=>{
    return new Promise(async(reslove, reject)=>{
        try{
            let data = await db.User.findOne({where:{SDT: userinfo.SDT}})
            reslove(data);
        }
        catch(e){
            reject(e);
        }
    })
}
let infordangky=(userinfo)=>{
    return new Promise(async(reslove, reject)=>{
        try{
            let data = await db.User.findOne({where:{SDT: userinfo.SDT}})
            reslove(data);
        }
        catch(e){
            reject(e);
        }
    })
}
//////////////////////////////////////trang admin
let dataAdmin =()=>{
    return new Promise(async(reslove,reject)=>{
        try{
            let data = await db.User.findAll();
            reslove(data);
        }
        catch(e)
        {
            reject(e);
        }
    })
}

module.exports ={
    createNewUser: createNewUser,
    dataUser:dataUser,
    infomationUser :infomationUser,
    updateUser: updateUser,
    xoathongtinuser:xoathongtinuser,
    checkdangnhap:checkdangnhap,
    inforSDT:inforSDT,
    infordangky:infordangky,
    themnhanvien:themnhanvien,
    //-----thêm dữ liệu tài khoản người dùng vào trang admin
    dataAdmin: dataAdmin,
}