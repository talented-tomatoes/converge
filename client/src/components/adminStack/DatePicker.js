import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  valueChange(value) {
    this.props.onChange(value);
    this.setState({
      value
    });
  }

  render() {
    return (
      <DatePicker
        showIcon={this.props.showIcon}
        style={{width: 200}}
        date={this.props.value || this.state.value}
        mode={this.props.mode || 'date'}
        placeholder= {this.props.mode === 'time' ? 'Select Time' : 'Select Date'}
        format= {this.props.mode === 'time' ? 'LT' : 'YYYY-MM-DD'}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        disabled={this.props.disabled}
        
        customStyles={{
          disabled: this.props.disabled,
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(value) => { this.valueChange(value); }}
      />
    );
  }
}