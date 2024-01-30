import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default:"user"
  },
  DOB: {
    type: Date,
    required: true,
  },
  playlists:[
    {
      playlist_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
      }
    }
  ]
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);