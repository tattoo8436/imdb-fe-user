import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSearchParams } from "react-router-dom";
import { IDataSync, IMovie } from "../../utils/type";
import { movieApi } from "../../apis/movieApi";
import MovieDetail from "./MovieDetail";
import ModalRating from "./ModalRating";
import { useForm } from "react-hook-form";
import { getCurrentAccount } from "../../utils";
import { Spin } from "antd";

const Movie = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movieId");
  const currentAccount = getCurrentAccount();
  const hookFormRating = useForm({
    mode: "onChange",
    defaultValues: {
      movieId: Number(movieId),
      score: 0,
    },
  });
  const hookFormComment = useForm({
    mode: "onChange",
    defaultValues: {
      movieId: Number(movieId),
      comment: "",
    },
  });

  const [movie, setMovie] = useState<IDataSync>({
    loading: false,
    data: null,
    error: null,
  });
  const [listMoviesSimilar, setListMoviesSimilar] = useState<IMovie[]>([]);
  const [openModalRating, setOpenModalRating] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovie();
    fetchRatingMovie();
    fetchSimilar();
  }, [isRefetch, movieId]);

  const fetchMovie = async (isSetLoading = true) => {
    if (isSetLoading) {
      setMovie((pre) => ({ ...pre, loading: true }));
    }
    try {
      const { data } = await movieApi.getMovieById(movieId);
      setMovie({
        loading: false,
        data,
        error: null,
      });
    } catch (error: any) {
      console.log(error);
      setMovie({
        loading: false,
        data: null,
        error,
      });
    }
  };

  const fetchRatingMovie = async () => {
    try {
      const { data } = await movieApi.getRatingMovieByAccount({
        movieId: Number(movieId),
        accountId: currentAccount?.id,
      });
      console.log(data);
      hookFormRating.setValue("score", data.score ?? null);
      setUserScore(data.score ?? null);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchSimilar = async () => {
    try {
      const { data } = await movieApi.getListMoviesSimilar(movieId);
      console.log(data);
      setListMoviesSimilar(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="movie">
      <Header />

      <div className="movie__content">
        {movie.loading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : (
          <MovieDetail
            movie={movie}
            userScore={userScore}
            setOpenModal={setOpenModalRating}
            hookForm={hookFormComment}
            setIsRefetch={setIsRefetch}
            currentAccount={currentAccount}
            listMoviesSimilar={listMoviesSimilar}
            setMovie={setMovie}
            fetchMovie={fetchMovie}
          />
        )}
      </div>

      <Footer />

      <ModalRating
        openModal={openModalRating}
        setOpenModal={setOpenModalRating}
        hookForm={hookFormRating}
        setIsRefetch={setIsRefetch}
        userScore={userScore}
      />
    </div>
  );
};

export default Movie;
