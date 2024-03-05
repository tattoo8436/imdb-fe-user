import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button, Col, Input, Pagination, Row, Select, Spin } from "antd";
import { IDataSync, IMovie, ISearchMovie } from "../../utils/type";
import {
  optionLanguageSearch,
  optionScore,
  optionSort,
  optionType,
  optionYear,
} from "../../utils/constant";
import { movieApi } from "../../apis/movieApi";
import MovieItem from "./MovieItem";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState<ISearchMovie>({
    pageIndex: 1,
    pageSize: 10,
    name: "",
    genreId: null,
    type: null,
    score: null,
    releaseDate: null,
    language: null,
    orderBy: "DESC",
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [listGenres, setListGenres] = useState([]);
  const [listMovies, setListMovies] = useState<IDataSync>({
    loading: false,
    data: [],
    error: null,
  });
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchAllGenres();
  }, []);

  useEffect(() => {
    fetchMovie();
  }, [isRefetch]);

  const fetchMovie = async () => {
    setListMovies((pre) => ({ ...pre, loading: true }));
    try {
      const { data } = await movieApi.searchMovie({
        ...search,
        score: search.score ? Number(search.score) : null,
        releaseDate: search.releaseDate ? `${search.releaseDate}-01-01` : null,
      });
      console.log({ data });
      setTotalRecords(data?.totals);
      setListMovies({
        loading: false,
        data: data?.data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      setListMovies({
        loading: false,
        data: [],
        error: error,
      });
    }
  };

  const fetchAllGenres = async () => {
    try {
      const { data } = await movieApi.searchGenre({
        accountAdmin: {},
        pageIndex: 1,
        pageSize: 999999,
      });
      console.log({ data });
      setListGenres(
        data?.listGenres?.map((i: any) => ({ label: i.name, value: i.id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectChange = (value: any, label: string) => {
    const pre: any = { ...search };
    if (value) {
      pre[label] = value;
    } else {
      pre[label] = null;
    }
    setSearch(pre);
    setIsRefetch((pre) => !pre);
  };

  return (
    <div className="search">
      <Header />

      <div className="search__content">
        <div className="search__content__title">Tìm kiếm phim</div>

        <div className="search__content__search-bar">
          <Button className="d-none" onClick={() => console.log("")}>
            Log
          </Button>
          <Row>
            <Col span={12} className="search-bar__name" offset={12}>
              <Input
                className="search-bar__name__input"
                placeholder="Nhập tên phim"
                value={search.name}
                onChange={(e) =>
                  setSearch((pre) => ({ ...pre, name: e.target.value }))
                }
                onPressEnter={() => setIsRefetch((pre) => !pre)}
                allowClear
              />
              <Button
                type="primary"
                onClick={() => {
                  setIsRefetch((pre) => !pre);
                }}
              >
                Tìm kiếm
              </Button>
            </Col>

            <Col span={24} className="search-bar__filter">
              <Row gutter={[24, 24]} justify="center">
                <Col className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">
                    Kiểu phim:
                  </div>

                  <Select
                    className="search-bar__filter__item__select"
                    placeholder="Chọn kiểu phim"
                    options={optionType}
                    value={search.type}
                    onChange={(e) => onSelectChange(e, "type")}
                    allowClear
                  />
                </Col>

                <Col className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">
                    Thể loại:
                  </div>

                  <Select
                    className="search-bar__filter__item__select"
                    placeholder="Chọn thể loại"
                    options={listGenres}
                    value={search.genreId}
                    onChange={(e) => onSelectChange(e, "genreId")}
                    allowClear
                  />
                </Col>

                <Col className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">
                    Đánh giá:
                  </div>

                  <Select
                    className="search-bar__filter__item__select"
                    placeholder="Chọn đánh giá"
                    options={optionScore}
                    value={search.score}
                    onChange={(e) => onSelectChange(e, "score")}
                    allowClear
                  />
                </Col>

                <Col className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">Năm:</div>

                  <Select
                    className="search-bar__filter__item__select"
                    placeholder="Chọn năm"
                    options={optionYear}
                    value={search.releaseDate}
                    onChange={(e) => onSelectChange(e, "releaseDate")}
                    allowClear
                  />
                </Col>

                <Col className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">
                    Ngôn ngữ:
                  </div>

                  <Select
                    className="search-bar__filter__item__select"
                    placeholder="Chọn ngôn ngữ"
                    options={optionLanguageSearch}
                    value={search.language}
                    onChange={(e) => onSelectChange(e, "language")}
                    allowClear
                  />
                </Col>

                <Col className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">
                    Sắp xếp theo:
                  </div>

                  <Select
                    className="search-bar__filter__item__select"
                    placeholder="Chọn sắp xếp"
                    options={optionSort}
                    value={search.sortBy}
                    onChange={(e) => onSelectChange(e, "sortBy")}
                    allowClear
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="search__content__result">
          {listMovies.loading ? (
            <div className="loading">
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              {listMovies.data?.map((i: IMovie) => (
                <Col span={24} key={i.id}>
                  <MovieItem movie={i} navigate={navigate} />
                </Col>
              ))}
            </Row>
          )}

          <div className="search__content__result__pagination">
            <Pagination
              current={search.pageIndex}
              total={totalRecords}
              pageSize={search.pageSize}
              onChange={(e) => {
                setSearch((pre: any) => ({ ...pre, pageIndex: e }));
                setIsRefetch((pre) => !pre);
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
