import express  from "express";
import dotenv from "dotenv";
import os from "os";
dotenv.config();
import db from "./config/Database.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import petugasRouter from "./routers/petugasRouter.js";
import adminRouter from "./routers/adminRouter.js"
import rakRouter from "./routers/rakRouter.js";
import kategoriRouter from "./routers/kategoriRouter.js"
import mahasiswaRouter from "./routers/mahasiswaRouter.js"
import bukuRouter from "./routers/bukuRouter.js"
import peminjamanRouter from "./routers/peminjamanRouter.js"

const port = process.env.PORT || 5000;
const app = express();

function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'localhost';
}

const protocol = 'http';
const ip = getLocalIpAddress();



// test database
try {
    await db.authenticate();
    console.log("Database connected");
} catch (error) {
    console.log(error.message)
}



app.use(cors());
app.use(express.json());
app.use(express.static("public"))
app.use(fileUpload());
app.use(petugasRouter);
app.use(adminRouter);
app.use(rakRouter);
app.use(kategoriRouter);
app.use(mahasiswaRouter);
app.use(bukuRouter);
app.use(peminjamanRouter);





app.listen(port, ()=>{
    console.log(`production`);
    console.log(`Server run is ${protocol}://${ip}:${port}`);
    console.log(`local`);
    console.log(`server run is http://localhost:${port}`);
})
