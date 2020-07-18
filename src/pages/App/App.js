import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'

import Routes from '../../routes'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [daysToTrialEnd, setDaysToTrialEnd] = useState(0)
  const [userEmail, setUserEmail] = useState(null)
  const [user, loading] = useAuthState(firebase.auth())

  useEffect(() => {
    if (!loading && user) {
      setIsSignedIn(true)
      setUserEmail(user.email)

      const diffTime = Math.abs(new Date() - new Date(user.metadata.creationTime))
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setIsExpired(diffDays > 14)
      setDaysToTrialEnd(15 - diffDays)
    }
  }, [loading, user])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TomorrowDevs Free Trial - Il primo incubatore online per Developers</title>
        <meta
          name="description"
          content="Costruisci la tua carriera da Developer sotto la guida di Mentors esperti. Accedendo alla prova gratuita di TomorrowDevs potrai consultare una parte dei contenuti erogati durante il
          percorso del primo incubatore online per Developers: Webinar, Mastermind, eventi di gruppo."
        />
        <link rel="canonical" href="https://trial.tomorrowdevs.com/" />
        <meta property="og:title" content="TomorrowDevs Free Trial - Il primo incubatore online per Developers" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.filepicker.io/api/file/tJOfxGouR0ao0CMXy5vX" />
        <meta property="og:url" content="https://trial.tomorrowdevs.com/" />
        <meta
          property="og:description"
          content="Costruisci la tua carriera da Developer sotto la guida di Mentors esperti. Accedendo alla prova gratuita di TomorrowDevs potrai consultare una parte dei contenuti erogati durante il
          percorso del primo incubatore online per Developers: Webinar, Mastermind, eventi di gruppo."
        />
        <meta name="site_title" content="TomorrowDevs Free Trial" />
      </Helmet>
      <Routes isSignedIn={isSignedIn} isExpired={isExpired} daysToTrialEnd={daysToTrialEnd} userEmail={userEmail} />
    </>
  )
}

export default App
