import React from 'react';
import ReactDOM from 'react-dom';
// import GoogleLogin from 'react-google-login';
import { Button } from 'semantic-ui-react';


const responseGoogle = (response) => {
  console.log(response);
}

class Auth extends React.Component {

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  componentDidMount() {

  }
  render() {
    return (
      <div className="g-signin2" data-onsuccess="onSignIn">

      </div>
    )
  }
}


export default Auth;
        // <GoogleLogin
        //   clientId="640815180371-5smu5ma2tpqkbk7oj3kipt95qfpmqjsa.apps.googleusercontent.com"
        //   buttonText="Login"
        //   onSuccess={responseGoogle}
        //   onFailure={responseGoogle}
        // />