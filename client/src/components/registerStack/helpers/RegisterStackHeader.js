import React, { Component } from 'react';
import { Header, Right, Left, Body, Icon, Title, Text, Button} from 'native-base';

export default class RegisterStackHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header style={{backgroundColor: '#428bca'}}>
        <Left>
          <Button transparent onPress={this.props.leftOnPress}>
            <Icon style={{color: 'white'}} name={this.props.leftIcon}/>
          </Button>
        </Left>
        <Body>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{ this.props.title }</Text>
        </Body>
        <Right />
      </Header>
    );
  }
}



