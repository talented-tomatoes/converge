import React, { Component } from 'react';
import { Header, Right, Left, Body, Icon, Title, Button} from 'native-base';

export default class AttendeeStackHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header style={{backgroundColor: '#428bca'}}>
        <Left>
          <Button transparent onPress={() => {this.props.leftNavigation}}>
            <Icon style={{color: 'white'}} name={this.props.leftIcon}/>
          </Button>
        </Left>
        <Body>
          <Title style={{color: 'white'}} >{this.props.title}</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => this.props.navigation.navigate(this.props.rightNavigation)}>
            <Icon style={{color: 'white'}} name={this.props.rightIcon}/>
          </Button>
        </Right>
      </Header>
    );
  }
}



