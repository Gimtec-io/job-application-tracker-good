import { Anchor, Box, Button, Heading, Layer, Text } from 'grommet';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AnchorLink } from '../../components/AnchorLink';
import { useAPI } from '../../hooks/useQuery';
import { Application, ApplicationStatus } from '../../models/applications';
import { sortNewestByCreatedAt } from '../../utils/sortNewestByCreatedAt';
import { ApplicationStatuSelector } from './components/ApplicationStatus';
import { Comment } from './components/Comment';
import { NewApplicationComment } from './components/NewApplicationComment';

type Params = {
  slug: string;
};

export const ApplicationShow = () => {
  const [showDescription, setShowDescription] = useState(false);
  const { slug } = useParams<Params>();
  const [getApplication, { data: application, error, isLoading }] = useAPI<Application>(`/applications/${slug}`);
  const [createCommentRequest] = useAPI('/comments', { method: 'POST', onCompleted: getApplication });
  const [updateApplication] = useAPI(`/applications/${application?.id}`, { method: 'PATCH', onCompleted: getApplication });

  const closeDescriptionModal = () => setShowDescription(false);
  const openDescriptionModal = () => setShowDescription(true);

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
      <Heading level="2">{ `${application.position} @ ${application.company}` }</Heading>
      <Text>
        { `Application sent ${new Date(application.createdAt).toLocaleDateString()}` }
      </Text>
      <Box margin={ { vertical: 'small' } } direction="row" gap="small">
        { application.link && <Anchor href={ application.link } label="Link to application" target="_blank" /> }
        { application.link && <Text>-</Text> }
        { application.description && <Button plain onClick={ openDescriptionModal }>Open description</Button> }
        {
          showDescription &&
          (
            <Layer onEsc={ closeDescriptionModal } onClickOutside={ closeDescriptionModal }>
              <Box margin="medium">
                <Heading level="3" margin={ { top: 'small' } }>Role Description</Heading>
                <Text>{ application.description }</Text>
                <Box align="end" fill="horizontal" margin={ { top: 'medium' } }>
                  <Button secondary onClick={ closeDescriptionModal }>Close</Button>
                </Box>
              </Box>
            </Layer>
          )
        }
      </Box>
      <ApplicationStatuSelector
        status={ application.status }
        onChangeStatus={ handleChangeStatus }
      />
      <Box>
        <Heading level="3">Comments</Heading>
        <NewApplicationComment onSubmit={ createComment } />
        <Box margin={ { top: 'medium' } }>
          {
            application.comments && application.comments.sort(sortNewestByCreatedAt).map((comment) => (
              <Comment key={ comment.id } comment={ comment } />
            ))
          }
        </Box>
      </Box>
    </>
  );
};
