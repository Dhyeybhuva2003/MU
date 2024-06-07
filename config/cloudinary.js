const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'other'; // default folder
    if (file.mimetype === 'application/pdf') {
      folder = 'pdf';
    } else if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
      folder = 'image';
    }

    return {
      folder: folder,
      allowed_formats: ['jpg', 'png', 'pdf'],
      resource_type: 'auto',
    };
  },
});
// Configure Multer with Cloudinary storage
const upload = multer({ storage: storage });

// Export cloudinary, storage, and upload objects for use in other modules
module.exports = {
  cloudinary,
  storage,
  upload,
};
