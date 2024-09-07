import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import CharacterList from '../components/character/CharacterList';
import { initializeApollo } from '../lib/useApollo';
import { GET_CHARACTERS } from '../queries/characters';
import Layout from '../components/layout/Layout';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import ErrorMessage from '../components/ui/ErrorMessage';

interface HomeProps {
  error?: string;
}

const Home: NextPage<HomeProps> = ({ error }) => {
  return (
    <Layout>
      <Head>
        <title>Star Wars Character Encyclopedia</title>
        <meta
          name="description"
          content="Explore the Star Wars universe characters"
        />
      </Head>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ErrorBoundary
          fallback={(error) => (
            <ErrorMessage
              message={error.message || 'Failed to load characters.'}
            />
          )}
        >
          <CharacterList />
        </ErrorBoundary>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  let errorMessage = '';

  try {
    await apolloClient.query({
      query: GET_CHARACTERS,
      variables: { first: 20 },
    });
  } catch (error) {
    console.error('Error fetching characters:', error);
    errorMessage = 'Error fetching characters. Please try again later.';
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      error: errorMessage || null,
    },
  };
};

export default Home;
