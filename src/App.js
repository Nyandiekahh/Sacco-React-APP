// src/App.js
import React, { useEffect } from 'react';
import Login from './components/Login';
import { auth } from './firebaseConfig';
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

function App() {
  useEffect(() => {
    const handleSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          console.log('Successfully signed in!');
        } catch (error) {
          console.error('Error signing in with email link', error);
        }
      }
    };

    handleSignIn();
  }, []);

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
