import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from "axios";
import MessageBoard from "./MessageBoard";



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
    this.props.history.push("/macroList");
  }
  directToWorkoutList() {
    this.props.history.push("/coach/client/" + this.props.match.params.id + "/workout");
  }
  render() {
    return (
      <div className="CoachLandingPage">
        <Grid container>
          <Grid item sm>
            <Paper style={{ padding: 20, margin: 100, textAlign: 'center' }}>
              <h1>{this.state.client.username}</h1>
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

            <Paper style={{ padding: 20, margin: 100, textAlign: 'center' }}>
              <Button onClick={this.directToMacroList} variant="outlined" color="inherit">
                Macros
              </Button>
            </Paper>
          </Grid>
          <Grid item sm>

            <Paper style={{ padding: 20, margin: 100, textAlign: 'center' }}>
              <Button onClick={this.directToWorkoutList} variant="outlined" color="inherit" >
                Workouts
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <MessageBoard/>
      </div>
    )
  }
}

export default CoachLandingPage;