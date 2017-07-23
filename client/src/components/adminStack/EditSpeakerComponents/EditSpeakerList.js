import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, Text} from 'native-base';
import EditSpeakerListEntry from './EditSpeakerListEntry';



export default class EditSpeakersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content>
        <List>
          {
            this.props.speakers.map((speaker, key) => {
              return (
                <TouchableOpacity
                  key={key} 
                  onPress={() => {
                    { console.log('CLICKING ON THE SPEAKER'); }
                  }}>
                  <EditSpeakerListEntry 
                    speaker={speaker}
                    />
                  </TouchableOpacity>
              );
            }) 
          } 
        </List>
      </Content>
    );
  }
}


