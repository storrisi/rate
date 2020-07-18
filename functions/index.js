const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const cors = require('cors')({ origin: true })
const { CloudTasksClient } = require('@google-cloud/tasks')
admin.initializeApp()

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'team@tomorrowdevs.com',
    pass: 'B^D*U76lX5',
  },
})

exports.newUserTask = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async (user) => {
    let EXPIRES_IN

    await admin
      .database()
      .ref('/constants/')
      .once('value')
      .then(function (snapshot) {
        EXPIRES_IN = snapshot.val() && snapshot.val().EXPIRES_IN
      })

    const expirationAtSeconds = Date.now() / 1000 + EXPIRES_IN
    const project = JSON.parse(process.env.FIREBASE_CONFIG).projectId
    const location = 'europe-west1'
    const queue = 'firestore-ttl'

    const tasksClient = new CloudTasksClient()
    const queuePath = tasksClient.queuePath(project, location, queue)

    const url = `https://${location}-${project}.cloudfunctions.net/firestoreTtlCallback`
    const payload = { ...user }

    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        body: Buffer.from(JSON.stringify(payload)).toString('base64'),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      scheduleTime: {
        seconds: expirationAtSeconds,
      },
    }

    const [response] = await tasksClient.createTask({ parent: queuePath, task })

    const expirationTask = response.name
    const update = { expirationTask }
    console.log(JSON.stringify(response))
    console.log(JSON.stringify(update))

    const EMAIL_TEXT = `
    <p>Nuovo utente</p>
    <p>User: ${JSON.stringify(user)}</p>
    <p>Scadenza: ${expirationAtSeconds}</p>
    `

    await sendEmail(EMAIL_TEXT, 'Nuovo utente iscritto alla Trial', 'team@tomorrowdevs.com')
  })

exports.firestoreTtlCallback = functions.region('europe-west1').https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    // getting dest email by query string
    let COUPON_TRIAL, MEMBERSHIP_URL, ONE_TIME_MENTORSHIP_URL

    await admin
      .database()
      .ref('/constants/')
      .once('value')
      .then(function (snapshot) {
        COUPON_TRIAL = snapshot.val() && snapshot.val().COUPON_TRIAL
        MEMBERSHIP_URL = snapshot.val() && snapshot.val().MEMBERSHIP_URL
        ONE_TIME_MENTORSHIP_URL = snapshot.val() && snapshot.val().ONE_TIME_MENTORSHIP_URL
      })

    console.log(JSON.stringify(req.body))
    const user = req.body
    const EMAIL_SUBJECT = 'E adesso che succede?'
    const EMAIL_TEXT = `<p style="font-size: 16px;">Ciao!</p>
    <p>sei giunto al termine della tua prova gratuita, confidiamo che i contenuti che hai avuto modo di consultare, ti abbiano fatto capire il valore che portiamo a tutti i membri del progetto <strong>TomorrowDevs</strong>.</p>
<br />
    <p>Ora vogliamo farti qualche domanda:</p>
    <ol>
      <li><strong>Quanto tempo e denaro pensi di dover investire</strong> per poter raggiungere lo stesso livello di competenze (a 360&deg;), se dovessi continuare a farlo in autonomia?</li>
      <li><strong>Quanti altri luoghi conosci in cui ci sia uno scambio così importante di informazioni</strong>, ed un'attenzione così "puntuale" alle esigenze dei singoli?</li>
    </ol>
<p>Vuoi conoscere le risposte?</p>
<br />
    <p>Prima vogliamo dirti che noi crediamo che quello che stiamo costruendo è qualcosa di unico, di diverso da qualsiasi altro percorso di formazione che potrai trovare in circolazione.</p>
<p>Vogliamo farti risparmiare settimane, mesi, anche anni di errori, perché <strong>siamo persone che ci sono già passate</strong>.</p>
<p>Oggi la scelta è troppo ampia, il rischio di disperdere soldi, tempo, ed energie è veramente altissimo, e quindi <strong>vogliamo aiutarti a canalizzare le forze verso la direzione che si adatta meglio a te.</strong></p>
<br />
<p>Ed ora, le risposte ai quesiti sopra citati:</p>
<p>Per arrivare allo stesso livello di competenze, dovresti avere <b>almeno 5 anni di esperienza sul campo, ed investire circa 15.000 Euro </b>seguendo corsi professionali di altissimo valore.</p>
<p>Luoghi in cui avviene questo scambio di valore sono veramente pochissimi, ed in molti casi sono possibili <b>solo richiedendo consulenze a 3 zeri.</b></p>
<br />
    <p style="font-size: 24px;">Per questo motivo vogliamo darti un'opportunità unica.</p>
    <p>A partire da oggi, e <strong>solo per i prossimi 5 giorni</strong>, hai a disposizione un <strong>Coupon</strong> con <strong>uno sconto del 35%</strong> valido per qualsiasi piano.</p>
    <p>Egrave; un'occasione unica, perché gli sconti che normalmente eroghiamo <strong>non superano mai il 20% del valore</strong>.</p>
<br />
<p>Il codice del Coupon che dovrai utilizzare è il seguente: <span style="font-size: 24px;">${COUPON_TRIAL}</span></p>
<p><b>Ricordati di inserirlo nella pagina di checkout, altrimenti non potrai usufruirne.</b></p>
<br />
<a href="${MEMBERSHIP_URL}" style="background: #1e298b; color: white; padding: 10px; border-radius: 10px;text-decoration: none; margin: 20px;">CLICCA QUI PER ISCRIVERTI A TOMORROWDEVS</a>
<br />
<br />
<p>Se, invece, non sei ancora del tutto convinto, puoi usufruire della nostra <b>One-Time Mentorship</b>, ovvero <b>una sessione di 1 ora con noi Mentor</b>, per analizzare in modo specifico la tua situazione.</p>
<p>Ti sottoporremo un <b>questionario</b>, che poi discuteremo in una <b>call 1-to-1</b> con te.</p>
<p>Una sessione di questo tipo, in qualsiasi altro posto te la farebbero pagare anche diverse centinaia di euro, ma con noi ha un costo quasi simbolico: <strong>47 Euro</strong></p>
<p>Questa attività farà comunque <b>parte del percorso di TomorrowDevs</b> qualora ti iscrivessi al progetto e, per questo motivo, se volessi usufruirne e solo in seguito iscriverti, <b>il costo di quest'attività ti verrà scontato interamente dall'iscrizione successiva</b>.</p> 
<br />
<a href="${ONE_TIME_MENTORSHIP_URL}" style="background: #1e298b; color: white; padding: 10px; border-radius: 10px;text-decoration: none; margin: 20px;">CLICCA QUI PER RICHIEDERE LA TUA ONE-TIME MENTORSHIP</a>
<br /><br />
<p>Ti aspettiamo!</p>
<br /><br />
--<br />
Team TomorrowDevs`

    await sendEmail(EMAIL_TEXT, EMAIL_SUBJECT, user.email)
    return res.send('EMAIL_SENT')
  })
})

exports.sendWelcomeEmail = functions.region('europe-west1').https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    console.log(JSON.stringify(req.body))
    const resData = req.body

    const productId = resData[0].object.product.id
    const itemName = resData[0].object.product.name
    const { email, name } = resData[0].object.user

    let type

    console.log('productId', productId)
    console.log('itemName', itemName)
    console.log('email', email)
    console.log('name', name)

    await admin
      .database()
      .ref(`/products/${productId}`)
      .once('value')
      .then(function (snapshot) {
        type = snapshot.val() && snapshot.val().type
      })

    if (type === 'COURSE' && email) {
      const EMAIL_TEXT = `<div class="header-title">
      <h1>${name}, grazie per aver acquistato il servizio ${itemName}</h1>
    </div>
    
     <a href="https://join.slack.com/t/tomorrowdevs/shared_invite/zt-drrw4y5e-85DoTstoVJFB7Cqum3DSOw" style="background: #1e298b; color: white; padding: 10px; border-radius: 10px;text-decoration: none; margin: 20px;">Clicca qui per accedere subito alla Community su SLACK</a>
    <p><strong>Una volta che sarai entrato sul workspace Slack</strong>, riceverai un messaggio di benvenuto contenente il link ad un questionario introduttivo, <strong>estremamente importante per il proseguo.</strong></p>
    <p>Un paio di indicazioni importanti:</p>
    <ul>
    <li>Non farlo alla veloce, &egrave; una parte importante del programma e servir&agrave; a delineare le competenze di cui hai realmente bisogno. <br />Prenditi quindi tutto il tempo necessario e cerca di essere il pi&ugrave; esaustivo possibile. Cerca di ragionare a fondo sulle domande, speriamo in questo modo di ottenere informazioni importanti sulla tua personalit&agrave;. Meglio dare informazioni in pi&ugrave; che non darne affatto.<br /><br /></li>
    <li>Alla fine del questionario troverai un link con cui poter prenotare una call di 15 minuti con noi mentor. <br />Servir&agrave; per chiarire eventuali dubbi emersi dal questionario e impostare ancora pi&ugrave; nel dettaglio il lavoro personale.<br /><br /></li>
    <li>Alla fine di tutto, ti smisteremo sui canali Slack relativi ai vostri percorsi e necessit&agrave;.</li>
    </ul>
  
  <h3>Buona permanenza!</h3>`

      const EMAIL_SUBJECT = `Benvenuto su TomorrowDevs!`

      await sendEmail(EMAIL_TEXT, EMAIL_SUBJECT, email)
      return res.send('EMAIL_SENT')
    }
    return res.send('NO_EMAIL')
  })
})

const sendEmail = async (emailText, emailSubject, emailTo) => {
  const mailOptions = {
    from: 'Team TomorrowDevs <team@tomorrowdevs.com>',
    to: emailTo,
    bcc: 'team@tomorrowdevs.com',
    subject: emailSubject,
    html: emailText,
  }

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error.toString())
      Promise.resolve(error.toString())
    }
    console.log('SENT')
    return Promise.resolve('SENT')
  })
}
