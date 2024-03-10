import  express from "express"
const session = require('express-session');
const app = express();

// Cài đặt cấu hình cho express-session


let configViewEngine =(app)=>{
    app.use(session({
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: true
    }));
    
    // Cấu hình view engine
    app.use(express.static("./src/public"))
    app.set("view engine","ejs")
    app.set("views","./src/views")
}

module.exports = configViewEngine;