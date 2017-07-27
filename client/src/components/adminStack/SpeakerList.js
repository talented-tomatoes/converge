import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, Text} from 'native-base';
import SpeakerListEntry from './SpeakerListEntry';



export default class AddSpeakersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('RENDERING THE EDITSPEAKRLIST ', this.props);
    return (
      <Content>
        <List>
          {
            this.props.speakers.map((speaker, key) => {
              return (
                <SpeakerListEntry 
                  key={key}
                  speaker={speaker}
                  navigation={this.props.navigation}
                  />
              );
            }) 
          } 
        </List>
      </Content>
    );
  }
}