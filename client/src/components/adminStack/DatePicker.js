import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
  }

  dateChange(date) {
    this.props.onChange(date);
    this.setState({
      date
    });
  }

  render() {
    return (
      <DatePicker
        showIcon={this.props.showIcon}
        style={{width: 200}}
        date={this.state.date}
        mode={this.props.mode || "date"}
        placeholder= {this.props.mode === 'time' ? "Select Time" : "Select Date"}
        format= {this.props.mode === 'time' ? "LT" : "YYYY-MM-DD"}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          },
          disabled: true,
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => { this.dateChange(date); }}
      />
    );
  }
}