import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, Text} from 'native-base';
import EditSpeakerListEntry from './EditSpeakerListEntry';



export default class EditSpeakersList extends Component {
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
                <EditSpeakerListEntry 
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


