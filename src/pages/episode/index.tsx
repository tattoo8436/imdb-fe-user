import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSearchParams } from "react-router-dom";
import { IEpisode, IMovie } from "../../utils/type";
import { movieApi } from "../../apis/movieApi";
import EpisodeDetail from "./EpisodeDetail";
import ModalRating from "./ModalRating";
import { useForm } from "react-hook-form";
import { getCurrentAccount } from "../../utils";
import { Button } from "antd";

const Episode = () => {
  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get("episodeId");
  const movieId = searchParams.get("movieId");
  const currentAccount = getCurrentAccount();
  const hookFormRating = useForm({
    mode: "onChange",
    defaultValues: {
      account: {
        username: currentAccount?.username,
        password: currentAccount?.password,
      },
      episodeId: Number(episodeId),
      score: 0,
    },
  });
  const hookFormComment = useForm({
    mode: "onChange",
    defaultValues: {
      account: {
        username: currentAccount?.username,
        password: currentAccount?.password,
      },
      episodeId: Number(episodeId),
      comment: "",
    },
  });

  const [episode, setEpisode] = useState<IEpisode | null>(null);
  const [openModalRating, setOpenModalRating] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  useEffect(() => {
    fetchEpisode();
    fetchRatingEpisode();
  }, [isRefetch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchEpisode = async () => {
    console.log(episodeId);

    try {
      const { data } = await movieApi.getEpisodeById(episodeId);
      console.log(data);
      setEpisode(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchRatingEpisode = async () => {
    try {
      const { data } = await movieApi.getRatingEpisodeByAccount({
        accountAdmin: {
          username: currentAccount.username,
          password: currentAccount.password,
        },
        episodeId: Number(episodeId),
      });
      console.log(data);
      hookFormRating.setValue("score", data.score ?? null);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="episode">
      <Header />

      <div className="episode__content">
        <Button
          className="d-none"
          onClick={() => console.log(hookFormRating.getValues())}
        >
          Log
        </Button>
        <EpisodeDetail
          episode={episode}
          userScore={hookFormRating.watch("score")}
          setOpenModal={setOpenModalRating}
          hookForm={hookFormComment}
          setIsRefetch={setIsRefetch}
        />
      </div>

      <Footer />

      <ModalRating
        openModal={openModalRating}
        setOpenModal={setOpenModalRating}
        hookForm={hookFormRating}
        setIsRefetch={setIsRefetch}
        movieId={movieId ?? ""}
      />
    </div>
  );
};

export default Episode;
