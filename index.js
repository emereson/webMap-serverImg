import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { uploadImage, deleteImage } from './controllers/imageController.js';
import { upload } from './utils/image.multer.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };

const port = process.env.POR || 3112;


app.post('/image', upload.single('image'), uploadImage);
app.delete('/delete-image/:id', deleteImage);

app.use('/image', express.static('./uploads'));

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this seerver! 💀`, 404)
  );
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} ❤`);
});
