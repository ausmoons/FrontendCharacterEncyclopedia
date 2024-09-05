import { gql } from '@apollo/client';

export const CHARACTER_FIELDS = gql`
  fragment CharacterFields on Person {
    id
    name
    species {
      name
    }
    homeworld {
      name
    }
    filmConnection {
      films {
        title
      }
    }
  }
`;

export const GET_CHARACTERS = gql`
  query GetAllCharacters {
    allPeople {
      people {
        ...CharacterFields
        eyeColor
        gender
        hairColor
        height
        mass
        skinColor
      }
    }
  }
  ${CHARACTER_FIELDS}
`;

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    person(id: $id) {
      ...CharacterFields
      birthYear
    }
  }
  ${CHARACTER_FIELDS}
`;