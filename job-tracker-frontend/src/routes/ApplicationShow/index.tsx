import { Anchor, Box, Button, Heading, Layer, Text } from 'grommet';
import { useState } from 'react';
import { ApplicationStatus } from '../../components/ApplicationStatus';
import { NewApplicationComment } from '../../components/NewApplicationComment';

const application = {
  id: '01',
  company: 'Google',
  position: 'Rockstar developer',
  applicationDate: '2021-10-15T06:10:18.150Z',
  description: 'DO whatever you want and we pay.',
  link: 'https://www.gimtec.io/',
  status: {
    id: '13',
    content: 'Offer'
  },
  // Should already come sorted from backend, newest first
  comments: [
    { createdAt: '2021-10-12T06:10:18.150Z', content: 'Amazing offer, that was easy', id: '12' },
    { createdAt: '2021-10-10T06:10:18.150Z', content: 'Onsite interview was easy', id: '11' },
    { createdAt: '2021-10-05T06:10:18.150Z', content: 'Technical phone call was fast and sweet', id: '10' },
  ]
}

export const ApplicationShow = () => {
  const [showDescription, setShowDescription] = useState(false);
  const closeDescriptionModal = () => setShowDescription(false);
  const openDescriptionModal = () => setShowDescription(true);
  return (
    <>
      <Heading level="2">{ `${application.position} @ ${application.company}` }</Heading>
      <Text>
        { `Application sent ${new Date(application.applicationDate).toLocaleDateString()}` }
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
      <ApplicationStatus />
      <Box>
        <Heading level="3">Comments</Heading>
        <NewApplicationComment />
        <Box margin={ { top: 'medium' } }>
          {
            application.comments.map((comment) => (
              <Box key={ comment.id } margin="small">
                <Text>
                  { comment.content }
                </Text>
                <Text size="small">
                  { new Date(comment.createdAt).toLocaleDateString() }
                </Text>
              </Box>
            ))
          }
        </Box>
      </Box>
    </>
  );
};
