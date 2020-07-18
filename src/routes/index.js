import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Contents from '../pages/Contents'
import Login from '../pages/Login'
import Expired from '../pages/Expired'

const Routes = ({ isSignedIn, isExpired, daysToTrialEnd, userEmail }) => {
  console.log(isSignedIn)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isSignedIn && !isExpired ? (
            <Redirect to="/contents" />
          ) : isSignedIn && isExpired ? (
            <Redirect to="/expired" />
          ) : (
            <Login />
          )}
        </Route>
        <Route exact path="/contents">
          {isSignedIn && !isExpired ? (
            <Contents daysToTrialEnd={daysToTrialEnd} userEmail={userEmail} />
          ) : isSignedIn && isExpired ? (
            <Redirect to="/expired" />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/expired">
          {isSignedIn && isExpired ? <Expired /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
