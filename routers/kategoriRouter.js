import express from "express";

import getKategori from "../controllers/kategori/getKategori.js";
import getKategoriById from "../controllers/kategori/getKategoriById.js";
import createKategori from "../controllers/kategori/createKategori.js";
import updateKategori from "../controllers/kategori/updateKategori.js";
import deleteKategori from "../controllers/kategori/deleteKategori.js";

const router = express.Router();

router.get('/kategori',getKategori)
router.get('/kategori/:id',getKategoriById)
router.post('/kategori/create',createKategori)
router.put('/kategori/update/:id',updateKategori)
router.delete('/kategori/delete/:id',deleteKategori)

export default router;