import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'semantic-ui-react';

import { Link } from 'react-router';



class Main extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   currentScreen: 'MyEvents'
    // }
  }

  render () {
    // let selectedScreen;
    // if (this.state.currentScreen === 'MyEvents') {
    //   selectedScreen = <MyEvents />
    // } else if (this.state.currentScreen === 'ConferenceDetails') {
    //   selectedScreen = <ConferenceDetails />
    // } else if (this.state.currentScreen === 'Speakers') {
    //   selectedScreen = <Speakers />
    // } else if (this.state.currentScreen === 'Presentations') {
    //   selectedScreen = <Presentations />
    // } else if (this.state.currentScreen === 'EditProfile') {
    //   selectedScreen = <EditProfile />
    // }
    console.log('this.props in main: ', this.props);
    return (
        <Grid>
          <Grid.Row />
          <Grid.Row>
            <Grid.Column width={2}>
              <p>My Events</p>
              <Link to="/Speakers">
              <p onClick={() => this.setState({currentScreen: 'Speakers'})}>Speakers</p>
              </Link>
              <p onClick={() => this.setState({currentScreen: 'Presentations'})}>Presentations</p>
              <p onClick={() => this.setState({currentScreen: 'ConferenceDetails'})}>Conference Details</p>
              <p onClick={() => this.setState({currentScreen: 'EditProfile'})}>Edit Profile</p>
            </Grid.Column>
            <Grid.Column width={13}>
              <Grid.Row>
                <h1>Converge</h1>
              </Grid.Row>
              <Grid.Row>
                {this.props.children}
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={1}/>

          </Grid.Row>
        </Grid>
    )
  }
}

export default Main;
