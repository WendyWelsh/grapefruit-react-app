import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from "axios";
import MessageBoard from "./MessageBoard";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    transition: theme.transitions.create('opacity'),
    fontFamily:'Poiret One'
  },

  input: {
    display: 'none',
  },
  
});


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
    axios.get('/coach/clients/' + this.props.match.params.id,
      {
        headers: {
          Authorization: localStorage.getItem('grapefruit-jwt')
        }
      }).then((response) => {
        this.setState({ client: response.data.data[0].client })
        console.log(response)

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
            <Paper style={{ padding: 20, margin: 100, textAlign: 'center', opacity: 0.8 }}>
              {/* <h1>{this.state.client.username}</h1> */}
              <Button  variant="outlined" color="inherit">
              <div>{this.state.client.username}</div>
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Grid container>
          {/* <Grid item sm>
            <Paper style={{ padding: 20, margin: 100, textAlign: 'center' }}>
              <Button onClick={this.directToMessageBoard} variant="outlined" color="inherit">
                Messages
              </Button>
            </Paper>
          </Grid> */}
          <Grid item sm>

            <Paper style={{ padding: 20, margin: 100, textAlign: 'center',  opacity: 0.8 }}>
              <Button onClick={this.directToMacroList} variant="outlined" color="inherit">
                Macros
              </Button>
            </Paper>
          </Grid>
          <Grid item sm>

            <Paper style={{ padding: 20, margin: 100, textAlign: 'center',  opacity: 0.8 }}>
          
              <Button onClick={this.directToWorkoutList} variant="outlined" color="inherit" >
                Workouts
              </Button>
            </Paper>
          </Grid>
        </Grid>
        {/* <MessageBoard sender="lincoln" receiver={this.state.client.username}/> */}
        <MessageBoard sender="lincoln" receiver="bob"/>
      </div>
    )
  }
}

export default CoachLandingPage;