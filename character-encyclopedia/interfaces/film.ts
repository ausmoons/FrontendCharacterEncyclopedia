export interface FilmsListProps {
  films: Film[];
}

export interface Film {
  node: {
    id: string;
    title: string | null;
  } | null;
}
