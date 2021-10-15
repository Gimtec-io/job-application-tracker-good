import { Grommet } from 'grommet';
import { Routes } from './routes';
import { brandColor } from './styles/constants';

const theme = {
  global: {
   colors: {
     brand: brandColor,
   },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

export const App = () => (
  <Grommet theme={ theme } full>
    <Routes />
  </Grommet>
)
