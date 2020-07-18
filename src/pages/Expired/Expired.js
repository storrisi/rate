import React from 'react'
import logo from '../../assets/images/logo.png'
import style from './Expired.module.css'
import { Button } from '@material-ui/core'

const Expired = () => {
  return (
    <div className={style.Expired}>
      <img src={logo} className={style.Logo} alt="" />

      <div style={{ background: 'white', padding: '20px', width: '80%', height: '80%', overflowY: 'scroll' }}>
        <p style={{ fontSize: '16px' }}>
          Ciao{' '}
          <span role="img" aria-label="hello">
            👋🏻
          </span>
          !
        </p>
        <p>
          sei giunto al termine della tua prova gratuita, confidiamo che i contenuti che hai avuto modo di consultare,
          ti abbiano fatto capire il valore che portiamo a tutti i membri del progetto <strong>TomorrowDevs</strong>.
        </p>
        <br />
        <p>Ora vogliamo farti qualche domanda:</p>
        <ul>
          <li>
            <strong>Quanto tempo e denaro pensi di dover investire</strong> per poter raggiungere lo stesso livello di
            competenze (a 360&deg;), se dovessi continuare a farlo in autonomia?
          </li>
          <li>
            <strong>Quanti altri luoghi conosci in cui ci sia uno scambio così importante di informazioni</strong>, ed
            un'attenzione così "puntuale" alle esigenze dei singoli?
          </li>
        </ul>
        <br />
        <p>Vuoi conoscere le risposte?</p>
        <br />
        <p>
          Prima vogliamo dirti che noi crediamo che quello che stiamo costruendo è qualcosa di unico, di diverso da
          qualsiasi altro percorso di formazione che potrai trovare in circolazione.
        </p>
        <p>
          Vogliamo farti risparmiare settimane, mesi, anche anni di errori, perchè{' '}
          <strong>siamo persone che ci sono già passate</strong>.
        </p>
        <p>
          Oggi la scelta è troppo ampia, il rischio di disperdere soldi, tempo, ed energie è veramente altissimo, e
          quindi <strong>vogliamo aiutarti a canalizzare le forze verso la direzione che si adatta meglio a te.</strong>
        </p>
        <br />
        <p>Ed ora, le risposte ai quesiti sopra citati:</p>
        <p>
          Per arrivare allo stesso livello di competenze, dovresti avere{' '}
          <b>almeno 5 anni di esperienze sul campo, ed investire circa 15.000 Euro </b>seguendo corsi professionali di
          altissimo valore.
        </p>
        <p>
          Luoghi in cui avviene questo scambio di valore sono veramente pochissimi, ed in molti casi sono possibili{' '}
          <b>solo richiedendo consulenze a 3 zeri.</b>
        </p>
        <br />
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Per questo motivo vogliamo darti un'opportunità unica.</p>
        <p>
          A partire da oggi, e <strong>solo per i prossimi 5 giorni</strong>, hai a disposizione un Coupon con{' '}
          <strong>uno sconto del 35%</strong> valido per qualsiasi piano.
        </p>
        <p>
          E' un'occasione unica, perchè gli sconti che normalmente eroghiamo{' '}
          <strong>non superano mai il 20% del valore</strong>.
        </p>
        <br />
        <p>
          Il codice del Coupon che dovrai utilizzare è il seguente: <span style={{ fontSize: '24px' }}>TDEVSTRIAL</span>
        </p>
        <p>
          <b>Ricordati di inserirlo nella pagina di checkout, altrimenti non potrai usufruirne.</b>
        </p>
        <br />
        <p>
          Se, invece, non sei ancora del tutto convinto, puoi usufruire della nostra <b>One-Time Mentorship</b>, ovvero{' '}
          <b>una sessione di 1 ora con noi Mentor</b>, per analizzare in modo specifico la tua situazione.
        </p>
        <p>
          Ti sottoporremo un <b>questionario</b>, che poi discuteremo in una <b>call 1-to-1</b> con te.
        </p>
        <p>
          Una sessione di questo tipo, in qualsiasi altro posto te la farebbero pagare anche diverse centinaia di euro,
          ma con noi ha un costo quasi simbolico: <strong>47 Euro</strong>
        </p>
        <p>
          Questa attività farà comunque <b>parte del percorso di TomorrowDevs</b> qualora ti iscrivessi al progetto, e
          per questo motivo, se volessi usufruirne e solo in seguito iscriverti,{' '}
          <b>il costo di quest'attività ti verrà scontato interamente dall'iscrizione successiva</b>.
        </p>
        <br />
        <Button color="primary" variant="contained" size="medium" style={{ fontWeight: 'bold' }}>
          CLICCA QUI PER RICHIEDERE LA TUA ONE-TIME MENTORSHIP
        </Button>
        <br />
        <br />
        <p>Ti aspettiamo!</p>
      </div>
    </div>
  )
}

export default Expired
