import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';






const styles = theme => ({

  button: {
    margin: theme.spacing.unit,
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
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
      anchorEl: null,
      clients: [{
        url: '/static/images/grid-list/breakfast.jpg',
        title: 'Client 1',
        width: '25%',
        id: 1,
      },
      {
        url: '/static/images/grid-list/burgers.jpg',
        title: 'Client 2',
        width: '25%',
        id: 2,
      },
      {
        url: '/static/images/grid-list/camera.jpg',
        title: 'Client 3',
        width: '25%',
        id: 3,
        
      },
      ]
    };

    this.directToUserLandingPage = this.directToUserLandingPage.bind(this)
    this.handleRemoveClient = this.handleRemoveClient.bind(this)
  }

  // handleRemoveClient(id) {
  //   const clientId = this.state.id
    // axios.delete('http://localhost3000/coach/clientlist/$(clientId)')
    // .then(response =>{
    //   this.props.history.push('/');
    // console.log(id);
  // })
  // .catch(err => console.log(err));
// }

  handleRemoveClient(id) {
    console.log(id)
    

  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  directToUserLandingPage() {
    this.props.history.push("/user/home");
  }
  render() {
    const { classes } = this.props;
    const { clients } = this.state;
    console.log(clients)
    return (
      <div className="CoachList">

        <div className={classes.root}>
          {clients.map(image => (
            <>
              <ButtonBase
                onClick={this.directToUserLandingPage}
                focusRipple
                key={image.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: image.width,
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${image.url})`,
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {image.title}
                    <span className={classes.imageMarked} />
                  </Typography>                
                </span>
              </ButtonBase>
                        {/* <Button variant="contained" color="primary" className={classes.button}></Button> */}
              <Button id={image.id} onClick={() => this.handleRemoveClient(image.id)} color="primary" className={classes.button}>
              
               <DeleteIcon className={classes.rightIcon} />
              </Button>
            

            </>
          ))}

        </div>
           <ButtonBase>
                <Button variant="outlined" color="primary">
                 
                  <Fab size="medium" color="primary" aria-label="Add" className={classes.margin}>
          <AddIcon />
        </Fab>
                  </Button>
              </ButtonBase>
      </div>
    );
  }
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonBases));