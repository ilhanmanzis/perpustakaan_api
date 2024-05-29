import admin from "../../models/adminModel.js";

const getAdminById = async(req,res)=>{
    try {
        const data = await admin.findOne({
            where:{
                id_admin:req.params.id
            },
            attributes:['id_admin', 'username', 'email']
        });

        if(!data) return res.status(404).json({
            message:"Data Not Found"
        });

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message)
    }
}

export default getAdminById;