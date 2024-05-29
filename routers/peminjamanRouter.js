import express from "express";

import getStatusPinjam from "../controllers/peminjaman/getStatusPinjam.js";
import getPeminjaman from "../controllers/peminjaman/getPeminjaman.js"
import getPeminjamanById from "../controllers/peminjaman/getPeminjamanById.js"
import updatePeminjaman from "../controllers/peminjaman/updatePeminjaman.js";
import createPeminjaman from "../controllers/peminjaman/createPeminjaman.js";
import deletePeminjaman from "../controllers/peminjaman/deletePeminjaman.js";


const router = express.Router();

router.get('/peminjaman',getPeminjaman)
router.get('/peminjaman/:id',getPeminjamanById)
router.get('/peminjaman/status/pinjam',getStatusPinjam)
router.post('/peminjaman/create',createPeminjaman)
router.put('/peminjaman/update/:id',updatePeminjaman)
router.delete('/peminjaman/delete/:id',deletePeminjaman)

export default router