import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MessageBoard from "./MessageBoard";
import axios from "axios";
let host;
if (process.env.NODE_ENV === 'production') {
    host = 'https://grapefruit-server.herokuapp.com/'
} else { host = 'http://localhost:3000' }

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    // transition: theme.transitions.create('opacity'),
    fontFamily:'Poiret One'
  },

  input: {
    display: 'none',
  },
  
});

const buttonStyle = {
  borderRadius: '10em',
  // boxShadow: '2px 2px 0.5px white',
  fontSize: '26px',
  fontFamily: "Poiret One",
  border: '9px',
  color: 'red'
}
const nameStyle = {
  borderRadius: '10em',
  // boxShadow: '2px 2px 0.5px white',
  fontSize: '26px',
  fontFamily: "Poiret One",
  border: '9px',
  color: 'green'
}



const paper = {
  padding: 180, 
  marginLeft: '10px', 
  opacity: '0.85',
  maxWidth: '150px',
  textAlign: 'center',
  margin: 'auto',
  borderRadius: '8px',
  height: 'auto',
  backgroundColor: 'lightgray',
  // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
}




class CoachLandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      client: {
        username: ""
      }
    };

    this.directToMessageBoard = this.directToMessageBoard.bind(this)
    this.directToMacroList = this.directToMacroList.bind(this)
    this.directToWorkoutList = this.directToWorkoutList.bind(this)
  }

  componentDidMount() {
    axios.get(`${host}/coach/clients/` + this.props.match.params.id,
      {
        headers: {
          Authorization: localStorage.getItem('grapefruit-jwt')
        }
      }).then((response) => {
        this.setState({ client: response.data.data[0].client })
      })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  directToMessageBoard() {
    this.props.history.push("/messageboard");
  }

  directToMacroList() {
    this.props.history.push("/coach/client/" + this.props.match.params.id + "/macroList");
  }
  directToWorkoutList() {
    this.props.history.push("/coach/client/" + this.props.match.params.id + "/workout");
  }
  
  render() {
    return (
      <div className="CoachLandingPage">
      
        <Grid container>
          <Grid item md>
            <Paper style={{ padding: 20, margin: 0,paddingBottom: 80, paddingTop: 80, textAlign: 'center', opacity: 0.8 }}>
              
              <Button style={nameStyle} color="inherit">
              <div>{this.state.client.username}</div>
              </Button>
            </Paper>
          </Grid>
        </Grid>

      
            <Paper style={paper}>
              <Button style={buttonStyle} onClick={this.directToMacroList}  color="inherit">
                Macros
              </Button>
              
              <Button style={buttonStyle} onClick={this.directToWorkoutList} color="inherit" >
                Workouts
              </Button>
          </Paper>
        <MessageBoard sender="Michael" receiver="Ange"/>
      </div>
    )
  }
}

export default CoachLandingPage;