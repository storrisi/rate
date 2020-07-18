// Import FirebaseAuth and firebase.
import React from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { firebaseApp } from '../../firebase'
import logo from '../../assets/images/logo.png'
import style from './Login.module.css'

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      forceSameDevice: false,
      requireDisplayName: true,
    },
  ],
  credentialHelper: 'none',
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}

const Login = () => {
  return (
    <div className={style.Login}>
      <img src={logo} className={style.Logo} alt="" />
      <h1 style={{ color: 'white' }}>ISCRIVITI PER ACCEDERE ALLA PROVA GRATUITA PER 14 GIORNI</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseApp.auth()} />
    </div>
  )
}

export default Login
