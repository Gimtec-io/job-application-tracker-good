import { Box } from 'grommet';
import { AnchorLink } from '../../components/AnchorLink';
import { useQuery } from '../../hooks/useQuery';
import { Application } from '../../models/applications';
import { ApplicationsList } from './components/ApplicationsList';

export const Home = () => {
  const { data: applications, error, isLoading } = useQuery<Application[]>('/applications');
  
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
