import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import dayjs from "dayjs";
import numeral from "numeral";
import React, { useContext, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { movieApi } from "../../apis/movieApi";
import { BASE_URL_API } from "../../utils";
import { DEFAULT_FORMAT_DATE } from "../../utils/constant";
import { IDataSync } from "../../utils/type";
import { ContextLocation } from "../../App";

interface IProps {
  episode: IDataSync;
  userScore: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  hookForm: UseFormReturn<
    {
      episodeId: number;
      comment: string;
    },
    any,
    undefined
  >;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  fetchEpisode: any;
}

const EpisodeDetail = (props: IProps) => {
  const {
    episode,
    userScore,
    setOpenModal,
    hookForm,
    setIsRefetch,
    fetchEpisode,
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
      episodeId: value.episodeId,
    };
    console.log(payload);
    try {
      const { data } = await movieApi.comment(payload);
      console.log(data);
      fetchEpisode(false);
      setLoading(false);
      hookForm.reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="episode-detail">
      <div className="episode-detail__header">
        <div className="episode-detail__header__left">
          <div className="episode-detail__header__left__name">
            {`S${episode.data?.season}E${episode.data?.ep}. ${episode.data?.name}`}
          </div>

          <div className="episode-detail__header__left__year">
            {episode.data?.releaseDate
              ? dayjs(episode.data.releaseDate).format("DD/MM/YYYY")
              : ""}{" "}
            | {episode.data?.duration} phút
          </div>
        </div>

        <div className="episode-detail__header__right">
          <div className="rating-imdb">
            <div className="rating-imdb__label">Đánh giá của IMDB</div>
            <div className="rating-imdb__value">
              <StarFilled className="rating-imdb__value__icon" />

              <div className="rating-imdb__value__content">
                <div className="rating-imdb__value__content__score">
                  {episode.data?.score ?? 0 > 0
                    ? episode.data?.score?.toFixed(1)
                    : ""}
                  /10
                </div>
                <div className="rating-imdb__value__content__number-vote">
                  {numeral(episode.data?.numberVote).format("0,")}
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

      <div className="episode-detail__content">
        <div className="episode-detail__content__asset">
          <img
            className="episode-detail__content__asset__image"
            src={episode.data?.image}
            alt="Ảnh"
          />
        </div>

        <div className="episode-detail__content__description">
          {episode.data?.description}
        </div>

        <div className="divider"></div>
      </div>

      <div className="episode-detail__footer">
        <Row gutter={[24, 12]}>
          <Col xs={24} md={12}>
            <div className="episode-detail__footer__comment">
              <div className="episode-detail__footer__comment__title">
                Bình luận
              </div>

              {isLogin ? (
                <div className="episode-detail__footer__comment__input">
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
                            className="form__input__input"
                          />
                        )}
                      />
                    </div>

                    <Button
                      className="episode-detail__footer__comment__input__btn"
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      Bình luận
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="episode-detail__footer__comment__note">
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

              <div className="episode-detail__footer__comment__content">
                {episode.data?.comments?.map((i: any) => (
                  <div key={i.id} className="item-comment">
                    <div className="item-comment__header">
                      <div className="item-comment__header__name">
                        {i.account.username}
                      </div>

                      <div className="item-comment__header__date">
                        {dayjs(i.date).format(DEFAULT_FORMAT_DATE)}
                      </div>
                    </div>

                    <div className="item-comment__content">{i.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EpisodeDetail;
