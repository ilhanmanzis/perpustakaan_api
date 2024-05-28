import admin from "../models/adminModel.js";
import buku from "../models/bukuModel.js";
import petugas from "../models/PetugasModel.js";
import mahasiswa from "../models/mahasiswaModel.js";
import rak from "../models/rakModel.js";
import kategori from "../models/kategoriModel.js";
import peminjaman from "../models/peminjamanModel.js";


const createTable = async(req,res)=>{
    try {
        await admin.sync();
        await buku.sync();
        await petugas.sync();
        await mahasiswa.sync();
        await rak.sync();
        await kategori.sync();
        await peminjaman.sync();
    } catch (error) {
        console.log(error.message);
    }
}


export default createTable;