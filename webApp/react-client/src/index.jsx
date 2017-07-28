import React from 'react';
import ReactDOM from 'react-dom';
import MyEvents from './components/MyEvents.jsx';
import ConferenceDetails from './components/ConferenceDetails.jsx';
import Speakers from './components/Speakers.jsx';
import Presentations from './components/Presentations.jsx';
import EditProfile from './components/EditProfile.jsx';
import SelectedConference from './components/SelectedConference.jsx';
import Main from './components/Main.jsx';
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
      <Route path='/' component={Main}>
        <IndexRoute component={MyEvents} />
        <Route path='/MyEvents' component={MyEvents} />
          <Route path='/SelectedConference' component={SelectedConference} />


        <Route path='/Speakers' component={Speakers} />
        <Route path='/Presentations' component={Presentations} />
        <Route path='/ConferenceDetails' component={ConferenceDetails} />
        <Route path='/EditProfile' component={EditProfile} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(App, document.getElementById('app'));