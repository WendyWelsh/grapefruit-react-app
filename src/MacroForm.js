import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        opacity: .9,
    },
    table: {
        minWidth: 700,
    },
});



class MacroForm extends React.Component {
    constructor(props) {
        super(props)
    }






    
    render() {
        const { classes } = this.props;
        return (

            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Carbohydrates (g)</TableCell>
                                <TableCell align="right">Protein (g)</TableCell>
                                <TableCell align="right">Fat (g)</TableCell>
                                <TableCell align="right">Total Daily Calories (g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.macrosToSend.map(macros => (
                                <TableRow key={macros.id}>
                                    <TableCell component="th" scope="row">
                                        {macros.date}
                                    
                                    </TableCell>
                                    <TableCell align="right">{macros.carbsSelected}</TableCell>
                                    <TableCell align="right">{macros.proteinSelected}</TableCell>
                                    <TableCell align="right">{macros.fatSelected}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                
            </div>
        );
    }
}

MacroForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(MacroForm));


















