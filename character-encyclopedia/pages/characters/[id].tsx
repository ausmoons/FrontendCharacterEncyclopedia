import { GetServerSideProps } from 'next';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '@lib/useApollo';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GET_CHARACTER_DETAILS } from '@queries/characters';
import Layout from '@components/layout/Layout';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import ErrorMessage from '@components/ui/ErrorMessage';
import Button from '@components/ui/Button';
import styles from '@styles/pages/CharacterDetails.module.scss';

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

            <div className={styles.container}>
                <h1 className={styles.title}>{person.name}</h1>

                <CharacterInfo person={person} />
                <FilmsList films={person.filmConnection?.edges || []} />

                <div className={styles.buttonContainer}>
                    <Button onClick={() => router.push('/')} size="large">
                        Back to Characters
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

const CharacterInfo = ({ person }: { person: any }) => (
    <div className={styles.infoContainer}>
        <p className={styles.infoText}>
            <span className={styles.infoLabel}>Birth Year:</span>{' '}
            {person.birthYear || 'Unknown'}
        </p>
        <p className={styles.infoText}>
            <span className={styles.infoLabel}>Species:</span>{' '}
            {person.species?.name || 'Unknown'}
        </p>
        <p className={styles.infoText}>
            <span className={styles.infoLabel}>Homeworld:</span>{' '}
            {person.homeworld?.name || 'Unknown'}
        </p>
    </div>
);

const FilmsList = ({ films }: { films: any[] }) => (
    <div className={styles.filmsList}>
        <h2 className={styles.filmsTitle}>Films:</h2>
        {films.length > 0 ? (
            <ul className={styles.filmItem}>
                {films.map((edge: any, index: number) => (
                    <li key={index}>
                        {edge.node?.title || 'Unknown Film'}
                    </li>
                ))}
            </ul>
        ) : (
            <p className={styles.infoText}>No films found for this character.</p>
        )}
    </div>
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
