// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendSignInLinkToEmail,
} from 'firebase/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);
  const [error, setError] = useState('');

  const actionCodeSettings = {
    url: 'http://localhost:3000', // Update this to your production URL
    handleCodeInApp: true,
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      setError(`Google sign-in failed: ${error.message}`);
    }
  };

  // Handle Email Link Sign-In
  const handleSendLink = async (e) => {
    e.preventDefault();
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setEmailSent(true);
    } catch (error) {
      setError(`Error sending email link: ${error.message}`);
    }
  };

  // Handle Phone Number Sign-In
  const handlePhoneSignIn = async (e) => {
    e.preventDefault();

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('Recaptcha verified');
        },
      }, auth);
    }

    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setPhoneVerificationSent(true);
      console.log('SMS sent');
    } catch (error) {
      console.error('Error during phone sign-in:', error);
      setError(`Phone sign-in failed: ${error.message}`);
    }
  };

  // Verify the phone number with the code
  const verifyPhoneCode = async (e) => {
    e.preventDefault();
    try {
      const result = await window.confirmationResult.confirm(verificationCode);
      console.log('User signed in with phone:', result.user);
    } catch (error) {
      console.error('Error verifying code:', error);
      setError(`Verification failed: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h1>Sign in to Your App</h1>

      <button onClick={handleGoogleSignIn}>Sign in with Google</button>

      {!emailSent ? (
        <form onSubmit={handleSendLink}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Email Link</button>
        </form>
      ) : (
        <p>An email link has been sent to {email}. Please check your inbox to complete the sign-in process.</p>
      )}

      {!phoneVerificationSent ? (
        <form onSubmit={handlePhoneSignIn}>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="submit">Send Verification Code</button>
        </form>
      ) : (
        <form onSubmit={verifyPhoneCode}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verify Code</button>
        </form>
      )}

      <div id="recaptcha-container"></div>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
