import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      placeholderText: {
        color: 'grey',
        fontStyle: 'normal'
      }
    };
  }

  valueChange(value) {
    this.props.onChange(value);
    this.setState({
      value
    });
  }

  render() {
    if (this.props.datepickerRequire) {
      this.setState({
        fontStyle: 'italic',
        color: 'red'
      });
    }
    return (
      <DatePicker
        showIcon={this.props.showIcon}
        style={{width: 200}}
        date={this.props.value || this.state.value}
        mode={this.props.mode || 'date'}
        placeholder= {this.props.mode === 'time' ? (this.props.datepickerRequired ? 'Required' : 'Select Time') : (this.props.datepickerRequired ? 'Required' : 'Select Date')}
        format= {this.props.mode === 'time' ? 'LT' : 'YYYY-MM-DD'}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        disabled={this.props.disabled}
        
        customStyles={{
          placeholderText: this.props.datepickerRequired ? ({ color: 'red', fontStyle: 'italic' }) : this.state.placeholderText,
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