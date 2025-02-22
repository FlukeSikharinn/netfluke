import React from 'react'
import { useEffect, useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa6";

interface FavoriteButtonProps {
  movieId: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        const favoriteLists = JSON.parse(localStorage.getItem('favoriteLists') || '[]');
        setIsFavorite(favoriteLists.includes(movieId));
    }, [movieId]);

    const handleClick = () => {
        const favoriteLists = JSON.parse(localStorage.getItem('favoriteLists') || '[]');

        if (isFavorite) {
        const updatedMovies = favoriteLists.filter((id: number) => id !== movieId);
        localStorage.setItem('favoriteLists', JSON.stringify(updatedMovies));
        setIsFavorite(false);
        } else {
        favoriteLists.push(movieId);
        localStorage.setItem('favoriteLists', JSON.stringify(favoriteLists));
        setIsFavorite(true);
        }
    };

    return (
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
                ml-[-7px]
                relative
            '
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {isHovered && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white text-black text-xs p-1 rounded-md whitespace-nowrap max-w-[200px] w-auto">
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </div>
            )}
            {isFavorite ? <FaCheck className="text-[12px]" /> : <FaPlus className="text-[12px]" />}
        </button>
    );
};

export default FavoriteButton;
