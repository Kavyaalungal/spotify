import mongoose from "mongoose";

export default function conn() {
    return mongoose.connect(process.env.DB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure
    });
}
