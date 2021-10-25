import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ApplicationNew } from './ApplicationNew';
import { ApplicationShow } from './ApplicationShow';
import { Home } from './Home';

export const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/applications/new" component={ ApplicationNew } />
        <Route exact path="/applications/:slug" component={ ApplicationShow } />
      </Switch>
    </Layout>
  </BrowserRouter>
)