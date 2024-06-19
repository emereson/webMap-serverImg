import fs from 'fs';

export const uploadImage = (req, res) => {

    try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded',
      });
    }

    const imagePath = `${req.file.filename}`;

    res.status(200).json({
      status: 'success',
      message: 'Image saved on image server',
      imagePath: imagePath,
    });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error on image server',
      error: error.message,
    });
  }
};

export const deleteImage = (req, res) => {
  const { id } = req.params;
  const imagePath = `./uploads/${id}`;

  if (fs.existsSync(imagePath)) {
    try {
      fs.unlinkSync(imagePath);
      console.log('Image deleted successfully');
      res.status(200).json({
        status: 'success',
        message: 'Image deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error while deleting image',
        error: error.message,
      });
    }
  } else {
    console.log('Image not found');
    res.status(404).json({
      status: 'error',
      message: 'Image not found',
    });
  }
};
