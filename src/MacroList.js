import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom"
import MacroForm from './MacroForm'
import Button from '@material-ui/core/Button';
import DateSelector from './DateSelector';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
let host;
if (process.env.NODE_ENV === 'production') {
    host = 'https://grapefruit-server.herokuapp.com'
} else { host = 'http://localhost:3000' }

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    margin: {
        margin: theme.spacing.unit,


    },
});

//fats is * 9, carbs * 4, protein * 4


class MacroList extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            date: moment().format('YYYY-MM-DD'),
            carbohydrates: '',
            protein: '',
            fat: '',
            // totalDailyCalories: 1000,
            client: {
                username: "",
                date: []
            },
            clientMacros: [],
            open: false,
        };
        this.deleteMacro = this.deleteMacro.bind(this);

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

    updateDate = (newDate) => {
        this.setState({ date: newDate })

    }


    handleSubmit = () => {

        let selectedMacros = {
            date: this.state.date,
            carbsSelected: this.state.carbohydrates,
            proteinSelected: this.state.protein,
            fatSelected: this.state.fat,
            // totalDailyCalories: 1000
        }
        let newMacroArray = this.state.clientMacros.slice();
        newMacroArray.push(selectedMacros);
        this.setState({ clientMacros: newMacroArray })


    }

    deleteMacro(item) {
        let oldArray = this.state.clientMacros;
        oldArray.splice(item, 1);
        this.setState({ clientMacros: oldArray });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    submitMacroForm = () => {
        let clientId = this.props.match.params.id
       axios
         .post(`${host}/macros`, { clientId, macros: this.state.clientMacros },
           
          {
           headers: {
             Authorization: localStorage.getItem("grapefruit-jwt")
           }
         })
         .then(response => {
           //this.props.history.push('/coach/client/' + this.props.match.params.id)
        });

         this.setState({
            date: moment().format('YYYY-MM-DD'),
            carbohydrates: '',
            protein: '',
            fat: '',
            // totalDailyCalories: 1000,
            client: {
                username: "",
                date: []
            },
            clientMacros: []
        });
        
     };


    render() {
        const { classes } = this.props;

        return (
            <div className='macrolist'>
            <div className={classes.root}>
                <Paper style={{ opacity: 0.95, padding: 20 }}>
                    <Typography 
                    style={{ margin: 4 }}              
                    variant="display1"
                    gutterBottom align='left'>
                    {this.state.client.username} 
                    </Typography>
                    <Grid container>
                        <Grid item sm>
                            <form className={classes.container} noValidate autoComplete="off">
                                <DateSelector
                                    value={this.state.date}
                                    updateDate={this.updateDate} />
                                <TextField
                                    id="filled-number"
                                    label="Carbohydrates"
                                    value={this.state.carbohydrates}
                                    onChange={this.handleChange('carbohydrates')}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    id="filled-number"
                                    label="Protein"
                                    value={this.state.protein}
                                    onChange={this.handleChange('protein')}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    variant="filled"
                                />
                                <TextField
                                    id="filled-number"
                                    label="Fat"
                                    value={this.state.fat}
                                    onChange={this.handleChange('fat')}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    variant="filled"
                                />



                                <Button
                                    onClick={this.handleSubmit}
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    className={classes.margin}>
                                    ADD
    
                            </Button>
                            </form>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sm>
                            <MacroForm macrosToSend={this.state.clientMacros} 
                            deleteMacro={this.deleteMacro}/>
                            
                        </Grid>
                        </Grid>
                        <Button
                        onClick={()=>{this.submitMacroForm(); this.handleClickOpen()}}
                        variant="outlined"
                        size="large"
                        color="primary"
                        className={classes.margin}
                      >
                        Submit Macros
                      </Button>
                      <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle>Good Work!</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You have submitted a new macro form for your client.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Right On!
                        </Button>
                        </DialogActions>
                        </Dialog>
                </Paper>
            </div>
            </div>
        );
    }
}

MacroList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(MacroList));