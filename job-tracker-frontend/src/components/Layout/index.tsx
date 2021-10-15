import { Box, Heading } from 'grommet';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { brandColor } from '../../styles/constants';

const Header = styled.header`
  width: 100%;
  background-color: ${brandColor};
`;

const Container = styled.div`
  width: 75%;
  margin: 0 auto;
`;

type Props = {
  children: ReactNode,
}
export const Layout = ({ children }: Props) => {
  return (
    <Box fill>
      <Header>
        <Container>
          <Heading color="white" level="1">Job Tracker</Heading>
        </Container>
      </Header>
      <Container>
        { children }
      </Container>
    </Box>
  )
}