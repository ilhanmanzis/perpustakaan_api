import express from "express";

import getBuku from "../controllers/buku/getBuku.js"
import getBukuById from "../controllers/buku/getBukuById.js";
import createBuku from "../controllers/buku/createBuku.js";
import updateBuku from "../controllers/buku/updateBuku.js";
import deleteBuku from "../controllers/buku/deleteBuku.js";
const router = express.Router();

router.get('/buku', getBuku);
router.get('/buku/:id', getBukuById);
router.post('/buku/create', createBuku);
router.put('/buku/update/:id', updateBuku);
router.delete('/buku/delete/:id', deleteBuku);

export default router;