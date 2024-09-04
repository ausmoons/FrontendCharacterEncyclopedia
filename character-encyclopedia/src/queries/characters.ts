import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetAllCharacters {
    allPeople {
      people {
        id
        name
        eyeColor
        gender
        hairColor
        height
        mass
        skinColor
        homeworld {
          name
        }
        species {
          name
        }
        filmConnection {
          films {
            title
          }
        }
      }
    }
  }
`;

export const GET_CHARACTER_DETAILS = gql`
query GetCharacters {
  characters {
    results {
      id
      name
      birthYear
      species {
        name
        classification
        designation
        averageHeight
        averageLifespan
      }
    }
  }
}
`;
