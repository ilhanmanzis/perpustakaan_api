import { nanoid } from "nanoid";
import buku from "../../models/bukuModel.js";
import uploadImage from "../../services/uploadImage.js";
import kategori from "../../models/kategoriModel.js";
import rak from "../../models/rakModel.js";
const createBuku = async(req,res)=>{
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

    // validasi image foto sampul
    if(!req.files.fotoSampul) return res.status(400).json({
        message:"no file foto sampul upload"
    });

    // validasi image foto Lampiran
    if(!req.files.fotoLampiran) return res.status(400).json({
        message:"no file foto lampiran upload"
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
    
    // membuat id
    const id= nanoid(16);

    try {
        // upload foto lampul
        const fotoSampul = await uploadImage(req.files.fotoSampul, 'foto_sampul', req );

        // upload foto lampiran
        const fotoLampiran = await uploadImage(req.files.fotoLampiran, 'foto_lampiran', req);

        await buku.create({
            id_buku:id,
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
        });
        res.status(201).json({
            message:"Buku successfuly created"
        });
    } catch (error) {
        console.log(error.message);
    }
};

export default createBuku;