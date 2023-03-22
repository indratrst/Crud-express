import express from "express";
import { 
    getUsers, 
    getUserById,
    saveUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";
import multer from "multer";
const router = express.Router();
const storage = multer.diskStorage({
	//destination for files
	destination: function (request, file, callback) {
		callback(null, './public/image');
	},

	//add back the extension
	filename: function (request, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
});

//upload parameters for multer
const upload = multer({
	storage: storage,
	limits: {
		fieldSize: 1024 * 1024 * 3,
	},
});

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users',upload.single('image'),saveUser);
router.patch('/users/:id',upload.single('image'), updateUser);
router.delete('/users/:id', deleteUser);

export default router;