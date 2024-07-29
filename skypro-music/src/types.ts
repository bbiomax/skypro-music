export type tokenType = {
  refresh: string,
  access: string
}

export type userType = {
  _id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type trackType = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  staredUser: userType[];
  isFavorite?: boolean;
};
