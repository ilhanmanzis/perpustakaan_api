import peminjaman from "../../models/peminjamanModel.js";

const updatePeminjaman = async(req,res)=>{
    const {idPetugas, nim, idBuku, tanggalPinjam, jumlahHari, keterangan} = req.body;
};

export default updatePeminjaman