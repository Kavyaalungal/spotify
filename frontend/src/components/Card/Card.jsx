import React from 'react'
import "./Card.css";
import { IoIosPlay } from "react-icons/io";
import { IoIosPause } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { playSong,pauseSong } from '../states/Actors/SongActor';
import { useGlobalContext } from '../states/Content';
function Card({song,idx}) {
  const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
  const {resetEverything,setSongIdx} = useGlobalContext()
  const dispatch = useDispatch();

  const handlePlay = (song) => {
      console.log('playing');
      setSongIdx(idx)
      console.log(idx);
      if(isPlaying){
        masterSong.mp3.currentTime = 0;
        masterSong.mp3.pause();
        resetEverything();
      }
      dispatch(playSong(song));
  };
  const handlePause = () => {
      dispatch(pauseSong());
  };
  return (
    song && (
    <div className='card col-span-1 p-4 rounded-lg'>
        <div className="relative">
            <img src={song.img} className='h-[10rem]' alt="" />
            {masterSong.id === song.id && isPlaying ? (
            <button onClick={handlePause} className='flex items-center play_btn absolute bottom-0 right-0 rounded-[50%] bg-green-500 justify-center p-3'>
                <IoIosPause className='text-black text-xl'/>

            </button>
            ) : (
              <button onClick={()=> handlePlay(song)} className='flex items-center play_btn absolute bottom-0 right-0 rounded-[50%] bg-green-500 justify-center p-3'>
              <IoIosPlay className='text-black text-xl'/>

          </button>
            )}
        </div>
        <h3 className="text-sm font-semibold my-2">{song.artist}</h3>
            <p className="text-xs text-gray-400 leading-4">
               {song.title} - {song.artist}
            </p>
    </div>
  )
  );
}

export default Card
