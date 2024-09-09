import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { initializeApollo } from '@lib/useApollo';
import { GET_CHARACTER_DETAILS } from '@queries/characters';
import Layout from '@components/layout/Layout';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import ErrorMessage from '@components/ui/ErrorMessage';
import Button from '@components/ui/Button';
import { CharacterInfo } from '@components/character/CharacterInfo';
import { FilmsList } from '@components/FilmsList';
import { useCharacterDetails } from '@hooks/useCharacterDetails';
import { handleError, logError } from '@utils/errorHandling';
import { CharacterDetailsData } from '@/types/character';
import styles from '@styles/pages/CharacterDetails.module.scss';
import { ErrorDetails } from '@/types/error';

interface CharacterDetailProps {
  error?: ErrorDetails;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  error: serverError,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error: clientError, person } = useCharacterDetails(id);

  const handleBackClick = useCallback(() => {
    router.push('/');
  }, [router]);

  const pageTitle = useMemo(
    () =>
      person
        ? `${person.name} - Star Wars Character Details`
        : 'Star Wars Character Details',
    [person]
  );

  const pageDescription = useMemo(
    () => `Details about ${person?.name || 'the character'}`,
    [person]
  );

  if (loading) return <LoadingSpinner />;

  if (serverError) {
    return (
      <ErrorMessage type={serverError.type} message={serverError.message} />
    );
  }

  if (clientError) {
    const errorDetails = handleError(clientError);
    return (
      <ErrorMessage type={errorDetails.type} message={errorDetails.message} />
    );
  }

  if (!person) {
    const errorDetails = handleError(new Error('NOT_FOUND'));
    return (
      <ErrorMessage type={errorDetails.type} message={errorDetails.message} />
    );
  }

  return (
    <Layout>
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
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  CharacterDetailProps
> = async (context) => {
  const apolloClient = initializeApollo();
  const { id } = context.params as { id: string };

  try {
    await apolloClient.query<CharacterDetailsData>({
      query: GET_CHARACTER_DETAILS,
      variables: { id },
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
        error: errorDetails,
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }
};

export default CharacterDetail;
