import { Box, Heading } from 'grommet';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode,
}
export const Layout = ({ children }: Props) => {
  return (
    <Box align="center">
      <Box as="header" fill="horizontal" background="brand">
        <Box width="large" pad="medium">
          <Heading color="white" level="1">Job Tracker</Heading>
        </Box>
      </Box>
      <Box width="large" pad="medium">
        { children }
      </Box>
    </Box>
  )
}