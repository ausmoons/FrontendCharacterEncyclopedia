import React, { useCallback } from 'react';
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
import { ErrorDetails } from '@/interfaces/error';

const CharacterDetail: React.FC<{
  error?: ErrorDetails;
  notFound?: boolean;
}> = ({ error, notFound }) => {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : null;

  const { loading, person } = useCharacterDetails(id);

  const handleBackClick = useCallback(() => {
    router.push('/');
  }, [router]);

  if (loading) return <LoadingSpinner data-testid="loading-spinner" />;
  if (!person) return <div>Character not found</div>;

  if (error) {
    return <ErrorMessage type={error.type} message={error.message} />;
  }

  if (notFound) {
    return (
      <ErrorMessage
        type="NOT_FOUND"
        message="No character data found"
        data-testid="not-found-message"
      />
    );
  }

  const characterName = person?.name || 'Character';
  const filmsList = person?.filmConnection?.edges || [];

  return (
    <div data-testid="character-detail-page">
      <Head>
        <title>{characterName} - Star Wars Character Details</title>
        <meta name="description" content={`Details about ${characterName}`} />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title} data-testid="character-name">
          {characterName}
        </h1>

        {person && (
          <CharacterInfo person={person} data-testid="character-info" />
        )}

        <FilmsList films={filmsList} />

        <div className={styles.buttonContainer}>
          <Button
            onClick={handleBackClick}
            size="large"
            data-testid="back-button"
          >
            Back to Characters
          </Button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const { id } = context.params as { id: string };

  if (!id) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  try {
    const { data } = await apolloClient.query<CharacterInfoProps>({
      query: GET_CHARACTER_DETAILS,
      variables: { id },
    });

    if (!data.person) {
      console.log('No character found for ID:', id);
      return {
        props: {
          notFound: true,
        },
      };
    }

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } catch (error) {
    console.error('Error fetching character details:', error);
    return {
      props: {
        error: handleError(error),
      },
    };
  }
};

export default CharacterDetail;
