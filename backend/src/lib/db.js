import mongoose from 'mongoose';



// export const connectDB = async () => {
//     try{
//         const conn = await mongoose.connect(process.env.MONGODB_URI);
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch(error) {
//         console.log("MongoDB connection error:", error);
//     }
// };

export const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from environment variables");
    }
  
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };
  