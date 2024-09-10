import { Film } from '@/interfaces/film';

export interface Species {
  name: string;
}

export interface Homeworld {
  name: string | null;
}

export interface Person {
  id: string;
  name: string | null;
  birthYear: string | null;
  species: Species | null;
  homeworld: Homeworld | null;
  filmConnection: {
    edges: Film[] | null;
  } | null;
}

export interface Character {
  id: string;
  name: string;
  gender: string;
  species: Species | null;
  birthYear: string;
  eyeColor: string;
  hairColor: string;
  height: number | null;
}

export interface CharacterCardProps {
  character: Character;
}

export interface CharacterInfoProps {
  person?: Person;
}
