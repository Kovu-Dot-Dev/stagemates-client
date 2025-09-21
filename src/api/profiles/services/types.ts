export type Profile = {
  id: string;
  name: string;
  songs: string[];
  instruments: string[];
  genres: string[];
  background: string;
  availability: {
    days: string[];
    times: string[];
  };
}