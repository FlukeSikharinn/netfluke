import React, { useState, useEffect, useCallback } from "react";
import { IoClose, IoPlay } from "react-icons/io5";
import { Movie } from "../types/types";
import { useMovieDetail } from '../hooks/useMovieDetail';
import Image from 'next/image';
import FavoriteButton from './FavoriteButton';
import { FaStar } from "react-icons/fa";
import { GrLanguage, GrUserWorker } from "react-icons/gr";
import { FaPersonRunning } from "react-icons/fa6";
import { BiCameraMovie } from "react-icons/bi";

interface MovieInfoProps {
    visible?: boolean;
    onClose: () => void;
    movie: Movie | null;
}

const MovieInfoModal: React.FC<MovieInfoProps> = ({ visible, onClose, movie }) => {
    
    const [isVisible, setIsVisible] = useState(!!visible);
    const { movieDetails, getMovieDetailById } = useMovieDetail();

    useEffect(() => {
        setHasVideo(false);
        setIsVisible(visible || false);
    }, [visible]);

    useEffect(() => {
        if (movie && movie.id) {
            setTimeout(() => {
                getMovieDetailById(String(movie.id));
            }, 3000);
        }
    }, [movie, getMovieDetailById]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setHasVideo(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    const [hasVideo, setHasVideo] = useState(false);

    useEffect(() => {
        if (movieDetails?.video) {
            setHasVideo(true);
        } else {
            setHasVideo(false);
        }
    }, [movieDetails, getMovieDetailById]);

    if(!movie){
        return null;
    }

    return (
        <div
            className={`
                fixed inset-0 flex justify-center items-center z-50
                transition-opacity duration-500 ease-in-out
                ${isVisible ? "opacity-100 bg-black bg-opacity-80" : "opacity-0 bg-black"}
                ${isVisible ? "pointer-events-auto" : "pointer-events-none"}
                scrollbar-hide
            `}
        >
            <div
                className={`
                    relative w-full md:max-w-7xl bg-zinc-900 rounded-lg shadow-xl
                    transition-all duration-500 ease-in-out transform
                    ${isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"}
                    max-h-screen overflow-y-auto scrollbar-hide mt-5 mb-5
                `}
            >
                <div className="relative w-full h-[80vh]">
                    <div className="hidden md:block w-full h-full">
                        {hasVideo ? (
                            <iframe
                                className="w-full h-full object-cover brightness-[60%]"
                                src={`https://www.youtube.com/embed/${movieDetails?.video.key}?autoplay=1&mute=1&loop=1&playlist=${movieDetails?.video.key}&controls=0&disablekb=1&modestbranding=1&showinfo=0&rel=0`}
                                title={movie.title}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        ) : movie?.poster_path ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                                    alt={movie.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="brightness-[60%]"
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="text-white text-center">No trailer available</div>
                        )}
                    </div>
                    <div className="sm:block md:hidden w-full h-full relative">
                        {movie?.poster_path ? (
                            <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            layout="fill"
                            objectFit="cover"
                            />
                        ) : (
                            <div className="flex justify-center items-center h-full bg-gray-800">
                            <p className="text-white text-xl">No image available</p>
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-0 w-full h-[80%] bg-gradient-to-t from-zinc-900 via-zinc-900 via-[5%] to-transparent"></div>
                    
                    <button
                        className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                        onClick={handleClose}
                    >
                        <IoClose className="text-white" size={20} />
                    </button>

                    <div className='absolute bottom-[10%] left-10 px-[3vw]'>
                        <p className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>
                            {movie.title}
                        </p>
                        <div className='flex flex-row gap-4 items-center'>
                            <button className='bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition'>
                                <IoPlay className='text-xl mr-1' /> Play
                            </button>
                            <FavoriteButton movieId={movie.id} />
                        </div>
                    </div>
                </div>
                <div className="relative py-8 bg-zinc-900 -mt-5 px-[6vw]">
                    <div className="grid grid-cols-1 md:grid-cols-[65%_auto] gap-7">
                        <div>
                            <div className="flex flex-row items-center mt-2 gap-1">
                                <button className="bg-white text-white bg-opacity-30 px-2 rounded-md py-1 w-auto text-xs flex flex-row items-center">
                                    <FaStar className="text-xs mr-1" /> {movie.vote_average?.toFixed(2)}
                                </button>
                                <button className="border-[1px] border-white text-white px-2 rounded-md py-1 w-auto text-xs flex flex-row items-center">
                                    <GrLanguage className="text-xs mr-1" /> {movie.original_language}
                                </button>
                            </div>
                            <div className="mt-3">
                                <p className="text-white text-lg">{movie.overview}</p>
                            </div>
                        </div>
                        <div>
                            <div className="items-center mt-2 gap-1">
                                <button className="border-[1px] border-white text-white px-2 rounded-md py-1 w-auto text-xs flex flex-row items-center">
                                    <FaPersonRunning className="text-xs mr-1" /> Cast
                                </button>
                            </div>
                            <div className="mt-2">
                                {   
                                    movieDetails && hasVideo  ? movieDetails.cast?.slice(0, 4).map((cast, index) => (
                                        <span key={`cast-${cast.id || index}-${index}`} className="text-sm text-white">
                                            {cast.name}
                                            {index !== 3 && ", "}
                                        </span>
                                    )) 
                                    : 
                                    <div>
                                        <div className="flex space-x-2">
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                        </div>
                                    </div>
                                }
                            </div>
                            <button className="border-[1px] border-white text-white px-2 rounded-md py-1 w-auto text-xs flex flex-row items-center mt-2">
                                <GrUserWorker className="text-xs mr-1" /> Crew
                            </button>
                            <div className="mt-2 ">
                                {   
                                    movieDetails && hasVideo  ? movieDetails.crew?.slice(0, 3).map((crew, index) => (
                                        <span key={`crew-${crew.id || index}-${index}`} className="text-sm text-white">
                                            {crew.name}
                                            {index !== 2 && ", "}
                                        </span>
                                    )) 
                                    : 
                                    <div>
                                        <div className="flex space-x-2">
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                        </div>
                                    </div>
                                }
                            </div>
                            <button className="border-[1px] border-white text-white px-2 rounded-md py-1 w-auto text-xs flex flex-row items-center mt-2">
                                <BiCameraMovie className="text-xs mr-1" /> Genre
                            </button>
                            <div className="mt-2">
                                {   
                                    movieDetails && hasVideo  ? movieDetails.genres?.slice(0, 5).map((genre, index) => (
                                        <span key={genre} className="text-md text-white">
                                            {genre}
                                            {index !== 4 && ", "}
                                        </span>
                                    )) 
                                    : 
                                    <div>
                                        <div className="flex space-x-2">
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                            <div className="w-24 h-4 bg-gray-400 animate-pulse rounded-md" /><br />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default MovieInfoModal;
