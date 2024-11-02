import multiparty from "multiparty";
import { v2 as cloudinary } from "cloudinary";

(async function () {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
})();

export default async function handler(req, res) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  const images  = [];

  for (const file of files.file) {
    const without = files.originalFilename;

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(file.path, {
        public_id: without,
      })
      .catch((error) => {
        console.log(error);
      });

    images.push({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id, 
    });
  }
  return res.json({ images });
}

export const config = {
  api: { bodyParser: false },
};
