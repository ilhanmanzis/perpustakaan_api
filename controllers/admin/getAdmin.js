import admin from "../../models/adminModel.js";

const getAdmin = async(req,res)=>{
    try {
        const response = await admin.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export default getAdmin;