import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import CharacterList from '../components/pages/CharacterList';
import { initializeApollo } from '../lib/useApollo';
import { GET_CHARACTERS } from '../queries/characters';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Star Wars Character Encyclopedia</title>
                <meta name="description" content="Explore the Star Wars universe characters" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <CharacterList />
            </main>

            <footer className="text-center py-4 mt-8">
                <p>&copy; 2024 Star Wars Character Encyclopedia</p>
            </footer>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: GET_CHARACTERS,
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    };
};

export default Home;
