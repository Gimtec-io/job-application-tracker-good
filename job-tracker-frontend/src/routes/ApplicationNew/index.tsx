import { Heading } from 'grommet';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AnchorLink } from '../../components/AnchorLink';
import { useAPI } from '../../hooks/useQuery';
import { ApplicationForm, ApplicationFormState } from './components/ApplicationForm';

export const ApplicationNew = () => {
  const history = useHistory();
  const goToHome = useCallback(() => {
    history.push('/');
  }, [history]);
  const [createApplication, { isLoading }] = useAPI('/applications', { method: 'POST', onCompleted: goToHome })
  const handleSubtmit = (data: ApplicationFormState) => {
    createApplication(data);
  }
  return (
    <>
      <AnchorLink to="/" label="< Home" />
      <Heading level="2">New Application</Heading>
      <ApplicationForm onSubmit={ handleSubtmit } isLoading={ isLoading } />
    </>
  )
}
