import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public"); // Make sure this folder exists and is writable
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname); // e.g., '.jpg'
    const baseName = path.basename(file.originalname, ext);

    const safeName = baseName
      .replace(/\s+/g, "_")           // replace spaces with underscores
      .replace(/[^a-zA-Z0-9_-]/g, ""); // remove unsafe characters

    cb(null, `${safeName}_${timestamp}${ext}`);
  },
});

export const upload = multer({ storage });
