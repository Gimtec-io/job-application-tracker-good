import { Box } from 'grommet';
import { useEffect } from 'react';
import { AnchorLink } from '../../components/AnchorLink';
import { useAPI } from '../../hooks/useQuery';
import { Application } from '../../models/applications';
import { ApplicationsList } from './components/ApplicationsList';

export const Home = () => {
  const [getApplications, { data: applications, error, isLoading }] = useAPI<Application[]>('/applications');

  useEffect(() => {
    getApplications();
  }, [getApplications]);
  
  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !applications) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box margin={ { bottom: 'medium' } }>
        <AnchorLink to="/applications/new" label="Create new application" />
      </Box>
      <ApplicationsList applications={ applications }/>
    </>
  );
}
