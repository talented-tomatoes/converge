import React from 'react';
import ReactDOM from 'react-dom';
import MyEvents from './components/MyEvents.jsx';
import EditSpeaker from './components/EditSpeaker.jsx';
import Speakers from './components/Speakers.jsx';
import Presentations from './components/Presentations.jsx';
import EditProfile from './components/EditProfile.jsx';
import EditPresentation from './components/EditPresentation.jsx';
import EditConference from './components/EditConference.jsx';
import EventMenu from './components/EventMenu.jsx';
import Main from './components/Main.jsx';
import Auth from './components/Auth.jsx';
import { Grid } from 'semantic-ui-react';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

const App = (
  <Provider store={store} >
    <Router history={history}>
      {/*<Route path='/' component={Auth} />*/}
      <Route path='/' component={Main}>
        <IndexRoute component={MyEvents} />
        <Route path='/MyEvents' component={MyEvents} />
        <Route path='/EditConference' component={EditConference} />
        <Route path='/Presentations' component={Presentations} />
        <Route path='/Speakers' component={Speakers} />
        <Route path='/EditSpeaker' component={EditSpeaker} />
        <Route path='/EditProfile' component={EditProfile} />
        <Route path='/EditPresentation' component={EditPresentation} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(App, document.getElementById('app'));