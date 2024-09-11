import { GetServerSideProps, NextPage } from 'next';
import CharacterList from '../components/character/CharacterList';
import { initializeApollo } from '../lib/useApollo';
import { GET_CHARACTERS } from '../queries/characters';
import ErrorMessage from '../components/ui/ErrorMessage';
import { handleError, logError } from '@utils/errorHandling';
import { ErrorDetails } from '@/interfaces/error';
import { Edge } from '@/interfaces/apollo';

interface HomeProps {
  error?: ErrorDetails;
}

const Home: NextPage<HomeProps> = ({ error }) => {
  return (
    <div data-testid="home-page">
      {error ? (
        <ErrorMessage type={error.type} message={error.message} />
      ) : (
        <CharacterList />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query({
      query: GET_CHARACTERS,
      variables: { first: 20 },
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        characters: data.allPeople.edges.map((edge: Edge) => edge.node),
      },
    };
  } catch (error) {
    const errorDetails = handleError(error);
    logError(errorDetails);

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        error: errorDetails,
      },
    };
  }
};

export default Home;
