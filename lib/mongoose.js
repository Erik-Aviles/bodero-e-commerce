import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalida/Falta la variable de entorno: "MONGODB_URI"');
}

export function moogoseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };
    return mongoose.connect(uri, options);
  }
}
