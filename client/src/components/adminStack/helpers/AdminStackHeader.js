import React, { Component } from 'react';
import { Header, Right, Left, Body, Icon, Title, Button} from 'native-base';

export default class AdminStackHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header style={{backgroundColor: '#428bca'}}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate(this.props.leftNavigation)}>
            <Icon style={{color: 'white'}} name={this.props.leftIcon}/>
          </Button>
        </Left>
        <Body>
          <Title style={{color: 'white'}} >{this.props.title}</Title>
        </Body>
        {
          (this.props.rightIcon === null) ? (
            <Right />
          ) : (
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate(this.props.rightNavigation || this.props.navigation.navigate(this.props.leftNavigation))}>
                <Icon style={{color: 'white'}} name={this.props.rightIcon || 'close'}/>
              </Button>
            </Right>
          )
        }
      </Header>
    );
  }
}



