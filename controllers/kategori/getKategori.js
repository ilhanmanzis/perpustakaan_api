import kategori from "../../models/kategoriModel.js";

const getKategori = async(req,res)=>{
    try {
        const data = await kategori.findAll();
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message);
    }
}

export default getKategori;