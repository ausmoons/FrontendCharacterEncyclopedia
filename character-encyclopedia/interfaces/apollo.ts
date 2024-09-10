export interface Edge {
  __typename: string;
  node: {
    __typename: string;
    id: string;
  };
}

export interface PageInfo {
  __typename: string;
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface AllPeopleConnection {
  __typename: string;
  edges: Edge[];
  pageInfo: PageInfo;
}
