import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import CharacterList from '../components/pages/CharacterList';
import { initializeApollo } from '../lib/useApollo';
import { GET_CHARACTERS } from '../queries/characters';
import Layout from '../components/UI/Layout';
import ErrorBoundary from '../components/UI/ErrorBoundary';
import ErrorMessage from '../components/UI/ErrorMessage';

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ErrorBoundary
          fallback={
            <ErrorMessage message={error || 'Failed to load characters.'} />
          }
        >
          {error ? <ErrorMessage message={error} /> : <CharacterList />}
        </ErrorBoundary>
      </main>
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
      error: errorMessage,
    },
  };
};

export default Home;
