import rak from "../../models/rakModel.js";


const updateRak = async(req,res)=>{

    // mengecek data rak berdasarkan id
    const data = await rak.findOne({
        where:{
            id_rak:req.params.id
        }
    });

    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });


    const {nameRak} = req.body;

    // validasi name rak
    if(nameRak===null || nameRak===undefined || nameRak==="") return res.status(400).json({
        message:"name rak is required"
    });

    try {
        await rak.update({
            name_rak:nameRak
        },{
            where:{
                id_rak:req.params.id
            }
        });
        res.status(201).json({
            message:"Rak successfuly updated"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
    
}

export default updateRak;