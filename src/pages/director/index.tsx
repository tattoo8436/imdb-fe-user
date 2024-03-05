import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IDataSync, IDirector } from "../../utils/type";
import { movieApi } from "../../apis/movieApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Col, Image, Row, Spin } from "antd";
import { BASE_URL_API } from "../../utils";
import dayjs from "dayjs";
import { StarFilled } from "@ant-design/icons";
import ImageDefault, { DEFAULT_FORMAT_DATE } from "../../utils/constant";

const Director = () => {
  const [searchParams] = useSearchParams();
  const directorId = searchParams.get("directorId");
  const navigate = useNavigate();

  const [director, setDirector] = useState<IDataSync>({
    loading: false,
    data: null,
    error: null,
  });
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDirector();
    fetchListMovies();
  }, []);

  const fetchDirector = async () => {
    setDirector((pre) => ({ ...pre, loading: true }));
    try {
      const { data } = await movieApi.getDirectorById(directorId);
      setDirector({
        loading: false,
        data,
        error: null,
      });
    } catch (error: any) {
      console.log(error);
      setDirector({
        loading: false,
        data: null,
        error,
      });
    }
  };

  const fetchListMovies = async () => {
    try {
      const { data } = await movieApi.getListMoviesByDirector(directorId);
      console.log(data);
      setListMovies(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="director">
      <Header />

      <div className="director__content">
        {director.loading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="director__content__name">{director.data?.name}</div>

            <div className="director__content__job">Đạo diễn</div>

            <div className="director__content__dob">
              Ngày sinh:{" "}
              {director.data?.dob
                ? dayjs(director.data?.dob).format(DEFAULT_FORMAT_DATE)
                : ""}
            </div>

            <div className="director__content__detail">
              <img
                className="director__content__detail__image"
                src={director.data?.image ?? ImageDefault}
                alt="Ảnh"
              />

              <div className="director__content__detail__description">
                {director.data?.description}
              </div>
            </div>

            <div className="director__content__movie">
              <div className="director__content__movie__title">
                Các bộ phim đạo diễn
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
                          {Number(i.score).toFixed(1)}
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

export default Director;
