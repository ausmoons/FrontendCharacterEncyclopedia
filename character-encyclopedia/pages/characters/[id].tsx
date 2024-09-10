import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '@lib/useApollo';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GET_CHARACTER_DETAILS } from '@queries/characters';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import ErrorMessage from '@components/ui/ErrorMessage';
import Button from '@components/ui/Button';
import { CharacterInfoProps } from '@/interfaces/character';
import styles from '@styles/pages/CharacterDetails.module.scss';
import { useCharacterDetails } from '@hooks/useCharacterDetails';
import CharacterInfo from '@components/character/CharacterInfo';
import { FilmsList } from '@components/FilmsList';
import { handleError } from '@utils/errorHandling';

const CharacterDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, person } = useCharacterDetails(id);

  const handleBackClick = useCallback(() => {
    router.push('/');
  }, [router]);

  const pageTitle = useMemo(
    () => `${person?.name || 'Character'} - Star Wars Character Details`,
    [person]
  );

  const pageDescription = useMemo(
    () => `Details about ${person?.name || 'the character'}`,
    [person]
  );

  if (loading) return <LoadingSpinner />;

  if (error) {
    const errorDetails = handleError(error);
    return (
      <ErrorMessage type={errorDetails.type} message={errorDetails.message} />
    );
  }

  if (!person) {
    return <ErrorMessage type="NOT_FOUND" message="No character data found" />;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>{person.name}</h1>

        <CharacterInfo person={person} />
        <FilmsList films={person.filmConnection?.edges || []} />

        <div className={styles.buttonContainer}>
          <Button onClick={handleBackClick} size="large">
            Back to Characters
          </Button>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const { id } = context.params as { id: string };

  try {
    await apolloClient.query<CharacterInfoProps>({
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
