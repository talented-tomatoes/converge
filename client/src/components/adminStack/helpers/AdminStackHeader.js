import React, { Component } from 'react';
import { Header, Right, Left, Body, Icon, Title, Button} from 'native-base';

export default class AdminStackHeader extends Component {

  constructor(props) {
    super(props);

    this.handleRightIconPress = this.handleRightIconPress.bind(this);
  }

  // need this to handle an icon press on the right button if admin needs to use that button for something other than navigation
  handleRightIconPress() {
    // handle navigation in the function passed into here
    if (!!this.props.rightAction) {
      this.props.rightAction();
    } else {
      // if no rightAction given, navigate as normal from rightNavigation prop
      this.props.navigation.navigate(this.props.rightNavigation || this.props.leftNavigation);
    }
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
              <Button transparent onPress={this.handleRightIconPress}>
                <Icon style={{color: 'white'}} name={this.props.rightIcon || 'close'}/>
            </Button>
            </Right>
          )
        }
      </Header>
    );
  }
}



