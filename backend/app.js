import express from "express";
import cors from "cors";
import conn from "./db.js";
import dotenv from "dotenv";
// import userRouter from "./routes/user.js";
import userRouter from "./routes/user.js";
import playlistRouter from "./routes/playlist.js";

const app = express();
dotenv.config();

// const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter); 
app.use("/api/playlist",playlistRouter);

conn().then(() => {
    app.listen(process.env.PORT, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Server started on port http://localhost:${process.env.PORT}`);
    });
}).catch(error => {
    console.log(error);
});
