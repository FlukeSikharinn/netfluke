"use client";

import React, { useRef, useState, useEffect } from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { Movie } from "../types/types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface MovieListProps {
    data: Movie[];
    title: string;
    openModal: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ data, title, openModal }) => {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            const containerWidth = carouselRef.current.offsetWidth;
            const contentWidth = carouselRef.current.scrollWidth;
            setMaxScroll(containerWidth - contentWidth);
        }
    }, [data]);

    const scroll = (direction: "left" | "right") => {
        const scrollAmount = 800;
        setPosition((prev) => {
            if (direction === "left") {
                return Math.min(prev + scrollAmount, 0);
            } else {
                return Math.max(prev - scrollAmount, maxScroll);
            }
        });
    };

    if (isEmpty(data)) {
        return null;
    }

    return (
        <div className="px-4 md:px-12 space-y-8">
            <div>
                <p className="text-white text-md mb-2 md:text-xl lg:text-2xl font-semibold">
                    {title}
                </p>
                <div className="relative">
                    <button
                        onClick={() => scroll("left")}
                        className="group arrow absolute transition h-full -left-4 md:-left-12 bg-black bg-opacity-30 text-white p-3 shadow cursor-pointer hover:bg-opacity-60 top-1/2 transform -translate-y-1/2 z-30"
                    >
                        <FaChevronLeft className="text-white text-opacity-100 md:text-opacity-0 group-hover:text-opacity-100 transition" size={24} />
                    </button>
                    <div
                        ref={carouselRef}
                        id="carousel"
                        className="relative flex flex-row scrollbar-hide scroll-smooth mx-6 space-x-4 transition-transform duration-300"
                        style={{ transform: `translateX(${position}px)` }}
                    >
                        {data.map((movie) => (
                            <div className="min-w-[20vw]" key={movie.id} >
                                <MovieCard data={movie} openModal={openModal} />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll("right")}
                        className="group arrow absolute transition h-full -right-4 md:-right-12 bg-black bg-opacity-30 text-white p-3 shadow cursor-pointer hover:bg-opacity-60 top-1/2 transform -translate-y-1/2 z-30"
                    >
                        <FaChevronRight className="text-white text-opacity-100 md:text-opacity-0 group-hover:text-opacity-100 transition" size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieList;
