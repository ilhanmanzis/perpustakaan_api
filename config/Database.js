import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import winston from "winston";
import path from "path";

dotenv.config();


const db = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    host:process.env.DB_HOST,
    dialect:"mysql",
    logging:false
});

export default db;