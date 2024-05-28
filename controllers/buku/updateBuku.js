import buku from "../../models/bukuModel.js";
import updateImage from "../../services/updateImage.js";

const updateBuku = async(req,res)=>{
    const {id} = req.params;

    // mencari data buku
    const data = await buku.findOne({
        where:{
            id_buku:id
        }
    });

    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

    const {idRak, idKategori, isbn, judul, penulis, penerbit, tahun, jumlah, keterangan} = req.body;

     // validasi id rak
     if(idRak===null || idRak===undefined || idRak==="") return res.status(400).json({
        message:"id rak is required"
    });
    // validasi id Kategori
    if(idKategori===null || idKategori===undefined || idKategori==="") return res.status(400).json({
        message:"id kategori is required"
    });
    // validasi isbn
    if(isbn===null || isbn===undefined || isbn==="") return res.status(400).json({
        message:"isbn is required"
    });
    // validasi judul
    if(judul===null || judul===undefined || judul==="") return res.status(400).json({
        message:"judul is required"
    });
    // validasi penulis
    if(penulis===null || penulis===undefined || penulis==="") return res.status(400).json({
        message:"penulis is required"
    });
    // validasi penerbit
    if(penerbit===null || penerbit===undefined || penerbit==="") return res.status(400).json({
        message:"penerbit is required"
    });
    // validasi tahun
    if(tahun===null || tahun===undefined || tahun==="") return res.status(400).json({
        message:"tahun is required"
    });
    // validasi jumlah
    if(jumlah===null || jumlah===undefined || jumlah==="") return res.status(400).json({
        message:"jumlah is required"
    });

    if(isNaN(jumlah)) return res.status(400).json({
        message:"jumlah is Integer"
    });

    // mencari data rak
    const dataRak = await rak.findOne({
        where:{
            id_rak:idRak
        }
    });

    if(!dataRak) return res.status(404).json({
        message:"data rak not found"
    });

    // mencari data kategori
    const dataKategori = await kategori.findOne({
        where:{
            id_kategori:idKategori
        }
    });

    if(!dataKategori) return res.status(404).json({
        message:"data kategori not found"
    });

     
    let fotoSampul = data.foto_sampul;
    let fotoLampiran = data.foto_lampiran
    
    if(req.files){
        if(req.files.fotoSampul){
            fotoSampul = await updateImage(req.files.fotoSampul, 'foto_sampul', req, data.foto_sampul)
        };
        if(req.files.fotoLampiran){
            fotoLampiran = await updateImage(req.files.fotoLampiran, 'foto_lampiran', req, data.foto_lampiran);
        }
    };

    try {
        await buku.update({
            id_rak:idRak,
            id_kategori:idKategori,
            isbn:isbn,
            judul:judul,
            penulis:penulis,
            penerbit:penerbit,
            tahun:tahun,
            jumlah:jumlah,
            foto_sampul:fotoSampul,
            foto_lampiran:fotoLampiran,
            keterangan:keterangan
        },{
            where:{
                id_buku:id
            }
        });
        res.status(201).json({
            message:"buku successfuly updated"
        })
    } catch (error) {
        console.log(error.message);
    }


};

export default updateBuku;