import { Anchor, Box, Button, Heading, Layer, Text } from 'grommet';
import { useState } from 'react';
import { useParams } from 'react-router';
import { AnchorLink } from '../../components/AnchorLink';
import { useQuery } from '../../hooks/useQuery';
import { Application, ApplicationStatus } from '../../models/applications';
import { sortNewestByCreatedAt } from '../../utils/sortByCreatedAt';
import { ApplicationStatuSelector } from './components/ApplicationStatus';
import { Comment } from './components/Comment';
import { NewApplicationComment } from './components/NewApplicationComment';

type Params = {
  slug: string;
};

export const ApplicationShow = () => {
  const [showDescription, setShowDescription] = useState(false);
  const { slug } = useParams<Params>();
  const { data: application, error, isLoading, refetch } = useQuery<Application>(`/applications/${slug}`);

  const closeDescriptionModal = () => setShowDescription(false);
  const openDescriptionModal = () => setShowDescription(true);

  // PENDING useMutation
  const handleChangeStatus = async (newStatus: ApplicationStatus) => {
    const response = await fetch(`http://localhost:8000/applications/${application!.id}`, {
      method: 'PATCH',
      headers: new Headers({
        'Content-type': 'application/json',
      }),
      body: JSON.stringify({
        ...application,
        status: newStatus,
      }),
    });
    if (response.ok) {
      refetch();
    }
  }

  // PENDING useMutation
  const createComment = async (content: string) => {
    if (application) {
      const response = await fetch('http://localhost:8000/comments', {
        method: 'POST',
        headers: new Headers({
          'Content-type': 'application/json',
        }),
        body: JSON.stringify({
          content,
          applicationId: application!.id,
        }),
      });
      if (response.ok) {
        refetch();
      }
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
        <Anchor href={ application.link } label="Link to application" target="_blank" />
        <Text>-</Text>
        <Button plain onClick={ openDescriptionModal }>Open description</Button>
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
