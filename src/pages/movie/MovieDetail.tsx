import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Collapse, CollapseProps, Input, Row } from "antd";
import dayjs from "dayjs";
import numeral from "numeral";
import React, { useContext, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { ContextLocation } from "../../App";
import { movieApi } from "../../apis/movieApi";
import ImageDefault from "../../utils/constant";
import { IDataSync, IMovie } from "../../utils/type";
import ListEpisodes from "./ListEpisodes";

interface IProps {
  movie: IDataSync;
  userScore: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  hookForm: UseFormReturn<
    {
      movieId: number;
      comment: string;
    },
    any,
    undefined
  >;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  currentAccount: any;
  listMoviesSimilar: IMovie[];
  setMovie: React.Dispatch<React.SetStateAction<IDataSync>>;
  fetchMovie: any;
}

const MovieDetail = (props: IProps) => {
  const {
    movie,
    userScore,
    setOpenModal,
    hookForm,
    setIsRefetch,
    currentAccount,
    listMoviesSimilar,
    setMovie,
    fetchMovie,
  } = props;
  const isLogin = localStorage.getItem("account") !== null;
  const navigate = useNavigate();
  const location = useLocation();
  const contextLocation: any = useContext(ContextLocation);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (value: any) => {
    setLoading(true);
    const payload = {
      content: value.comment,
      movieId: value.movieId,
    };
    console.log(payload);
    try {
      const { data } = await movieApi.comment(payload);
      console.log(data);
      fetchMovie(false);
      setLoading(false);
      hookForm.reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Các tập phim",
      children: <ListEpisodes movie={movie} />,
    },
  ];

  return (
    <div className="movie-detail">
      <div className="movie-detail__header">
        <div className="movie-detail__header__left">
          <div className="movie-detail__header__left__name">
            {movie?.data?.name}
          </div>

          <div className="movie-detail__header__left__year">
            {movie?.data?.type === 2 ? "Phim bộ | " : ""}
            {movie?.data?.releaseDate
              ? dayjs(movie.data?.releaseDate).format("YYYY")
              : ""}
            {movie?.data?.endYear} | {movie?.data?.duration} phút
          </div>
        </div>

        <div className="movie-detail__header__right">
          <div className="rating-imdb">
            <div className="rating-imdb__label">Đánh giá của IMDB</div>
            <div className="rating-imdb__value">
              <StarFilled className="rating-imdb__value__icon" />

              <div className="rating-imdb__value__content">
                <div className="rating-imdb__value__content__score">
                  {movie?.data?.score ?? 0 > 0
                    ? movie?.data?.score?.toFixed(1)
                    : ""}
                  /10
                </div>
                <div className="rating-imdb__value__content__number-vote">
                  {numeral(movie?.data?.numberVote).format("0,")}
                </div>
              </div>
            </div>
          </div>

          {isLogin && (
            <div className="rating-user">
              <div className="rating-user__label">Đánh giá của bạn</div>
              {userScore !== null ? (
                <div
                  className="rating-user__value"
                  onClick={() => setOpenModal(true)}
                >
                  <StarFilled className="rating-user__value__icon" />
                  {userScore}/10
                </div>
              ) : (
                <Button
                  className="rating-user__input"
                  onClick={() => setOpenModal(true)}
                  icon={<StarOutlined />}
                  disabled={!isLogin}
                >
                  Đánh giá
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="movie-detail__content">
        <div className="movie-detail__content__asset">
          <img
            className="movie-detail__content__asset__image"
            src={movie?.data?.image}
            alt="Ảnh"
          />

          <YouTube
            className="movie-detail__content__asset__trailer"
            videoId={
              movie?.data?.trailer
                ? movie?.data?.trailer?.split("?v=")?.at(1)
                : ""
            }
            opts={{
              height: "400",
              width: "800",
            }}
          />
        </div>

        <div className="movie-detail__content__genre">
          {movie?.data?.movieGenres?.map((i: any) => (
            <div className="movie-detail__content__genre__item" key={i.id}>
              {i.genre.name}
            </div>
          ))}
        </div>

        <div className="movie-detail__content__description">
          {movie?.data?.description}
        </div>

        <div className="movie-detail__content__director">
          <div className="movie-detail__content__director__label">
            Đạo diễn:{" "}
          </div>

          <div className="movie-detail__content__director__value">
            {movie?.data?.movieDirectors?.map((i: any) => (
              <Link
                to={`/director?directorId=${i.director.id}`}
                key={i.id}
                className="movie-detail__content__director__value__item"
              >
                {i.director.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="divider"></div>
      </div>

      {Number(movie?.data?.episodes?.length) > 0 && (
        <Collapse
          items={items}
          defaultActiveKey={[]}
          className="movie-detail__episode"
        />
      )}

      <div className="movie-detail__footer">
        <Row gutter={[24, 12]}>
          <Col xs={24} md={12}>
            <div className="movie-detail__footer__actor">
              <div className="movie-detail__footer__actor__title">
                <div className="movie-detail__footer__actor__title__icon"></div>

                <div className="movie-detail__footer__actor__title__text">
                  Diễn viên
                </div>
              </div>

              <div className="movie-detail__footer__actor__content">
                <Row gutter={[24, 24]}>
                  {movie?.data?.movieActors?.map((i: any) => (
                    <Col key={i.id} span={12} className="item-actor">
                      <Avatar
                        className="item-actor__image"
                        src={i.actor.image ?? ImageDefault}
                      />

                      <div className="item-actor__text">
                        <Link
                          className="item-actor__text__name"
                          to={`/actor?actorId=${i.actor.id}`}
                        >
                          {i.actor.name}
                        </Link>
                        <div className="item-actor__text__name-in-movie">
                          {i.nameInMovie}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="movie-detail__footer__comment">
              <div className="movie-detail__footer__comment__title">
                Bình luận
              </div>

              {isLogin ? (
                <div className="movie-detail__footer__comment__input">
                  <form
                    onSubmit={hookForm.handleSubmit(onSubmit)}
                    className="form"
                  >
                    <div className="form__input">
                      <Controller
                        name="comment"
                        control={hookForm.control}
                        rules={{
                          validate: {
                            required: (v) =>
                              v.trim() !== "" || "Vui lòng nhập bình luận",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Nhập bình luận"
                            allowClear
                          />
                        )}
                      />
                    </div>

                    <Button
                      className="movie-detail__footer__comment__input__btn"
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      Bình luận
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="movie-detail__footer__comment__note">
                  Vui lòng{" "}
                  <Link
                    to="/login"
                    onClick={() => {
                      contextLocation.setPreLocation(
                        location.pathname + location.search
                      );
                    }}
                  >
                    đăng nhập
                  </Link>{" "}
                  để bình luận
                </div>
              )}

              <div className="movie-detail__footer__comment__content">
                {movie?.data?.comments?.map((i: any) => (
                  <div key={i.id} className="item-comment">
                    <div className="item-comment__header">
                      <div className="item-comment__header__name">
                        {i.account.username}
                      </div>

                      <div className="item-comment__header__date">
                        {dayjs(i.date).format("DD/MM/YYYY")}
                      </div>
                    </div>

                    <div className="item-comment__content">{i.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <div className="movie-detail__footer__similar">
          <div className="movie-detail__footer__similar__title">
            <div className="movie-detail__footer__similar__title__icon"></div>

            <div className="movie-detail__footer__similar__title__text">
              Phim tương tự
            </div>
          </div>

          <div className="movie-detail__footer__similar__content">
            {listMoviesSimilar?.map((i) => (
              <div
                key={i.id}
                className="movie-item"
                onClick={() => navigate(`/movie?movieId=${i.id}`)}
              >
                <div className="movie-item__image">
                  <img
                    src={i.image ?? ImageDefault}
                    alt="Ảnh"
                    className="movie-item__image__image"
                  />

                  <div className="mask">
                    <StarFilled className="mask__icon" />

                    <div className="mask__score">
                      {i.numberVote > 0 ? i.score.toFixed(1) : ""}/10
                    </div>

                    <div className="mask__genre">
                      {i.movieGenres?.map((j) => (
                        <div key={j.id}>{j.genre.name}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="movie-item__name">{i.name}</div>

                <div className="movie-item__year">
                  {i.releaseDate ? dayjs(i.releaseDate).format("YYYY") : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
