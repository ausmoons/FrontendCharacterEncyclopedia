import { GetServerSideProps, NextPage } from 'next';
import CharacterList from '../components/character/CharacterList';
import { initializeApollo } from '../lib/useApollo';
import { GET_CHARACTERS } from '../queries/characters';
import ErrorMessage from '../components/ui/ErrorMessage';
import { handleError, logError } from '@utils/errorHandling';
import { ErrorDetails } from '@/interfaces/error';

interface HomeProps {
  error?: ErrorDetails;
}

const Home: NextPage<HomeProps> = ({ error }) => {
  if (error) {
    return <ErrorMessage type={error.type} message={error.message} />;
  }

  return <CharacterList />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GET_CHARACTERS,
      variables: { first: 20 },
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
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
