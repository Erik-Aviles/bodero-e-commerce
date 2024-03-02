import mongoose from "mongoose";

export function moogoseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URL;
    return mongoose.connect(uri);
  }
}
