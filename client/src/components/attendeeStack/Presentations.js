import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Drawer, Content, Header, Container, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text, Card, CardItem } from 'native-base';
import AttendeeFooter from './AttendeeFooter.js';
import SideBar from './Sidebar';

class Presentations extends Component {
  static navigationOptions = {

  };
  constructor(props) {
    super(props);
    this.state = {
      presentations: []
    }
  }

  closeDrawer() {
    this.drawer._root.close()
  }

  openDrawer() {
    this.drawer._root.open()
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/api/presentations/${this.props.conference.id}`)
      .then(response => {
        console.log(response);
        this.setState({
          presentations: response.data
        })
      })
  }

  render() {

    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <Header>
          <Left>
            <Button dark transparent onPress={() => {this.openDrawer()}}>
              <Icon ios='md-menu' android="md-menu"/>
            </Button>
          </Left>
          <Body>
            <Title>Presentations</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {
            this.state.presentations.map(presentation => 

                <Card>
                  <CardItem header>
                    <Text>{presentation.name}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {presentation.description}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                    <Text>{presentation.date} at {presentation.time}</Text>
                  </CardItem>
                </Card>

            )
          }
        </Content>
        <AttendeeFooter navigation={this.props.navigation}></AttendeeFooter>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conference: state.attendeeReducer
  }
}

export default connect(mapStateToProps)(Presentations);