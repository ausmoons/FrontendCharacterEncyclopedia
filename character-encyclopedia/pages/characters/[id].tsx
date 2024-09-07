import { GetServerSideProps } from 'next';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../../lib/useApollo';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GET_CHARACTER_DETAILS } from '../../queries/characters';
import Layout from '../../components/UI/Layout';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';

const CharacterDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  if (!data || !data.person) {
    return <ErrorMessage message="No character data found" />;
  }

  const { person } = data;

  return (
    <Layout>
      <Head>
        <title>
          {person.name
            ? `${person.name} - Star Wars Character Details`
            : 'Star Wars Character Details'}
        </title>
        <meta
          name="description"
          content={`Details about ${person.name || 'the character'}`}
        />
      </Head>

      <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-12">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          {person.name}
        </h1>

        <CharacterInfo person={person} />
        <FilmsList films={person.filmConnection?.edges || []} />

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
          >
            Back to Characters
          </button>
        </div>
      </div>
    </Layout>
  );
};

const CharacterInfo = ({ person }: { person: any }) => (
  <div className="space-y-4">
    <p className="text-lg">
      <span className="font-semibold text-gray-300">Birth Year:</span>{' '}
      {person.birthYear || 'Unknown'}
    </p>
    <p className="text-lg">
      <span className="font-semibold text-gray-300">Species:</span>{' '}
      {person.species?.name || 'Unknown'}
    </p>
    <p className="text-lg">
      <span className="font-semibold text-gray-300">Homeworld:</span>{' '}
      {person.homeworld?.name || 'Unknown'}
    </p>
  </div>
);

const FilmsList = ({ films }: { films: any[] }) => (
  <>
    <h2 className="mt-8 text-xl font-semibold text-white">Films:</h2>
    {films.length > 0 ? (
      <ul className="mt-4 space-y-2 list-disc list-inside">
        {films.map((edge: any, index: number) => (
          <li key={index} className="text-gray-300">
            {edge.node?.title || 'Unknown Film'}
          </li>
        ))}
      </ul>
    ) : (
      <p className="mt-4 text-gray-300">No films found for this character.</p>
    )}
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const { id } = context.params!;

  try {
    await apolloClient.query({
      query: GET_CHARACTER_DETAILS,
      variables: { id },
    });
  } catch (error) {
    console.error('Error fetching character details:', error);
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default CharacterDetail;
