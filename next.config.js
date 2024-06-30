/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "images.unsplash.com",
      "bodero-ecommence-admin.s3.amazonaws.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;

/* function throwError(envVar) {
  throw `Abort: You need to define ${envVar} in the .env file.`
}

if (!process.env.RESEND_API_KEY) return throwError('RESEND_API_KEY'); */
