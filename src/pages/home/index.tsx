import { StarFilled } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movieApi } from "../../apis/movieApi";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { BASE_URL_API } from "../../utils";
import { IDataSync, IMovie } from "../../utils/type";
import ImageDefault from "../../utils/constant";

const Home = () => {
  const navigate = useNavigate();

  const [listTrendings, setListTrendings] = useState<IDataSync>({
    loading: false,
    data: [],
    error: null,
  });
  const [listNews, setListNews] = useState<IDataSync>({
    loading: false,
    data: [],
    error: null,
  });

  useEffect(() => {
    fetchTrendingMovie();
    fetchNewMovie();
  }, []);

  const handleAddAccount = async () => {
    for (let i = 1; i < 99; i++) {
      const payload = {
        username: `account${i}`,
        password: "123",
        email: `account${i}@gmail.com`,
      };
      console.log(i);
      setTimeout(() => {}, 100);
    }
  };

  const handleAddRating = async () => {
    for (let i = 100; i < 190; i++) {
      const payload = {
        accountAdmin: {
          username: `account${i}`,
          password: "123",
        },
        movieId: 11,
        score: _.random(4, 10),
      };
      await axios.post(`${BASE_URL_API}/rating/movie`, payload);
    }
  };

  const fetchTrendingMovie = async () => {
    setListTrendings((pre) => ({ ...pre, loading: true }));
    try {
      const { data } = await movieApi.getTrendingMovie();
      const counts = _.countBy(data);
      const countsArray = _.map(counts, (count, num) => ({
        movieId: parseInt(num),
        count,
      }));
      const sortedCounts = _.orderBy(countsArray, ["count"], ["desc"]);
      console.log(sortedCounts);

      const arr = [];
      for (let i = 0; i < Math.min(10, sortedCounts.length); i++) {
        const dataMovie = await movieApi.getMovieById(sortedCounts[i].movieId);
        arr.push(dataMovie.data);
      }
      setListTrendings({
        loading: false,
        data: arr,
        error: null,
      });
    } catch (error: any) {
      console.log(error);
      setListTrendings({
        loading: false,
        data: [],
        error,
      });
    }
  };

  const fetchNewMovie = async () => {
    setListNews((pre) => ({ ...pre, loading: true }));
    try {
      const { data } = await movieApi.searchMovie({
        pageIndex: 1,
        pageSize: 10,
        releaseDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
        sortBy: "releaseDate",
        orderBy: "DESC",
      });
      console.log(data);
      setListNews({
        loading: false,
        data: data.data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      setListNews({
        loading: false,
        data: [],
        error,
      });
    }
  };

  return (
    <div className="home">
      <Header />

      <div className="home__content">
        <div className="home__content__header card">
          <div className="home__content__header__title">Chào mừng!</div>

          <div className="home__content__header__description">
            Rất nhiều bộ phim, chương trình truyền hình để khám phá.
          </div>

          <Button
            className="home__content__header__search"
            type="primary"
            onClick={() => navigate("/search")}
          >
            Khám phá ngay
          </Button>
        </div>

        <Button className="d-none" type="primary" onClick={handleAddAccount}>
          Tạo tài khoản
        </Button>

        <Button className="d-none" type="primary" onClick={handleAddRating}>
          Tạo đánh giá
        </Button>

        <Button className="d-none" type="primary" onClick={fetchTrendingMovie}>
          Top Trending
        </Button>

        <div className="home__content__trending">
          <div className="home__content__trending__title">
            <div className="home__content__trending__title__icon"></div>

            <div className="home__content__trending__title__text">
              Top thịnh hành
            </div>
          </div>

          <div className="home__content__trending__content">
            {listTrendings.loading
              ? Array(10)
                  .fill(0)
                  .map((i, index) => (
                    <div className="loading-overlay" key={index}>
                      <Skeleton.Image
                        active
                        className="loading-overlay__image"
                      />
                      <Skeleton
                        active
                        className="loading-overlay__text"
                        paragraph={{ rows: 1 }}
                      />
                    </div>
                  ))
              : listTrendings.data?.map((i: IMovie) => (
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

        <div className="home__content__new">
          <div className="home__content__new__title">
            <div className="home__content__new__title__icon"></div>

            <div className="home__content__new__title__text">
              Phim mới phát hành
            </div>
          </div>

          <div className="home__content__new__content">
            {listNews.loading
              ? Array(10)
                  .fill(0)
                  .map((i, index) => (
                    <div className="loading-overlay" key={index}>
                      <Skeleton.Image
                        active
                        className="loading-overlay__image"
                      />
                      <Skeleton
                        active
                        className="loading-overlay__text"
                        paragraph={{ rows: 1 }}
                      />
                    </div>
                  ))
              : listNews.data?.map((i: IMovie) => (
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

      <Footer />
    </div>
  );
};

export default Home;
