import peminjaman from "../../models/peminjamanModel.js";


const deletePeminjaman = async(req,res)=>{
    const {id} = req.params;

    const data = await peminjaman.findOne({
        where:{
            id_peminjaman:id
        }
    });

    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

    try {
        // menghapus data peminjaman
        await peminjaman.destroy({
            where:{
                id_peminjaman:id
            }
        });

        res.status(200).json({
            message:"peminjaman successfuly deleted"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
        
    }
};

export default deletePeminjaman;