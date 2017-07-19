import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Input, Label, Item, Content, Separator, Text } from 'native-base';
import ImagePicker from 'react-native-image-picker';



import { Field, reduxForm } from 'redux-form';

const submit = values => {
  console.log('submitting form', values);
}

const renderInput = ({ input: { onChange, ...restInput }, label, keyboardType, normalize}) => {
  console.log('label: ', label)
  return (
    <Item inlineLabel>
      <Label>{label}</Label>
      <Input keyboardType={keyboardType} onChangeText={onChange} {...restInput} normalize={normalize} />
    </Item>
  )
}

const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-'
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
  }
  return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
}

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAttendee: true,
      avatarSource: ''
    }
  }

  takePicture() {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source
        }, () => console.log('state set for image'));

        // let url = 'https://api.cloudinary.com/v1_1/' + 'awchang56' + '/image/upload';

        // let header = {
        //     method: 'post',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //    }
        // };

        // let timestamp = Date.now();

        // var values = {
        //   file: 'data:image/png;base64,' + response.data,
        //   api_key: api_key,
        //   timestamp: timestamp,
        //   tags: tags,
        //   signature: sha1("tags=" + tags + "&timestamp=" + timestamp + api_secret)
        // };
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Content>
        <Field name="linkedIn" component={ renderInput } label="LinkedIn URL:" />
        <Field name="phoneNumber" component={ renderInput } label="Phone Number:" keyboardType="phone-pad" normalize={normalizePhone} />
        <Separator bordered>
          <Text style={{alignSelf: 'center'}} note>Attach a profile picture</Text>
        </Separator>
        <Item style={{margin: 5, alignSelf: 'center'}}>
          <TouchableOpacity light onPress={() => this.takePicture()}>
            <Image source={this.state.avatarSource ? this.state.avatarSource : require('../../../../assets/AvatarPlaceHolder.png')} style={{width: 100, height: 100}}></Image>
          </TouchableOpacity>
        </Item>
        <TouchableOpacity onPress={handleSubmit(submit)}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </Content>
    )
  }
}

export default reduxForm({
  form: 'finishProfile'
})(ProfileForm)

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250
  },
  container: {

  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  }
})
