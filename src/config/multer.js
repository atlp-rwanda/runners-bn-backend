import multer from 'multer';
import path from 'path';

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images Only!', null);
};

const storage = multer.diskStorage({});
const multerUploads = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter
}).array('photo', 20);

export default multerUploads;
