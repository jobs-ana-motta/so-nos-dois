import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import { Readable } from "stream";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file:File, folder :string) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const optimizedBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();

    return new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error || !result?.secure_url) {
              return reject(error || new Error("Upload sem URL retornada"));
            }
            resolve(result.secure_url);
          }
        );
    
        Readable.from(optimizedBuffer).pipe(stream);
    });
}

export { cloudinary, uploadToCloudinary };