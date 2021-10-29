import { Box, Heading } from 'grommet';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { AnchorLink } from '../../components/AnchorLink';
import { useAPI } from '../../hooks/useQuery';
import { Application, ApplicationStatus } from '../../models';
import { ApplicationDetails } from './components/ApplicationDetails';
import { CommentsList } from './components/CommentsList';
import { CommentNew } from './components/CommentNew';

type Params = {
  slug: string;
};

export const ApplicationShow = () => {
  const { slug } = useParams<Params>();
  const [getApplication, { data: application, error, isLoading }] = useAPI<Application>(`/applications/${slug}`);
  const [createCommentRequest] = useAPI('/comments', { method: 'POST', onCompleted: getApplication });
  const [updateApplication] = useAPI(`/applications/${application?.id}`, { method: 'PATCH', onCompleted: getApplication });

  useEffect(() => {
    getApplication();
  }, [getApplication]);

  const handleChangeStatus = async (newStatus: ApplicationStatus) => {
    updateApplication({
      ...application,
      status: newStatus,
    });
  }

  const createComment = async (content: string) => {
    if (application) {
      createCommentRequest({
        content,
        applicationId: application!.id,
      });
    }
  }

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !application) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AnchorLink to="/" label="< Home" />
      <ApplicationDetails application={ application } handleChangeStatus={ handleChangeStatus } />
      <Box>
        <Heading level="3">Comments</Heading>
        <CommentNew onSubmit={ createComment } />
        <CommentsList comments={ application.comments || [] } />
      </Box>
    </>
  );
};
