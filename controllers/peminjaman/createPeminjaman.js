import peminjaman from "../../models/peminjamanModel.js";
import petugas from "../../models/PetugasModel.js";
import buku from "../../models/bukuModel.js";
import mahasiswa from "../../models/mahasiswaModel.js";
import peminjamanBuku from "../../models/peminjamanBuku.js";
import  { parseISO, isValid, addDays, format } from "date-fns";
import { nanoid } from "nanoid";

const createPeminjaman = async(req,res)=>{
    const {idPetugas, nim, idBuku, tanggalPinjam, jumlahHari, keterangan} = req.body;

    // validasi id petugas
    if(idPetugas===null || idPetugas===undefined || idPetugas.trim().trim()==="") return res.status(400).json({
        message:"id petugas is required"
    });

    // validasi nim
    if(nim===null || nim===undefined || nim.trim()==="") return res.status(400).json({
        message:"nim is required"
    });

    if(isNaN(nim)) return res.status(400).json({
        message:"nim is Integer"
    });

    
    // validasi id buku
    if(!Array.isArray(idBuku) || idBuku.length===0) return res.status(400).json({
        message:"id Buku is required"
    });

    // validasi tanggal pinjam
    if(tanggalPinjam===null || tanggalPinjam===undefined || tanggalPinjam.trim()==="") return res.status(400).json({
        message:"tanggal pinjam is required"
    });

    // validasi jumlah hari
    if(jumlahHari===null || jumlahHari===undefined || jumlahHari.trim()==="") return res.status(400).json({
        message:"jumlah hari is required"
    });

    if(isNaN(jumlahHari)) return res.status(400).json({
        message:"jumlah hari is Integer"
    });

    // mencari data petugas
    const dataPetugas = await petugas.findOne({
        where:{
            id_petugas:idPetugas
        }
    });

    if(!dataPetugas) return res.status(404).json({
        message:"data petugas not found"
    });

    // mencari data mahasiswa
    const dataMahasiswa = await mahasiswa.findOne({
        where:{
            nim:nim
        }
    });

    if(!dataMahasiswa) return res.status(404).json({
        message:"data mahasiswa not found"
    });

    // mencari data buku
    const dataBuku = await buku.findAll({
        where:{
            id_buku:idBuku
        }
    });

    if (dataBuku.length !== idBuku.length) {
        return res.status(404).json({ message: "one or more buku not found" });
    }
    

    // membuat date peminjaman
    const tanggal = parseISO(tanggalPinjam);
    if(!isValid(tanggal)){
        return res.status(400).json({
            message:"invalid tanggal pinjam format"
        });
    }

    // hitung batas pengembalian
    const jumlahHariInt = parseInt(jumlahHari, 10);
    const batasPengembalian = addDays(tanggal, jumlahHariInt);

    // Format tanggal
    const formattedTanggalPinjam = format(tanggal, 'yyyy-MM-dd');
    const formattedBatasPengembalian = format(batasPengembalian, 'yyyy-MM-dd');

    // membuat id
    const id = nanoid(16);

    // upload peminjaman ke server
    try {
        const newPeminjaman = await peminjaman.create({
            id_peminjaman:id,
            id_petugas:idPetugas,
            nim:nim,
            tanggal_pinjam:formattedTanggalPinjam,
            jumlah_hari:jumlahHari,
            batas_pengembalian:formattedBatasPengembalian,
            status:"pinjam",
            keterangan:keterangan,
        });

        await newPeminjaman.addBukus(newPeminjaman);

        res.status(201).json({
            message:"peminjaman successfuly created"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }

};

export default createPeminjaman;