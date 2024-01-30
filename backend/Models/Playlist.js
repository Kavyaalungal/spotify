import mongoose from "mongoose";
const PlaylistSchema = new mongoose.Schema({
    title: {
        type: String,
      },
      singers: [
        {
          singer_name: {
            type: String,
          },
        },
      ],
      songs: [
        {
            song_mp3:{
                type: String,
            },
            song_title:{
                type: String,
            },
            song_artist:{
                type: String,
            },
            song_thumbnail:{
                type: String,
            },
        },
      ],
});

export default mongoose.model.Playlists || mongoose.model("Playlist", PlaylistSchema);