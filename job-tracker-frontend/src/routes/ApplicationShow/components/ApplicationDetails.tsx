import { Anchor, Box, Button, Heading, Layer, Text } from 'grommet';
import { useState } from 'react';
import { Application, ApplicationStatus } from '../../../models';
import { ApplicationStatuSelector } from './ApplicationStatus';

type Props = {
  application: Application,
  handleChangeStatus: (newStatus: ApplicationStatus) => void,
}

export const ApplicationDetails = ({ application, handleChangeStatus }: Props) => {
  const [showDescription, setShowDescription] = useState(false);

  const closeDescriptionModal = () => setShowDescription(false);
  const openDescriptionModal = () => setShowDescription(true);
  
  return (
    <>
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
    </>
  );
};