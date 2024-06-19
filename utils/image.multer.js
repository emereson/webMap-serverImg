import multer from 'multer';
import fs from 'fs';
import path from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = './uploads';
    try {
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }
      cb(null, destinationPath);
    } catch (error) {
      cb(new Error(`Error creating directory: ${error.message}`));
    }
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const originalName = file.originalname.split(extension)[0];
    const cleanedName = originalName.replace(/\s+/g, '-').toLowerCase();
    const filename = `${cleanedName}-${Date.now()}${extension}`;
    cb(null, filename);
  },
});

export const upload = multer({ storage: storage });
