import { gql } from '@apollo/client';

export const CHARACTER_FIELDS = gql`
  fragment CharacterFields on Person {
    id
    name
    birthYear
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
      edges {
        node {
          title
        }
      }
    }
  }
`;

export const GET_CHARACTERS = gql`
  query GetAllCharacters($first: Int, $after: String) {
    allPeople(first: $first, after: $after) {
      edges {
        node {
          ...CharacterFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${CHARACTER_FIELDS}
`;

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    person(id: $id) {
      ...CharacterFields
    }
  }
  ${CHARACTER_FIELDS}
`;
