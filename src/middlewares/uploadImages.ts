import multer from "multer"

const uploadImages = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()}_${file.originalname}`);
    }
})

const imagesMiddleware = multer({
    storage: uploadImages,
}).array("images", 10);

export { imagesMiddleware }