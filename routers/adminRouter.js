import express from "express";
import getAdmin from "../controllers/admin/getAdmin.js";
import createAdmin from "../controllers/admin/createAdmin.js";
import getAdminById from "../controllers/admin/getAdminById.js";
import updateAdmin from "../controllers/admin/updateAdmin.js";
import updatePasswordAdmin from "../controllers/admin/updatePassword.js";
const router = express.Router();

router.get('/admin',getAdmin);
router.get('/admin/:id',getAdminById);
router.post('/admin/create',createAdmin);
router.put('/admin/update/:id',updateAdmin);
router.put('/admin/updatepassword/:id',updatePasswordAdmin);

export default router