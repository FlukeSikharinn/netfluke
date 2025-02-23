import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoPlay } from "react-icons/io5";
import { Movie } from '../types/types';
import FavoriteButton from './FavoriteButton';
import { FiChevronDown } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";

const API_IMAGE = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
    data: Movie;
    openModal: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, openModal }) => {

    const [isShowModalHovered, setIsShowModalHovered] = useState<boolean>(false);
    const [randomTag, setRandomTag] = useState<string | null>(null);

    const tags = [
        { text: "TOP 10", position: "right" },
        { text: "NEW SEASON", position: "bottom" },
    ];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * tags.length);
        setRandomTag(tags[randomIndex].text);
    }, [data.id]);

    return (
        <div>
            <div className='group bg-zinc-900 col-span relative h-[30vw] md:h-[12vw] z-0 hover:z-10'>
                <div className="sm:block md:hidden w-full h-full">
                    <Image
                        fill 
                        className='
                            object-cover 
                            transition 
                            duration-300  
                            shadow-xl 
                            rounded-sm 
                            group-hover:opacity-0 
                            group-hover:scale-110
                            group-hover:z-10
                            delay-300 
                            w-full h-[12vw]' 
                        src={`${API_IMAGE}${data.poster_path}`} alt={data.title || "Movie Poster"}
                        onClick={() => openModal(data)}
                    />
                </div>
                <div className="hidden md:block w-full h-full">
                    <Image
                        fill 
                        className='
                            object-cover 
                            transition 
                            duration-300  
                            shadow-xl 
                            rounded-sm 
                            group-hover:opacity-0 
                            group-hover:scale-110
                            group-hover:z-10
                            delay-300 
                            w-full h-[12vw]' 
                        src={`${API_IMAGE}${data.backdrop_path || data.poster_path}`} alt={data.title || "Movie Poster"}
                        onClick={() => openModal(data)}
                    />
                </div>
                {randomTag && randomTag === "TOP 10" && (
                    <div className="absolute right-0 bg-red-600 text-white text-[8px] md:text-xs font-bold px-1 py-1 rounded-sm shadow-md z-40 text-center transition duration-300 delay-300 group-hover:opacity-0">
                        <span className='drop-shadow-lg'>TOP</span><br />
                        <span className='drop-shadow-lg'>10</span>
                    </div>
                )}

                {randomTag && randomTag === "NEW SEASON" && (
                    <div className="absolute bottom-2 bg-red-600 text-white text-[8px] md:text-xs font-bold px-3 py-1 rounded-sm shadow-2xl z-40 text-center transition duration-300 delay-300 group-hover:opacity-0">
                        <span>NEW SEASON</span>
                    </div>
                )}

                <div 
                    className='
                        pointer-events-none
                        opacity-0 
                        absolute 
                        top-0 
                        transition-all 
                        duration-300 
                        delay-300 
                        w-full 
                        h-full
                        scale-95 
                        z-40
                        group-hover:block
                        group-hover:scale-[130%]
                        group-hover:-translate-y-[12vw]
                        group-hover:opacity-100
                        group-hover:z-50
                        group-hover:pointer-events-auto
                        cursor-pointer 
                    '
                >
                    <div className="relative" onClick={() => openModal(data)}>
                        <div className="sm:block md:hidden w-full h-full">
                            <Image  
                                width={500}
                                height={750}
                                className='
                                    cursor-pointer 
                                    object-cover 
                                    transition 
                                    duration 
                                    shadow-xl 
                                    rounded-t-md 
                                    w-full 
                                    h-[12vw]
                                ' 
                                src={`${API_IMAGE}${data.poster_path}`} 
                                alt={data.title || "Movie Poster"}
                            />
                        </div>
                        <div className="hidden md:block w-full h-full">
                            <Image  
                                width={500}
                                height={750}
                                className='
                                    cursor-pointer 
                                    object-cover 
                                    transition 
                                    duration 
                                    shadow-xl 
                                    rounded-t-md 
                                    w-full 
                                    h-[12vw]
                                ' 
                                src={`${API_IMAGE}${data.backdrop_path || data.poster_path}`} 
                                alt={data.title || "Movie Poster"}
                            />
                        </div>

                        <div className="absolute bottom-2 left-2 text-white text font-semibold p-2 rounded-md">
                            <p className='drop-shadow-lg'>{data.title}</p>
                        </div>
                    </div>
                    <div className='
                            z-40
                            bg-zinc-800
                            p-2 lg:p-4
                            absolute
                            w-full
                            transition
                            shadow-md
                            rounded-b-md
                            group-hover:z-50
                        '
                    >
                        <div className='flex flex-row items-center gap-3'>
                            <button
                                className='
                                    w-6 h-6
                                    lg:w-10 lg:h-10
                                    bg-white
                                    rounded-full
                                    flex justify-center
                                    items-center
                                    transition
                                    hover:bg-neutral-300
                                '
                                onClick={() => {}}>
                                <IoPlay className='text-[12px]' />
                            </button>
                            <FavoriteButton movieId={data.id} />
                            <button
                                className='
                                    w-6 h-6
                                    lg:w-10 lg:h-10
                                    rounded-full
                                    flex justify-center
                                    items-center
                                    transition
                                    border-[1px]
                                    hover:border-[2px]
                                    duration-100
                                    border-white
                                    text-white
                                    ml-auto
                                    relative
                                '
                                onMouseEnter={() => setIsShowModalHovered(true)}
                                onMouseLeave={() => setIsShowModalHovered(false)}
                                onClick={() => openModal(data)}
                            >
                                {isShowModalHovered && (
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white text-black text-xs p-1 rounded-md whitespace-nowrap max-w-[200px] w-auto">
                                        Show Detail
                                    </div>
                                )}
                                <FiChevronDown className='text-[12px]' />
                            </button>
                        </div>
                        <div className="flex flex-row items-center mt-2 gap-1">
                            <button className="bg-white text-white bg-opacity-30 px-2 rounded-md py-1 w-auto text-xs flex flex-row items-center">
                                <FaStar className="text-xs mr-1" /> {data.vote_average?.toFixed(2)}
                            </button>
                            <button className="border-[1px] border-white text-white px-2 rounded-md py-1 w-auto text-xs flex flex-row items-center">
                                <GrLanguage className="text-xs mr-1" /> {data.original_language}
                            </button>
                        </div>
                        <div className="flex flex-row mt-2 gap-1 items-center">
                            {data.genres?.slice(0, 3).map((genre, index) => (
                                <span key={index} className='text-xs text-white'>
                                    {genre}
                                    { index !== 2 && ', ' }
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
