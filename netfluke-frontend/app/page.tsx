"use client"

import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import MovieList from "./components/MovieList";
import { useHomeMovies } from './hooks/useHomeMovies';
import { useState, useEffect } from "react";
import MovieInfoModal from './components/MovieInfoModal';
import { Movie } from "./types/types";
import LoadingPage from "./components/LoadingPage";
import ErrorPage from "./components/ErrorPage";

export default function Home() {
  const { movies, loading, error } = useHomeMovies();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setTimeout(() => {
      setModalVisible(true);
  }, 300);
  };

  const closeModal = () => {
      setModalVisible(false);
      setTimeout(() => {
          setSelectedMovie(null);
      }, 300);
  };

  useEffect(() => {
    if (!loading && movies) {
    }
  }, [movies, loading]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!movies) {
    return <ErrorPage />;
  }

  return (
    <>
      <Navbar />
      <Banner movie={movies.banner} openModal={openModal} />
      <div className="pb-10">
        <MovieList title="Popular Movies" data={movies.popularMovies} openModal={openModal} />
      </div>
      <div className="pb-10">
        <MovieList title="Popular TV Shows" data={movies.popularTvShows} openModal={openModal} />
      </div>
      
      <MovieInfoModal visible={isModalVisible} onClose={closeModal} movie={selectedMovie} />
    </>
  );
}
