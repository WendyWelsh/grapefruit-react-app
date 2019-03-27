import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import axios from "axios"
// import RaisedButton from '@material-ui/core/RaisedButton';
import Button from '@material-ui/core/Button';
let host;
if (process.env.NODE_ENV === 'production') {
 host = 'https://grapefruit-server.herokuapp.com'
}else {host = 'http://localhost:3000'}



const styles = theme => ({

  button: {
    margin: theme.spacing.unit,
   
  },


  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    justifyContent: 'center',
    paddingTop: '150px', 
   

},
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {

    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',

  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
imageMarked: {
  height: 3,
    width: 18,
      backgroundColor: theme.palette.common.white,
        position: 'absolute',
          bottom: -2,
            left: 'calc(50% - 9px)',
              transition: theme.transitions.create('opacity'),
  },
});


class ButtonBases extends React.Component {
  constructor(props) {
    super(props)
 
    this.state = {
        selectedFile: null,
        anchorEl: null, 
      clients: []
      
    };

    this.directToUserLandingPage = this.directToUserLandingPage.bind(this)
    this.handleRemoveClient = this.handleRemoveClient.bind(this)
  }

  componentDidMount() {
    axios.get(`${host}/coach/clients`,
      {
        headers: {
          Authorization: localStorage.getItem('grapefruit-jwt')
        }
      }
    ).then((response) => {
      this.setState({ clients: response.data.data })
    })
  }


fileSelectedHandler = event => {
  this.setState({
      selectedFile: event.target.files[0]
  })

}

  handleRemoveClient(id) {

  }


  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  directToUserLandingPage(clientId) {
    this.props.history.push("/coach/client/" + clientId);
  }
  render() {
    const { classes } = this.props;
    const { clients } = this.state;

    return (
      <div className="CoachList" >

        <div className={classes.root}>
          {clients.map(client => (
            <>
            
              <ButtonBase
                onClick={() => this.directToUserLandingPage(client.client.id)}
                focusRipple
                key={client.client.username}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: "25%"
                }}

              >

                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {client.client.username}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            </>
          ))}

        </div>
        
      </div>
    );
  }
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonBases));