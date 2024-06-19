import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { uploadImage, deleteImage } from './controllers/imageController.js';
import { upload } from './utils/image.multer.js';
import xss from 'xss-clean';
import hpp from 'hpp';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());


const port = 3115 || 3115;


app.post('/image', upload.single('image'), uploadImage);
app.delete('/delete-image/:id', deleteImage);

app.use('/image', express.static('./uploads'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} ❤`);
});
