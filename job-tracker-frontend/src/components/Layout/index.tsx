import { Box, Heading } from 'grommet';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode,
}
export const Layout = ({ children }: Props) => {
  return (
    <Box align="center">
      <Box as="header" fill="horizontal" background="brand" align="center">
        <Box width="large">
          <Heading color="white" level="1">Job Tracker</Heading>
        </Box>
      </Box>
      <Box width="large" pad={ { top: 'medium' } }>
        { children }
      </Box>
    </Box>
  )
}