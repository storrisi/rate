import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { useListVals } from 'react-firebase-hooks/database'
import firebase from 'firebase'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import logo from '../../assets/images/logo.png'
import style from './Contents.module.css'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: '#1e298b',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    backgroundColor: '#1e298b',
    color: 'white',
  },
  appTitle: {
    flexGrow: 1,
  },
  logo: {
    height: 10,
    [theme.breakpoints.up('md')]: {
      height: 20,
    },
  },
}))

function Contents(props) {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [currentItem, setCurrentItem] = React.useState(null)
  const [values, loading, error] = useListVals(firebase.database().ref('sections'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const showVideo = (video) => {
    setMobileOpen(false)
    setCurrentItem(video)
  }

  useEffect(() => {
    if (!loading && values.length > 0) setCurrentItem(values[0].videos[0])
  }, [loading, values])

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {!loading && values && (
        <List>
          {values.map((item) => (
            <>
              <ListItem className={classes.title} key={item.title}>
                <ListItemText primary={item.title} />
              </ListItem>
              <List component="div" disablePadding>
                {item.videos.map((video) => (
                  <ListItem button className={classes.nested} onClick={() => showVideo(video)} key={video.title}>
                    <ListItemText primary={video.title} />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </>
          ))}
        </List>
      )}
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.appTitle}>
            <img src={logo} className={classes.logo} alt="" />
          </div>
          <div>
            <Fab variant="extended" color="primary" aria-label="add">
              <Typography variant="h4" style={{ marginRight: 5 }}>
                -{props.daysToTrialEnd}
              </Typography>
              giorni
            </Fab>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {error && <h1>Error: {error}</h1>}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div>
        )}
        {currentItem && (
          <>
            <h1>{currentItem.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: currentItem.description }} />
            <div className={style.PlayerWrapper}>
              <ReactPlayer
                className={style.ReactPlayer}
                url={`https://home.wistia.com/medias/${currentItem.videoId}`}
                width="100%"
                height="100%"
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

Contents.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default Contents
