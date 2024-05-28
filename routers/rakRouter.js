import express from "express";

import getRak from "../controllers/rak/getRak.js";
import getRakById from "../controllers/rak/getRakById.js";
import createRak from "../controllers/rak/createRak.js";
import updateRak from "../controllers/rak/updateRak.js";
import deleteRak from "../controllers/rak/deleteRak.js";

const router = express.Router();

router.get('/rak',getRak)
router.get('/rak/:id',getRakById);
router.post('/rak/create',createRak);
router.put('/rak/update/:id',updateRak);
router.delete('/rak/delete/:id',deleteRak);


export default router;