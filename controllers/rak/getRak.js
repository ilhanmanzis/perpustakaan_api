import rak from "../../models/rakModel.js";

const getRak = async(req,res)=>{
    try {
        const response = await rak.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
};

export default getRak;