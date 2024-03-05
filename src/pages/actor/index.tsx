import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IActor, IDataSync } from "../../utils/type";
import { movieApi } from "../../apis/movieApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Col, Image, Row, Spin } from "antd";
import { BASE_URL_API } from "../../utils";
import dayjs from "dayjs";
import { StarFilled } from "@ant-design/icons";
import ImageDefault, { DEFAULT_FORMAT_DATE } from "../../utils/constant";

const Actor = () => {
  const [searchParams] = useSearchParams();
  const actorId = searchParams.get("actorId");
  const navigate = useNavigate();

  const [actor, setActor] = useState<IDataSync>({
    data: null,
    loading: false,
    error: null,
  });
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchActor();
    fetchListMovies();
  }, []);

  const fetchActor = async () => {
    setActor((pre) => ({ ...pre, loading: true }));
    try {
      const { data } = await movieApi.getActorById(actorId);
      console.log(data);
      setActor({
        data,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setActor({
        data: null,
        loading: false,
        error,
      });
      console.log(error);
    }
  };

  const fetchListMovies = async () => {
    try {
      const { data } = await movieApi.getListMoviesByActor(actorId);
      console.log(data);
      setListMovies(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="actor">
      <Header />

      <div className="actor__content">
        {actor.loading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="actor__content__name">{actor.data?.name}</div>

            <div className="actor__content__job">Diễn viên</div>

            <div className="actor__content__dob">
              Ngày sinh:{" "}
              {actor.data?.dob
                ? dayjs(actor.data?.dob).format(DEFAULT_FORMAT_DATE)
                : ""}
            </div>

            <div className="actor__content__detail">
              <img
                className="actor__content__detail__image"
                src={actor.data?.image ?? ImageDefault}
                alt="Ảnh"
              />

              <div className="actor__content__detail__description">
                {actor.data?.description}
              </div>
            </div>

            <div className="actor__content__movie">
              <div className="actor__content__movie__title">
                Các bộ phim tham gia
              </div>

              <Row gutter={[24, 24]}>
                {listMovies?.map((i: any) => (
                  <Col key={i.id} xs={12} md={8}>
                    <div
                      className="item-movie"
                      onClick={() => navigate(`/movie?movieId=${i.id}`)}
                    >
                      <img
                        className="item-movie__image"
                        src={i.image ?? ImageDefault}
                        alt="Ảnh"
                      />

                      <div className="item-movie__detail">
                        <div className="item-movie__detail__name">{i.name}</div>

                        <div className="item-movie__detail__score">
                          <StarFilled />
                          {i.numberVote > 0 ? Number(i.score).toFixed(1) : ""}
                          /10
                        </div>

                        <div className="item-movie__detail__actor">
                          Trong vai{" "}
                          {
                            i.movieActors?.find(
                              (j: any) => j.actor.id == actorId
                            )?.nameInMovie
                          }
                        </div>

                        <div className="item-movie__detail__year">
                          {dayjs(i.releaseDate).format("YYYY")}
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Actor;
