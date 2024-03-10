import { StarFilled } from "@ant-design/icons";
import { Select } from "antd";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDataSync, IEpisode } from "../../utils/type";

interface IProps {
  movie: IDataSync;
}

const ListEpisodes = (props: IProps) => {
  const { movie } = props;
  const navigate = useNavigate();

  const [listEpisodes, setListEpisodes] = useState<IEpisode[]>([]);
  const [season, setSeason] = useState(1);

  useEffect(() => {
    handleChangeSeason(season);
  }, [season]);

  const handleChangeSeason = (season: number) => {
    setListEpisodes(
      movie?.data?.episodes?.filter((i: any) => i.season === season) ?? []
    );
  };

  return (
    <div className="list-episodes">
      <div className="list-episodes__season">
        <Select
          className="list-episodes__season__select"
          options={Array(movie?.data?.numberSeason)
            .fill(0)
            .map((i, index) => ({
              label: `Mùa ${index + 1}`,
              value: index + 1,
            }))}
          value={season}
          onChange={(e) => setSeason(e)}
        />

        {listEpisodes?.map((i) => (
          <div
            key={i.id}
            className="episode-item"
            onClick={() =>
              navigate(`/episode?episodeId=${i.id}&movieId=${movie?.data?.id}`)
            }
          >
            <img className="episode-item__image" src={i.image} alt="Ảnh" />

            <div className="episode-item__detail">
              <div className="episode-item__detail__name">
                {`S${i.season}E${i.ep}. ${i.name}`}
              </div>

              <div className="episode-item__detail__score">
                <StarFilled />
                {i.numberVote > 0 ? i.score?.toFixed(1) : ""}/10
              </div>

              <div className="episode-item__detail__description">
                {i.description}
              </div>

              <div className="episode-item__detail__number-vote">
                Số lượt đánh giá: {numeral(i.numberVote).format("0,")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListEpisodes;
