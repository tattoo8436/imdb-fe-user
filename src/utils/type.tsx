export interface IAccountLogin {
  username: string;
  password: string;
}

export interface IAccountRegister {
  username: string;
  password: string;
  email: string;
}

export interface IAccount {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface ISearchMovie {
  pageIndex: number;
  pageSize: number;
  name: string;
  type: number | null;
  genreId: number | null;
  score: number | null;
  releaseDate: number | string | null;
  language: string | null;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IMovie {
  id: number | null;
  name: string;
  description: string;
  image: any[] | any;
  trailer: string;
  releaseDate: any;
  duration: string;
  type: number | null;
  ended: boolean;
  endYear: number;
  numberSeason: number;
  numberVote: number;
  score: number;
  language: string;
  movieGenres: any[];
  movieActors: any[];
  movieDirectors: any[];
  comments: any[];
  ratings: any[];
  episodes: IEpisode[];
}

export interface IEpisode {
  id: number | null;
  ep: number;
  season: number;
  name: string;
  description: string;
  image: any;
  releaseDate: any;
  duration: string;
  numberVote: number;
  score: number;
  movieActorIds?: number[];
  movieActorEpisodes?: any[];
  comments?: any[];
}

export interface IActor {
  id: number | null;
  name: string;
  description: string;
  image: string;
  dob: string;
}

export interface IDirector {
  id: number | null;
  name: string;
  description: string;
  image: string;
  dob: string;
}

export interface IDataSync {
  loading: boolean;
  data: any;
  error: any;
}
