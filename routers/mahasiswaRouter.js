import express from "express";

import getMahasiswa from "../controllers/mahasiswa/getMahasiswa.js";
import getMahasiswaById from "../controllers/mahasiswa/getMahasiswaById.js"
import createMahasiswa from "../controllers/mahasiswa/createMahasiswa.js";
import deleteMahasiswa from "../controllers/mahasiswa/deleteMahasiswa.js";
import updateMahasiswa from "../controllers/mahasiswa/updateMahasiswa.js";
import updateNimMahasiswa from "../controllers/mahasiswa/updateNimMahasiswa.js";

const router = express.Router();

router.get('/mahasiswa',getMahasiswa);
router.get('/mahasiswa/:id',getMahasiswaById);
router.post('/mahasiswa/create',createMahasiswa);
router.put('/mahasiswa/update/:id',updateMahasiswa);
router.put('/mahasiswa/updatenim/:id',updateNimMahasiswa);
router.delete('/mahasiswa/delete/:id',deleteMahasiswa);

export default router;