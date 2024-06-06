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
  params: {
    // Removed 'folder' configuration to upload to the root directory
    allowed_formats: [], // Allow all file formats
    resource_type: 'auto', // Automatically detect resource type
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
