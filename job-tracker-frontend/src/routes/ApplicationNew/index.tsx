import { Heading } from 'grommet';
import { AnchorLink } from '../../components/AnchorLink';
import { ApplicationForm, ApplicationFormState } from './components/ApplicationForm';

export const ApplicationNew = () => {
  const handleSubtmit = (data: ApplicationFormState) => {
    fetch('http://localhost:8000/applications', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('creaed');
      })
  }
  return (
    <>
      <AnchorLink to="/" label="< Home" />
      <Heading level="2">New Application</Heading>
      <ApplicationForm onSubmit={ handleSubtmit } />
    </>
  )
}
