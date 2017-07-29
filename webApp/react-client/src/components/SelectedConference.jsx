import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import config from '../../../../config/config';

const required = value => {
  return value ? undefined  : <p> Required </p>
};

const price = (value) => {
  return value && isNaN(Number(value))
         ? <p> Must be a Number </p>
         : undefined
};

const renderInput = ({ input: { onChange, ...restInput }, label, placeholder, meta: { touched, error, warning }}) => {
  console.log('label: ', label)
  return (
    <div>
      <label>
        {label}
      </label>
      <div>
        <Input {...input} placeholder={label} type={type} />
        {touched &&
          error &&
          <span style={{color: 'red'}}>
            {error}
          </span>}
      </div>
    </div>

  )
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <Form.Input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>
    // <div>
    //   <Form.Input label={label} placeholder={placeholder} onChange={onChange} {...restInput} placeholder={placeholder} />
    //     {touched &&
    //     error &&
    //     <span>
    //       {error}
    //     </span>}
    // </div>

class SelectedConference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props
    console.log('this.props in selectedConference: ', this.props);
    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <h2>{this.props.selectedConference.name}</h2>
          <Field name="name" validate={[required]} component={ renderField } label="Conference Name" placeholder="Conference Name" />
          <Field name="address" validate={[required]} component={ renderField } label="Address" placeholder="123 Main St. Anywhere, CA 94111" />
          <Field name="logo" validate={[required]} component={ renderField } label="Logo URL" placeholder="http://myCompanyLogo.jpg" />
          <Field name="ticket_price" validate={[required, price]} component={ renderField } label="Ticket Price" placeholder="$85.00" keyboardType="numeric" />
          <Field name="venue_map" validate={[required]} component={ renderField } label="Venue Map URL" placeholder="http://venueMap.jpg" />
          <Field name="banner" validate={[required]} component={ renderField } label="Banner URL" placeholder="http://banner.jpg" />
          <div>
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
            <Button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </Button>
          </div>
        </Form>


      </div>
    )
  }
}

const reduxFormConfig = {
  form: 'SelectedConference',
  fields: ['name', 'address', 'logo', 'ticket_price', 'venue_map', 'banner', 'details']
}

SelectedConference = reduxForm(reduxFormConfig)(SelectedConference)


SelectedConference = connect(
  state => ({
    selectedConference: state.conferenceReducer
  }))(SelectedConference)


export default SelectedConference;
