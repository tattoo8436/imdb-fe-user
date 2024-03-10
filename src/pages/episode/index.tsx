import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSearchParams } from "react-router-dom";
import { IDataSync, IEpisode, IMovie } from "../../utils/type";
import { movieApi } from "../../apis/movieApi";
import EpisodeDetail from "./EpisodeDetail";
import ModalRating from "./ModalRating";
import { useForm } from "react-hook-form";
import { getCurrentAccount } from "../../utils";
import { Button, Spin } from "antd";

const Episode = () => {
  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get("episodeId");
  const movieId = searchParams.get("movieId");
  const currentAccount = getCurrentAccount();
  const hookFormRating = useForm({
    mode: "onChange",
    defaultValues: {
      episodeId: Number(episodeId),
      score: 0,
    },
  });
  const hookFormComment = useForm({
    mode: "onChange",
    defaultValues: {
      episodeId: Number(episodeId),
      comment: "",
    },
  });

  const [episode, setEpisode] = useState<IDataSync>({
    loading: false,
    data: null,
    error: null,
  });
  const [openModalRating, setOpenModalRating] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    fetchEpisode();
    fetchRatingEpisode();
  }, [isRefetch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchEpisode = async (isSetLoading = true) => {
    if (isSetLoading) {
      setEpisode((pre) => ({ ...pre, loading: true }));
    }
    try {
      const { data } = await movieApi.getEpisodeById(episodeId);
      const sortComments = data.comments.sort((a: any, b: any) => b.id - a.id);
      data.comments = sortComments;
      setEpisode({
        loading: false,
        data,
        error: null,
      });
    } catch (error: any) {
      console.log(error);
      setEpisode({
        loading: false,
        data: null,
        error,
      });
    }
  };

  const fetchRatingEpisode = async () => {
    try {
      const { data } = await movieApi.getRatingEpisodeByAccount({
        accountId: currentAccount?.id,
        episodeId: Number(episodeId),
      });
      console.log(data);
      hookFormRating.setValue("score", data.score ?? null);
      setUserScore(data.score ?? null);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="episode">
      <Header />

      <div className="episode__content">
        {episode.loading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : (
          <EpisodeDetail
            episode={episode}
            userScore={userScore}
            setOpenModal={setOpenModalRating}
            hookForm={hookFormComment}
            setIsRefetch={setIsRefetch}
            fetchEpisode={fetchEpisode}
          />
        )}
      </div>

      <Footer />

      <ModalRating
        openModal={openModalRating}
        setOpenModal={setOpenModalRating}
        hookForm={hookFormRating}
        setIsRefetch={setIsRefetch}
        movieId={movieId ?? ""}
        userScore={userScore}
      />
    </div>
  );
};

export default Episode;
