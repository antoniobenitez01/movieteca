export enum OriginalLanguage {
    En = "en",
    Pt = "pt",
    Zh = "zh",
}

export interface Genre {
  id:   number;
  name: string;
}

export interface Movie {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: OriginalLanguage;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;

    genres:            Genre[];
}


export interface TmdbResponse {
  page:          number;
  results:       Movie[];
  total_pages:   number;
  total_results: number;
}

export interface FavouriteResponse {
  ok:      boolean;
  message: string | null;
  data:    any;
}
