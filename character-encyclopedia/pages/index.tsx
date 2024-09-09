import { GetServerSideProps, NextPage } from 'next';
import CharacterList from '../components/character/CharacterList';
import { initializeApollo } from '../lib/useApollo';
import { GET_CHARACTERS } from '../queries/characters';
import Layout from '../components/layout/Layout';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import ErrorMessage from '../components/ui/ErrorMessage';
import { handleError, logError } from '@utils/errorHandling';
import { ErrorDetails } from '@/types/error';

interface HomeProps {
  error?: ErrorDetails;
}

const Home: NextPage<HomeProps> = ({ error }) => {
  return (
    <Layout>
      {error ? (
        <ErrorMessage type={error.type} message={error.message} />
      ) : (
        <ErrorBoundary
          fallback={(error) => {
            const errorDetails = handleError(error);
            return (
              <ErrorMessage
                type={errorDetails.type}
                message={errorDetails.message}
              />
            );
          }}
        >
          <CharacterList />
        </ErrorBoundary>
      )}
    </Layout>
  );
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
