import { Box } from 'grommet';
import { useEffect, useState } from 'react';
import { ApplicationsList } from './components/ApplicationsList';

export const Home = () => {
  const [applications, setApplications] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/applications')
      .then((response) => response.json())
      .then((applicationsData) => {
        setApplications(applicationsData);
      });
  }, []);

  if (!applications) {
    return <div>Loading...</div>;
  }

  return (
    <Box margin={ { top: 'large' } }>
      <ApplicationsList applications={ applications }/>
    </Box>
  );
}
