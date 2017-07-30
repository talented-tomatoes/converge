import React, { Component } from 'react';
import { Image } from 'react-native';
import convertDateTEnglish from '../adminStack/helpers/convertDateToEnglish';
import { Content, Card, CardItem, Left, Thumbnail, Body, Text } from 'native-base';

export default class ConferenceListEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var year = this.props.conference.start_date.slice(0, 4);
    return (
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail square source={{uri: this.props.conference.logo}} />
              <Body>
                <Text>{this.props.conference.name}</Text>
                <Text note>{`${convertDateTEnglish(this.props.conference.start_date)}, ${year} to ${convertDateTEnglish(this.props.conference.end_date)}, ${year}`}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: this.props.conference.banner}} style={{height: 200, flex: 1}}/>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

