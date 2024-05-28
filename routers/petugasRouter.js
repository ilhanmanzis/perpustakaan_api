import express from "express";
import getPetugas from "../controllers/petugas/getPetugas.js";
import getPetugasById from "../controllers/petugas/getPetugasById.js";
import createPetugas from "../controllers/petugas/createPetugas.js";
import updatePetugas from "../controllers/petugas/updatePetugas.js";
import deletePetugas from "../controllers/petugas/deletePetugas.js";
import updatePasswordPetugas from "../controllers/petugas/updatePassword.js";

const router = express.Router();

router.get('/petugas',getPetugas);
router.get('/petugas/:id',getPetugasById);
router.post('/petugas/create',createPetugas);
router.put('/petugas/update/:id',updatePetugas);
router.put('/petugas/updatepassword/:id',updatePasswordPetugas);
router.delete('/petugas/delete/:id',deletePetugas);



export default router;