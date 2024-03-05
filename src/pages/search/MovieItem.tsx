import { StarFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import numeral from "numeral";
import ImageDefault from "../../utils/constant";
import { IMovie } from "../../utils/type";

interface IProps {
  movie: IMovie;
  navigate: any;
}

const MovieItem = (props: IProps) => {
  const { movie, navigate } = props;

  return (
    <div
      className="movie-item card-hover"
      onClick={() => navigate(`/movie?movieId=${movie.id}`)}
    >
      <img
        className="movie-item__image"
        src={movie.image ?? ImageDefault}
        alt="Ảnh"
      />

      <div className="movie-item__detail">
        <div className="movie-item__detail__name">
          {movie.name}{" "}
          {movie.releaseDate
            ? `(${dayjs(movie.releaseDate).format("YYYY")})`
            : ""}
        </div>

        <div className="movie-item__detail__duration">
          {movie.duration} phút |{" "}
          {movie.movieGenres?.map((i) => i.genre?.name).join(", ")}
        </div>

        <div className="movie-item__detail__score">
          <StarFilled />
          {movie.numberVote > 0 ? movie.score?.toFixed(1) : ""}/10
        </div>

        <div className="movie-item__detail__description">
          {movie.description}
        </div>

        <div className="movie-item__detail__number-vote">
          Số lượt đánh giá: {numeral(movie.numberVote).format("0,")}
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
