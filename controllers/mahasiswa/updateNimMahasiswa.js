import mahasiswa from "../../models/mahasiswaModel.js";

const updateNimMahasiswa = async(req,res)=>{
    const {id} = req.params;

      // mencari data mahasiswa berdasarkan id
      const data = await mahasiswa.findOne({
        where:{
            id_mahasiswa:id
        }
    });

    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

    const {nim} = req.body;

    // validasi nim
    if(nim===null || nim===undefined || nim==="") return res.status(400).json({
        message:"nim is required"
    });

    if(isNaN(nim)) return res.status(400).json({
        message:"nim is Integer"
    });

    // mengecek nim mahasiswa 
    const dataNim = await mahasiswa.findOne({
        where:{
            nim:nim
        }
    });

    if(dataNim) return res.status(400).json({
        message:"nim already exists"
    });

    // update nim mahasiswa
    try {
        await mahasiswa.update({
            nim:nim
        },{
            where:{
                id_mahasiswa:id
            }
        });
        res.status(201).json({
            message:"nim mahasiswa successfuly updated"
        });
    } catch (error) {
        console.log(error.message);
    }
};

export default updateNimMahasiswa;