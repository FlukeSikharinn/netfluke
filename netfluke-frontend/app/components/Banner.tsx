"use client";

import React from 'react';
import Image from 'next/image';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Movie } from "../types/types";
import { IoPlay } from "react-icons/io5";

interface BannerProps {
  movie: Movie | null;
  openModal: (movie: Movie) => void;
}

const API_IMAGE = "https://image.tmdb.org/t/p/w500";

const Banner: React.FC<BannerProps> = ({ movie, openModal }) => {
  if (!movie) {
    return (
      <div className="relative h-[56.25vw] flex justify-center items-center">
        <p className="text-white text-xl">No movie data available</p>
      </div>
    );
  }

  return (
    <div className="relative h-[65vh] md:h-[56.25vw]">
      <div className="hidden md:block w-full h-full">
        {movie.video ? (
          <iframe
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${movie.video.key}?autoplay=1&mute=1&loop=1&playlist=${movie.video.key}&controls=0&disablekb=1&modestbranding=1&showinfo=0&rel=0`}
            title={movie.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-white text-xl">Loading...</p>
          </div>
        )}
      </div>

      <div className="sm:block md:hidden w-full h-full">
        <Image
          src={`${API_IMAGE}${movie.poster_path}`}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute -bottom-2 w-full h-[80%] bg-gradient-to-t from-zinc-900 to-transparent to-100%"></div>
      
      <div className="
        flex 
        flex-col 
        items-center md:items-start 
        absolute 
        bottom-[10%] md:top-[40%] 
        ml-4 md:ml-16
      ">
        <p className="text-white text-xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
          {movie.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[70%] md:w-50% lg:w-[50%] drop-shadow-lg">
          {movie.overview}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <button onClick={() => openModal(movie)} className="bg-white text-black rounded-md py-1 md:py-2 px-4 md:px-6 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
            <IoPlay className="text-xl mr-1" /> Play
          </button>
          <button onClick={() => openModal(movie)} className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
            <IoMdInformationCircleOutline className="text-xl mr-1" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
