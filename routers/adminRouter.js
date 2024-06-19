import express from "express";
import getAdmin from "../controllers/admin/getAdmin.js";
import createAdmin from "../controllers/admin/createAdmin.js";
const router = express.Router();

router.get('/admin',getAdmin);
router.post('/admin/create',createAdmin);

export default router;