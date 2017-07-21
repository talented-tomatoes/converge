import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, Text} from 'native-base';
import EventsListEntry from './EventsListEntry.js';

import {connect} from 'react-redux';



class EventsList extends Component {
  // static navigationOptions = ({ navigation }) => {

  // };
  constructor(props) {
    super(props);

    this.state = {
      events: this.props.data || [],
      isDataFetched: false
    };

  }


  handleClick() {
    this.props.navigation.navigate('DateTabs');
  }

  // componentDidMount() {

  // }

  componentWillReceiveProps(nextprops) {

    console.log('nextprops ', nextprops);
    if (nextprops.data && !this.state.isDataFetched) {
      this.setState({
        events: nextprops.data,
        isDataFetched: true
      }, () => console.log('nextProps state set'))
    }
    // console.log('componentDidMount.. props=', this.props.data);
    // this.props.subscribe(() => {
    //   this.setState({
    //     events: this.props.getState().data
    //   }, function() {
    //     console.log('events', this.state.events);
    //   });
    // });
   // this.props.getState();
  }

  // componentWillUnmount() {
  //   this.setState({
  //     isDataFetched: false
  //   });
  // }



  render() {
    console.log('this.props in eventsList: ', this.state.events);
    return (
      <Content>
         <List> 
              { console.log('proppps', this.props.data)}   

                 { this.state.events.map(event => {
              return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DateTabs')}>
                <EventsListEntry 
                  eventData={event}
                  />
              </TouchableOpacity>
              );
            })    }    

          </List>
        </Content>
    );
  }
}

// REDUX THINGS
const mapStateToProps = (state) => {
  console.log('state.adminReducer: ', state.adminReducer);
  return {
    data: state.adminReducer.data
  };
};

export default connect(mapStateToProps)(EventsList);