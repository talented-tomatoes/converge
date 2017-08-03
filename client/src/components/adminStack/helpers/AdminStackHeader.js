import React, { Component } from 'react';
import { Header, Right, Left, Body, Icon, Title, Button} from 'native-base';
import { NavigationActions } from 'react-navigation'


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
  resetAction() {
    this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName: 'AdminLanding'}]});
  }

  render() {

    const resetAction2 = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'AdminLanding'})
      ]
    })

    return (
      <Header style={{backgroundColor: '#428bca'}}>
        <Left>
          <Button transparent onPress={() => {this.resetAction; this.props.navigation.navigate(this.props.leftNavigation);}}>
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



